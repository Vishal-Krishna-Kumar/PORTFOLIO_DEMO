import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

import { experiencesData, projectsData } from "../data/info";
import type { Experience, Project } from "../types/indexs";
import { POSTS, formatDate } from "./posts";
import { ProjectDetail, cardClips, clean, firstSentence, mainLinks } from "./Projects";
import { Reel, useOnScreen } from "./Reel";
import {
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  Page,
  RESUME_URL,
  SectionLabel,
  goToSection,
} from "./Shell";
import { useTheme } from "./theme";

const SKILLS: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "JavaScript", "TypeScript", "Java", "C++", "SQL"] },
  {
    group: "Machine learning",
    items: ["PyTorch", "TensorFlow", "Keras", "Hugging Face", "scikit-learn", "OpenCV", "pandas", "NumPy"],
  },
  {
    group: "LLM and RAG",
    items: ["RAG", "Retrieval evaluation", "Agents", "Vertex AI (Gemini)", "Pinecone", "FAISS", "Neo4j"],
  },
  {
    group: "Backend and tooling",
    items: ["FastAPI", "SQLAlchemy", "MySQL", "PostgreSQL", "REST APIs", "OAuth 2.0", "Docker", "AWS", "GitHub Actions"],
  },
];

const STATEMENT =
  "I like questions that can be settled by measuring. So I build the retrieval system, and then the benchmark that tells me whether it works.";

const SECTION = "relative bg-[#080808]/90 text-[#F1F0EC]";
const WRAP = "px-[6vw] py-24 md:py-32";

function useLeetCodeTotal(): number | null {
  const [total, setTotal] = useState<number | null>(null);
  useEffect(() => {
    let cancelled = false;
    fetch("/api/leetcode")
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (!cancelled && data && typeof data.totalSolved === "number") setTotal(data.totalSolved);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);
  return total;
}

/** Fades blocks in as they scroll into view. */
function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".sr");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("in"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

/** Runs a callback on scroll and resize, at most once per frame. */
function useOnScroll(callback: () => void) {
  const saved = useRef(callback);
  saved.current = callback;
  useEffect(() => {
    let frame = 0;
    const run = () => {
      frame = 0;
      saved.current();
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(run);
    };
    saved.current();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, []);
}

/** Counts up to a number once, easing out. */
const CountUp = ({ to }: { to: number }) => {
  const [value, setValue] = useState(to);
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / 1500, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [to]);
  return <>{value.toLocaleString("en-US")}</>;
};

/** True once the loading screen has played; it plays once per page load, not on every return to the home page. */
let introPlayed = false;
const STAIRS = 5;
const LOAD_MS = 2400;

/**
 * Loading screen: a counter and a thin bar fill up, then five black columns rise over the
 * screen one after another and drop away again to reveal the page.
 */
const Preloader = () => {
  const [show] = useState(() => {
    if (introPlayed) return false;
    try {
      return !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    } catch {
      return false;
    }
  });
  const [percent, setPercent] = useState(0);
  const [phase, setPhase] = useState<"loading" | "cover" | "reveal" | "done">("loading");

  useEffect(() => {
    if (!show) return;
    introPlayed = true;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const start = Date.now();
    const timer = window.setInterval(() => {
      setPercent(Math.min(Math.floor(((Date.now() - start) / LOAD_MS) * 100), 100));
    }, 50);
    // Columns rise (cover), the counter is removed behind them, then they fall (reveal).
    const cover = window.setTimeout(() => setPhase("cover"), LOAD_MS + 300);
    const reveal = window.setTimeout(() => setPhase("reveal"), LOAD_MS + 300 + 850);
    const done = window.setTimeout(() => setPhase("done"), LOAD_MS + 300 + 850 + 950);
    return () => {
      window.clearInterval(timer);
      window.clearTimeout(cover);
      window.clearTimeout(reveal);
      window.clearTimeout(done);
      document.documentElement.style.overflow = previous;
    };
  }, [show]);

  useEffect(() => {
    if (phase === "done") document.documentElement.style.overflow = "";
  }, [phase]);

  if (!show || phase === "done") return null;
  // Rendered on the body so the theme's colour filter cannot move or recolour it.
  return createPortal(
    <div className="clean-site">
    <div className="ink-preloader fixed inset-0 z-[9998] overflow-hidden" data-phase={phase} aria-hidden="true">
      {phase !== "reveal" && (
        <div className="absolute inset-0 bg-black text-[#F1F0EC]">
          <p className="ink-label absolute left-[6vw] top-7 text-white/60">Vishal Krishna Kumar</p>
          <p className="ink-label absolute right-[6vw] top-7 text-white/40">Portfolio · 2026</p>
          <p className="ink-percent absolute bottom-4 right-8 max-md:right-6 max-sm:right-4 leading-none text-white/75 tabular-nums">
            {percent}%
          </p>
          <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white/10">
            <div className="h-full bg-white/70" style={{ width: `${percent}%` }} />
          </div>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 flex">
        {Array.from({ length: STAIRS }, (_, position) => (
          <span key={position} className="ink-stair" style={{ transitionDelay: `${position * 55}ms` }} />
        ))}
      </div>
    </div>
    </div>,
    document.body
  );
};

/** A paragraph whose words light up one by one as it scrolls through the screen. */
const ScrollStatement = ({ text }: { text: string }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useOnScroll(() => {
    const element = ref.current;
    if (!element) return;
    const box = element.getBoundingClientRect();
    const start = window.innerHeight * 0.85;
    const progress = Math.min(Math.max((start - box.top) / (box.height + window.innerHeight * 0.35), 0), 1);
    const spans = element.children;
    for (let position = 0; position < spans.length; position += 1) {
      const local = Math.min(Math.max(progress * (spans.length + 3) - position, 0), 1);
      const span = spans[position] as HTMLElement;
      span.style.opacity = String(0.14 + local * 0.86);
      span.style.filter = `blur(${((1 - local) * 5).toFixed(1)}px)`;
    }
  });

  return (
    <p ref={ref} className="ink-statement max-w-[1100px]" aria-label={text}>
      {words.map((word, position) => (
        <span key={`${word}-${position}`} aria-hidden="true" className="inline-block mr-[0.26em] will-change-[opacity,filter]">
          {word}
        </span>
      ))}
    </p>
  );
};

const ExperienceRow = ({
  item,
  index,
  open,
  onToggle,
}: {
  item: Experience;
  index: number;
  open: boolean;
  onToggle: () => void;
}) => (
  <li className="ink-row" data-open={open}>
    <button
      onClick={onToggle}
      aria-expanded={open}
      className="group w-full grid grid-cols-12 gap-x-4 gap-y-1 items-baseline py-7 text-left"
    >
      <span className="ink-label col-span-12 md:col-span-1 text-red-500">{String(index + 1).padStart(2, "0")}</span>
      <span className="col-span-12 md:col-span-6 text-2xl md:text-[2rem] tracking-[-0.035em] text-[#F1F0EC] group-hover:translate-x-2 transition-transform duration-500">
        {clean(item.title)}
      </span>
      <span className="col-span-8 md:col-span-3 text-sm text-white/55">{item.window}</span>
      <span className="ink-label col-span-4 md:col-span-2 text-right text-white/45">
        {item.date} <span className="ml-2 text-white/70">{open ? "–" : "+"}</span>
      </span>
    </button>
    {open && (
      <div className="detail-in grid grid-cols-12 gap-4 pb-9">
        <div className="col-span-12 md:col-start-2 md:col-span-7">
          {item.achievements && item.achievements.length > 0 ? (
            <ul className="space-y-2.5 text-[15px] leading-relaxed text-white/70">
              {item.achievements.map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-[0.7em] h-px w-4 shrink-0 bg-red-500/70" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[15px] leading-relaxed text-white/70">{item.description}</p>
          )}
        </div>
        {item.technologies && (
          <p className="ink-label col-span-12 md:col-span-4 leading-[2.1] text-white/40">
            {item.technologies.join(" / ")}
          </p>
        )}
      </div>
    )}
  </li>
);

/** One full-height panel of the work section. */
const WorkPanel = ({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) => {
  const { ref, visible } = useOnScreen<HTMLDivElement>(0.3);
  const clips = cardClips(project);
  const cover = clips.find((clip) => clip.kind === "image")?.src;
  const number = String(index + 1).padStart(2, "0");
  const full = clean(project.title).replace(/\s*\((open source|research in progress)\)$/i, "");
  // "chunkaudit — Auditing RAG Chunking" shows as the name, with the rest as a subtitle.
  const [title, tagline] = full.includes(" — ") ? full.split(" — ") : [full, ""];

  return (
    <article
      className="ink-panel group"
      data-cursor="Open"
      role="button"
      tabIndex={0}
      aria-label={`Open project: ${title}`}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen();
        }
      }}
    >
      {/* Blurred wash of the project's own image, for colour */}
      {cover && (
        <img
          src={cover}
          alt=""
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover scale-125 blur-3xl opacity-25 pointer-events-none"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/55 to-[#080808]/30 pointer-events-none" />
      <span className="ink-display ink-ghost absolute -bottom-[0.06em] right-[2vw] select-none pointer-events-none" aria-hidden="true">
        {number}
      </span>

      <div className="ink-panel-body relative h-full px-[6vw] md:px-[4vw] pt-10 md:pt-24 pb-12 md:pb-[7vh]">
        {/* Text: number, name, one line on what it is, and the links that matter */}
        <div className="ink-panel-text flex flex-col">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-3">
              <span className="h-px w-7 bg-red-500/70" />
              <span className="ink-label text-red-500">{number}</span>
            </span>
            <span className="ink-label text-white/45">{project.date}</span>
          </div>

          <div className="mt-8 md:mt-auto">
            <p className="ink-label text-white/50">
              {project.category ?? "Project"} / {tagline || project.window}
            </p>
            <h3 className={`ink-display ink-panel-title mt-4 text-[#F1F0EC] ${title.length > 24 ? "ink-panel-title-long" : ""}`}>{title}</h3>
            <p className="mt-5 max-w-[520px] text-sm md:text-[15px] leading-relaxed text-white/60">
              {firstSentence(project.description)}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              <span className="ink-label rounded-full bg-white px-4 py-2 text-black">Open project →</span>
              {mainLinks(project).map((link) => (
                <a
                  key={link.url}
                  href={link.href}
                  title={link.name}
                  onClick={(event) => event.stopPropagation()}
                  {...(link.internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                  className="ink-label rounded-full border border-white/25 px-4 py-2 text-white/85 hover:border-red-500 hover:bg-red-500 hover:text-white transition-colors"
                >
                  {link.kind} ↗
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Media fills the rest of the panel */}
        <div className="ink-panel-stage">
          <div
            ref={ref}
            className="ink-panel-media relative overflow-hidden rounded-lg border border-white/10 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] transition-transform duration-700 group-hover:scale-[1.015]"
          >
            {clips.length > 0 ? (
              <Reel clips={clips} variant="card" active={visible} />
            ) : (
              <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_30%_20%,rgba(239,43,43,0.35),transparent_60%)]">
                <span className="ink-display text-3xl text-white/70 px-6 text-center">{title}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

/** Work: on large screens the page pins and the panels move sideways as you scroll. */
const WorkSection = ({ onOpen }: { onOpen: (project: Project) => void }) => {
  const outer = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useOnScroll(() => {
    const section = outer.current;
    const strip = track.current;
    if (!section || !strip) return;
    const sideways = window.matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)").matches;
    if (!sideways) {
      section.style.height = "";
      strip.style.transform = "";
      return;
    }
    const distance = Math.max(strip.scrollWidth - window.innerWidth, 0);
    // The strip moves faster than the page scrolls, so ten panels do not take forever.
    const travel = distance * 0.55;
    const height = `${Math.round(window.innerHeight + travel)}px`;
    if (section.style.height !== height) section.style.height = height;
    const progress = travel ? Math.min(Math.max(-section.getBoundingClientRect().top / travel, 0), 1) : 0;
    strip.style.transform = `translate3d(${(-progress * distance).toFixed(1)}px, 0, 0)`;
    if (bar.current) bar.current.style.transform = `scaleX(${progress.toFixed(4)})`;
  });

  return (
    <section id="projects" ref={outer} className="relative bg-[#080808] text-[#F1F0EC]">
      <div className="ink-pin">
        <div ref={track} className="ink-track">
          <div className="ink-panel ink-panel-intro !cursor-default flex flex-col justify-between px-[6vw] pt-24 pb-12 md:pb-[7vh]">
            <SectionLabel index="03">Work</SectionLabel>
            <div className="mt-16 md:mt-0">
              <h2 className="ink-statement">
                A few things I <em>built,</em> and what the numbers <em>said.</em>
              </h2>
              <p className="mt-8 max-w-[440px] text-sm leading-relaxed text-white/55">
                {projectsData.length} projects, from open-source retrieval tools to medical imaging and a
                3D site. Open any one for the videos, results and code.
              </p>
              <p className="ink-label mt-10 hidden min-[900px]:block text-white/40">Keep scrolling →</p>
            </div>
          </div>
          {projectsData.map((project, position) => (
            <WorkPanel key={project.title} project={project} index={position} onOpen={() => onOpen(project)} />
          ))}
        </div>
        <span className="hidden min-[900px]:block absolute left-0 bottom-0 h-0.5 w-full bg-white/10">
          <span ref={bar} className="block h-full w-full origin-left scale-x-0 bg-red-500" />
        </span>
      </div>
    </section>
  );
};

const Fact = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="border-t border-white/10 pt-3">
    <p className="ink-label text-white/40">{label}</p>
    <p className="mt-1.5 text-sm text-white/80">{children}</p>
  </div>
);

const Home = () => {
  const leetcode = useLeetCodeTotal();
  const theme = useTheme();
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [openJob, setOpenJob] = useState(0);
  useScrollReveal();

  const jobs = experiencesData.filter((item) => item.kind !== "simulation");
  const simulations = experiencesData.filter((item) => item.kind === "simulation");

  useEffect(() => {
    document.title = "Vishal Krishna Kumar | AI and Software Engineer";
  }, []);

  const stats: { value: number | string; label: string }[] = [
    { value: 10570, label: "questions in my chunking audit" },
    { value: "216 → 0.22 ms", label: "query latency after an inverted index" },
    { value: "2nd place", label: "Hack for Research 2025, team lead" },
    ...(leetcode ? [{ value: leetcode, label: "LeetCode problems solved (live)" }] : []),
  ];

  return (
    <Page>
      <Preloader />

      {/* Hero */}
      <section id="home" className="relative h-screen min-h-[560px] overflow-hidden text-white">
        <div className="ink-glow" aria-hidden="true" />
        <div className="ink-vignette" aria-hidden="true" />

        <p className="ink-label absolute top-[5.2rem] right-[6vw] hidden sm:flex items-center gap-2.5 text-white/70">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
          </span>
          Open to SWE and ML roles · July 2027
        </p>

        <h1
          className="ink-display ink-hero-title absolute left-[6vw] bottom-[17vh] select-none"
          aria-label="Vishal Krishna Kumar. Build. Measure. Ship."
        >
          <span className="ink-line">
            <span>BUILD.</span>
          </span>
          <span className="ink-line">
            <span style={{ animationDelay: "110ms" }}>MEASURE.</span>
          </span>
          <span className="ink-line">
            <span style={{ animationDelay: "220ms" }}>SHIP.</span>
          </span>
        </h1>

        <div className="rise absolute left-[6vw] bottom-[6.5vh] flex items-start gap-4" style={{ animationDelay: "700ms" }}>
          <span className="mt-[0.5em] h-px w-9 shrink-0 bg-white/55" />
          <p className="ink-label max-w-[300px] leading-[1.7] text-white/75">
            Vishal Krishna Kumar
            <br />
            AI and software engineer
          </p>
        </div>

        <div className="rise absolute right-[6vw] bottom-[6.5vh] flex items-center gap-7" style={{ animationDelay: "800ms" }}>
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="ink-link ink-label hidden sm:inline-flex">
            Resume <span className="arrow">↗</span>
          </a>
          <a href={`mailto:${EMAIL}`} className="ink-link ink-label">
            Let&apos;s talk <span className="arrow">↗</span>
          </a>
        </div>
      </section>

      {/* Statement */}
      <section className={SECTION}>
        <div className="px-[6vw] py-[22vh]">
          <ScrollStatement text={STATEMENT} />
        </div>
      </section>

      {/* About */}
      <section id="about" className={SECTION}>
        <div className={`${WRAP} grid lg:grid-cols-12 gap-12 lg:gap-[5vw] items-end`}>
          <div className="sr lg:col-span-7">
            <SectionLabel index="01">About</SectionLabel>
            <h2 className="ink-statement mt-8">
              I build systems that <em>retrieve</em> and evaluations that <em>hold up.</em>
            </h2>
            <p className="mt-8 max-w-[620px] text-[15px] leading-[1.8] text-white/60">
              As an AI engineer intern at Hirello.ai I shipped a resume-grounded RAG feature and
              contributed to five of the platform&apos;s ten AI agents. Since then I have built two
              open-source tools for evaluating retrieval, each with tests, continuous integration and
              results that anyone can reproduce, and I write up what the numbers show.
            </p>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6">
              <Fact label="Focus">Retrieval, RAG evaluation, applied ML</Fact>
              <Fact label="Degree">M.S. CS (Data Science), June 2027</Fact>
              <Fact label="Available">Full-time from July 2027</Fact>
              <Fact label="Location">Seattle, open to anywhere in the US</Fact>
            </div>
          </div>
          <div className="sr lg:col-span-5">
            <div className="group relative overflow-hidden rounded-lg border border-white/10">
              <img
                src="/portrait.webp"
                alt="Vishal Krishna Kumar"
                loading="lazy"
                className="block w-full aspect-[4/5] object-cover object-top grayscale group-hover:grayscale-0 transition-[filter] duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-700/55 via-transparent to-transparent pointer-events-none" />
              <p className="ink-label absolute left-4 bottom-4 text-white/85">Seattle, WA</p>
            </div>
          </div>
        </div>

        <dl className="grid grid-cols-2 md:grid-cols-4 border-y border-white/10">
          {stats.map((stat) => (
            <div key={stat.label} className="px-[6vw] md:px-8 py-8 md:border-l first:border-l-0 border-white/10">
              <dd className="ink-display text-[clamp(1.6rem,3vw,2.9rem)] text-[#F1F0EC]">
                {typeof stat.value === "number" ? <CountUp to={stat.value} /> : stat.value}
              </dd>
              <dt className="ink-label mt-4 leading-[1.7] text-white/45">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* Experience */}
      <section id="experience" className={SECTION}>
        <div className={WRAP}>
          <SectionLabel index="02">Experience</SectionLabel>
          <h2 className="ink-statement mt-8 max-w-[900px]">
            Where I have <em>worked.</em>
          </h2>
          <ul className="mt-14 border-b border-white/10">
            {jobs.map((item, position) => (
              <ExperienceRow
                key={item.title}
                item={item}
                index={position}
                open={openJob === position}
                onToggle={() => setOpenJob(openJob === position ? -1 : position)}
              />
            ))}
          </ul>
          {simulations.length > 0 && (
            <div className="mt-16">
              <p className="ink-label text-white/45">Job simulations (Forage) · practice programs, not employment</p>
              <ul className="mt-6 grid md:grid-cols-2 gap-x-10">
                {simulations.map((item) => (
                  <li key={item.title} className="border-t border-white/10 py-6">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-lg tracking-[-0.02em] text-[#F1F0EC]">
                        {clean(item.title).replace(/^Job simulation \(Forage\) — /, "")}
                      </h3>
                      <span className="ink-label shrink-0 text-white/40">{item.date}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">
                      {item.description.replace(/^Forage job simulation \(not employment\)\.\s*/, "")}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <WorkSection onOpen={setOpenProject} />

      {/* Writing */}
      <section id="writing" className={SECTION}>
        <div className={WRAP}>
          <div className="flex items-end justify-between gap-6">
            <div>
              <SectionLabel index="04">Writing</SectionLabel>
              <h2 className="ink-statement mt-8">
                Things I <em>measured.</em>
              </h2>
            </div>
            <a href="#/blog" className="ink-link ink-label shrink-0">
              All {POSTS.length} posts <span className="arrow">↗</span>
            </a>
          </div>
          <ul className="mt-14 border-b border-white/10">
            {POSTS.slice(0, 4).map((post, position) => (
              <li key={post.slug} className="ink-row">
                <a
                  href={`#/blog/${post.slug}`}
                  data-cursor="Read"
                  className="group grid grid-cols-12 gap-x-4 gap-y-2 items-baseline py-8"
                >
                  <span className="ink-label col-span-12 md:col-span-1 text-red-500">
                    {String(position + 1).padStart(2, "0")}
                  </span>
                  <span className="col-span-12 md:col-span-7">
                    <span className="block text-2xl md:text-[2rem] leading-[1.1] tracking-[-0.035em] text-[#F1F0EC] group-hover:translate-x-2 transition-transform duration-500">
                      {post.title}
                    </span>
                    <span className="mt-3 block max-w-[640px] text-sm leading-relaxed text-white/55">{post.summary}</span>
                  </span>
                  <span className="ink-label col-span-12 md:col-span-4 md:text-right text-white/45">
                    {formatDate(post.date)} · {post.readingMinutes} min read
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Stack and education */}
      <section id="skills" className={SECTION}>
        <div className={WRAP}>
          <SectionLabel index="05">Stack and education</SectionLabel>
          <h2 className="ink-statement mt-8">
            What I work <em>with.</em>
          </h2>
          <div className="mt-14">
            {SKILLS.map((skill, position) => (
              <div
                key={skill.group}
                className="ink-stack-card grid md:grid-cols-12 gap-x-6 gap-y-4 border-t border-white/15 bg-[#0b0b0b] px-1 pt-6 pb-16 md:pb-24"
                style={{ top: `${5 + position * 4.4}rem` }}
              >
                <p className="ink-label md:col-span-1 text-red-500">({String(position + 1).padStart(2, "0")})</p>
                <h3 className="md:col-span-5 text-3xl md:text-[2.6rem] leading-none tracking-[-0.04em] text-[#F1F0EC]">{skill.group}</h3>
                <ul className="md:col-span-6 flex flex-wrap gap-x-6 gap-y-2 text-lg md:text-xl tracking-[-0.02em] text-white/75">
                  {skill.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-16 grid md:grid-cols-2 gap-x-10">
            <div className="border-t border-white/10 py-6">
              <p className="ink-label text-white/40">Expected June 2027 · Dean&apos;s Scholar</p>
              <h3 className="mt-3 text-2xl tracking-[-0.03em] text-[#F1F0EC]">City University of Seattle</h3>
              <p className="mt-1 text-sm text-white/55">M.S. Computer Science, Data Science concentration</p>
            </div>
            <div className="border-t border-white/10 py-6">
              <p className="ink-label text-white/40">Undergraduate</p>
              <h3 className="mt-3 text-2xl tracking-[-0.03em] text-[#F1F0EC]">SRM Institute of Science and Technology</h3>
              <p className="mt-1 text-sm text-white/55">B.Tech Computer Science and Engineering</p>
            </div>
          </div>
          <p className="border-t border-white/10 pt-6 text-sm leading-relaxed text-white/55">
            <span className="ink-label mr-3 text-white/40">Publication</span>
            &quot;Deepfake Detection System: AI and Deep Learning Framework for Cyber Verification&quot;, TDEMAS,
            2023 (co-author).
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative overflow-hidden bg-[#080808] text-[#F1F0EC]">
        <div className="ink-glow opacity-60" aria-hidden="true" />
        <div className="relative px-[6vw] pt-24 md:pt-32 pb-16">
          <SectionLabel index="06">Contact</SectionLabel>
          <p className="mt-8 max-w-[640px] text-[15px] leading-[1.8] text-white/65">
            I am looking for new-grad software and machine learning engineering roles starting July
            2027. If your team works on retrieval, LLM evaluation or applied ML, I would like to hear
            from you.
          </p>
          <a
            href={`mailto:${EMAIL}`}
            data-cursor="Email"
            className="ink-display ink-contact-title mt-12 block w-fit"
          >
            LET&apos;S
            <br />
            TALK<span className="text-red-500">.</span>
          </a>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a href={`mailto:${EMAIL}`} className="ink-link text-base md:text-lg break-all">
              {EMAIL} <span className="arrow">↗</span>
            </a>
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="ink-link ink-label">
              Resume (PDF) <span className="arrow">↗</span>
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="ink-link ink-label">
              LinkedIn <span className="arrow">↗</span>
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="ink-link ink-label">
              GitHub <span className="arrow">↗</span>
            </a>
            <button onClick={() => goToSection("home")} className="ink-link ink-label md:ml-auto">
              Back to top <span className="arrow">↑</span>
            </button>
          </div>
        </div>
      </section>

      {openProject &&
        createPortal(
          <div className="clean-site" data-theme={theme}>
            <ProjectDetail project={openProject} onClose={() => setOpenProject(null)} />
          </div>,
          document.body
        )}
    </Page>
  );
};

export default Home;
