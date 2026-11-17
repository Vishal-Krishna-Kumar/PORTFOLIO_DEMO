import { useEffect, useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";
import { createPortal } from "react-dom";

import { experiencesData, projectsData } from "../data/info";
import type { Experience, Project } from "../types/indexs";
import { PostCard } from "./Blog";
import { POSTS } from "./posts";
import { ProjectCard, ProjectDetail, Tag, clean } from "./Projects";
import { Reel } from "./Reel";
import type { Clip } from "./Reel";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, Page, RESUME_URL, goToSection } from "./Shell";
import { useTheme } from "./theme";

const CARD = "rounded-xl border border-white/10 bg-neutral-950/90 backdrop-blur-sm";

const Section = ({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) => (
  <section id={id} className="sr scroll-mt-20 py-16 md:py-20 border-t border-white/10">
    <div className="mx-auto max-w-5xl px-5">
      <p className="text-sm uppercase tracking-[0.25em] text-blue-300">{eyebrow}</p>
      <h2 className="mt-2 text-3xl md:text-4xl font-bold text-white tracking-tight">{title}</h2>
      <div className="mt-8">{children}</div>
    </div>
  </section>
);

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

/** The work reel at the top of the page: one clip per project, in this order. */
const HERO_WORK: { id: string; clip: Clip }[] = [
  { id: "web-3d-006", clip: { kind: "video", src: "/hero-4.mp4", label: "Interactive 3D web gaming site" } },
  { id: "oss-chunkaudit", clip: { kind: "image", src: "/chunkaudit-demo.png", label: "chunkaudit · auditing RAG chunking" } },
  { id: "gai-001", clip: { kind: "image", src: "/KGRAG-1.gif", label: "GraphAugmented Intelligence · KG-RAG" } },
  { id: "medical-ai-002", clip: { kind: "image", src: "/3DUnet.png", label: "3D Attention U-Net · brain tumor segmentation" } },
  { id: "deepfake-003", clip: { kind: "image", src: "/DeepFake.gif", label: "Deepfake detection system" } },
  { id: "oss-ragbench", clip: { kind: "image", src: "/ragbench-scifact.png", label: "ragbench · retrieval benchmarking" } },
];
const HERO_REEL = HERO_WORK.map((item) => item.clip);
const HERO_REEL_IDS = HERO_WORK.map((item) => item.id);

const MARQUEE = ["Retrieval", "RAG evaluation", "PyTorch", "FastAPI", "Agents", "Open source", "Python", "TypeScript"];

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

const ROLES = ["AI and Software Engineer", "Retrieval and RAG evaluation", "Open-source builder"];

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

/** Types a phrase, holds it, deletes it and moves to the next one. */
function useTypewriter(phrases: string[]): string {
  const [text, setText] = useState(phrases[0]);
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let phrase = 0;
    let length = phrases[0].length;
    let deleting = true;
    let timer = 0;

    const tick = () => {
      let delay: number;
      if (deleting) {
        length -= 1;
        delay = 28;
        if (length === 0) {
          deleting = false;
          phrase = (phrase + 1) % phrases.length;
          delay = 350;
        }
      } else {
        length += 1;
        delay = 55;
        if (length === phrases[phrase].length) {
          deleting = true;
          delay = 2400;
        }
      }
      setText(phrases[phrase].slice(0, length));
      timer = window.setTimeout(tick, delay);
    };

    timer = window.setTimeout(tick, 2600);
    return () => window.clearTimeout(timer);
  }, [phrases]);
  return text;
}

/** Fades sections and cards in as they scroll into view. */
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

const ExperienceItem = ({ item }: { item: Experience }) => (
  <li className="relative pl-6 border-l border-white/15">
    <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.9)]" />
    <div className={`${CARD} p-5 hover:border-blue-300/50 transition-colors`}>
      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
        <h3 className="text-lg font-semibold text-white">{clean(item.title)}</h3>
        <p className="text-sm text-gray-400 shrink-0">{item.date}</p>
      </div>
      <p className="text-sm text-blue-300/90">{item.window}</p>
      {item.achievements && item.achievements.length > 0 ? (
        <ul className="mt-3 list-disc pl-5 space-y-1.5 text-gray-200 leading-relaxed">
          {item.achievements.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-gray-200 leading-relaxed">{item.description}</p>
      )}
      {item.technologies && (
        <div className="mt-3 flex flex-wrap gap-2">
          {item.technologies.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
      )}
    </div>
  </li>
);

const Home = () => {
  const leetcode = useLeetCodeTotal();
  const theme = useTheme();
  const role = useTypewriter(ROLES);
  const [openProject, setOpenProject] = useState<Project | null>(null);
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

  const [reelIndex, setReelIndex] = useState(0);
  const reelProject = projectsData.find((project) => project.id === HERO_REEL_IDS[reelIndex]) ?? null;

  const tiltRef = useRef<HTMLDivElement>(null);
  const tilt = (event: MouseEvent<HTMLDivElement>) => {
    const element = tiltRef.current;
    if (!element) return;
    const box = element.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    element.style.transform = `rotateY(${(x * 9).toFixed(2)}deg) rotateX(${(-y * 9).toFixed(2)}deg)`;
  };
  const untilt = () => {
    if (tiltRef.current) tiltRef.current.style.transform = "";
  };
  const moveSpot = (event: MouseEvent<HTMLElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - box.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - box.top}px`);
  };

  const ghost =
    "rounded-md border border-white/25 bg-black/60 hover:border-white/60 text-white px-5 py-2.5 transition-all hover:-translate-y-0.5";

  return (
    <Page>
      {/* Hero */}
      <section className="hero relative overflow-hidden" onMouseMove={moveSpot}>
        <div className="hero-spot" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5 pt-28 md:pt-36 pb-12 md:pb-16">
          <div className="rise site-mono flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.2em] text-gray-300">
            <span className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              Open to SWE and ML roles · July 2027
            </span>
            <span>Seattle, WA · M.S. CS, June 2027</span>
          </div>

          <h1 className="hero-title mt-7 font-bold text-white" aria-label="Vishal Krishna Kumar">
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="line-in block">Vishal Krishna</span>
            </span>
            <span className="block overflow-hidden pb-[0.12em]">
              <span className="line-in flex items-center gap-[0.22em]" style={{ animationDelay: "120ms" }}>
                <img src="/avatar.webp" alt="" className="hero-avatar" />
                <span className="serif-accent text-green-400">Kumar</span>
              </span>
            </span>
          </h1>

          <div className="mt-10 grid lg:grid-cols-12 gap-10 lg:gap-12 items-end">
            <div className="lg:col-span-6">
              <p className="rise site-mono h-6 text-sm text-green-400" style={{ animationDelay: "380ms" }}>
                <span aria-hidden="true">→ </span>
                <span>{role}</span>
                <span className="type-caret" aria-hidden="true" />
              </p>
              <p
                className="rise mt-4 text-2xl md:text-[2rem] md:leading-[1.25] font-medium text-white tracking-tight"
                style={{ animationDelay: "460ms" }}
              >
                I build retrieval systems and <span className="serif-accent text-green-400">measure</span>{" "}
                whether they actually work.
              </p>
              <p className="rise mt-5 max-w-lg text-gray-300 leading-relaxed" style={{ animationDelay: "540ms" }}>
                AI engineer intern at Hirello.ai, then two open-source tools for evaluating retrieval,
                each with tests, CI and numbers anyone can reproduce.
              </p>
              <div
                className="rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-4"
                style={{ animationDelay: "620ms" }}
              >
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/cta inline-flex items-center gap-2 rounded-full bg-white text-black font-semibold pl-6 pr-2 py-2 transition-transform hover:-translate-y-0.5"
                >
                  Download resume
                  <span className="grid place-items-center h-8 w-8 rounded-full bg-black text-white transition-transform group-hover/cta:rotate-45">
                    ↗
                  </span>
                </a>
                <button onClick={() => goToSection("projects")} className="link-line text-white">
                  See my work
                </button>
                <a href={`mailto:${EMAIL}`} className="link-line text-white">
                  Email
                </a>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="link-line text-white">
                  GitHub
                </a>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="link-line text-white">
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Work reel: tilts with the pointer; a click opens the project on screen */}
            <div className="rise lg:col-span-6 [perspective:1200px]" style={{ animationDelay: "500ms" }}>
              <div
                ref={tiltRef}
                className="tilt-card rounded-2xl border border-white/15 bg-neutral-950 overflow-hidden cursor-pointer shadow-[0_40px_90px_-40px_rgba(74,222,128,0.45)]"
                onMouseMove={tilt}
                onMouseLeave={untilt}
                onClick={() => reelProject && setOpenProject(reelProject)}
                role="button"
                tabIndex={0}
                aria-label={reelProject ? `Open project: ${clean(reelProject.title)}` : "Selected work"}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && reelProject) setOpenProject(reelProject);
                }}
              >
                <div className="relative aspect-[16/10]">
                  <Reel clips={HERO_REEL} variant="hero" onIndexChange={setReelIndex} />
                </div>
                <div className="site-mono flex items-center justify-between gap-4 px-4 py-3 border-t border-white/10 text-xs uppercase tracking-[0.16em] text-gray-400">
                  <span>
                    Selected work · {String(reelIndex + 1).padStart(2, "0")}/
                    {String(HERO_REEL.length).padStart(2, "0")}
                  </span>
                  <span className="text-green-400">Open project →</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <dl className="relative border-y border-white/10 bg-black/70 backdrop-blur-sm">
          <div className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 md:divide-x divide-white/10">
            {stats.map((stat, position) => (
              <div key={stat.label} className="rise px-5 py-6" style={{ animationDelay: `${700 + position * 90}ms` }}>
                <dd className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  {typeof stat.value === "number" ? <CountUp to={stat.value} /> : stat.value}
                </dd>
                <dt className="mt-1.5 text-sm text-gray-400 leading-snug">{stat.label}</dt>
              </div>
            ))}
          </div>
        </dl>

        <div className="marquee relative overflow-hidden py-6 md:py-8" aria-hidden="true">
          <div className="marquee-track flex w-max items-center">
            {[...MARQUEE, ...MARQUEE].map((word, position) => (
              <span key={`${word}-${position}`} className="flex items-center">
                <span className="outline-text px-6 text-4xl md:text-6xl font-bold whitespace-nowrap">{word}</span>
                <span className="text-green-400 text-xl">✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <Section id="about" eyebrow="About" title="What I do">
        <div className={`${CARD} p-6 md:p-8 grid md:grid-cols-3 gap-6 text-gray-200 leading-relaxed`}>
          <p className="md:col-span-2 text-lg">
            I like questions that can be settled by measuring. As an AI engineer intern at
            Hirello.ai I shipped a resume-grounded RAG feature and contributed to five of the
            platform&apos;s ten AI agents. Since then I have built two open-source tools for evaluating
            retrieval, each with tests, continuous integration and results that anyone can reproduce,
            and I write up what the numbers show.
          </p>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <span className="text-white font-medium">Focus:</span> retrieval, RAG evaluation, applied ML
            </li>
            <li>
              <span className="text-white font-medium">Degree:</span> M.S. CS (Data Science), June 2027
            </li>
            <li>
              <span className="text-white font-medium">Available:</span> full-time from July 2027
            </li>
            <li>
              <span className="text-white font-medium">Location:</span> Seattle, open to anywhere in the US
            </li>
          </ul>
        </div>
      </Section>

      <Section id="experience" eyebrow="Experience" title="Where I have worked">
        <ul className="space-y-6">
          {jobs.map((item) => (
            <ExperienceItem key={item.title} item={item} />
          ))}
        </ul>
        {simulations.length > 0 && (
          <div className="mt-12">
            <p className="text-sm text-gray-400 mb-4">
              Job simulations (Forage). These are practice programs, not employment.
            </p>
            <ul className="grid md:grid-cols-2 gap-4">
              {simulations.map((item) => (
                <li key={item.title} className={`${CARD} p-5`}>
                  <h3 className="font-semibold text-white">
                    {clean(item.title).replace(/^Job simulation \(Forage\) — /, "")}
                  </h3>
                  <p className="text-sm text-gray-400">{item.date}</p>
                  <p className="mt-2 text-sm text-gray-200 leading-relaxed">
                    {item.description.replace(/^Forage job simulation \(not employment\)\.\s*/, "")}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      <Section id="projects" eyebrow="Projects" title="Things I have built">
        <p className="-mt-3 mb-7 text-gray-400">Hover a project for a quick note. Click to open it.</p>
        <div className="grid md:grid-cols-2 gap-6">
          {projectsData.map((project) => (
            <ProjectCard key={project.title} project={project} onOpen={() => setOpenProject(project)} />
          ))}
        </div>
      </Section>

      <Section id="writing" eyebrow="Writing" title="Things I measured">
        <div className="grid gap-5">
          {POSTS.map((post) => (
            <PostCard key={post.slug} slug={post.slug} />
          ))}
        </div>
      </Section>

      <Section id="skills" eyebrow="Skills and education" title="What I work with">
        <div className={`${CARD} p-6 grid md:grid-cols-2 gap-x-10 gap-y-7`}>
          {SKILLS.map((skill) => (
            <div key={skill.group}>
              <h3 className="text-sm font-semibold text-gray-300 mb-3">{skill.group}</h3>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className={`${CARD} p-5`}>
            <h3 className="font-semibold text-white">City University of Seattle</h3>
            <p className="text-sm text-gray-300">
              M.S. Computer Science, Data Science concentration · expected June 2027 · Dean&apos;s Scholar
            </p>
          </div>
          <div className={`${CARD} p-5`}>
            <h3 className="font-semibold text-white">SRM Institute of Science and Technology</h3>
            <p className="text-sm text-gray-300">B.Tech Computer Science and Engineering</p>
          </div>
        </div>
        <p className="mt-5 text-sm text-gray-300">
          Publication: &quot;Deepfake Detection System: AI and Deep Learning Framework for Cyber
          Verification&quot;, TDEMAS, 2023 (co-author).
        </p>
      </Section>

      <Section id="contact" eyebrow="Contact" title="Let's talk">
        <div className={`${CARD} p-6 md:p-8`}>
          <p className="max-w-2xl text-lg text-gray-200 leading-relaxed">
            I am looking for new-grad software and machine learning engineering roles starting July
            2027. If your team works on retrieval, LLM evaluation or applied ML, I would like to hear
            from you.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="shine rounded-md bg-green-500 hover:bg-green-400 text-black font-semibold px-5 py-2.5 transition-all hover:-translate-y-0.5"
            >
              {EMAIL}
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={ghost}>
              LinkedIn
            </a>
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className={ghost}>
              Resume (PDF)
            </a>
          </div>
        </div>
      </Section>

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
