import { A, H2, P, UL } from '../Prose';
import type { IPostMeta } from '../posts';

export const meta: IPostMeta = {
    slug: "scroll-driven-site-with-gsap",
    title: "Building a scroll-driven gaming site with React and GSAP",
    date: "2026-11-17",
    summary: "A front-end build that follows JavaScript Mastery's award-winning-website tutorial: video scenes that swap with a clip-path transition, and sections that animate as you scroll.",
    readingMinutes: 3,
    tags: ["Frontend", "GSAP", "React"],
};

const Post = () => (
    <>
        <P>{"The "}<A href="https://3d-gamingsite.netlify.app/">{"interactive gaming site"}</A>{" is a front-end project in React, GSAP and Tailwind CSS on Vite ("}<A href="https://github.com/Vishal-Krishna-Kumar/3D-GamingSite">{"code"}</A>{"). I built it by following "}<A href="https://github.com/adrianhajdin/award-winning-website">{"JavaScript Mastery's award-winning-website tutorial"}</A>{", and the design it reproduces is by "}<A href="https://zentry.com/">{"Zentry"}</A>{". It is a learning project, and this post is my notes on how the techniques work."}</P>
        <P>{"The 3D look comes from pre-rendered video and CSS transforms driven by scroll and pointer position, not from a real-time 3D engine."}</P>
        <H2>{"Video as the scene"}</H2>
        <P>{"The opening section cycles through four full-screen videos. Clicking the small preview in the centre expands it to fill the screen while the next video loads behind it, so the change reads as moving into a new scene instead of a cut. The effect is a GSAP animation of the incoming video's size together with a clip-path on the frame."}</P>
        <H2>{"Animation tied to scroll"}</H2>
        <UL>
            <li>{"GSAP's ScrollTrigger links an animation's progress to the scroll position. The About section pins in place while its image grows from a small clipped shape to the full screen, then releases."}</li>
            <li>{"Section titles are split into words that rotate and fade into place when the title scrolls into view."}</li>
            <li>{"Feature cards tilt toward the pointer with a CSS perspective transform computed from the mouse position inside the card."}</li>
            <li>{"The navigation bar hides when you scroll down and returns when you scroll up."}</li>
        </UL>
        <H2>{"Why it stays smooth"}</H2>
        <UL>
            <li>{"The animations change transform, opacity and clip-path rather than layout properties, so the browser does not have to re-lay out the page on every frame."}</li>
            <li>{"Each animation is created inside the component that owns it with GSAP's React hook, which also cleans it up when the component unmounts."}</li>
        </UL>
        <H2>{"What I would change"}</H2>
        <P>{"The videos are the heaviest part of the page. Smaller encodes and a still poster image for slow connections would be the first improvements."}</P>
    </>
);

export default Post;
