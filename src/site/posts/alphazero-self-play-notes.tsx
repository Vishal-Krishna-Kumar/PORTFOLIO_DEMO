import { A, H2, P, UL } from '../Prose';
import type { IPostMeta } from '../posts';

export const meta: IPostMeta = {
    slug: "alphazero-self-play-notes",
    title: "How AlphaZero-style self-play works: notes from a tutorial",
    date: "2026-11-17",
    summary: "I worked through Robert Förster's AlphaZero tutorial for Tic-Tac-Toe and Connect Four. These are my notes on the loop: search, self-play, training.",
    readingMinutes: 4,
    tags: ["Reinforcement learning", "MCTS", "PyTorch"],
};

const Post = () => (
    <>
        <P>{"To understand AlphaZero I worked through "}<A href="https://github.com/foersterrobert/AlphaZeroFromScratch">{"Robert Förster's AlphaZeroFromScratch tutorial"}</A>{", which builds the method for Tic-Tac-Toe and Connect Four in PyTorch. The notebooks and checkpoints in "}<A href="https://github.com/Vishal-Krishna-Kumar/AlphaZero-Chess">{"my repository"}</A>{" are his, unchanged, and the README says so. What follows is my understanding of how the pieces fit."}</P>
        <H2>{"One network, two outputs"}</H2>
        <P>{"A single network takes a board position and returns two things: a policy, which is a probability for each legal move, and a value, which is a single number estimating who is winning. There are no hand-written evaluation rules."}</P>
        <H2>{"Search guided by the network"}</H2>
        <P>{"Monte Carlo Tree Search explores moves from the current position. Classic MCTS plays random games to the end to judge a position. The AlphaZero version asks the network instead: the policy tells the search which moves deserve attention first, and the value replaces the random playout. After a few hundred simulations, the number of visits each move received is a better policy than the network's raw output."}</P>
        <H2>{"The loop"}</H2>
        <UL>
            <li>{"Self-play: the current network plays games against itself, choosing moves with the search."}</li>
            <li>{"Record: for every position, store the position, the visit distribution from the search and the final result of the game."}</li>
            <li>{"Train: fit the policy to the visit distribution and the value to the result, with a cross-entropy loss plus a mean squared error loss."}</li>
            <li>{"Repeat. The search makes the network's targets better than its own guesses, and a better network makes the search stronger."}</li>
        </UL>
        <H2>{"What stood out"}</H2>
        <UL>
            <li>{"The search is the teacher. Without it the network would only be learning from its own mistakes."}</li>
            <li>{"Board symmetries are free training data: a mirrored Connect Four position is just as valid."}</li>
            <li>{"Small games are enough to see the whole method work, which makes the tutorial a good way in before reading the paper."}</li>
        </UL>
        <P>{"My separate "}<A href="https://github.com/Vishal-Krishna-Kumar/ChessAI">{"ChessAI"}</A>{" project is a Pygame chess engine and is not based on AlphaZero."}</P>
    </>
);

export default Post;
