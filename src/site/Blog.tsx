import { useEffect } from "react";

import Backdrop from "./Backdrop";
import { POSTS, formatDate } from "./posts";
import { SiteFooter, SiteNav } from "./Shell";

export const PostCard = ({ slug }: { slug: string }) => {
  const post = POSTS.find((item) => item.slug === slug);
  if (!post) return null;
  return (
    <a
      href={`#/blog/${post.slug}`}
      className="group block rounded-xl border border-white/10 bg-black/60 p-6 hover:border-blue-300/60 hover:bg-white/[0.04] transition-colors"
    >
      <p className="text-sm text-gray-500">
        {formatDate(post.date)} · {post.readingMinutes} min read
      </p>
      <h3 className="mt-2 text-xl font-semibold text-white group-hover:text-blue-300 transition-colors">
        {post.title}
      </h3>
      <p className="mt-2 text-gray-400 leading-relaxed">{post.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs uppercase tracking-wide border border-white/10 rounded-full px-3 py-1 text-gray-400"
          >
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
};

export const BlogIndex = () => {
  useEffect(() => {
    document.title = "Blog | Vishal Krishna Kumar";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="clean-site relative isolate min-h-screen text-gray-200">
      <Backdrop />
      <SiteNav />
      <main className="mx-auto max-w-3xl px-5 pt-28 pb-20">
        <p className="text-sm uppercase tracking-[0.25em] text-blue-300">Blog</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold text-white tracking-tight">
          Things I measured
        </h1>
        <p className="mt-4 text-lg text-gray-400">
          Short write-ups on retrieval, RAG evaluation and performance. Every number comes from
          code you can run.
        </p>
        <div className="mt-10 grid gap-5">
          {POSTS.map((post) => (
            <PostCard key={post.slug} slug={post.slug} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export const BlogPost = ({ slug }: { slug: string }) => {
  const post = POSTS.find((item) => item.slug === slug);

  useEffect(() => {
    document.title = post ? `${post.title} | Vishal Krishna Kumar` : "Blog | Vishal Krishna Kumar";
    window.scrollTo(0, 0);
  }, [post]);

  if (!post) {
    return (
      <div className="clean-site relative isolate min-h-screen text-gray-200">
        <Backdrop />
        <SiteNav />
        <main className="mx-auto max-w-3xl px-5 pt-28 pb-20">
          <h1 className="text-3xl font-bold text-white">Post not found</h1>
          <p className="mt-4">
            <a href="#/blog" className="text-blue-300 underline underline-offset-4">
              See all posts
            </a>
          </p>
        </main>
      </div>
    );
  }

  const { Content } = post;
  return (
    <div className="clean-site relative isolate min-h-screen text-gray-200">
      <Backdrop />
      <SiteNav />
      <main className="mx-auto max-w-3xl px-5 pt-28 pb-20">
        <a href="#/blog" className="text-sm text-gray-400 hover:text-blue-300 transition-colors">
          ← All posts
        </a>
        <p className="mt-8 text-sm text-gray-500">
          {formatDate(post.date)} · {post.readingMinutes} min read · Vishal Krishna Kumar
        </p>
        <h1 className="mt-3 text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
          {post.title}
        </h1>
        <p className="mt-5 mb-10 text-xl text-gray-400 leading-relaxed">{post.summary}</p>
        <article>
          <Content />
        </article>
        <div className="mt-14 pt-8 border-t border-white/10">
          <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4">More posts</p>
          <div className="grid gap-4">
            {POSTS.filter((item) => item.slug !== post.slug).map((item) => (
              <PostCard key={item.slug} slug={item.slug} />
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};
