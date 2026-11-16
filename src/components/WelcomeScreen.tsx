import { useEffect, useRef, useState } from "react";

interface WelcomeScreenProps {
  onComplete: () => void;
}

/**
 * Short boot animation shown once when the site opens.
 * It starts by itself and can be skipped with a click or any key, so nobody is kept waiting.
 */
const WelcomeScreen = ({ onComplete }: WelcomeScreenProps) => {
  const [progress, setProgress] = useState(0);
  const finished = useRef(false);

  useEffect(() => {
    const finish = () => {
      if (finished.current) return;
      finished.current = true;
      onComplete();
    };

    // Respect visitors who ask for less motion: go straight in.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    let current = 0;
    const interval = window.setInterval(() => {
      current = Math.min(100, current + 6 + Math.random() * 10);
      setProgress(current);
      if (current >= 100) {
        window.clearInterval(interval);
        window.setTimeout(finish, 250);
      }
    }, 90);

    window.addEventListener("keydown", finish);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("keydown", finish);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center font-mono text-green-500 cursor-pointer"
      onClick={onComplete}
      role="status"
      aria-label="Loading portfolio"
    >
      <div className="w-full max-w-md px-8 text-center">
        <p className="mb-1 text-xs tracking-[0.3em] text-green-700 uppercase">
          Vishal Krishna Kumar
        </p>
        <p className="mb-3 text-xl font-bold">LOADING PORTFOLIO...</p>
        <div className="w-full h-3 bg-gray-900 border border-green-900 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 shadow-[0_0_15px_#22c55e]"
            style={{ width: `${progress}%`, transition: "width 0.1s ease-out" }}
          />
        </div>
        <p className="mt-2 text-right text-sm">{Math.floor(progress)}%</p>

        <div className="mt-4 h-20 text-left text-xs text-green-700 overflow-hidden flex flex-col-reverse">
          {progress > 75 && <p>Opening windows...</p>}
          {progress > 50 && <p>Loading projects and experience...</p>}
          {progress > 25 && <p>Fetching LeetCode and music activity...</p>}
          <p>Boot sequence started.</p>
        </div>
        <p className="mt-6 text-[11px] text-gray-600">click or press any key to skip</p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
