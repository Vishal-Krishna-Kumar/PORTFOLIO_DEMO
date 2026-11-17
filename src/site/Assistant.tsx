import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";

import { experiencesData, projectsData } from "../data/info";
import { POSTS } from "./posts";

const EMAIL = "vishalkrishnakkr@gmail.com";
const RESUME_URL = "/vishal_krishna_kumar_resume.pdf";
const GITHUB_URL = "https://github.com/Vishal-Krishna-Kumar";
const LINKEDIN_URL = "https://www.linkedin.com/in/vishal-krishna-kumar-65583a201/";

// A small assistant that answers questions about Vishal from the same data the site shows.
// It runs in the browser with fixed answers: nothing is sent to a server, and it never makes
// anything up. "Connect" collects a name and a note and opens the visitor's mail app with
// the message already written.

const clean = (title: string) => title.replace(/^\[\d+\]\s*/, "");
const firstSentence = (text: string) => text.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? text;

type Line = { from: "user" | "bot"; body: ReactNode };

const Link = ({ href, children }: { href: string; children: ReactNode }) => (
  <a
    href={href}
    {...(href.startsWith("#") || href.startsWith("/#") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
    className="text-red-400 underline underline-offset-4 hover:text-red-300"
  >
    {children}
  </a>
);

const jobs = experiencesData.filter((item) => item.kind !== "simulation");

const TOPICS: { label: string; match: RegExp; answer: () => ReactNode }[] = [
  {
    label: "About",
    match: /\b(who|about|yourself|introduce|intro|summary|bio)\b/,
    answer: () => (
      <>
        I am Vishal Krishna Kumar, an AI and software engineer in Seattle. I build retrieval and RAG
        systems and measure whether they work. I am finishing an M.S. in Computer Science (Data
        Science) at City University of Seattle, graduating June 2027.
      </>
    ),
  },
  {
    label: "Experience",
    match: /\b(experience|work(ed)?|job|intern|internship|hirello|role|career)\b/,
    answer: () => (
      <>
        {jobs.map((item) => (
          <span key={item.title} className="block mb-2">
            <span className="text-white">{clean(item.title)}</span>
            <span className="text-white/50"> · {item.date}</span>
            <br />
            {(item.achievements ?? [firstSentence(item.description)]).slice(0, 2).join(" ")}
          </span>
        ))}
      </>
    ),
  },
  {
    label: "Projects",
    match: /\b(projects?|built|build|portfolio|work samples?)\b/,
    answer: () => (
      <>
        {projectsData.length} projects are on this site:
        {projectsData.map((project) => (
          <span key={project.title} className="block">
            <span className="text-red-400">›</span> {clean(project.title)}
          </span>
        ))}
        <span className="block mt-2 text-white/50">Ask about any one by name, or open the Work section.</span>
      </>
    ),
  },
  {
    label: "Skills",
    match: /\b(skills?|stack|tech|technolog|languages?|tools?|framework)\b/,
    answer: () => (
      <>
        Languages: Python, JavaScript, TypeScript, Java, C++, SQL. Machine learning: PyTorch,
        TensorFlow, Hugging Face, scikit-learn. LLM and RAG: retrieval evaluation, agents, Vertex AI
        (Gemini), Pinecone, FAISS, Neo4j. Backend: FastAPI, SQLAlchemy, MySQL, PostgreSQL, Docker,
        AWS, GitHub Actions.
      </>
    ),
  },
  {
    label: "Education",
    match: /\b(education|degree|university|college|school|study|studied|masters?|m\.?s\.?|b\.?tech|gpa)\b/,
    answer: () => (
      <>
        M.S. Computer Science, Data Science concentration, City University of Seattle (expected June
        2027, Dean&apos;s Scholar). B.Tech Computer Science and Engineering, SRM Institute of Science
        and Technology.
      </>
    ),
  },
  {
    label: "Availability",
    match: /\b(availab|hire|hiring|start|when|open to|looking|relocat|location|where|based|seattle|remote)\b/,
    answer: () => (
      <>
        I am looking for new-grad software and machine learning engineering roles, full-time from July
        2027. I am based in Seattle and open to anywhere in the US.
      </>
    ),
  },
  {
    label: "Writing",
    match: /\b(blog|writing|posts?|articles?|write-?ups?)\b/,
    answer: () => (
      <>
        {POSTS.length} write-ups, newest first:
        {POSTS.slice(0, 4).map((post) => (
          <span key={post.slug} className="block">
            <span className="text-red-400">›</span> <Link href={`#/blog/${post.slug}`}>{post.title}</Link>
          </span>
        ))}
        <span className="block mt-1">
          <Link href="#/blog">All posts</Link>
        </span>
      </>
    ),
  },
  {
    label: "Resume",
    match: /\b(resume|cv|curriculum)\b/,
    answer: () => (
      <>
        Here it is: <Link href={RESUME_URL}>resume (PDF)</Link>.
      </>
    ),
  },
  {
    label: "Links",
    match: /\b(github|linkedin|links?|profile|social)\b/,
    answer: () => (
      <>
        <Link href={GITHUB_URL}>GitHub</Link> · <Link href={LINKEDIN_URL}>LinkedIn</Link> ·{" "}
        <Link href={RESUME_URL}>Resume</Link>
      </>
    ),
  },
];

/** Find a project the question names, by any distinctive word of its title. */
function projectAnswer(question: string): ReactNode | null {
  const words = question.split(/[^a-z0-9]+/).filter((word) => word.length > 3);
  const skip = new Set(["project", "game", "system", "agent", "site", "with", "about", "tell", "what", "your", "open", "source", "style", "based"]);
  for (const project of projectsData) {
    const title = clean(project.title).toLowerCase();
    if (words.some((word) => !skip.has(word) && title.includes(word))) {
      const repo = (project.links ?? []).find((link) => link.url.includes("github.com/Vishal-Krishna-Kumar"));
      const post = (project.links ?? []).find((link) => link.url.includes("/blog/"));
      return (
        <>
          <span className="text-white">{clean(project.title)}</span>
          <span className="text-white/50"> · {project.date}</span>
          <br />
          {firstSentence(project.description)}
          <span className="block mt-1">
            {repo && <Link href={repo.url}>GitHub</Link>}
            {repo && post && " · "}
            {post && (
              <Link href={post.url.replace("https://www.vishalkrishna.dev/blog/", "#/blog/").replace(/^\/#/, "#")}>
                Write-up
              </Link>
            )}
          </span>
        </>
      );
    }
  }
  return null;
}

function reply(raw: string): ReactNode | "connect" {
  const question = raw.toLowerCase();
  if (/\b(connect|contact|email|e-mail|mail|reach|message|talk|call|interview|get in touch)\b/.test(question)) {
    return "connect";
  }
  if (/^(hi|hello|hey|yo|hola)\b/.test(question)) {
    return <>Hi. Ask me about Vishal&apos;s experience, projects, skills or availability, or type &quot;connect&quot;.</>;
  }
  const project = projectAnswer(question);
  if (project) return project;
  const topic = TOPICS.find((item) => item.match.test(question));
  if (topic) return topic.answer();
  return (
    <>
      I only know what is on this site. Try: about, experience, projects, skills, education,
      availability, writing, resume, or &quot;connect&quot; to send Vishal a message.
    </>
  );
}

const WELCOME: Line = {
  from: "bot",
  body: (
    <>
      Hi, I answer questions about Vishal from what is on this site. Pick a topic below or type
      your own.
    </>
  ),
};

const ConnectForm = () => {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [note, setNote] = useState("");
  const field =
    "site-mono w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-[13px] text-white placeholder:text-white/35 focus:border-red-400 focus:outline-none";

  // Everything stays in the visitor's browser; the button opens their own mail app with the
  // message written out, and they press send there.
  const subject = `Hello from ${name || "your portfolio"}${from ? ` (${from})` : ""}`;
  const body = `Hi Vishal,\n\n${note || "I would like to connect."}\n\n${name}${from ? `\n${from}` : ""}\n\nSent from vishal-krishna.me`;
  const href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <div className="mt-2 space-y-2">
      <input className={field} placeholder="Your name" value={name} onChange={(event) => setName(event.target.value)} aria-label="Your name" />
      <input className={field} placeholder="Company or role (optional)" value={from} onChange={(event) => setFrom(event.target.value)} aria-label="Company or role" />
      <textarea className={`${field} h-20 resize-none`} placeholder="Your message" value={note} onChange={(event) => setNote(event.target.value)} aria-label="Your message" />
      <a
        href={href}
        className="site-mono inline-flex items-center gap-2 rounded-md bg-red-500 px-3.5 py-2 text-[13px] font-semibold text-white hover:bg-red-400 transition-colors"
      >
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
  const scroller = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [lines, open]);

  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const ask = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed) return;
    const answer = reply(trimmed);
    setLines((current) => [
      ...current,
      { from: "user", body: trimmed },
      {
        from: "bot",
        body:
          answer === "connect" ? (
            <>
              Happy to connect. Fill this in and I will open an email to Vishal with it written out.
              <ConnectForm />
            </>
          ) : (
            answer
          ),
      },
    ]);
    setText("");
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    ask(text);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close the assistant" : "Ask about Vishal"}
        aria-expanded={open}
        title={open ? "Close" : "Ask about me"}
        className="invertible site-mono group/ask fixed bottom-5 right-5 z-[65] flex h-12 items-center gap-2 rounded-full border border-white/20 bg-[#101010]/90 px-4 text-[13px] text-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.9)] backdrop-blur hover:border-red-400 transition-colors"
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
          className="invertible assistant-in fixed bottom-20 right-5 z-[65] flex h-[min(34rem,calc(100vh-7rem))] w-[min(26rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0d0d0f]/95 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.95)] backdrop-blur-xl"
        >
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-3">
            <button type="button" aria-label="Close" onClick={() => setOpen(false)} className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <p className="site-mono ml-2 text-[12px] text-white/55">vishal — assistant</p>
          </div>

          <div ref={scroller} data-lenis-prevent className="site-mono grow space-y-3 overflow-y-auto px-4 py-4 text-[13px] leading-relaxed">
            {lines.map((line, position) =>
              line.from === "user" ? (
                <p key={position} className="text-white">
                  <span className="text-red-400">❯ </span>
                  {line.body}
                </p>
              ) : (
                <div key={position} className="text-white/75">
                  {line.body}
                </div>
              )
            )}
          </div>

          <div className="flex gap-1.5 overflow-x-auto border-t border-white/10 px-3 py-2.5">
            {[...TOPICS.slice(0, 6).map((topic) => topic.label), "Connect"].map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => ask(label)}
                className="site-mono shrink-0 rounded-full border border-white/15 px-3 py-1 text-[12px] text-white/70 hover:border-red-400 hover:text-white transition-colors"
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
              placeholder="Ask about experience, projects, skills…"
              aria-label="Your question"
              className="site-mono grow bg-transparent text-[13px] text-white placeholder:text-white/35 focus:outline-none"
            />
            <button type="submit" className="site-mono text-[12px] text-white/50 hover:text-white">
              Enter ↵
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Assistant;
