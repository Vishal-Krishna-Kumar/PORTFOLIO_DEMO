import type { ReactNode } from "react";

// Building blocks shared by every blog post, so they all have the same typography.

export const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="text-2xl md:text-3xl font-bold text-white mt-12 mb-4 tracking-tight">{children}</h2>
);

export const P = ({ children }: { children: ReactNode }) => (
  <p className="text-[17px] leading-8 text-gray-300 mb-5">{children}</p>
);

export const UL = ({ children }: { children: ReactNode }) => (
  <ul className="list-disc pl-6 space-y-2 text-[17px] leading-8 text-gray-300 mb-5">{children}</ul>
);

export const Code = ({ children }: { children: ReactNode }) => (
  <code className="site-mono bg-white/10 px-1.5 py-0.5 rounded text-[0.88em] text-red-400">
    {children}
  </code>
);

export const Pre = ({ children }: { children: string }) => (
  <pre className="site-mono bg-black/50 border border-white/10 rounded-lg p-4 mb-6 overflow-x-auto text-sm leading-relaxed text-gray-200">
    <code className="site-mono">{children}</code>
  </pre>
);

export const A = ({ href, children }: { href: string; children: ReactNode }) => {
  const internal = href.startsWith("#") || href.startsWith("/");
  return (
    <a
      href={href}
      {...(internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      className="text-red-400 underline underline-offset-4 hover:text-red-400"
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
  <figure className="my-8">
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      className="w-full h-auto rounded-lg border border-white/10"
    />
    <figcaption className="text-sm text-gray-500 mt-3">{caption}</figcaption>
  </figure>
);

export const Table = ({ head, rows }: { head: string[]; rows: string[][] }) => (
  <div className="overflow-x-auto mb-6">
    <table className="w-full text-left text-[15px] border-collapse">
      <thead>
        <tr className="border-b border-white/15">
          {head.map((cell, index) => (
            <th
              key={`${cell}-${index}`}
              className={`py-2 pr-4 font-semibold text-gray-400 ${index ? "text-right" : ""}`}
            >
              {cell}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row[0]} className="border-b border-white/5">
            {row.map((cell, index) => (
              <td
                key={`${row[0]}-${index}`}
                className={`py-2 pr-4 text-gray-200 ${
                  index ? "text-right tabular-nums" : "site-mono text-sm"
                }`}
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
