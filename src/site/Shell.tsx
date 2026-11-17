import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Lenis from "lenis";

import Backdrop from "./Backdrop";
import { toggleTheme, useTheme } from "./theme";

export const EMAIL = "vishalkrishnakkr@gmail.com";
export const RESUME_URL = "/vishal_krishna_kumar_resume.pdf";
export const GITHUB_URL = "https://github.com/Vishal-Krishna-Kumar";
export const LINKEDIN_URL = "https://www.linkedin.com/in/vishal-krishna-kumar-65583a201/";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Work" },
  { id: "writing", label: "Writing" },
  { id: "skills", label: "Stack" },
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

/** Small numbered label that opens every section: "01 — About". */
export const SectionLabel = ({ index, children }: { index: string; children: ReactNode }) => (
  <div className="flex items-center gap-3">
    <span className="ink-label text-white/35">{index}</span>
    <span className="h-px w-7 bg-red-500/70" />
    <span className="ink-label text-white/55">{children}</span>
  </div>
);

/** A dot that follows the pointer, grows over links and can carry a short word. */
const Cursor = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const element = ref.current;
    if (!element || !window.matchMedia?.("(pointer: fine)").matches) return;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let frame = 0;

    const loop = () => {
      x += (targetX - x) * 0.22;
      y += (targetY - y) * 0.22;
      element.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      frame = requestAnimationFrame(loop);
    };
    const onMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      element.dataset.on = "true";
      const target = event.target instanceof Element ? event.target : null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      const inControl = target?.closest(".reel button, video");
      if (labelled && !inControl) {
        element.dataset.mode = "label";
        setLabel(labelled.dataset.cursor ?? "");
      } else if (target?.closest("a, button, [role='button']")) {
        element.dataset.mode = "link";
        setLabel("");
      } else {
        element.dataset.mode = "";
        setLabel("");
      }
    };
    const onLeave = () => {
      element.dataset.on = "false";
    };

    frame = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className="ink-cursor" aria-hidden="true">
      {label && <span>{label}</span>}
    </div>
  );
};

const ThemeIcon = ({ theme }: { theme: "dark" | "light" }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {theme === "dark" ? (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </>
    ) : (
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    )}
  </svg>
);

export const SiteNav = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const goHome = () => {
    setOpen(false);
    if (window.location.hash.startsWith("#/")) window.location.hash = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-[60] px-5 py-5 sm:px-7 md:px-9 flex items-center justify-between mix-blend-difference">
        <button
          onClick={goHome}
          aria-label="Vishal Krishna Kumar, back to top"
          className="ink-display text-2xl text-white"
        >
          VK.
        </button>
        <div className="flex items-center gap-5">
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="ink-label hidden sm:block text-white/80 hover:text-white">
            Resume ↗
          </a>
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex items-center gap-3 text-white"
          >
            <span className="ink-label text-[11px]">{open ? "Close" : "Menu"}</span>
            <span className="relative block h-2.5 w-6">
              <span className={`absolute left-0 h-0.5 w-full bg-white transition-transform duration-300 ${open ? "top-1 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-0.5 w-full bg-white transition-transform duration-300 ${open ? "top-1 -rotate-45" : "top-2"}`} />
            </span>
          </button>
        </div>
      </header>

      {open && (
        <div data-lenis-prevent className="invertible ink-menu fixed inset-0 z-50 overflow-y-auto bg-[#080808] text-[#F1F0EC]">
          <div className="min-h-full flex flex-col justify-between px-[6vw] pt-24 pb-8">
            <nav className="grid lg:grid-cols-12 gap-10 items-end">
              <ul className="lg:col-span-8">
                {SECTIONS.map((section, position) => (
                  <li key={section.id} className="border-b border-white/10">
                    <button
                      onClick={() => {
                        setOpen(false);
                        goToSection(section.id);
                      }}
                      className="group w-full flex items-baseline gap-5 py-2 text-left"
                    >
                      <span className="ink-label text-red-500">{String(position + 1).padStart(2, "0")}</span>
                      <span className="ink-display ink-menu-link block">{section.label}</span>
                    </button>
                  </li>
                ))}
                <li className="border-b border-white/10">
                  <a href="#/blog" onClick={() => setOpen(false)} className="w-full flex items-baseline gap-5 py-2">
                    <span className="ink-label text-red-500">07</span>
                    <span className="ink-display ink-menu-link block">Blog</span>
                  </a>
                </li>
              </ul>
              <div className="lg:col-span-4 space-y-6">
                <div>
                  <p className="ink-label text-white/40">Say hello</p>
                  <a href={`mailto:${EMAIL}`} className="mt-2 block text-lg text-white hover:text-red-400 transition-colors break-all">
                    {EMAIL}
                  </a>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="ink-link ink-label">
                    Resume <span className="arrow">↗</span>
                  </a>
                  <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="ink-link ink-label">
                    GitHub <span className="arrow">↗</span>
                  </a>
                  <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="ink-link ink-label">
                    LinkedIn <span className="arrow">↗</span>
                  </a>
                </div>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-3 rounded-full border border-white/20 hover:border-white/60 px-4 py-2 text-white/80 hover:text-white transition-colors"
                >
                  <ThemeIcon theme={theme} />
                  <span className="ink-label">{theme === "dark" ? "Light theme" : "Dark theme"}</span>
                </button>
              </div>
            </nav>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-3 ink-label text-white/40">
              <span>Seattle, WA · Open to SWE and ML roles from July 2027</span>
              <a href="#/terminal" onClick={() => setOpen(false)} className="hover:text-white">
                Terminal mode
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const SiteFooter = () => (
  <footer className="border-t border-white/10 bg-[#080808]">
    <div className="px-[6vw] py-7 flex flex-col sm:flex-row gap-4 items-center justify-between ink-label text-white/40">
      <p>© {new Date().getFullYear()} Vishal Krishna Kumar</p>
      <div className="flex flex-wrap justify-center gap-6">
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white">
          GitHub
        </a>
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white">
          LinkedIn
        </a>
        <a href={`mailto:${EMAIL}`} className="hover:text-white">
          Email
        </a>
        <a href="#/blog" className="hover:text-white">
          Blog
        </a>
        <a href="#/terminal" className="hover:text-white" title="The original terminal-style version of this site">
          Terminal mode
        </a>
      </div>
    </div>
  </footer>
);

let activeLenis: Lenis | null = null;

/** Start a newly opened page at its top, at once, with no scrolling animation. */
export function jumpToTop() {
  activeLenis?.scrollTo(0, { immediate: true, force: true });
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

/** Smooth, slightly weighted scrolling on desktop. Phones keep their native scroll. */
function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia?.("(pointer: fine)").matches) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    activeLenis = lenis;
    let frame = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frame);
      if (activeLenis === lenis) activeLenis = null;
      lenis.destroy();
    };
  }, []);
}

/** Shared frame for every page: themed background, menu, content, footer. */
export const Page = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();
  useSmoothScroll();
  return (
    <div className="clean-site relative isolate min-h-screen text-gray-200" data-theme={theme}>
      <Backdrop theme={theme} />
      <SiteNav />
      <div className="invertible">
        {children}
        <SiteFooter />
      </div>
      <Cursor />
    </div>
  );
};
