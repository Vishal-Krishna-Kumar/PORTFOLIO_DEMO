import { Suspense, lazy, useEffect, useState } from "react";

import RecruiterSummary from "./components/RecruiterSummary";
import { BlogIndex, BlogPost } from "./site/Blog";
import Home from "./site/Home";
import "./site/motion.css";

// The original terminal-style interface is still available at /#/terminal. It is loaded only
// when asked for, so the main site stays light.
const Terminal = lazy(() => import("./App"));

/**
 * Address scheme (hash based, so every address works on a static host):
 *   /                  the main one-page site
 *   /#/blog            list of posts
 *   /#/blog/<slug>     one post
 *   /#/terminal        the terminal-style interface
 *   /#summary          the one-page summary for recruiters
 */
const Root = () => {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (hash === "#summary") {
    return (
      <RecruiterSummary
        onClose={() => {
          window.history.replaceState(null, "", window.location.pathname);
          setHash("");
        }}
      />
    );
  }
  if (hash.startsWith("#/terminal")) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <Terminal />
      </Suspense>
    );
  }
  if (hash.startsWith("#/blog/")) {
    return <BlogPost slug={decodeURIComponent(hash.slice("#/blog/".length))} />;
  }
  if (hash === "#/blog") {
    return <BlogIndex />;
  }
  return <Home />;
};

export default Root;
