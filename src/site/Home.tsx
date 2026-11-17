import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

import { experiencesData, projectsData } from "../data/info";
import type { Experience, Project } from "../types/indexs";
import { PostCard } from "./Blog";
import { POSTS } from "./posts";
import { ProjectCard, ProjectDetail, Tag, clean } from "./Projects";
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

  const stats = [
    { value: "10,570", label: "questions in my chunking audit" },
    { value: "216 → 0.22 ms", label: "query latency after an inverted index" },
    { value: "2nd place", label: "Hack for Research 2025, team lead" },
    ...(leetcode ? [{ value: String(leetcode), label: "LeetCode problems solved (live)" }] : []),
  ];

  const ghost =
    "rounded-md border border-white/25 bg-black/60 hover:border-white/60 text-white px-5 py-2.5 transition-all hover:-translate-y-0.5";

  return (
    <Page>
      {/* Hero */}
      <section className="relative mx-auto max-w-5xl px-5 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="hero-glow" aria-hidden="true" />
        <div className="relative flex flex-col-reverse md:flex-row md:items-center gap-10">
          <div className="grow">
            <p className="rise inline-flex items-center gap-2 text-sm text-green-400 border border-green-400/40 bg-black/70 rounded-full px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              Open to full-time SWE and ML roles from July 2027
            </p>
            <h1
              className="rise hero-name mt-5 text-4xl md:text-7xl font-bold tracking-tight leading-[1.03]"
              style={{ animationDelay: "90ms, 0ms" }}
            >
              Vishal Krishna Kumar
            </h1>
            <p className="rise mt-4 h-8 text-xl md:text-2xl text-gray-100" style={{ animationDelay: "180ms" }}>
              <span>{role}</span>
              <span className="type-caret" aria-hidden="true" />
            </p>
            <p
              className="rise mt-5 max-w-xl text-lg text-gray-200 leading-relaxed"
              style={{ animationDelay: "270ms" }}
            >
              I build and measure retrieval and RAG systems. M.S. Computer Science (Data Science) at
              City University of Seattle, graduating June 2027.
            </p>
            <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "360ms" }}>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="shine rounded-md bg-green-500 hover:bg-green-400 text-black font-semibold px-5 py-2.5 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(34,197,94,0.8)]"
              >
                Download resume
              </a>
              <button onClick={() => goToSection("projects")} className={ghost}>
                See my work
              </button>
              <a href={`mailto:${EMAIL}`} className={ghost}>
                Email me
              </a>
            </div>
            <div className="rise mt-6 flex gap-5 text-sm text-gray-300" style={{ animationDelay: "450ms" }}>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white underline underline-offset-4">
                GitHub
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white underline underline-offset-4">
                LinkedIn
              </a>
              <span>Seattle, WA</span>
            </div>
          </div>
          <div className="rise photo-ring shrink-0 self-start md:self-center" style={{ animationDelay: "200ms" }}>
            <img
              src="/img-1.png"
              alt="Vishal Krishna Kumar"
              className="relative block w-36 h-36 md:w-60 md:h-60 rounded-2xl object-cover"
            />
          </div>
        </div>

        <dl className="relative mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, position) => (
            <div
              key={stat.label}
              className={`rise ${CARD} p-4 hover:border-blue-300/60 hover:-translate-y-1 transition-all duration-300`}
              style={{ animationDelay: `${540 + position * 90}ms` }}
            >
              <dd className="text-2xl font-bold text-white">{stat.value}</dd>
              <dt className="mt-1 text-sm text-gray-400 leading-snug">{stat.label}</dt>
            </div>
          ))}
        </dl>
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
