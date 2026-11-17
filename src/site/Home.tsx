import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import { experiencesData, projectsData } from "../data/info";
import type { Experience, Project } from "../types/indexs";
import Backdrop from "./Backdrop";
import { PostCard } from "./Blog";
import { POSTS } from "./posts";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, RESUME_URL, SiteFooter, SiteNav, goToSection } from "./Shell";

/** Titles in the data file carry a "[3] " prefix used by the terminal view. */
const clean = (title: string) => title.replace(/^\[\d+\]\s*/, "");

const firstSentence = (text: string) => {
  const match = text.match(/^.*?[.!?](?=\s|$)/);
  return match ? match[0] : text;
};

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
  <section id={id} className="scroll-mt-20 py-16 md:py-20 border-t border-white/10">
    <div className="mx-auto max-w-5xl px-5">
      <p className="text-sm uppercase tracking-[0.25em] text-blue-300">{eyebrow}</p>
      <h2 className="mt-2 text-3xl md:text-4xl font-bold text-white tracking-tight">{title}</h2>
      <div className="mt-8">{children}</div>
    </div>
  </section>
);

const Tag = ({ children }: { children: ReactNode }) => (
  <span className="text-xs rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-gray-300">
    {children}
  </span>
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

const ExperienceItem = ({ item }: { item: Experience }) => (
  <li className="relative pl-6 border-l border-white/10">
    <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-green-400" />
    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
      <h3 className="text-lg font-semibold text-white">{clean(item.title)}</h3>
      <p className="text-sm text-gray-500 shrink-0">{item.date}</p>
    </div>
    <p className="text-sm text-gray-400">{item.window}</p>
    {item.achievements && item.achievements.length > 0 ? (
      <ul className="mt-3 list-disc pl-5 space-y-1.5 text-gray-300 leading-relaxed">
        {item.achievements.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    ) : (
      <p className="mt-3 text-gray-300 leading-relaxed">{item.description}</p>
    )}
    {item.technologies && (
      <div className="mt-3 flex flex-wrap gap-2">
        {item.technologies.map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>
    )}
  </li>
);

const ProjectCard = ({ project }: { project: Project }) => {
  const [open, setOpen] = useState(false);
  const cover = project.images?.[0];

  return (
    <article className="rounded-xl border border-white/10 bg-black/60 overflow-hidden flex flex-col">
      {cover && (
        <img
          src={cover}
          alt={`${clean(project.title)} result`}
          loading="lazy"
          className="w-full aspect-[16/9] object-contain p-3 border-b border-white/10 bg-[#0d1117]"
        />
      )}
      <div className="p-6 flex flex-col grow">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-white leading-snug">{clean(project.title)}</h3>
          <span className="text-xs text-gray-500 shrink-0 mt-1">{project.date}</span>
        </div>
        <p className="mt-1 text-sm text-blue-300/90">{project.window}</p>
        <p className="mt-3 text-gray-300 leading-relaxed">
          {open ? project.description : firstSentence(project.description)}
        </p>

        {project.metrics && project.metrics.length > 0 && (
          <dl className="mt-4 grid grid-cols-3 gap-2">
            {project.metrics.slice(0, 3).map((metric) => (
              <div key={metric.label} className="rounded-lg bg-black/40 border border-white/5 px-2 py-2 text-center">
                <dd className="text-sm font-bold text-white">{metric.value}</dd>
                <dt className="mt-0.5 text-[11px] leading-tight text-gray-500">{metric.label}</dt>
              </div>
            ))}
          </dl>
        )}

        {open && project.features && (
          <ul className="mt-4 list-disc pl-5 space-y-1.5 text-sm text-gray-300 leading-relaxed">
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        )}

        {project.techStack && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.techStack.slice(0, open ? undefined : 5).map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        )}

        <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm mt-auto">
          {(project.links ?? []).slice(0, open ? undefined : 2).map((link) => (
            <a
              key={link.url}
              href={link.url.replace("https://www.vishalkrishna.dev/blog/", "#/blog/")}
              {...(link.url.includes("vishalkrishna.dev/blog/") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
              className="text-blue-300 hover:text-blue-300 underline underline-offset-4"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            className="ml-auto text-gray-400 hover:text-white transition-colors"
          >
            {open ? "Show less" : "Details"}
          </button>
        </div>
      </div>
    </article>
  );
};

const Home = () => {
  const leetcode = useLeetCodeTotal();
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

  return (
    <div className="clean-site relative isolate min-h-screen text-gray-200">
      <Backdrop />
      <SiteNav />

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-5 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="flex flex-col-reverse md:flex-row md:items-center gap-10">
          <div className="grow">
            <p className="inline-flex items-center gap-2 text-sm text-green-400 border border-green-400/40 bg-green-400/10 rounded-full px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              Open to full-time SWE and ML roles from July 2027
            </p>
            <h1 className="mt-5 text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.05]">
              Vishal Krishna Kumar
            </h1>
            <p className="mt-3 text-xl md:text-2xl text-gray-300">AI and Software Engineer</p>
            <p className="mt-5 max-w-xl text-lg text-gray-400 leading-relaxed">
              I build and measure retrieval and RAG systems. M.S. Computer Science (Data Science) at
              City University of Seattle, graduating June 2027.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-green-500 hover:bg-green-400 text-black font-semibold px-5 py-2.5 transition-colors"
              >
                Download resume
              </a>
              <button
                onClick={() => goToSection("projects")}
                className="rounded-md border border-white/20 hover:border-white/50 text-white px-5 py-2.5 transition-colors"
              >
                See my work
              </button>
              <a
                href={`mailto:${EMAIL}`}
                className="rounded-md border border-white/20 hover:border-white/50 text-white px-5 py-2.5 transition-colors"
              >
                Email me
              </a>
            </div>
            <div className="mt-6 flex gap-5 text-sm text-gray-400">
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white underline underline-offset-4">
                GitHub
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white underline underline-offset-4">
                LinkedIn
              </a>
              <span>Seattle, WA</span>
            </div>
          </div>
          <img
            src="/img-1.png"
            alt="Vishal Krishna Kumar"
            className="w-36 h-36 md:w-56 md:h-56 rounded-2xl object-cover border border-white/10 shadow-2xl shrink-0"
          />
        </div>

        <dl className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-white/10 bg-black/60 p-4">
              <dd className="text-2xl font-bold text-white">{stat.value}</dd>
              <dt className="mt-1 text-sm text-gray-500 leading-snug">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <Section id="about" eyebrow="About" title="What I do">
        <div className="grid md:grid-cols-3 gap-6 text-gray-300 leading-relaxed">
          <p className="md:col-span-2 text-lg">
            I like questions that can be settled by measuring. As an AI engineer intern at
            Hirello.ai I shipped a resume-grounded RAG feature and contributed to five of the
            platform&apos;s ten AI agents. Since then I have built two open-source tools for evaluating
            retrieval, each with tests, continuous integration and results that anyone can reproduce,
            and I write up what the numbers show.
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <span className="text-gray-200">Focus:</span> retrieval, RAG evaluation, applied ML
            </li>
            <li>
              <span className="text-gray-200">Degree:</span> M.S. CS (Data Science), June 2027
            </li>
            <li>
              <span className="text-gray-200">Available:</span> full-time from July 2027
            </li>
            <li>
              <span className="text-gray-200">Location:</span> Seattle, open to anywhere in the US
            </li>
          </ul>
        </div>
      </Section>

      <Section id="experience" eyebrow="Experience" title="Where I have worked">
        <ul className="space-y-10">
          {jobs.map((item) => (
            <ExperienceItem key={item.title} item={item} />
          ))}
        </ul>
        {simulations.length > 0 && (
          <div className="mt-12">
            <p className="text-sm text-gray-500 mb-4">
              Job simulations (Forage). These are practice programs, not employment.
            </p>
            <ul className="grid md:grid-cols-2 gap-4">
              {simulations.map((item) => (
                <li key={item.title} className="rounded-xl border border-white/10 bg-black/60 p-5">
                  <h3 className="font-semibold text-white">
                    {clean(item.title).replace(/^Job simulation \(Forage\) — /, "")}
                  </h3>
                  <p className="text-sm text-gray-500">{item.date}</p>
                  <p className="mt-2 text-sm text-gray-300 leading-relaxed">
                    {item.description.replace(/^Forage job simulation \(not employment\)\.\s*/, "")}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      <Section id="projects" eyebrow="Projects" title="Things I have built">
        <div className="grid md:grid-cols-2 gap-6">
          {projectsData.map((project) => (
            <ProjectCard key={project.title} project={project} />
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
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-7">
          {SKILLS.map((skill) => (
            <div key={skill.group}>
              <h3 className="text-sm font-semibold text-gray-400 mb-3">{skill.group}</h3>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-white/10 bg-black/60 p-5">
            <h3 className="font-semibold text-white">City University of Seattle</h3>
            <p className="text-sm text-gray-400">
              M.S. Computer Science, Data Science concentration · expected June 2027 · Dean&apos;s Scholar
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/60 p-5">
            <h3 className="font-semibold text-white">SRM Institute of Science and Technology</h3>
            <p className="text-sm text-gray-400">B.Tech Computer Science and Engineering</p>
          </div>
        </div>
        <p className="mt-5 text-sm text-gray-400">
          Publication: &quot;Deepfake Detection System: AI and Deep Learning Framework for Cyber
          Verification&quot;, TDEMAS, 2023 (co-author).
        </p>
      </Section>

      <Section id="contact" eyebrow="Contact" title="Let's talk">
        <p className="max-w-2xl text-lg text-gray-300 leading-relaxed">
          I am looking for new-grad software and machine learning engineering roles starting July
          2027. If your team works on retrieval, LLM evaluation or applied ML, I would like to hear
          from you.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={`mailto:${EMAIL}`}
            className="rounded-md bg-green-500 hover:bg-green-400 text-black font-semibold px-5 py-2.5 transition-colors"
          >
            {EMAIL}
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-white/20 hover:border-white/50 text-white px-5 py-2.5 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-white/20 hover:border-white/50 text-white px-5 py-2.5 transition-colors"
          >
            Resume (PDF)
          </a>
        </div>
      </Section>

      <SiteFooter />
    </div>
  );
};

export default Home;
