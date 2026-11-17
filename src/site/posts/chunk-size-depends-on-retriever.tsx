import { A, Code, H2, P, Pre, Table, UL } from '../Prose';
import type { IPostMeta } from '../posts';

export const meta: IPostMeta = {
    slug: 'chunk-size-depends-on-retriever',
    title: 'The best chunk size depends on your retriever',
    date: '2026-11-16',
    summary:
        'I re-ran the same chunking audit with an embedding model instead of BM25. The strategy that ranked first fell to fifth, and 400-word chunks lost 25 points of Recall@5.',
    readingMinutes: 4,
    tags: ['RAG', 'Embeddings', 'Evaluation'],
};

const Post = () => (
    <>
        <P>
            In an{' '}
            <A href="#/blog/chunking-cuts-the-answer">
                earlier post
            </A>{' '}
            I audited nine chunking strategies on 10,570 SQuAD questions with
            a BM25 retriever. The obvious objection is that most RAG systems
            retrieve with embeddings, not BM25. So I added an embedding
            retriever to{' '}
            <A href="https://github.com/Vishal-Krishna-Kumar/chunkaudit">
                chunkaudit
            </A>{' '}
            and ran the same audit again.
        </P>

        <H2>The setup</H2>
        <P>
            Same documents, same questions, same chunkers. Only the retriever
            changed, from BM25 to{' '}
            <Code>sentence-transformers/all-MiniLM-L6-v2</Code>, ranking chunks
            by cosine similarity. A chunk still counts as a hit only if it
            contains the whole sentence that answers the question. The run
            happens on GitHub Actions through a workflow in the repository, so
            anyone can reproduce it. Two separate runs gave identical tables.
        </P>

        <H2>The ranking changed</H2>
        <Table
            head={[
                'Strategy',
                'Recall@5, BM25',
                'Rank',
                'Recall@5, embeddings',
                'Rank',
            ]}
            rows={[
                ['paragraph:200', '91.6%', '2', '84.0%', '1'],
                ['recursive:200', '91.3%', '3', '83.5%', '2'],
                ['sentence:5:1', '89.8%', '5', '81.8%', '3'],
                ['sentence:3', '86.0%', '7', '80.1%', '4'],
                ['sentence:10:2', '92.5%', '1', '79.7%', '5'],
                ['fixed:200:50', '90.2%', '4', '78.9%', '6'],
                ['fixed:200', '78.7%', '8', '68.7%', '7'],
                ['fixed:400', '87.5%', '6', '62.7%', '8'],
                ['fixed:100', '62.6%', '9', '57.4%', '9'],
            ]}
        />
        <UL>
            <li>
                <strong>The biggest chunks lost the most.</strong> Ten-sentence
                chunks, about 245 words each, went from first place to fifth.
                Fixed 400-word chunks fell from 87.5% to 62.7%.
            </li>
            <li>
                <strong>Small chunks gained.</strong> Three-sentence chunks,
                about 74 words each, moved from seventh to fourth.
            </li>
            <li>
                <strong>Some things held.</strong> Paragraph-aware chunks of
                about 150 words were in the top three with both retrievers.
                Fixed chunks with no overlap were near the bottom with both,
                and a 50-word overlap helped with both.
            </li>
            <li>
                <strong>The split rate did not move at all.</strong> How often
                a strategy cuts the answering sentence in two depends only on
                the chunker, so that column is identical in both runs.
            </li>
        </UL>

        <H2>Why big chunks suffer</H2>
        <P>
            A likely reason is the input limit of the model. This one reads at
            most 256 tokens, roughly 190 words. Anything after that is never
            seen, so the second half of a 400-word chunk does not contribute
            to its embedding at all. A second effect is dilution: one vector
            has to stand for everything in the chunk, and the more topics a
            chunk covers, the less it resembles any single question.
        </P>
        <P>
            I have not separated those two effects. Testing a model with a
            longer input limit on the same data would do it, and the workflow
            takes the model name as an input for that reason.
        </P>

        <H2>Do not read this as BM25 beats embeddings</H2>
        <P>
            BM25 scored higher than this embedding model on every strategy
            here. That says more about SQuAD than about the retrievers. Its
            questions were written by people looking at the passage, so they
            share many words with it, which is exactly what BM25 rewards. On
            questions phrased differently from the source text, the picture
            can reverse.
        </P>
        <P>
            There is also a cost difference worth knowing. On the same GitHub
            Actions runner, the BM25 audit took 7 seconds and the embedding
            audit took 322 seconds.
        </P>

        <H2>What I take from it</H2>
        <P>
            Chunk size is not a setting you can tune once and carry between
            systems. A size that works with a lexical retriever can be too
            long for an embedding model, and the only way to know is to
            measure with the retriever you will actually use.
        </P>
        <Pre>{`pip install "chunkaudit[embeddings]"
chunkaudit squad --out data/squad
chunkaudit run data/squad --retriever embeddings`}</Pre>
        <P>
            The full tables for both retrievers are in the{' '}
            <A href="https://github.com/Vishal-Krishna-Kumar/chunkaudit">
                repository
            </A>
            .
        </P>
    </>
);

export default Post;
