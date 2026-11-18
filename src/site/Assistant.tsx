import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";

import { experiencesData, projectsData } from "../data/info";
import { POSTS } from "./posts";

const EMAIL = "vishalkrishnakkr@gmail.com";
const RESUME_URL = "/vishal_krishna_kumar_resume.pdf";
const GITHUB_URL = "https://github.com/Vishal-Krishna-Kumar";
const LINKEDIN_URL = "https://www.linkedin.com/in/vishal-krishna-kumar-65583a201/";

// The assistant on the site. Questions go to the site's own chat endpoint, which answers with
// a language model that has been given Vishal's background. If that endpoint is unavailable the
// assistant falls back to fixed answers built from the same data the pages show, so it always
// replies and never invents anything. "Connect" opens a short form that writes an email.

const clean = (title: string) => title.replace(/^\[\d+\]\s*/, "");
const firstSentence = (text: string) => text.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? text;

/* ------------------------------------------------------------------ text formatting */

/** Bold, code, links and bare addresses inside one line of an answer. */
function inline(text: string, keyBase: string): ReactNode[] {
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\)|https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+\.[\w.]+)/g;
  return text.split(pattern).map((piece, position) => {
    const key = `${keyBase}-${position}`;
    if (!piece) return null;
    if (piece.startsWith("**")) return <strong key={key} className="font-semibold text-white">{piece.slice(2, -2)}</strong>;
    if (piece.startsWith("`")) return <code key={key} className="site-mono rounded bg-white/10 px-1 text-[0.92em]">{piece.slice(1, -1)}</code>;
    const link = piece.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    const href = link ? link[2] : /^https?:\/\//.test(piece) ? piece.replace(/[.,;]+$/, "") : piece.includes("@") ? `mailto:${piece}` : "";
    if (href) {
      const internal = href.startsWith("#") || href.startsWith("/");
      return (
        <a
          key={key}
          href={href}
          {...(internal || href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
          className="text-red-400 underline underline-offset-4 hover:text-red-300 break-words"
        >
          {link ? link[1] : piece.replace(/^https?:\/\/(www\.)?/, "").replace(/[.,;]+$/, "")}
        </a>
      );
    }
    return <span key={key}>{piece}</span>;
  });
}

/** Turns an answer written with simple markdown (paragraphs, bullets, headings) into tidy blocks. */
const Formatted = ({ text }: { text: string }) => {
  const blocks: ReactNode[] = [];
  let list: string[] = [];
  const flush = () => {
    if (list.length === 0) return;
    const items = list;
    list = [];
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="space-y-1.5">
        {items.map((item, position) => (
          <li key={position} className="flex gap-2.5">
            <span className="mt-[0.62em] h-1 w-1 shrink-0 rounded-full bg-red-400" />
            <span>{inline(item, `li-${blocks.length}-${position}`)}</span>
          </li>
        ))}
      </ul>
    );
  };
  text.split("\n").forEach((raw) => {
    const line = raw.trim();
    const bullet = line.match(/^(?:[-*•]|\d+[.)])\s+(.*)$/);
    if (bullet) {
      list.push(bullet[1]);
      return;
    }
    flush();
    if (!line) return;
    const heading = line.match(/^#{1,4}\s+(.*)$/);
    blocks.push(
      heading ? (
        <p key={`h-${blocks.length}`} className="pt-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-white/55">
          {heading[1].replace(/\*\*/g, "")}
        </p>
      ) : (
        <p key={`p-${blocks.length}`}>{inline(line, `p-${blocks.length}`)}</p>
      )
    );
  });
  flush();
  return <div className="space-y-2.5">{blocks}</div>;
};

/** Writes an answer out a few characters at a time, the way a chat reply arrives. */
const Typed = ({ text, onStep }: { text: string; onStep: () => void }) => {
  const [shown, setShown] = useState(() =>
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? text.length : 0
  );
  useEffect(() => {
    if (shown >= text.length) return;
    const step = Math.max(3, Math.ceil(text.length / 140));
    const timer = window.setTimeout(() => {
      setShown((value) => Math.min(value + step, text.length));
      onStep();
    }, 18);
    return () => window.clearTimeout(timer);
  }, [shown, text, onStep]);
  return <Formatted text={text.slice(0, shown)} />;
};

/* ------------------------------------------------------------------ fixed answers (fallback) */

const jobs = experiencesData.filter((item) => item.kind !== "simulation");

const LOCAL: { label: string; match: RegExp; answer: () => string }[] = [
  {
    label: "Who built you?",
    match: /\b(who (built|build|made|make|created|create|developed|designed)|built (you|this)|made (you|this)|your (creator|developer|maker))\b/,
    answer: () =>
      "**Vishal Krishna Kumar** built this site and set me up as its assistant. I answer questions about his background, projects and experience from what he has published here.",
  },
  {
    label: "About",
    match: /\b(who|about|yourself|introduce|intro|summary|bio)\b/,
    answer: () =>
      "I am **Vishal Krishna Kumar**, an AI and software engineer in Seattle.\n\n- I build retrieval and RAG systems and measure whether they work\n- M.S. Computer Science (Data Science), City University of Seattle, graduating **June 2027**\n- Looking for new-grad software and ML roles from **July 2027**",
  },
  {
    label: "Experience",
    match: /\b(experience|work(ed|ing)?|job|intern|internship|hirello|role|career|recent)\b/,
    answer: () =>
      jobs
        .map(
          (item) =>
            `**${clean(item.title)}** (${item.date})\n${(item.achievements ?? [firstSentence(item.description)])
              .slice(0, 3)
              .map((line) => `- ${line}`)
              .join("\n")}`
        )
        .join("\n\n"),
  },
  {
    label: "Projects",
    match: /\b(projects?|built|build|portfolio|work samples?)\b/,
    answer: () =>
      `There are **${projectsData.length} projects** on this site:\n${projectsData
        .map((project) => `- ${clean(project.title)}`)
        .join("\n")}\n\nAsk about any one by name.`,
  },
  {
    label: "Skills",
    match: /\b(skills?|stack|tech|technolog|languages?|tools?|framework)\b/,
    answer: () =>
      "- **Languages:** Python, SQL, JavaScript, TypeScript, Java, Go, C++\n- **Machine learning:** PyTorch, TensorFlow, Hugging Face, scikit-learn\n- **LLM and RAG:** retrieval evaluation, LangChain, agents, Vertex AI (Gemini), Pinecone, FAISS, Neo4j\n- **Backend and data:** FastAPI, Node.js, SQLAlchemy, PostgreSQL, MySQL, MongoDB\n- **Frontend and cloud:** React, Vue 3, AWS, Azure, Docker, GitHub Actions",
  },
  {
    label: "Education",
    match: /\b(education|degree|university|college|school|study|studied|masters?|m\.?s\.?|b\.?tech|gpa)\b/,
    answer: () =>
      "- **M.S. Computer Science**, Data Science concentration, City University of Seattle (expected June 2027, GPA 3.9/4.0, Dean's Scholar)\n- **B.Tech Computer Science and Engineering**, SRM Institute of Science and Technology (October 2024)\n- Graduate coursework at Illinois Institute of Technology, January to May 2025, before I transferred\n- **Vice President, STC Tech Club** at CityU since August 2025",
  },
  {
    label: "Availability",
    match: /\b(availab|hire|hiring|start|when|open to|looking|relocat|location|where|based|seattle|remote)\b/,
    answer: () =>
      "I am looking for **new-grad software and machine learning engineering roles**, full-time from **July 2027**. I am based in Seattle and open to anywhere in the US.",
  },
  {
    label: "Writing",
    match: /\b(blog|writing|posts?|articles?|write-?ups?)\b/,
    answer: () =>
      `I have published **${POSTS.length} write-ups**. The newest:\n${POSTS.slice(0, 4)
        .map((post) => `- [${post.title}](#/blog/${post.slug})`)
        .join("\n")}\n\n[All posts](#/blog)`,
  },
  {
    label: "Resume",
    match: /\b(resume|cv|curriculum)\b/,
    answer: () => `Here is my [resume (PDF)](${RESUME_URL}).`,
  },
  {
    label: "Links",
    match: /\b(github|linkedin|links?|profile|social)\b/,
    answer: () => `- [GitHub](${GITHUB_URL})\n- [LinkedIn](${LINKEDIN_URL})\n- [Resume](${RESUME_URL})`,
  },
];

function localProject(question: string): string | null {
  const words = question.split(/[^a-z0-9]+/).filter((word) => word.length > 3);
  const skip = new Set(["project", "game", "system", "agent", "site", "with", "about", "tell", "what", "your", "open", "source", "style", "based", "vishal"]);
  for (const project of projectsData) {
    const title = clean(project.title).toLowerCase();
    if (words.some((word) => !skip.has(word) && title.includes(word))) {
      const repo = (project.links ?? []).find((link) => link.url.includes("github.com/Vishal-Krishna-Kumar"));
      const post = (project.links ?? []).find((link) => link.url.includes("/blog/"));
      const links = [
        repo ? `[GitHub](${repo.url})` : "",
        post ? `[Write-up](${post.url.replace("https://www.vishalkrishna.dev/blog/", "#/blog/").replace(/^\/#/, "#")})` : "",
      ].filter(Boolean);
      return `**${clean(project.title)}** (${project.date})\n\n${firstSentence(project.description)}${links.length ? `\n\n${links.join(" · ")}` : ""}`;
    }
  }
  return null;
}

function localReply(raw: string): string {
  const question = raw.toLowerCase();
  const builder = LOCAL[0];
  if (builder.match.test(question)) return builder.answer();
  const project = localProject(question);
  if (project) return project;
  const topic = LOCAL.slice(1).find((item) => item.match.test(question));
  if (topic) return topic.answer();
  if (/^(hi|hello|hey|yo|hola)\b/.test(question)) {
    return "Hi! Ask me about my experience, projects, skills or availability, or type **connect** to send me a message.";
  }
  return "I can tell you about my **background, experience, projects, skills, education, availability and writing**. Type **connect** to send me a message.";
}

const wantsToConnect = (text: string) =>
  /\b(connect|contact (you|him|vishal)|e-?mail (you|him|vishal)|send (a |an )?(mail|email|message)|reach (you|out|him)|get in touch|hire you|schedule|set up a call)\b/i.test(text);

/* ------------------------------------------------------------------ talking to the endpoint */

type Turn = { role: "user" | "model"; content: string };

async function askModel(message: string, history: Turn[]): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 25000);
    const response = await fetch("/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history: history.slice(-10) }),
      signal: controller.signal,
    });
    window.clearTimeout(timer);
    if (!response.ok) return null;
    const data = await response.json();
    return data && data.success && typeof data.answer === "string" && data.answer.trim() ? data.answer.trim() : null;
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ the window */

type Line =
  | { from: "user"; text: string }
  | { from: "bot"; text: string; typed?: boolean; form?: boolean };

const WELCOME: Line = {
  from: "bot",
  text: "Hi, I'm the assistant on **Vishal Krishna Kumar's** portfolio. Ask me anything about his experience, projects, skills or availability.",
};

const SUGGESTIONS = ["Who are you?", "Recent experience", "Best projects", "Skills", "Availability", "Connect"];

const ConnectForm = () => {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [note, setNote] = useState("");
  const field =
    "w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-[13px] text-white placeholder:text-white/35 focus:border-red-400 focus:outline-none";

  // Everything stays in the visitor's browser; the button opens their own mail app with the
  // message written out, and they press send there.
  const subject = `Hello from ${name || "your portfolio"}${from ? ` (${from})` : ""}`;
  const body = `Hi Vishal,\n\n${note || "I would like to connect."}\n\n${name}${from ? `\n${from}` : ""}\n\nSent from vishal-krishna.me`;
  const href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <div className="mt-3 space-y-2">
      <input className={field} placeholder="Your name" value={name} onChange={(event) => setName(event.target.value)} aria-label="Your name" />
      <input className={field} placeholder="Company or role (optional)" value={from} onChange={(event) => setFrom(event.target.value)} aria-label="Company or role" />
      <textarea className={`${field} h-20 resize-none`} placeholder="Your message" value={note} onChange={(event) => setNote(event.target.value)} aria-label="Your message" />
      <a href={href} className="inline-flex items-center gap-2 rounded-lg bg-red-500 px-3.5 py-2 text-[13px] font-semibold text-white hover:bg-red-400 transition-colors">
        Open email to Vishal ↗
      </a>
      <p className="text-[11px] text-white/40">Opens your mail app with this message filled in. Nothing is stored here.</p>
    </div>
  );
};

const Assistant = () => {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([WELCOME]);
  const [text, setText] = useState("");
  const [thinking, setThinking] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  const toBottom = () => {
    const element = scroller.current;
    if (element) element.scrollTop = element.scrollHeight;
  };

  useEffect(toBottom, [lines, thinking, open]);

  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const ask = async (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || thinking) return;
    const history: Turn[] = lines
      .slice(1)
      .map((line) => ({ role: line.from === "user" ? ("user" as const) : ("model" as const), content: line.text }));
    setLines((current) => [...current, { from: "user", text: trimmed }]);
    setText("");
    setThinking(true);

    let answer: Line;
    if (wantsToConnect(trimmed)) {
      await new Promise((resolve) => window.setTimeout(resolve, 600));
      answer = { from: "bot", text: "Happy to connect. Fill this in and I'll open an email to Vishal with it written out.", form: true };
    } else {
      // Always show the thinking dots for a moment, even when the reply is instant.
      const [reply] = await Promise.all([askModel(trimmed, history), new Promise((resolve) => window.setTimeout(resolve, 700))]);
      answer = { from: "bot", text: reply ?? localReply(trimmed), typed: true };
    }
    setThinking(false);
    setLines((current) => [...current, answer]);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    void ask(text);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close the assistant" : "Ask about Vishal"}
        aria-expanded={open}
        title={open ? "Close" : "Ask about me"}
        className="invertible site-mono group/ask fixed bottom-5 right-5 z-[65] flex h-12 items-center gap-2 rounded-full border border-white/20 bg-[#0a1b2e]/90 px-4 text-[13px] text-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.9)] backdrop-blur hover:border-red-400 transition-colors"
      >
        <span className="text-red-400">&gt;_</span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap transition-[max-width] duration-300 group-hover/ask:max-w-[8rem]">
          {open ? "Close" : "Ask about me"}
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Ask about Vishal"
          className="invertible assistant-in fixed bottom-20 right-5 z-[65] flex h-[min(38rem,calc(100vh-10rem))] w-[min(27rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#081726]/95 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.95)] backdrop-blur-xl"
        >
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-3">
            <button type="button" aria-label="Close" onClick={() => setOpen(false)} className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <p className="site-mono ml-2 text-[12px] text-white/55">vishal — assistant</p>
            <span className="ml-auto flex items-center gap-1.5 text-[11px] text-white/40">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              online
            </span>
          </div>

          <div ref={scroller} data-lenis-prevent className="assistant-scroll grow space-y-4 overflow-y-auto px-4 py-4 text-[13.5px] leading-relaxed">
            {lines.map((line, position) =>
              line.from === "user" ? (
                <div key={position} className="flex justify-end">
                  <p className="max-w-[85%] rounded-2xl rounded-br-md bg-white/10 px-3.5 py-2 text-white">{line.text}</p>
                </div>
              ) : (
                <div key={position} className="flex gap-2.5">
                  <span className="site-mono mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-red-500/15 text-[10px] font-bold text-red-400">VK</span>
                  <div className="min-w-0 grow text-white/80">
                    {line.typed && position === lines.length - 1 ? <Typed text={line.text} onStep={toBottom} /> : <Formatted text={line.text} />}
                    {line.form && <ConnectForm />}
                  </div>
                </div>
              )
            )}
            {thinking && (
              <div className="flex gap-2.5" aria-label="Thinking">
                <span className="site-mono mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-red-500/15 text-[10px] font-bold text-red-400">VK</span>
                <span className="assistant-dots flex items-center gap-1 pt-2">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
            )}
          </div>

          <div className="assistant-scroll flex gap-1.5 overflow-x-auto border-t border-white/10 px-3 py-2.5">
            {SUGGESTIONS.map((label) => (
              <button
                key={label}
                type="button"
                disabled={thinking}
                onClick={() => void ask(label)}
                className="shrink-0 rounded-full border border-white/15 px-3 py-1 text-[12px] text-white/70 hover:border-red-400 hover:text-white disabled:opacity-40 transition-colors"
              >
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="flex items-center gap-2 border-t border-white/10 px-4 py-3">
            <span className="site-mono text-[13px] text-red-400">❯</span>
            <input
              ref={input}
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder={thinking ? "Thinking…" : "Ask anything about Vishal"}
              aria-label="Your question"
              className="grow bg-transparent text-[13.5px] text-white placeholder:text-white/35 focus:outline-none"
            />
            <button
              type="submit"
              disabled={thinking || !text.trim()}
              aria-label="Send"
              className="grid h-7 w-7 place-items-center rounded-full bg-white text-black disabled:bg-white/15 disabled:text-white/40 transition-colors"
            >
              ↑
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Assistant;
