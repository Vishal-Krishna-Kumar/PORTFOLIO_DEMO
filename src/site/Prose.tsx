import type { ReactNode } from "react";

// Building blocks shared by every blog post, so they all have the same typography.

export const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="mt-16 mb-6 pt-6 border-t border-white/10 text-2xl md:text-[2rem] leading-[1.1] tracking-[-0.04em] text-[#F1F0EC]">
    {children}
  </h2>
);

export const P = ({ children }: { children: ReactNode }) => (
  <p className="text-[17px] leading-[1.85] text-white/70 mb-6">{children}</p>
);

export const UL = ({ children }: { children: ReactNode }) => (
  <ul className="list-disc marker:text-red-500 pl-6 space-y-2.5 text-[17px] leading-[1.8] text-white/70 mb-6">
    {children}
  </ul>
);

export const Code = ({ children }: { children: ReactNode }) => (
  <code className="site-mono bg-white/[0.08] px-1.5 py-0.5 rounded text-[0.86em] text-red-400">
    {children}
  </code>
);

export const Pre = ({ children }: { children: string }) => (
  <pre className="site-mono bg-black/60 border border-white/10 rounded-lg p-5 mb-7 overflow-x-auto text-sm leading-relaxed text-white/85">
    <code className="site-mono">{children}</code>
  </pre>
);

export const A = ({ href, children }: { href: string; children: ReactNode }) => {
  const internal = href.startsWith("#") || href.startsWith("/");
  return (
    <a
      href={href}
      {...(internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      className="text-[#F1F0EC] underline decoration-red-500 decoration-1 underline-offset-4 hover:text-red-400 transition-colors"
    >
      {children}
    </a>
  );
};

export const Figure = ({
  src,
  alt,
  width,
  height,
  caption,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
}) => (
  <figure className="my-10">
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      className="w-full h-auto rounded-lg border border-white/10"
    />
    <figcaption className="mt-4 flex gap-3 text-sm leading-relaxed text-white/45">
      <span className="mt-[0.7em] h-px w-5 shrink-0 bg-red-500/70" />
      <span>{caption}</span>
    </figcaption>
  </figure>
);

export const Table = ({ head, rows }: { head: string[]; rows: string[][] }) => (
  <div className="overflow-x-auto mb-8">
    <table className="w-full text-left text-[15px] border-collapse">
      <thead>
        <tr className="border-b border-white/20">
          {head.map((cell, index) => (
            <th key={`${cell}-${index}`} className={`ink-label py-3 pr-4 text-white/45 ${index ? "text-right" : ""}`}>
              {cell}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row[0]} className="border-b border-white/[0.07] hover:bg-white/[0.03] transition-colors">
            {row.map((cell, index) => (
              <td
                key={`${row[0]}-${index}`}
                className={`py-2.5 pr-4 text-white/85 ${index ? "text-right tabular-nums" : "site-mono text-sm"}`}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
