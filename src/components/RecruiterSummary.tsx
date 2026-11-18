import { useEffect } from "react";

interface RecruiterSummaryProps {
  onClose: () => void;
}

const RESUME_URL = "/vishal_krishna_kumar_resume.pdf";
const EMAIL = "vishalkrishnakkr@gmail.com";

const LINKS = [
  { name: "GitHub", url: "https://github.com/Vishal-Krishna-Kumar" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/vishal-krishna-kumar-65583a201/" },
  { name: "Blog", url: "/#/blog" },
];

const HIGHLIGHTS = [
  {
    label: "AI Engineer Intern, Hirello.ai",
    detail:
      "Built a resume-grounded RAG autofill feature for job-portal forms and contributed code to 5 of the platform's 10 AI agents. Fixed an access-control vulnerability and added cross-browser end-to-end tests as the team grew its suite from 65 to 1,146 passing tests.",
    meta: "Jul to Sep 2026 · Python, FastAPI, Vertex AI (Gemini), Pinecone, Vue 3",
  },
  {
    label: "chunkaudit (open source)",
    detail:
      "A tool that audits RAG chunking strategies. On 10,570 SQuAD questions, fixed 200-word chunks with no overlap split the answering sentence 14.1% of the time; a 50-word overlap cut that to 1.1% and raised Recall@5 from 78.7% to 90.2%.",
    meta: "Nov 2026 · Python, NumPy · 83 tests, CI, one merged outside contribution",
    url: "https://github.com/Vishal-Krishna-Kumar/chunkaudit",
  },
  {
    label: "ragbench (open source)",
    detail:
      "BM25, TF-IDF and hybrid retrieval implemented from scratch. An inverted index took TF-IDF query latency from 216 ms to 0.22 ms and indexing memory from 4.1 GB to 123 MB, with identical top-10 results on BEIR SciFact.",
    meta: "Nov 2026 · Python, NumPy, FastAPI, Docker · 34 tests, CI",
    url: "https://github.com/Vishal-Krishna-Kumar/ragbench",
  },
  {
    label: "3D Attention U-Net for brain tumor segmentation",
    detail:
      "Team lead; 2nd place at Hack for Research 2025. Trained and modified public code from Islam et al. (2019) in PyTorch on the BraTS 2019 dataset.",
    meta: "April 2025 · PyTorch, 3D medical imaging",
  },
];

const SKILLS: { group: string; items: string }[] = [
  { group: "Languages", items: "Python, SQL, JavaScript, TypeScript, Java, Go, C++" },
  { group: "ML", items: "PyTorch, TensorFlow, Keras, Hugging Face, scikit-learn, OpenCV, pandas, NumPy" },
  { group: "LLM and RAG", items: "RAG, retrieval evaluation, LangChain, agents, Vertex AI (Gemini), Pinecone, FAISS, Neo4j" },
  { group: "Backend", items: "FastAPI, Node.js, SQLAlchemy, PostgreSQL, MySQL, MongoDB, REST APIs, OAuth 2.0" },
  { group: "Frontend and cloud", items: "React, Vue 3, AWS, Azure, Docker, GitHub Actions" },
];

/**
 * A plain one-page summary for visitors who want the facts without exploring the terminal
 * interface. It opens from the profile window and from the address /#summary, and prints well.
 */
const RecruiterSummary = ({ onClose }: RecruiterSummaryProps) => {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return (
    <div
      className="clean-site fixed inset-0 z-[60] overflow-y-auto bg-[#06121f] text-gray-200 print:static print:bg-white print:text-black"
      role="dialog"
      aria-modal="true"
      aria-label="Summary of Vishal Krishna Kumar"
    >
      <div className="mx-auto max-w-3xl px-5 py-8 sm:py-12 font-sans">
        <div className="flex items-start justify-between gap-4 print:hidden">
          <p className="text-xs uppercase tracking-[0.25em] text-green-400">Summary</p>
          <button
            onClick={onClose}
            className="text-sm text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 rounded px-3 py-1 transition-colors"
          >
            Go to the full site →
          </button>
        </div>

        <header className="mt-6 flex flex-col sm:flex-row sm:items-center gap-5">
          <img
            src="/img-1.png"
            alt="Vishal Krishna Kumar"
            className="w-24 h-24 rounded-xl object-cover border border-gray-700 print:hidden"
            onError={(event) => {
              (event.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white print:text-black">
              Vishal Krishna Kumar
            </h1>
            <p className="mt-1 text-lg text-gray-300 print:text-black">AI and Software Engineer</p>
            <p className="mt-1 text-sm text-gray-400 print:text-black">
              Seattle, WA · M.S. Computer Science (Data Science), City University of Seattle, June 2027
            </p>
            <p className="mt-2 inline-block text-sm text-green-400 border border-green-500/40 rounded-full px-3 py-0.5 print:text-black print:border-black">
              Open to full-time SWE and ML roles starting July 2027, anywhere in the US
            </p>
          </div>
        </header>

        <div className="mt-6 flex flex-wrap gap-2 print:hidden">
          <a
            href={RESUME_URL}
            download="Vishal_Krishna_Kumar_Resume.pdf"
            className="rounded bg-green-500 hover:bg-green-600 text-black font-semibold text-sm px-4 py-2 transition-colors"
          >
            Download resume (PDF)
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="rounded border border-gray-600 hover:border-gray-400 text-sm px-4 py-2 transition-colors"
          >
            Email me
          </a>
          {LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-gray-700 hover:border-gray-400 text-sm px-4 py-2 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
        <p className="hidden print:block mt-3 text-sm">
          {EMAIL} · github.com/Vishal-Krishna-Kumar · vishal-krishna.me
        </p>

        <section className="mt-9">
          <h2 className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">In short</h2>
          <p className="text-base leading-relaxed">
            I build and measure retrieval and RAG systems. I interned as an AI engineer shipping a
            RAG feature to production, and I maintain two open-source tools for evaluating
            retrieval, both with tests, CI and published results that anyone can reproduce.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">Highlights</h2>
          <ul className="space-y-4">
            {HIGHLIGHTS.map((item) => (
              <li
                key={item.label}
                className="border border-gray-800 rounded-lg p-4 bg-white/[0.02] print:border-gray-300"
              >
                <p className="font-semibold text-white print:text-black">
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 decoration-gray-600 hover:decoration-green-400"
                    >
                      {item.label}
                    </a>
                  ) : (
                    item.label
                  )}
                </p>
                <p className="mt-1 text-sm leading-relaxed">{item.detail}</p>
                <p className="mt-2 text-xs text-gray-500 print:text-black">{item.meta}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">Skills</h2>
          <dl className="grid gap-2 sm:grid-cols-[9rem_1fr] text-sm">
            {SKILLS.map((skill) => (
              <div key={skill.group} className="contents">
                <dt className="text-gray-400 print:text-black font-medium">{skill.group}</dt>
                <dd className="mb-2 sm:mb-0">{skill.items}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-8">
          <h2 className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">Education</h2>
          <ul className="text-sm space-y-1">
            <li>
              <span className="text-white print:text-black font-medium">
                City University of Seattle
              </span>{" "}
              · M.S. Computer Science, Data Science concentration · expected June 2027 · Dean&apos;s
              Scholar
            </li>
            <li>
              <span className="text-white print:text-black font-medium">
                SRM Institute of Science and Technology
              </span>{" "}
              · B.Tech Computer Science and Engineering
            </li>
          </ul>
          <p className="mt-3 text-sm">
            Publication: &quot;Deepfake Detection System: AI and Deep Learning Framework for Cyber
            Verification&quot;, TDEMAS, 2023 (co-author).
          </p>
        </section>

        <footer className="mt-10 pt-5 border-t border-gray-800 text-xs text-gray-500 flex flex-wrap gap-x-4 gap-y-1 justify-between print:hidden">
          <span>Share this page: vishal-krishna.me/#summary</span>
          <button onClick={() => window.print()} className="underline hover:text-gray-300">
            Print or save as PDF
          </button>
        </footer>
      </div>
    </div>
  );
};

export default RecruiterSummary;
