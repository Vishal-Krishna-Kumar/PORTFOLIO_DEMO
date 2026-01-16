import { useState } from "react";

interface WelcomeScreenProps {
  onComplete: () => void;
}

const WelcomeScreen = ({ onComplete }: WelcomeScreenProps) => {
  const [listening, setListening] = useState(false);
  const [message, setMessage] = useState("Click microphone and say 'Access' to enter");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const startListening = () => {
    // Check if browser supports speech recognition
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMessage("Voice not supported. Click here to bypass.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();
    setListening(true);
    setMessage("Listening...");

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log("Heard:", transcript);
      setListening(false);

      // Check for keywords
      if (transcript.includes("access") || transcript.includes("open") || transcript.includes("enter") || transcript.includes("hello")) {
        setMessage("Access Granted.");
        startLoading();
      } else {
        setMessage(`Denied. You said: "${transcript}". Try 'Access'.`);
      }
    };

    recognition.onerror = () => {
      setListening(false);
      setMessage("Error hearing voice. Try again.");
    };
  };

  const startLoading = () => {
    setLoading(true);
    let currentProgress = 0;
    
    // Animate from 0 to 100 in roughly 3 seconds
    const interval = setInterval(() => {
      currentProgress += Math.random() * 5; // Random increments look more "hackery"
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(onComplete, 500); // Wait a split second at 100% then finish
      }
      setProgress(currentProgress);
    }, 100);
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center font-mono text-green-500">
      {!loading ? (
        <>
          <div className="mb-8 text-center space-y-2">
            <h1 className="text-4xl font-bold tracking-widest uppercase">System Locked</h1>
            <p className="text-sm opacity-70">Voice Verification Required</p>
          </div>

          <div className="relative group">
            <button
              onClick={startListening}
              className={`p-8 rounded-full border-2 transition-all duration-300 ${
                listening
                  ? "border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.6)] animate-pulse"
                  : "border-green-500 hover:bg-green-500/10 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]"
              }`}
            >
              {/* Microphone Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-12 h-12 ${listening ? "text-red-500" : "text-green-500"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </button>
          </div>

          <p className="mt-8 text-lg animate-pulse">{message}</p>
          
          {/* Fallback for no-mic users */}
          <button 
            onClick={() => startLoading()} 
            className="mt-12 text-xs text-gray-600 hover:text-gray-400 underline"
          >
            [ Manual Bypass ]
          </button>
        </>
      ) : (
        <div className="w-full max-w-md px-8 text-center">
          <p className="mb-2 text-xl font-bold">INITIALIZING SYSTEM...</p>
          <div className="w-full h-4 bg-gray-900 border border-green-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 shadow-[0_0_15px_#22c55e]"
              style={{ width: `${progress}%`, transition: "width 0.1s ease-out" }}
            />
          </div>
          <p className="mt-2 text-right">{Math.floor(progress)}%</p>
          
          <div className="mt-4 h-24 text-left text-xs text-green-700 overflow-hidden flex flex-col-reverse">
            {/* Fake boot sequence logs */}
            {progress > 80 && <p>Loading modules...</p>}
            {progress > 60 && <p>Verifying user credentials...</p>}
            {progress > 40 && <p>Connecting to secure server...</p>}
            {progress > 20 && <p>Decrypting data streams...</p>}
            <p>Boot sequence started.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeScreen;