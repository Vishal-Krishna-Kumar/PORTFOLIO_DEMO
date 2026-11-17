import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import type { Project } from "../types/indexs";
import { Reel, useOnScreen } from "./Reel";
import { ChunkSplitViz, RecallBarsViz, SpeedupViz, TerminalViz } from "./Viz";
import type { Clip } from "./Reel";

/** Titles in the data file carry a "[3] " prefix used by the terminal view. */
export const clean = (title: string) => title.replace(/^\[\d+\]\s*/, "");

export const firstSentence = (text: string) => {
  const match = text.match(/^.*?[.!?](?=\s|$)/);
  return match ? match[0] : text;
};

/** The 3D site's own scene videos; they play one after another. */
const SITE_3D = [
  "/hero-4.mp4",
  "/3dsite-hero-1.mp4",
  "/3dsite-hero-2.mp4",
  "/3dsite-hero-3.mp4",
  "/3dsite-feature-1.mp4",
  "/3dsite-feature-2.mp4",
  "/3dsite-feature-3.mp4",
  "/3dsite-feature-4.mp4",
  "/3dsite-feature-5.mp4",
];

/** Drawings that animate in the browser, for the tools that have no recorded video. */
const LIVE: Record<string, Clip[]> = {
  "oss-chunkaudit": [
    { kind: "live", src: "live:chunk-split", Live: ChunkSplitViz, seconds: 9.6, label: "Where the cut lands", note: "Measured on SQuAD v1.1 with chunkaudit" },
    { kind: "live", src: "live:recall-bars", Live: RecallBarsViz, seconds: 7.2, label: "Recall@5 by strategy and retriever", note: "Measured on SQuAD v1.1 with chunkaudit" },
  ],
  "oss-ragbench": [
    { kind: "live", src: "live:terminal", Live: TerminalViz, seconds: 7, label: "A benchmark run", note: "Numbers from ragbench on BEIR SciFact" },
    { kind: "live", src: "live:speedup", Live: SpeedupViz, seconds: 7.8, label: "Dense matrix to inverted index", note: "Numbers from ragbench on BEIR SciFact" },
  ],
};

/** Clips light enough to play by themselves inside a card on the home page. */
const CARD_VIDEOS: Record<string, string[]> = {
  "web-3d-006": ["/hero-4.mp4", "/3dsite-hero-3.mp4", "/3dsite-feature-2.mp4", "/3dsite-feature-3.mp4", "/3dsite-feature-5.mp4"],
  "desktop-007": ["/3D-DEMO.mov"],
  "gai-001": ["/KGRAGDEMO-2.mp4", "/GPT_DEMO-1.mp4"],
  "research-008": ["/aeroforge-kg-growth.mp4", "/aeroforge-certificate-toy.mp4"],
};

/** Cover images for projects whose data has no still images. */
const EXTRA_IMAGES: Record<string, string[]> = {
  "gai-001": ["/KGRAG-1.gif"],
};

const imagesOf = (project: Project) =>
  project.images && project.images.length > 0
    ? project.images
    : (EXTRA_IMAGES[project.id ?? ""] ?? []);

const blogHref = (url: string) => url.replace("https://www.vishalkrishna.dev/blog/", "#/blog/");
const isInternal = (url: string) => url.includes("vishalkrishna.dev/blog/");

/** Short button labels for a project's links: GitHub, Blog, Live, Paper, or the link's own name. */
export const linkKind = (link: { name: string; url: string }): string => {
  if (/paper|arxiv|doi\.org/i.test(`${link.name} ${link.url}`)) return "Paper";
  if (link.url.includes("/blog/")) return "Blog";
  if (link.url.includes("github.com/Vishal-Krishna-Kumar")) return "GitHub";
  if (/netlify\.app|itch\.io|vercel\.app/.test(link.url)) return /itch\.io/.test(link.url) ? "Play" : "Live";
  return "";
};

/** The links worth a button on a work panel: the project's own GitHub, blog posts, live site, paper. */
export const mainLinks = (project: Project) =>
  (project.links ?? [])
    .map((link) => ({ ...link, kind: linkKind(link), href: blogHref(link.url), internal: isInternal(link.url) }))
    .filter((link) => link.kind)
    .slice(0, 4);

export const Tag = ({ children }: { children: ReactNode }) => (
  <span className="text-xs rounded-full border border-white/10 bg-neutral-900 px-2.5 py-1 text-gray-300">
    {children}
  </span>
);

const video = (src: string, label?: string, note?: string): Clip => ({ kind: "video", src, label, note });
const image = (src: string, label?: string): Clip => ({ kind: "image", src, label });

/** What a card plays: its videos and images, in a loop. */
export const cardClips = (project: Project): Clip[] => {
  const id = project.id ?? "";
  const videos = (CARD_VIDEOS[id] ?? []).map((src) => video(src));
  const images = imagesOf(project).map((src) => image(src));
  if (id === "web-3d-006") return videos;
  // The game leads with its gameplay recording; the tools lead with their live drawings.
  if (id === "desktop-007") {
    // Three ten-second cuts from the one gameplay recording.
    return [4, 24, 42].map((start) => ({ kind: "video" as const, src: "/3D-DEMO.mov", start, end: start + 10 }));
  }
  return [...(LIVE[id] ?? []), ...images, ...videos];
};

/** What the project view plays at the top: every video the project has, in order. */
const detailClips = (project: Project): Clip[] => {
  const title = clean(project.title);
  if (project.id === "web-3d-006") {
    return SITE_3D.map((src, position) => video(src, `${title} · scene ${position + 1} of ${SITE_3D.length}`));
  }
  return [
    ...(LIVE[project.id ?? ""] ?? []),
    ...(project.VideoDemo ? [video(project.VideoDemo, `${title} · overview`)] : []),
    ...(project.demoVideos ?? []).map((demo) => video(demo.url, demo.title, demo.description)),
  ];
};

/** Card media: a reel of the project's clips and images, or a plain title tile. */
const CardMedia = ({ project }: { project: Project }) => {
  const { ref, visible } = useOnScreen<HTMLDivElement>();
  const clips = cardClips(project);

  return (
    <div ref={ref} className="relative aspect-[16/9] overflow-hidden bg-[#0d1117] border-b border-white/10">
      {clips.length > 0 ? (
        <Reel clips={clips} variant="card" active={visible} />
      ) : (
        <div className="card-zoom absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(96,165,250,0.25),transparent_55%),radial-gradient(circle_at_75%_80%,rgba(34,197,94,0.22),transparent_55%)]">
          <span className="text-2xl font-bold text-white/80 px-6 text-center">{clean(project.title)}</span>
        </div>
      )}

      {/* Short note that slides up on hover */}
      <div className="card-note pointer-events-none absolute inset-0 flex flex-col justify-end p-5 pr-16 bg-gradient-to-t from-black via-black/70 to-transparent">
        <p className="text-sm text-gray-100 leading-relaxed">{firstSentence(project.description)}</p>
        <p className="mt-2 text-sm font-semibold text-red-500">Open project →</p>
      </div>
    </div>
  );
};

export const ProjectCard = ({ project, onOpen }: { project: Project; onOpen: () => void }) => (
  <article
    className="project-card group sr rounded-xl border border-white/10 bg-neutral-950/90 backdrop-blur-sm overflow-hidden flex flex-col cursor-pointer hover:border-red-400/60 hover:-translate-y-1 hover:shadow-[0_18px_50px_-20px_rgba(96,165,250,0.45)] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-400"
    role="button"
    tabIndex={0}
    aria-label={`Open project: ${clean(project.title)}`}
    onClick={onOpen}
    onKeyDown={(event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onOpen();
      }
    }}
  >
    <CardMedia project={project} />
    <div className="p-6 flex flex-col grow">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-white leading-snug group-hover:text-red-400 transition-colors">
          {clean(project.title)}
        </h3>
        <span className="text-xs text-gray-500 shrink-0 mt-1">{project.date}</span>
      </div>
      <p className="mt-1 text-sm text-red-400/90">{project.window}</p>

      {project.metrics && project.metrics.length > 0 && (
        <dl className="mt-4 grid grid-cols-3 gap-2">
          {project.metrics.slice(0, 3).map((metric) => (
            <div key={metric.label} className="rounded-lg bg-black/60 border border-white/5 px-2 py-2 text-center">
              <dd className="text-sm font-bold text-white">{metric.value}</dd>
              <dt className="mt-0.5 text-[11px] leading-tight text-gray-500">{metric.label}</dt>
            </div>
          ))}
        </dl>
      )}

      {project.techStack && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.slice(0, 5).map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
      )}
    </div>
  </article>
);

/** A strip of images that scrolls by itself and pauses under the pointer. */
const Gallery = ({ images, title }: { images: string[]; title: string }) => {
  if (images.length === 0) return null;
  if (images.length === 1) {
    return (
      <img
        src={images[0]}
        alt={`${title} result`}
        className="w-full max-h-[70vh] object-contain rounded-lg border border-white/10 bg-[#0d1117]"
      />
    );
  }
  // The list is doubled so the strip can loop without a visible jump.
  const strip = [...images, ...images];
  return (
    <div className="gallery overflow-hidden rounded-lg border border-white/10 bg-[#0d1117]">
      <div
        className="gallery-track flex gap-3 p-3 w-max"
        style={{ animationDuration: `${images.length * 7}s` }}
      >
        {strip.map((src, position) => (
          <a key={`${src}-${position}`} href={src} target="_blank" rel="noopener noreferrer" className="shrink-0">
            <img
              src={src}
              alt={position < images.length ? `${title} image ${position + 1}` : ""}
              loading="lazy"
              className="h-56 md:h-72 w-auto rounded-md object-contain bg-black"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export const ProjectDetail = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const [closing, setClosing] = useState(false);
  const title = clean(project.title);
  const images = imagesOf(project);
  const videos = detailClips(project);

  const close = () => {
    setClosing(true);
    window.setTimeout(onClose, 220);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [name, tagline] = title.includes(" — ") ? title.split(" — ") : [title, ""];
  const heading = "ink-label text-white/45";

  return (
    <div
      className={`invertible fixed inset-0 z-50 overflow-y-auto bg-[#080808] text-[#F1F0EC] ${
        closing ? "detail-backdrop-out" : "ink-menu"
      }`}
      role="dialog"
      data-lenis-prevent
      aria-modal="true"
      aria-label={title}
    >
      <div className="sticky top-0 z-20 flex items-center justify-between gap-4 px-[6vw] py-5 bg-[#080808]/90 backdrop-blur border-b border-white/10">
        <p className="ink-label truncate text-white/50">
          {project.category ?? "Project"} · {project.date}
        </p>
        <button onClick={close} aria-label="Close project" className="flex items-center gap-3 text-white">
          <span className="ink-label text-[11px]">Close</span>
          <span className="relative block h-3 w-6">
            <span className="absolute left-0 top-1.5 h-0.5 w-full rotate-45 bg-white" />
            <span className="absolute left-0 top-1.5 h-0.5 w-full -rotate-45 bg-white" />
          </span>
        </button>
      </div>

      <div className="px-[6vw] pt-14 md:pt-20 pb-24">
        <div className="flex items-center gap-3">
          <span className="h-px w-7 bg-red-500/70" />
          <span className="ink-label text-white/55">{tagline || project.window}</span>
        </div>
        <h2 className="ink-display mt-7 text-[clamp(2.3rem,7.4vw,7rem)]">{name}</h2>
        {tagline && <p className="mt-6 max-w-[760px] text-lg text-white/60">{project.window}</p>}

        {(project.links ?? []).length > 0 && (
          <div className="mt-9 flex flex-wrap gap-x-8 gap-y-4">
            {(project.links ?? []).map((link) => (
              <a
                key={link.url}
                href={blogHref(link.url)}
                {...(isInternal(link.url) ? { onClick: close } : { target: "_blank", rel: "noopener noreferrer" })}
                className="ink-link ink-label"
              >
                {link.name} <span className="arrow">↗</span>
              </a>
            ))}
          </div>
        )}

        {videos.length > 0 && (
          <div className="mt-12 max-w-[1100px]">
            <Reel clips={videos} variant="detail" />
          </div>
        )}

        <div className="mt-14 grid lg:grid-cols-12 gap-x-[5vw] gap-y-12">
          <div className="lg:col-span-7">
            <h3 className={heading}>Overview</h3>
            <p className="mt-5 text-[17px] leading-[1.85] text-white/75">{project.description}</p>

            {project.features && project.features.length > 0 && (
              <div className="mt-12">
                <h3 className={heading}>What it does</h3>
                <ul className="mt-5 border-b border-white/10">
                  {project.features.map((feature, position) => (
                    <li key={feature} className="flex gap-5 border-t border-white/10 py-4 text-[15px] leading-relaxed text-white/75">
                      <span className="ink-label mt-1 shrink-0 text-red-500">{String(position + 1).padStart(2, "0")}</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="lg:col-span-5 space-y-12">
            {project.metrics && project.metrics.length > 0 && (
              <div>
                <h3 className={heading}>Results</h3>
                <dl className="mt-5 border-b border-white/10">
                  {project.metrics.map((metric) => (
                    <div key={metric.label} className="flex items-baseline justify-between gap-6 border-t border-white/10 py-4">
                      <dt className="text-sm text-white/55">{metric.label}</dt>
                      <dd className="ink-display shrink-0 text-2xl md:text-3xl text-[#F1F0EC]">{metric.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {project.techStack && (
              <div>
                <h3 className={heading}>Built with</h3>
                <p className="mt-5 text-lg leading-[1.7] tracking-[-0.02em] text-white/80">
                  {project.techStack.join("  /  ")}
                </p>
              </div>
            )}
          </div>
        </div>

        {images.length > 0 && (
          <div className="mt-16">
            <h3 className={heading}>Gallery</h3>
            <div className="mt-5">
              <Gallery images={images} title={title} />
            </div>
          </div>
        )}

        <div className="mt-16 pt-8 border-t border-white/10 flex justify-between">
          <button onClick={close} className="ink-link ink-label">
            <span className="arrow">←</span> Back to all work
          </button>
        </div>
      </div>
    </div>
  );
};
