import InteractiveParticles from "../components/InteractiveParticles";
import type { Theme } from "./theme";

const SCRIM = {
  dark: {
    narrow: "rgba(0,0,0,0.78)",
    wide: "linear-gradient(90deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.9) 80%, rgba(0,0,0,0.25) 100%)",
  },
  light: {
    narrow: "rgba(255,255,255,0.8)",
    wide: "linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.92) 20%, rgba(255,255,255,0.92) 80%, rgba(255,255,255,0.3) 100%)",
  },
};

/**
 * The page background: the dot artwork, with moving particles on top.
 * Dark theme uses the black artwork; light theme uses the light version. It fills the whole
 * window on every screen size, stays put while the page scrolls, and ignores the mouse.
 *
 * A scrim sits over it: strong behind the centre column where the text is, and light at the
 * edges so the artwork stays visible. On narrow screens text spans the full width, so the
 * scrim is even.
 */
const Backdrop = ({ theme }: { theme: Theme }) => (
  <div
    className={`fixed inset-0 -z-10 ${theme === "dark" ? "bg-black" : "bg-white"}`}
    aria-hidden="true"
  >
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          theme === "dark" ? "url('/creation_of_adam.jpeg')" : "url('/creation_of_adam_light.jpg')",
      }}
    />
    <InteractiveParticles theme={theme} />
    <div className="absolute inset-0 md:hidden" style={{ background: SCRIM[theme].narrow }} />
    <div className="absolute inset-0 hidden md:block" style={{ background: SCRIM[theme].wide }} />
  </div>
);

export default Backdrop;
