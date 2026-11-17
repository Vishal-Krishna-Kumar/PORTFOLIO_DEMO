import { useEffect, useState } from "react";

export const EMAIL = "vishalkrishnakkr@gmail.com";
export const RESUME_URL = "/vishal_krishna_kumar_resume.pdf";
export const GITHUB_URL = "https://github.com/Vishal-Krishna-Kumar";
export const LINKEDIN_URL = "https://www.linkedin.com/in/vishal-krishna-kumar-65583a201/";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "writing", label: "Writing" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

/** Go to a section of the home page, from the home page itself or from a blog page. */
export function goToSection(id: string) {
  const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  if (window.location.hash.startsWith("#/")) {
    window.location.hash = "";
    window.setTimeout(scroll, 80);
  } else {
    scroll();
  }
}

export const SiteNav = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const link = "text-sm text-gray-300 hover:text-white transition-colors";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors ${
        scrolled || open ? "bg-[#0b0d10]/90 backdrop-blur border-b border-white/10" : ""
      }`}
    >
      <nav className="mx-auto max-w-5xl px-5 h-16 flex items-center justify-between">
        <button
          onClick={() => {
            setOpen(false);
            if (window.location.hash.startsWith("#/")) window.location.hash = "";
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="font-bold text-white tracking-tight text-lg"
        >
          Vishal Krishna Kumar
        </button>

        <div className="hidden md:flex items-center gap-6">
          {SECTIONS.map((section) => (
            <button key={section.id} onClick={() => goToSection(section.id)} className={link}>
              {section.label}
            </button>
          ))}
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold rounded-md bg-emerald-500 hover:bg-emerald-400 text-black px-3.5 py-1.5 transition-colors"
          >
            Resume
          </a>
        </div>

        <button
          className="md:hidden p-2 -mr-2 text-gray-200"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden px-5 pb-5 flex flex-col gap-4 border-b border-white/10">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                setOpen(false);
                goToSection(section.id);
              }}
              className="text-left text-base text-gray-200"
            >
              {section.label}
            </button>
          ))}
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start text-sm font-semibold rounded-md bg-emerald-500 text-black px-3.5 py-2"
          >
            Resume
          </a>
        </div>
      )}
    </header>
  );
};

export const SiteFooter = () => (
  <footer className="border-t border-white/10">
    <div className="mx-auto max-w-5xl px-5 py-8 flex flex-col sm:flex-row gap-3 items-center justify-between text-sm text-gray-500">
      <p>© {new Date().getFullYear()} Vishal Krishna Kumar</p>
      <div className="flex gap-5">
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-gray-200">
          GitHub
        </a>
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-gray-200">
          LinkedIn
        </a>
        <a href={`mailto:${EMAIL}`} className="hover:text-gray-200">
          Email
        </a>
        <a href="#/terminal" className="hover:text-gray-200" title="The original terminal-style version of this site">
          Terminal mode
        </a>
      </div>
    </div>
  </footer>
);
