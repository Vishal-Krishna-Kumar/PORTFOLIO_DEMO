import InteractiveParticles from "../components/InteractiveParticles";
import type { Theme } from "./theme";

/**
 * The page background: the dot artwork, with moving particles on top.
 * Dark theme uses the black artwork; light theme uses the light version. It fills the whole
 * window on every screen size, stays put while the page scrolls, and ignores the mouse.
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
    {/* a thin veil keeps long text readable without hiding the artwork */}
    <div className={`absolute inset-0 ${theme === "dark" ? "bg-black/30" : "bg-white/35"}`} />
  </div>
);

export default Backdrop;
