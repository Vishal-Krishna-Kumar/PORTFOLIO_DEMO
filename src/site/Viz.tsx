import { useEffect, useState } from "react";
import type { ReactNode } from "react";

// Live visualizations for the two open-source tools. They are drawn in the browser, loop
// forever and use the numbers measured in the projects' own benchmarks (SQuAD v1.1 for
// chunkaudit, BEIR SciFact for ragbench). Sizes are in container units so the same drawing
// works inside a small card and inside the large project view.

/** A counter that goes up by one every `ms` milliseconds. */
function useTick(ms: number): number {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setTick((value) => value + 1), ms);
    return () => window.clearInterval(timer);
  }, [ms]);
  return tick;
}

const Frame = ({ title, source, children }: { title: string; source: string; children: ReactNode }) => (
  <div className="absolute inset-0 flex flex-col bg-[#0b0d12] p-[4cqw] text-[#F1F0EC]">
    <div className="flex items-center justify-between gap-[2cqw]">
      <p className="site-mono text-[1.9cqw] uppercase tracking-[0.18em] text-red-400">{title}</p>
      <p className="site-mono text-[1.6cqw] text-white/40">{source}</p>
    </div>
    <div className="relative grow mt-[2.5cqw]">{children}</div>
  </div>
);

/* ---------------------------------------------------------------- chunkaudit, 1 of 2 */

const WORDS = 36;
const ANSWER = { from: 15, to: 20 };
const SPLITS: { name: string; rate: string; note: string; chunks: [number, number][] }[] = [
  {
    name: "fixed:200",
    rate: "14.1%",
    note: "A fixed cut lands inside the answer.",
    chunks: [
      [0, 8],
      [9, 17],
      [18, 26],
      [27, 35],
    ],
  },
  {
    name: "fixed:200:50",
    rate: "1.1%",
    note: "Overlap: one chunk now holds the whole answer.",
    chunks: [
      [0, 8],
      [7, 15],
      [14, 22],
      [21, 29],
      [28, 35],
    ],
  },
  {
    name: "sentence:10:2",
    rate: "0.0%",
    note: "Cuts follow sentence ends, so the answer stays whole.",
    chunks: [
      [0, 6],
      [7, 13],
      [14, 23],
      [24, 30],
      [31, 35],
    ],
  },
];

/** Shows where each strategy cuts the text and whether the answer survives in one chunk. */
export const ChunkSplitViz = () => {
  const step = useTick(3200) % SPLITS.length;
  const current = SPLITS[step];
  const whole = current.chunks.some(([from, to]) => from <= ANSWER.from && to >= ANSWER.to);
  const tone = whole ? "text-emerald-400" : "text-red-400";

  return (
    <Frame title="chunkaudit · where the cut lands" source="SQuAD v1.1 · 10,570 questions">
      <div className="flex items-baseline justify-between">
        <p className="site-mono text-[3.2cqw] text-white">{current.name}</p>
        <p className={`text-[6.5cqw] font-bold leading-none tabular-nums transition-colors duration-500 ${tone}`}>
          {current.rate}
          <span className="ml-[1cqw] text-[1.8cqw] font-normal text-white/50">answers cut in two</span>
        </p>
      </div>

      {/* The document: one block per word, the answer in white */}
      <div className="mt-[4cqw] flex gap-[0.45cqw]">
        {Array.from({ length: WORDS }, (_, position) => {
          const inAnswer = position >= ANSWER.from && position <= ANSWER.to;
          return (
            <span
              key={position}
              className={`h-[3.4cqw] grow rounded-[0.4cqw] ${inAnswer ? "bg-white" : "bg-white/15"}`}
            />
          );
        })}
      </div>
      <p className="site-mono mt-[1cqw] text-[1.6cqw] text-white/45" style={{ marginLeft: `${(ANSWER.from / WORDS) * 100}%` }}>
        ↑ the sentence that answers the question
      </p>

      {/* The chunks this strategy produces */}
      <div className="relative mt-[2.5cqw] h-[15cqw]">
        {current.chunks.map(([from, to], position) => {
          const holds = from <= ANSWER.from && to >= ANSWER.to;
          const cuts = !holds && to >= ANSWER.from && from <= ANSWER.to;
          return (
            <span
              key={`${step}-${position}`}
              className={`reel-fade absolute h-[3cqw] rounded-[0.6cqw] border ${
                holds
                  ? "border-emerald-400 bg-emerald-400/25"
                  : cuts
                    ? "border-red-400 bg-red-400/25"
                    : "border-white/25 bg-white/5"
              }`}
              style={{
                left: `${(from / WORDS) * 100}%`,
                width: `${((to - from + 1) / WORDS) * 100}%`,
                top: `${(position % 3) * 4.2}cqw`,
                animationDelay: `${position * 120}ms`,
              }}
            />
          );
        })}
      </div>
      <p className="absolute bottom-0 left-0 text-[2.1cqw] text-white/70">{current.note}</p>
    </Frame>
  );
};

/* ---------------------------------------------------------------- chunkaudit, 2 of 2 */

const RECALL: { name: string; bm25: number; dense: number }[] = [
  { name: "sentence:10:2", bm25: 92.5, dense: 79.7 },
  { name: "paragraph:200", bm25: 91.6, dense: 84.0 },
  { name: "recursive:200", bm25: 91.3, dense: 83.5 },
  { name: "fixed:200:50", bm25: 90.2, dense: 78.9 },
  { name: "fixed:400", bm25: 87.5, dense: 62.7 },
  { name: "fixed:200", bm25: 78.7, dense: 68.7 },
  { name: "fixed:100", bm25: 62.6, dense: 57.4 },
];

/** Recall@5 per strategy, switching between the two retrievers so the reordering is visible. */
export const RecallBarsViz = () => {
  const dense = useTick(3600) % 2 === 1;
  const values = RECALL.map((row) => (dense ? row.dense : row.bm25));
  const best = Math.max(...values);

  return (
    <Frame title="chunkaudit · Recall@5 by strategy" source="SQuAD v1.1">
      <div className="flex items-center gap-[1.5cqw]">
        {["BM25", "Embeddings (MiniLM)"].map((label, position) => (
          <span
            key={label}
            className={`site-mono rounded-full border px-[1.6cqw] py-[0.5cqw] text-[1.8cqw] transition-colors duration-500 ${
              (position === 1) === dense ? "border-white bg-white text-black" : "border-white/20 text-white/50"
            }`}
          >
            {label}
          </span>
        ))}
        <span className="ml-auto text-[1.8cqw] text-white/55">The best strategy depends on the retriever.</span>
      </div>
      <div className="mt-[2.6cqw] space-y-[1.15cqw]">
        {RECALL.map((row, position) => {
          const value = values[position];
          return (
            <div key={row.name} className="flex items-center gap-[1.5cqw]">
              <span className="site-mono w-[21cqw] shrink-0 text-[1.9cqw] text-white/75">{row.name}</span>
              <span className="relative h-[2.9cqw] grow overflow-hidden rounded-[0.5cqw] bg-white/[0.07]">
                <span
                  className={`absolute inset-y-0 left-0 rounded-[0.5cqw] transition-[width,background-color] duration-[1100ms] ease-out ${
                    value === best ? "bg-red-500" : "bg-white/55"
                  }`}
                  style={{ width: `${value}%` }}
                />
              </span>
              <span className="w-[8cqw] shrink-0 text-right text-[2.1cqw] tabular-nums text-white">{value.toFixed(1)}</span>
            </div>
          );
        })}
      </div>
    </Frame>
  );
};

/* ------------------------------------------------------------------- ragbench, 1 of 2 */

const COMMAND = "ragbench data/scifact --format table";
const TABLE = [
  "retriever    hit@1  recall@5    mrr  ndcg@10  latency (ms)",
  "-----------  -----  --------  -----  -------  ------------",
  "bm25         0.527     0.698  0.611    0.647          0.09",
  "tfidf        0.463     0.703  0.570    0.612          0.07",
  "hybrid_rrf   0.493     0.702  0.593    0.635          0.64",
];

/** The benchmark run as you would see it in a terminal: the command types, then rows arrive. */
export const TerminalViz = () => {
  const total = COMMAND.length + TABLE.length * 6 + 26;
  const tick = useTick(70) % total;
  const typed = COMMAND.slice(0, Math.min(tick, COMMAND.length));
  const rows = Math.max(0, Math.floor((tick - COMMAND.length - 6) / 6));

  return (
    <Frame title="ragbench · a benchmark run" source="BEIR SciFact · 5,183 docs · 300 queries">
      <div className="site-mono h-full rounded-[1cqw] border border-white/10 bg-black/70 p-[2.6cqw] text-[1.72cqw] leading-[1.75]">
        <div className="mb-[1.6cqw] flex gap-[0.8cqw]">
          <span className="h-[1.3cqw] w-[1.3cqw] rounded-full bg-red-400" />
          <span className="h-[1.3cqw] w-[1.3cqw] rounded-full bg-yellow-400" />
          <span className="h-[1.3cqw] w-[1.3cqw] rounded-full bg-emerald-400" />
        </div>
        <p className="text-white">
          <span className="text-emerald-400">$ </span>
          {typed}
          {tick < COMMAND.length + 6 && <span className="type-caret" />}
        </p>
        <pre className="site-mono mt-[1.2cqw] whitespace-pre text-white/80">
          {TABLE.slice(0, rows).map((line, position) => (
            <span key={line} className={`block ${position === 2 ? "text-emerald-300" : ""}`}>
              {line}
            </span>
          ))}
        </pre>
        {rows >= TABLE.length && (
          <p className="reel-fade mt-[1.4cqw] text-white/55">BM25 ranks best on nDCG@10 (0.647).</p>
        )}
      </div>
    </Frame>
  );
};

/* ------------------------------------------------------------------- ragbench, 2 of 2 */

const GAINS = [
  { label: "TF-IDF query time", before: "216.43 ms", after: "0.22 ms", ratio: 0.22 / 216.43, note: "about 980× faster" },
  { label: "Peak indexing memory", before: "4,142 MB", after: "123 MB", ratio: 123 / 4142, note: "about 34× smaller" },
];

/** Before and after the inverted index: the bars shrink to the measured values, then reset. */
export const SpeedupViz = () => {
  const after = useTick(2600) % 2 === 1;

  return (
    <Frame title="ragbench · dense matrix → inverted index" source="BEIR SciFact">
      <div className="flex h-full flex-col justify-center gap-[4.5cqw]">
        {GAINS.map((gain) => (
          <div key={gain.label}>
            <div className="flex items-baseline justify-between">
              <p className="text-[2.3cqw] text-white/75">{gain.label}</p>
              <p className="text-[5.4cqw] font-bold leading-none tabular-nums text-white">
                {after ? gain.after : gain.before}
              </p>
            </div>
            <div className="mt-[1.4cqw] h-[3.2cqw] overflow-hidden rounded-[0.6cqw] bg-white/[0.07]">
              <div
                className={`h-full rounded-[0.6cqw] transition-[width,background-color] duration-[1300ms] ease-out ${
                  after ? "bg-emerald-400" : "bg-red-500"
                }`}
                style={{ width: `${after ? Math.max(gain.ratio * 100, 0.8) : 100}%` }}
              />
            </div>
            <p className={`site-mono mt-[1cqw] text-[1.8cqw] transition-opacity duration-700 ${after ? "opacity-100 text-emerald-300" : "opacity-0"}`}>
              {gain.note}
            </p>
          </div>
        ))}
      </div>
    </Frame>
  );
};
