import InteractiveParticles from "../components/InteractiveParticles";

/**
 * The dotted artwork and moving particles from the terminal view, used behind every page of the
 * clean site so both views share one look. It sits behind the content and ignores the mouse.
 */
const Backdrop = () => (
  <div className="fixed inset-0 -z-10 bg-black" aria-hidden="true">
    <div className="absolute inset-0 hidden lg:block bg-[url('/creation_of_adam.jpeg')] bg-cover bg-center opacity-90" />
    <InteractiveParticles theme="dark" />
    {/* a light veil keeps long text readable over the artwork */}
    <div className="absolute inset-0 bg-black/55" />
  </div>
);

export default Backdrop;
