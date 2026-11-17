import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import type { Project } from "../types/indexs";
import { Reel, useOnScreen } from "./Reel";
import type { Clip } from "./Reel";

/** Titles in the data file carry a "[3] " prefix used by the terminal view. */
export const clean = (title: string) => title.replace(/^\[\d+\]\s*/, "");

export const firstSentence = (text: string) => {
  const match = text.match(/^.*?[.!?](?=\s|$)/);
  return match ? match[0] : text;
};

/** The 3D site's own scene videos; they play one after another. */
const SITE_3D = ["/hero-4.mp4", "/3dsite-hero-1.mp4", "/3dsite-hero-2.mp4", "/3dsite-hero-3.mp4"];

/** Clips light enough to play by themselves inside a card on the home page. */
const CARD_VIDEOS: Record<string, string[]> = {
  "web-3d-006": SITE_3D,
  "gai-001": ["/KGRAGDEMO-2.mp4", "/GPT_DEMO-1.mp4"],
  "research-008": ["/aeroforge-certificate-toy.mp4"],
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
  return [...images, ...videos];
};

/** What the project view plays at the top: every video the project has, in order. */
const detailClips = (project: Project): Clip[] => {
  const title = clean(project.title);
  if (project.id === "web-3d-006") {
    return SITE_3D.map((src, position) => video(src, `${title} · scene ${position + 1} of ${SITE_3D.length}`));
  }
  return [
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

  return (
    <div
      className={`invertible fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md ${
        closing ? "detail-backdrop-out" : "detail-backdrop-in"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={close}
    >
      <div
        className={`mx-auto my-6 md:my-12 w-[min(100%-1.5rem,56rem)] rounded-2xl border border-white/15 bg-neutral-950 shadow-2xl ${
          closing ? "detail-out" : "detail-in"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 border-b border-white/10 bg-neutral-950/95 backdrop-blur rounded-t-2xl">
          <p className="text-sm text-gray-400 truncate">
            {project.category ?? "Project"} · {project.date}
          </p>
          <button
            onClick={close}
            aria-label="Close project"
            className="rounded-md border border-white/15 hover:border-white/50 text-gray-200 px-3 py-1 text-sm transition-colors"
          >
            Close ✕
          </button>
        </div>

        <div className="p-6 md:p-8">
          <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">{title}</h2>
          <p className="mt-2 text-red-400">{project.window}</p>

          {(project.links ?? []).length > 0 && (
            <div className="mt-5 flex flex-wrap gap-3">
              {(project.links ?? []).map((link) => (
                <a
                  key={link.url}
                  href={blogHref(link.url)}
                  {...(isInternal(link.url) ? { onClick: close } : { target: "_blank", rel: "noopener noreferrer" })}
                  className="rounded-md border border-white/20 hover:border-red-400 hover:text-red-400 text-sm text-gray-100 px-3.5 py-1.5 transition-colors"
                >
                  {link.name} →
                </a>
              ))}
            </div>
          )}

          {videos.length > 0 && (
            <div className="mt-7">
              <Reel clips={videos} variant="detail" />
            </div>
          )}

          <p className="mt-7 text-[17px] leading-8 text-gray-300">{project.description}</p>

          {project.metrics && project.metrics.length > 0 && (
            <dl className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="rounded-xl border border-white/10 bg-black/60 p-4 text-center">
                  <dd className="text-xl font-bold text-white">{metric.value}</dd>
                  <dt className="mt-1 text-xs text-gray-400">{metric.label}</dt>
                </div>
              ))}
            </dl>
          )}

          {images.length > 0 && (
            <div className="mt-8">
              <h3 className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">Gallery</h3>
              <Gallery images={images} title={title} />
            </div>
          )}

          {project.features && project.features.length > 0 && (
            <div className="mt-8">
              <h3 className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">What it does</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-300 leading-relaxed">
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {project.techStack && (
            <div className="mt-8">
              <h3 className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">Built with</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
