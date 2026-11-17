import { A, Code, Figure, H2, P, Pre, Table, UL } from '../Prose';
import type { IPostMeta } from '../posts';

export const meta: IPostMeta = {
    slug: 'chunking-cuts-the-answer',
    title: 'How often does chunking cut the answer in half?',
    date: '2026-11-14',
    summary:
        'I audited nine chunking strategies on 10,570 SQuAD questions. Fixed 200-word chunks with no overlap split the answering sentence 14.1% of the time.',
    readingMinutes: 5,
    tags: ['RAG', 'Chunking', 'Evaluation'],
};

const Post = () => (
    <>
        <P>
            Every RAG pipeline starts by cutting documents into chunks. Most
            tutorials pick a fixed size, and most evaluations then measure the
            retriever. But one failure happens before retrieval: the sentence
            that answers the question gets cut across two chunks. When that
            happens, no retriever can return the answer in one piece, however
            good it is.
        </P>
        <P>
            I wanted to know how often that happens, so I wrote a small
            open-source tool,{' '}
            <A href="https://github.com/Vishal-Krishna-Kumar/chunkaudit">
                chunkaudit
            </A>
            , to measure it.
        </P>

        <H2>What it measures</H2>
        <P>
            Every chunk keeps the character span it came from. Every question
            has the character span of its evidence, the text that answers it. A
            chunk counts as a hit only if it comes from the right document and
            its span covers the whole evidence span. From that, the tool
            reports three things for each chunking strategy:
        </P>
        <UL>
            <li>
                <strong>Answer split:</strong> the share of questions whose
                evidence is not fully inside any chunk. This depends only on
                the chunker, not on the retriever.
            </li>
            <li>
                <strong>Recall@k and MRR:</strong> whether a BM25 retriever
                returns a chunk that holds the whole evidence, and how high it
                ranks.
            </li>
            <li>
                <strong>Words in the top k:</strong> how much text you would
                send to the language model.
            </li>
        </UL>
        <P>
            There is no language model acting as a judge and no fuzzy matching,
            so the same input always gives the same numbers. It needs no API
            key and its only dependency is NumPy.
        </P>

        <H2>The test</H2>
        <P>
            I used the SQuAD v1.1 development set and joined the paragraphs of
            each Wikipedia article into one long document. That gives 48
            documents of about 5,300 words each and 10,570 questions. The
            evidence for a question is the sentence that contains the answer.
            All nine strategies ran in 13 seconds on a laptop.
        </P>
        <Figure
            src="/blog/chunkaudit-squad.gif"
            alt="Terminal recording of chunkaudit ranking nine chunking strategies on SQuAD"
            width={944}
            height={446}
            caption="A recording generated from the real output of the run. Strategy names read kind:size:overlap, with sizes in words or sentences."
        />

        <H2>What I found</H2>
        <Table
            head={['Strategy', 'Answer split', 'Recall@5', 'Words in top 5']}
            rows={[
                ['fixed:100', '29.0%', '62.6%', '499'],
                ['fixed:200', '14.1%', '78.7%', '994'],
                ['fixed:200:50', '1.1%', '90.2%', '995'],
                ['recursive:200', '0.0%', '91.3%', '753'],
                ['paragraph:200', '0.0%', '91.6%', '777'],
                ['sentence:10:2', '0.0%', '92.5%', '1,258'],
            ]}
        />
        <P>
            <strong>
                Fixed-size chunks with no overlap cut a lot of answers.
            </strong>{' '}
            At 100 words the answering sentence is split in 29.0% of
            questions, and at 200 words in 14.1%. Recall@5 for fixed 200-word
            chunks is 78.7%, against 91.3% for a recursive splitter with the
            same size limit, which also sends fewer words to the model (753
            against 994).
        </P>
        <P>
            <strong>
                A small overlap fixes most of it, and more overlap adds
                nothing.
            </strong>{' '}
            For 200-word chunks:
        </P>
        <Table
            head={['Overlap (words)', 'Answer split', 'Recall@5', 'Chunks to index']}
            rows={[
                ['0', '14.1%', '78.7%', '1,292'],
                ['25', '4.6%', '87.0%', '1,463'],
                ['50', '1.1%', '90.2%', '1,701'],
                ['100', '0.1%', '89.9%', '2,513'],
            ]}
        />
        <P>
            <strong>
                Respecting paragraphs is cheaper than making chunks bigger.
            </strong>{' '}
            Paragraph-packed 200-word chunks are within one point of
            ten-sentence chunks on Recall@5 (91.6% against 92.5%) with 38%
            fewer words in the top 5 (777 against 1,258).
        </P>
        <P>
            <strong>What counts as found changes the picture.</strong> If only
            the two or three answer words must be inside a chunk, instead of
            the sentence around them, fixed 200-word chunks split just 1.1% of
            answers and reach 89.2% Recall@5. I use the sentence by default
            because a model needs it to answer.
        </P>

        <H2>Caveats</H2>
        <UL>
            <li>
                The retriever is BM25, which is lexical. An embedding retriever
                may rank the strategies differently, which is why the retriever
                is pluggable.
            </li>
            <li>
                The sentence-aware strategies score 0% split partly by
                construction, because the same rule-based sentence splitter
                marks the evidence and builds their chunks.
            </li>
            <li>
                SQuAD is Wikipedia prose with short factual answers. Expect
                different numbers on code, tables, legal text or chat logs.
                That is the reason to run it on your own documents.
            </li>
        </UL>

        <H2>Try it</H2>
        <Pre>{`pip install git+https://github.com/Vishal-Krishna-Kumar/chunkaudit.git
chunkaudit demo`}</Pre>
        <P>
            To audit your own documents you need a folder with two JSON Lines
            files: the documents, and 20 to 50 questions with the answering
            text marked. Then run <Code>chunkaudit run path/to/dataset</Code>.
            The code, the method and the full results are in the{' '}
            <A href="https://github.com/Vishal-Krishna-Kumar/chunkaudit">
                repository
            </A>
            .
        </P>
    </>
);

export default Post;
