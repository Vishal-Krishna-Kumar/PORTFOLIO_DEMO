import { A, Code, Figure, H2, P, Pre, Table, UL } from '../Prose';
import type { IPostMeta } from '../posts';

export const meta: IPostMeta = {
    slug: 'inverted-index-in-numpy',
    title: 'From 216 ms to 0.22 ms per query: an inverted index in NumPy',
    date: '2026-11-14',
    summary:
        'Replacing a dense document-term matrix with postings lists made TF-IDF retrieval nearly 1,000 times faster and cut indexing memory from 4.1 GB to 123 MB, with identical rankings.',
    readingMinutes: 4,
    tags: ['Information Retrieval', 'Performance', 'NumPy'],
};

const Post = () => (
    <>
        <P>
            <A href="https://github.com/Vishal-Krishna-Kumar/ragbench">
                ragbench
            </A>{' '}
            is a small retrieval benchmark: BM25, TF-IDF and a hybrid of the
            two, implemented with NumPy and scored with standard IR metrics. It
            ran instantly on the 30-document sample set. Then I ran it on BEIR
            SciFact, which has 5,183 scientific abstracts and 300 queries. The
            full benchmark took 3 minutes 17 seconds and peaked at 4.1 GB of
            memory while indexing. For five thousand short documents, that is
            far too much.
        </P>

        <H2>What was slow</H2>
        <P>
            The first TF-IDF version stored one dense vector per document with
            one column per vocabulary term: a documents by vocabulary matrix of
            64-bit floats. Almost every entry is zero, because an abstract uses
            a few hundred distinct terms out of tens of thousands. Every query
            was a product with that whole matrix.
        </P>
        <P>
            The first BM25 version had a different problem. For every query
            term it looped over all 5,183 documents in Python to look up the
            term frequency:
        </P>
        <Pre>{`for term in set(q):
    idf = self._idf.get(term)
    if idf is None:
        continue
    tf = np.array([d.get(term, 0) for d in self._tf], dtype=float)
    out += idf * tf * (self.k1 + 1) / (tf + norm)`}</Pre>
        <P>
            Both versions scored every document for every query, although most
            documents share no term with the query.
        </P>

        <H2>The fix: postings</H2>
        <P>
            An inverted index stores, for each term, the documents that contain
            it and the weight of the term in each one. Building it is one pass
            over the documents:
        </P>
        <Pre>{`idx: dict[str, list[int]] = {}
val: dict[str, list[float]] = {}
for i, weights in enumerate(per_doc):
    for term, w in weights.items():
        idx.setdefault(term, []).append(i)
        val.setdefault(term, []).append(w)
return {t: (np.array(idx[t], dtype=np.intp), np.array(val[t], dtype=float)) for t in idx}`}</Pre>
        <P>
            Scoring a query then touches only the postings of its own terms.
            The BM25 loop keeps the same formula, applied to the few documents
            that contain the term:
        </P>
        <Pre>{`for term in set(q):
    idf = self._idf.get(term)
    if idf is None:
        continue
    idx, tf = self._post[term]
    out[idx] += idf * tf * (self.k1 + 1) / (tf + norm[idx])`}</Pre>
        <P>
            TF-IDF works the same way. The L2-normalised weights are computed
            once per document and stored in the postings, so the cosine
            similarity becomes a sum over matching terms.
        </P>

        <H2>Results</H2>
        <P>
            Measured on SciFact, on the same machine, before and after the
            change:
        </P>
        <Table
            head={['', 'Before', 'After']}
            rows={[
                ['TF-IDF mean query latency', '216.43 ms', '0.22 ms'],
                ['TF-IDF index build', '75.9 s', '11.9 s'],
                ['TF-IDF peak memory while indexing', '4,142 MB', '123 MB'],
                ['BM25 mean query latency', '21.14 ms', '0.38 ms'],
                ['BM25 index build', '1.6 s', '4.3 s'],
                ['Full three-retriever benchmark', '3 min 17 s', '9 s'],
            ]}
        />
        <P>
            The top 10 results are identical for all 300 queries with both
            retrievers. I checked that before trusting any timing, because a
            faster retriever that returns different documents is a different
            retriever. Two tests now keep it that way: one compares the
            postings-based TF-IDF scores with a plain dense cosine similarity,
            and one compares BM25 with the textbook formula.
        </P>
        <P>
            One number got worse. BM25 indexing went from 1.6 to 4.3 seconds,
            because the postings are built in pure Python. Indexing happens
            once and queries happen all the time, so I took the trade.
        </P>
        <Figure
            src="/blog/ragbench-scifact.gif"
            alt="Terminal recording of ragbench comparing BM25, TF-IDF and hybrid retrieval on SciFact"
            width={737}
            height={316}
            caption="The benchmark on SciFact after the change. Latency varies by machine and run; the quality metrics do not."
        />

        <H2>What I took from it</H2>
        <UL>
            <li>
                <strong>Measure on real data.</strong> The 30-document sample
                hid all of this. The problem only showed at 5,183 documents.
            </li>
            <li>
                <strong>Check equivalence before speed.</strong> Identical
                rankings first, timings second.
            </li>
            <li>
                <strong>Report what got slower.</strong> The BM25 build time is
                in the table next to the wins.
            </li>
        </UL>
        <P>
            The code is in <Code>ragbench/retrievers.py</Code> in the{' '}
            <A href="https://github.com/Vishal-Krishna-Kumar/ragbench">
                repository
            </A>
            , with the before and after numbers in the README.
        </P>
    </>
);

export default Post;
