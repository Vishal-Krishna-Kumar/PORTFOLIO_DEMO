import { useEffect, useState } from "react";

interface WritingWindowProps {
  isDark: boolean;
  /** The full-screen version shows summaries and key results as well. */
  expanded?: boolean;
}

interface Post {
  title: string;
  url: string;
  date: string;
  minutes: number;
  summary: string;
}

interface Repo {
  name: string;
  tagline: string;
  result: string;
  language: string;
}

interface RepoStats {
  stars: number;
  forks: number;
  pushedAt: string;
}

const BLOG_URL = "/#/blog";

const POSTS: Post[] = [
  {
    title: "The best chunk size depends on your retriever",
    url: `${BLOG_URL}/chunk-size-depends-on-retriever`,
    date: "Nov 16, 2026",
    minutes: 4,
    summary:
      "The same chunking audit with an embedding model instead of BM25: the strategy that ranked first fell to fifth.",
  },
  {
    title: "How often does chunking cut the answer in half?",
    url: `${BLOG_URL}/chunking-cuts-the-answer`,
    date: "Nov 14, 2026",
    minutes: 5,
    summary:
      "Nine chunking strategies audited on 10,570 SQuAD questions. Fixed 200-word chunks split the answering sentence 14.1% of the time.",
  },
  {
    title: "From 216 ms to 0.22 ms per query: an inverted index in NumPy",
    url: `${BLOG_URL}/inverted-index-in-numpy`,
    date: "Nov 14, 2026",
    minutes: 4,
    summary:
      "Same rankings, nearly 1,000 times faster, and indexing memory down from 4.1 GB to 123 MB.",
  },
];

const REPOS: Repo[] = [
  {
    name: "chunkaudit",
    tagline: "Audits RAG chunking strategies",
    result: "10,570 questions audited, 83 tests",
    language: "Python",
  },
  {
    name: "ragbench",
    tagline: "Retrieval benchmarking for RAG",
    result: "BM25 nDCG@10 0.647 on SciFact",
    language: "Python",
  },
];

const OWNER = "Vishal-Krishna-Kumar";
const CACHE_KEY = "repo-stats-v1";
const CACHE_MS = 30 * 60 * 1000;

/** "3 days ago" style label for a date string. */
function timeAgo(iso: string): string {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (Number.isNaN(days)) return "";
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? "a month ago" : `${months} months ago`;
}

/** Live numbers from GitHub's public API. No key is needed; failures simply hide the numbers. */
function useRepoStats(): Record<string, RepoStats> {
  const [stats, setStats] = useState<Record<string, RepoStats>>({});

  useEffect(() => {
    let cancelled = false;

    try {
      const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) ?? "null");
      if (cached && Date.now() - cached.at < CACHE_MS) {
        setStats(cached.stats);
        return;
      }
    } catch {
      // ignore a broken cache entry
    }

    Promise.all(
      REPOS.map(async (repo) => {
        const response = await fetch(`https://api.github.com/repos/${OWNER}/${repo.name}`);
        if (!response.ok) throw new Error(String(response.status));
        const data = await response.json();
        return [
          repo.name,
          { stars: data.stargazers_count, forks: data.forks_count, pushedAt: data.pushed_at },
        ] as const;
      })
    )
      .then((entries) => {
        if (cancelled) return;
        const next = Object.fromEntries(entries);
        setStats(next);
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), stats: next }));
        } catch {
          // storage can be unavailable in private windows
        }
      })
      .catch(() => {
        // rate limited or offline: the window still works without live numbers
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return stats;
}

const WritingWindow = ({ isDark, expanded = false }: WritingWindowProps) => {
  const stats = useRepoStats();

  const panelBg = isDark ? "bg-[#0c0c0f]" : "bg-white";
  const border = isDark ? "border border-gray-800" : "border border-gray-200";
  const heading = isDark ? "text-white" : "text-gray-900";
  const subtext = isDark ? "text-gray-400" : "text-gray-600";
  const accent = isDark ? "text-blue-300" : "text-[#2A8EE0]";
  const card = isDark
    ? "border border-gray-800 hover:border-blue-400/60 bg-white/[0.02]"
    : "border border-gray-200 hover:border-blue-400 bg-gray-50";

  return (
    <div
      className={`h-full flex flex-col ${panelBg} ${border} rounded-xl p-4 gap-3 shadow-inner`}
      onClick={(event) => event.stopPropagation()}
    >
      <div className="flex-1 min-h-0 overflow-y-auto pr-1">
        <p className={`text-sm font-semibold mb-2 ${accent}`}>$ ls writing/</p>
        <ul className="space-y-2 mb-4">
          {POSTS.map((post) => (
            <li key={post.url}>
              <a href={post.url} target="_blank" rel="noopener noreferrer" className="group block">
                <p
                  className={`text-sm font-semibold leading-snug ${heading} group-hover:underline underline-offset-2`}
                >
                  {post.title}
                </p>
                <p className={`text-xs ${subtext}`}>
                  {post.date} · {post.minutes} min read
                </p>
                {expanded && <p className={`text-sm mt-1 ${subtext}`}>{post.summary}</p>}
              </a>
            </li>
          ))}
        </ul>

        <p className={`text-sm font-semibold mb-2 ${accent}`}>$ ls open-source/</p>
        <div className={`grid gap-2 ${expanded ? "sm:grid-cols-2" : ""}`}>
          {REPOS.map((repo) => {
            const live = stats[repo.name];
            return (
              <a
                key={repo.name}
                href={`https://github.com/${OWNER}/${repo.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`block rounded-lg px-3 py-2 transition-colors ${card}`}
              >
                <p className={`text-sm font-semibold ${heading}`}>
                  {repo.name}
                  <span className={`ml-2 text-xs font-normal ${subtext}`}>{repo.language}</span>
                </p>
                <p className={`text-xs ${subtext}`}>{repo.tagline}</p>
                <p className="text-xs text-green-500 mt-0.5">{repo.result}</p>
                {live && (
                  <p className={`text-[11px] mt-1 ${subtext}`}>
                    ★ {live.stars} · ⑂ {live.forks} · updated {timeAgo(live.pushedAt)}
                  </p>
                )}
              </a>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center shrink-0">
        <a
          href={BLOG_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm shadow transition-colors"
        >
          Read the blog →
        </a>
      </div>
    </div>
  );
};

export default WritingWindow;
