import { A, H2, P, UL } from '../Prose';
import type { IPostMeta } from '../posts';

export const meta: IPostMeta = {
    slug: "hmm-vs-lstm-pos-tagging",
    title: "A bigram HMM against RNNs for part-of-speech tagging",
    date: "2026-11-17",
    summary: "Tagging English, Japanese and Bulgarian with a hidden Markov model and with RNN, LSTM and BiLSTM taggers. The bigram HMM reached a 5.4% word error rate on English.",
    readingMinutes: 3,
    tags: ["NLP", "Sequence labeling", "HMM"],
};

const Post = () => (
    <>
        <P>{"This "}<A href="https://github.com/Vishal-Krishna-Kumar/nlp-sequence-labeling-autocorrection">{"project"}</A>{" has two parts: part-of-speech tagging and spelling correction. For tagging I compared a hidden Markov model with three neural taggers on English, Japanese and Bulgarian. Some files are starter code written by others and keep their original headers: the HMM training script is by David Bamman and Noah A. Smith, and the reference Viterbi script is by Noah A. Smith."}</P>
        <H2>{"The HMM tagger"}</H2>
        <P>{"A hidden Markov model treats the tags as hidden states and the words as what each state emits. Training is counting: how often one tag follows another, and how often a tag produces a word. Tagging a new sentence means finding the most probable tag sequence, which the Viterbi algorithm does exactly with dynamic programming, keeping the best path into each tag at each word rather than trying every sequence."}</P>
        <H2>{"The neural taggers"}</H2>
        <UL>
            <li>{"A plain RNN reads the sentence left to right and predicts a tag at each word."}</li>
            <li>{"An LSTM does the same with gates that help it keep information over longer distances."}</li>
            <li>{"A bidirectional LSTM reads the sentence in both directions, so the tag for a word can depend on what comes after it."}</li>
        </UL>
        <H2>{"Measuring"}</H2>
        <P>{"I report error rate by word (the share of words tagged wrongly) and error rate by sentence (the share of sentences with at least one wrong tag). The English data has about 40,000 tokens and the Japanese data about 17,000. The bigram HMM reached a 5.4% word error rate on English."}</P>
        <H2>{"What I took from it"}</H2>
        <UL>
            <li>{"A counting model with exact decoding is a strong baseline, and its errors are easy to inspect because every probability can be read off a table."}</li>
            <li>{"Sentence error rate is much harsher than word error rate, and it is the number that matters if a later step needs the whole sentence right."}</li>
            <li>{"Dataset size differs a lot across the languages, so comparing languages says as much about the data as about the model."}</li>
        </UL>
        <P>{"A longer analysis with the tables is "}<A href="https://pos-engine.vishalkrishnakkr.workers.dev/blog/nlp-sequence-labeling-autocorrection/">{"here"}</A>{"."}</P>
    </>
);

export default Post;
