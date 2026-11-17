import { A, H2, P, Table, UL } from '../Prose';
import type { IPostMeta } from '../posts';

export const meta: IPostMeta = {
    slug: "scoring-kg-rag-on-biomixqa",
    title: "What a knowledge graph adds: scoring KG-RAG on BiomixQA",
    date: "2026-11-17",
    summary: "I wrote a small scoring script and tests around the KG-RAG authors' published answers. Grounding in a knowledge graph helped every model, and helped the weakest one most.",
    readingMinutes: 4,
    tags: ["RAG", "Knowledge graphs", "Evaluation"],
};

const Post = () => (
    <>
        <P>{"My Graph-Augmented Intelligence project is built on "}<A href="https://github.com/BaranziniLab/KG_RAG">{"KG-RAG"}</A>{", the knowledge-graph retrieval framework by Karthik Soman and colleagues at the Baranzini Lab, UCSF. The framework, the SPOKE knowledge graph context and the BiomixQA benchmark are their work. This post is about the small part that is mine: a scoring script, tests and continuous integration that reproduce the headline comparison from the files the authors published."}</P>
        <H2>{"How KG-RAG answers a question"}</H2>
        <P>{"A plain language model answers a biomedical question from memory. KG-RAG first extracts the disease names in the question, matches each one to a node in the SPOKE knowledge graph using an embedding search, fetches the facts attached to those nodes, and gives the model that context along with the question. The model then answers from the retrieved facts rather than from memory alone."}</P>
        <H2>{"What I added"}</H2>
        <UL>
            <li>{"A script, "}<A href="https://github.com/Vishal-Krishna-Kumar/GraphAugmented-Intelligence_GAI">{"analysis/summarize_results.py"}</A>{", that scores the authors' published response files against the BiomixQA questions. It uses only the Python standard library, so it needs no GPU and no API key."}</li>
            <li>{"Unit tests for the scoring rules, a regression test on the published numbers, and checks that the notebooks, config files and benchmark files are well formed."}</li>
            <li>{"A CI workflow that runs the lint, the tests and the table on Python 3.10 and 3.12."}</li>
        </UL>
        <H2>{"The numbers"}</H2>
        <P>{"These are the KG-RAG authors' runs, not mine. \"Prompt only\" is the model answering from its own knowledge; \"KG-RAG\" is the same model given context from the knowledge graph. Accuracy is correct answers over all questions in the file."}</P>
        <Table head={["Model and task", "Questions", "Prompt only", "KG-RAG", "Change"]} rows={[["Llama-2-13b, true/false", "311", "89.1%", "93.9%", "+4.8"], ["Llama-2-13b, multiple choice", "306", "30.7%", "52.6%", "+21.9"], ["GPT-3.5-Turbo, true/false", "311", "87.1%", "95.2%", "+8.0"], ["GPT-3.5-Turbo, multiple choice", "306", "63.1%", "79.4%", "+16.3"], ["GPT-4, true/false", "311", "90.4%", "94.5%", "+4.2"], ["GPT-4, multiple choice", "306", "68.3%", "74.2%", "+5.9"]]} />
        <H2>{"What I took from it"}</H2>
        <UL>
            <li>{"Retrieval helped every model on every task, and the gain was largest where the model was weakest: Llama-2 on multiple choice went from 30.7% to 52.6%."}</li>
            <li>{"Scoring rules matter. 65 of Llama-2's KG-RAG multiple-choice responses did not follow the requested JSON format. I count them as wrong and report the count next to the accuracy, because silently dropping them would flatter the result."}</li>
            <li>{"The paper reports bootstrap means over samples of 150 questions, so its figures differ slightly from accuracy over the whole file. Stating which one you computed avoids a confusing mismatch."}</li>
        </UL>
    </>
);

export default Post;
