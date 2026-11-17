import { useLayoutEffect } from "react";

import { POSTS, formatDate } from "./posts";
import type { IPost } from "./posts";
import { Page, SectionLabel, jumpToTop } from "./Shell";

const FRAME = "relative min-h-screen bg-[#080808]/90 text-[#F1F0EC]";

/** One post as a row: number, title and summary, date. A red line draws over it on hover. */
export const PostRow = ({ post, index }: { post: IPost; index: number }) => (
  <li className="ink-row">
    <a
      href={`#/blog/${post.slug}`}
      data-cursor="Read"
      className="group grid grid-cols-12 gap-x-4 gap-y-2 items-baseline py-8"
    >
      <span className="ink-label col-span-12 md:col-span-1 text-red-500">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="col-span-12 md:col-span-7">
        <span className="block text-2xl md:text-[2rem] leading-[1.1] tracking-[-0.035em] text-[#F1F0EC] group-hover:translate-x-2 transition-transform duration-500">
          {post.title}
        </span>
        <span className="mt-3 block max-w-[640px] text-sm leading-relaxed text-white/55">{post.summary}</span>
        <span className="ink-label mt-4 block text-white/35">{post.tags.join(" / ")}</span>
      </span>
      <span className="ink-label col-span-12 md:col-span-4 md:text-right text-white/45">
        {formatDate(post.date)} · {post.readingMinutes} min read
      </span>
    </a>
  </li>
);

export const BlogIndex = () => {
  useLayoutEffect(() => {
    document.title = "Blog | Vishal Krishna Kumar";
    jumpToTop();
  }, []);

  return (
    <Page>
      <main className={FRAME}>
        <div className="px-[6vw] pt-36 pb-24">
          <SectionLabel index={String(POSTS.length).padStart(2, "0")}>Blog</SectionLabel>
          <h1 className="ink-display mt-8 text-[clamp(2.8rem,10vw,9rem)]">
            <span className="ink-line">
              <span>THINGS I</span>
            </span>
            <span className="ink-line">
              <span style={{ animationDelay: "110ms" }}>
                MEASURED<span className="text-red-500">.</span>
              </span>
            </span>
          </h1>
          <p className="rise mt-8 max-w-[560px] text-[15px] leading-[1.8] text-white/60" style={{ animationDelay: "400ms" }}>
            Short write-ups on retrieval, RAG evaluation and performance. Every number comes from
            code you can run.
          </p>
          <ul className="mt-16 border-b border-white/10">
            {POSTS.map((post, position) => (
              <PostRow key={post.slug} post={post} index={position} />
            ))}
          </ul>
        </div>
      </main>
    </Page>
  );
};

export const BlogPost = ({ slug }: { slug: string }) => {
  const post = POSTS.find((item) => item.slug === slug);

  useLayoutEffect(() => {
    document.title = post ? `${post.title} | Vishal Krishna Kumar` : "Blog | Vishal Krishna Kumar";
    jumpToTop();
  }, [post]);

  if (!post) {
    return (
      <Page>
        <main className={FRAME}>
          <div className="px-[6vw] pt-36 pb-24">
            <SectionLabel index="00">Blog</SectionLabel>
            <h1 className="ink-display mt-8 text-[clamp(2.4rem,8vw,7rem)]">POST NOT FOUND.</h1>
            <a href="#/blog" className="ink-link ink-label mt-10">
              All posts <span className="arrow">↗</span>
            </a>
          </div>
        </main>
      </Page>
    );
  }

  const { Content } = post;
  const others = POSTS.filter((item) => item.slug !== post.slug);
  return (
    <Page>
      <main className={FRAME}>
        <header className="px-[6vw] pt-36 pb-14 border-b border-white/10">
          <a href="#/blog" className="ink-link ink-label">
            <span className="arrow">←</span> All posts
          </a>
          <div className="mt-10">
            <SectionLabel index={String(POSTS.indexOf(post) + 1).padStart(2, "0")}>
              {post.tags.join(" / ")}
            </SectionLabel>
          </div>
          <h1 className="mt-8 max-w-[1100px] text-[clamp(2.2rem,5.4vw,5.2rem)] leading-[1.02] tracking-[-0.05em] text-[#F1F0EC]">
            {post.title}
          </h1>
          <p className="mt-8 max-w-[720px] text-lg md:text-xl leading-relaxed text-white/60">{post.summary}</p>
          <p className="ink-label mt-10 text-white/45">
            {formatDate(post.date)} · {post.readingMinutes} min read · Vishal Krishna Kumar
          </p>
        </header>

        <article className="px-[6vw] py-16 md:py-20">
          <div className="mx-auto max-w-[760px]">
            <Content />
          </div>
        </article>

        {others.length > 0 && (
          <section className="px-[6vw] pb-24">
            <SectionLabel index="→">More posts</SectionLabel>
            <ul className="mt-8 border-b border-white/10">
              {others.map((item, position) => (
                <PostRow key={item.slug} post={item} index={position} />
              ))}
            </ul>
          </section>
        )}
      </main>
    </Page>
  );
};
