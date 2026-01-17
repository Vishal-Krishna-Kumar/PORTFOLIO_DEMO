import React, { useState, useEffect, useRef, useCallback } from "react";
import CursorOverlay from "./components/CursorOverlay";
import WelcomeScreen from "./components/WelcomeScreen";
import type { LeetCodeData } from "./types/indexs";
import { experiencesData, projectsData, asciiList } from "./data/info";
import { Taskbar } from "./components/Taskbar";
import { ChevronLeft, ChevronRight, X, Play, Pause, ExternalLink, Code, FileText, Cpu, Database, Globe, Shield, Brain, Layers, RefreshCw } from "lucide-react";
import InteractiveParticles from "./components/InteractiveParticles";
import LeetCodeCalendar from "./components/LeetCodeCalendar";
import AnimatedEllipsis from "./components/AnimatedEllipsis";
import MusicWindow from "./components/MusicWindow";
import HeadTracker from "./components/HeadTracker";
// import HandTracker from "./components/HandTracker";

const achievementImages = [
  "/Certificate_Achievement/Certificate-1.png",
  "/Certificate_Achievement/Certificate-2.png",
  "/Certificate_Achievement/Certificate-3.png",
  "/Certificate_Achievement/Certificate-4.jpeg",
  "/Certificate_Achievement/Certificate-5.jpeg",
  "/Certificate_Achievement/Certificate-6.jpeg",
  "/Certificate_Achievement/Certificate-7.png",
];

// Add profile images array
const profileImages = [
  '/img-1.png',
  '/img-2.jpg',
  '/img-3.jpeg',
];

const App = () => {

    // Timer functions (must be inside App to access state)
    const startTimer = () => setIsTimerRunning(true);
    const pauseTimer = () => setIsTimerRunning(false);
    const resetTimer = () => {
      setIsTimerRunning(false);
      setTimerMinutes(customMinutes);
      setTimerSeconds(0);
      setTimerMode("work");
      setPomodoroCount(0);
    };
    const setCustomTimer = (minutes: number) => {
      setCustomMinutes(minutes);
      setTimerMinutes(minutes);
      setTimerSeconds(0);
      setIsTimerRunning(false);
    };
  const [isMultiplayer] = useState(false);
  const [entered, setEntered] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "dark" || saved === "light") return saved;
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        return "dark";
      } else {
        return "light";
      }
    }
    return "dark";
  });
  const [time, setTime] = useState(new Date());
  const [selectedAscii, setSelectedAscii] = useState(String);
  const [expandWindow, setExpandWindow] = useState(String);
  const [selectedWindow, setSelectedWindow] = useState("me");
  const [leetCode, setLeetCode] = useState<LeetCodeData | null>(null);
  const [experienceIndex, setExperienceIndex] = useState(0);
  const [projectIndex, setProjectIndex] = useState(0);
  const [projectSlideIndex, setProjectSlideIndex] = useState(0);
  const [, setAchievementIndex] = useState(0);
  const [selectProject, setSelectProject] = useState("");
  const [selectExperience, setSelectExperience] = useState("");
  const [selectedLinkIndex, setSelectedLinkIndex] = useState(0);
  const [selectedExperienceLinkIndex, setSelectedExperienceLinkIndex] =
    useState(0);
  const [command, setCommand] = useState("");
  const [lastCommand, setLastCommand] = useState("");

  // Video Slideshow State
  const [videoIndex, setVideoIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  
  // Display mode state for toggle between ASCII and images
  const [displayMode, setDisplayMode] = useState<'ascii' | 'images'>('images');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Snow effect state
  const [isSnowing, setIsSnowing] = useState(false);

  useEffect(() => {
    setVideoIndex(0);
    setIsVideoPlaying(true);
  }, [selectProject]);

  const handleVideoEnd = useCallback((demoVideosLength: number) => {
    setVideoIndex((prev) => (prev + 1) % demoVideosLength);
  }, []);

  const toggleVideoPlay = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const meWindowRef = useRef<HTMLDivElement>(null);
  const [timerMinutes, setTimerMinutes] = useState(30);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState<"work" | "break" | "longBreak">("work");
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [customMinutes, setCustomMinutes] = useState(30);
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [selectedTimerButton] = useState(0);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCertificatesOpen, setIsCertificatesOpen] = useState(false);
  const [currentCertificateIndex, setCurrentCertificateIndex] = useState(0);
  const [isCertificateZoomed, setIsCertificateZoomed] = useState(false);
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);
  const [selectedExpandedTimerButton] = useState(0);
  const [isHoveringCarousel, setIsHoveringCarousel] = useState(false);
  // Timer countdown logic (must be after timer state declarations)
  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      if (timerSeconds > 0) {
        setTimerSeconds((s) => s - 1);
      } else if (timerMinutes > 0) {
        setTimerMinutes((m) => m - 1);
        setTimerSeconds(59);
      } else {
        // Timer finished, switch mode
        if (timerMode === "work") {
          if (pomodoroCount < 3) {
            setTimerMode("break");
            setTimerMinutes(5);
            setTimerSeconds(0);
            setPomodoroCount((c) => c + 1);
          } else {
            setTimerMode("longBreak");
            setTimerMinutes(15);
            setTimerSeconds(0);
            setPomodoroCount(0);
          }
        } else {
          // break or longBreak finished, go to work
          setTimerMode("work");
          setTimerMinutes(customMinutes);
          setTimerSeconds(0);
        }
        setIsTimerRunning(false);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds, timerMinutes, timerMode, pomodoroCount, customMinutes]);

  const [achievementZoomIndex, setAchievementZoomIndex] = useState<number | null>(null);

  // Toggle display mode function
  const toggleDisplayMode = () => {
    setDisplayMode(prev => prev === 'ascii' ? 'images' : 'ascii');
  };

  // Toggle snow function
  const toggleSnow = () => {
    setIsSnowing(!isSnowing);
  };

  // Auto-change images every 3 seconds when in image mode
  useEffect(() => {
    if (displayMode === 'images') {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % profileImages.length);
      }, 120000); // Change every 3 mins

      return () => clearInterval(interval);
    }
  }, [displayMode]);

    // Listen for Taskbar overlay open events
    useEffect(() => {
      const openResume = () => setIsResumeOpen(true);
      const openCertificates = () => setIsCertificatesOpen(true);
      const openTimer = () => {
        setIsTimerOpen(true);
        setExpandWindow("timer");
      };
      const openLeetCode = () => {
        setIsTimerOpen(false);
        setExpandWindow("leetcode");
      };

      window.addEventListener("openResume", openResume);
      window.addEventListener("openCertificates", openCertificates);
      window.addEventListener("openTimer", openTimer);
      window.addEventListener("openLeetCode", openLeetCode);

      return () => {
        window.removeEventListener("openResume", openResume);
        window.removeEventListener("openCertificates", openCertificates);
        window.removeEventListener("openTimer", openTimer);
        window.removeEventListener("openLeetCode", openLeetCode);
      };
    }, []);

  // Head Tracking State
  const [isHeadTracking, setIsHeadTracking] = useState(false);
  // const [isHandTracking, setIsHandTracking] = useState(false); // Unused, removed
  const [headOffset, setHeadOffset] = useState({ x: 0, y: 0 });

  const handleHeadMove = useCallback((x: number, y: number) => {
    setHeadOffset({ x, y });
  }, []);

  // Pick random ASCII art
  useEffect(() => {
    setSelectedAscii(asciiList[Math.floor(Math.random() * asciiList.length)]);
  }, []);

  // Fetch initial data
  useEffect(() => {
    fetchLeetCode().then((data) => setLeetCode(data));
  }, []);

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Project image carousel auto-slide
  useEffect(() => {
    if (!selectProject || isHoveringCarousel) return;

    const selectedProjectData = projectsData.find(
      (p) => p.title === selectProject
    );

    if (!selectedProjectData || !selectedProjectData.images || 
        selectedProjectData.images.length <= 1) return;

    const total = selectedProjectData.images.length;

    const interval = setInterval(() => {
      setProjectSlideIndex((prev) => (prev + 1) % total);
    }, 3000);

    return () => clearInterval(interval);
  }, [selectProject, projectSlideIndex, isHoveringCarousel]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isResumeOpen || isCertificatesOpen) return;

      if (zoomIndex !== null) {
        const selectedProjectData = projectsData.find(
          (p) => p.title === selectProject
        );
        if (!selectedProjectData || !selectedProjectData.images) return;

        if (e.key === "Escape") {
          setZoomIndex(null);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          const newIndex = (zoomIndex - 1 + selectedProjectData.images.length) % 
            selectedProjectData.images.length;
          setZoomIndex(newIndex);
          setProjectSlideIndex(newIndex);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          const newIndex = (zoomIndex + 1) % selectedProjectData.images.length;
          setZoomIndex(newIndex);
          setProjectSlideIndex(newIndex);
        }
        return;
      }

      if (achievementZoomIndex !== null) {
        if (e.key === "Escape") {
          setAchievementZoomIndex(null);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          const newIndex = (achievementZoomIndex - 1 + achievementImages.length) % achievementImages.length;
          setAchievementZoomIndex(newIndex);
          setAchievementIndex(newIndex);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          const newIndex = (achievementZoomIndex + 1) % achievementImages.length;
          setAchievementZoomIndex(newIndex);
          setAchievementIndex(newIndex);
        }
        return;
      }

      // Existing navigation logic...
      if (selectedWindow === "me") {
        if (e.key === "Enter") setExpandWindow("me");
      }
      // ... rest of existing navigation code
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    selectedWindow,
    expandWindow,
    experienceIndex,
    projectIndex,
    selectProject,
    selectedLinkIndex,
    selectExperience,
    selectedExperienceLinkIndex,
    isResumeOpen,
    isCertificatesOpen,
    zoomIndex,
    projectSlideIndex,
    achievementZoomIndex,
  ]);

  // Reset selected link index when project changes
  useEffect(() => {
    if (selectProject) {
      const selectedProjectData = projectsData.find(
        (p) => p.title === selectProject
      );
      if (selectedProjectData) {
        setSelectedLinkIndex(selectedProjectData.links?.length ?? 0);
      }
    } else {
      setSelectedLinkIndex(0);
    }
  }, [selectProject]);

  // Reset selected experience link index when experience changes
  useEffect(() => {
    if (selectExperience) {
      const selectedExperienceData = experiencesData.find(
        (exp) => exp.title === selectExperience
      );
      if (selectedExperienceData) {
        setSelectedExperienceLinkIndex(selectedExperienceData.links?.length ?? 0);
      }
    } else {
      setSelectedExperienceLinkIndex(0);
    }
  }, [selectExperience]);

  async function fetchLeetCode() {
    const res = await fetch("https://leetcode-stats.tashif.codes/vishalkrish");
    
    if (!res.ok) {
      console.error(await res.text());
      return null;
    }
    const data = await res.json();
    
    if (data.status === "error") {
      console.error("LeetCode API error:", data.message);
      return null;
    }
    const stats = {
      easySolved: data.easySolved,
      hardSolved: data.hardSolved,
      mediumSolved: data.mediumSolved,
      totalSolved: data.totalSolved,
      submissionCalendar: data.submissionCalendar,
    };
    return stats;
  }

  // CLI AI function
  async function askQuestion(q: string, onChunk: (chunk: string) => void) {
    setIsLoading(true);
    try {
      const messages = [
        { role: "user", content: q }
      ];

      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      });

      if (!res.ok) {
        try {
          const errData = await res.json();
          if (errData.response) {
            onChunk(errData.response);
            return;
          }
        } catch (e) {}
        
        console.error("Ask API error:", res.status);
        onChunk("Sorry, I'm having trouble connecting to my AI brain right now. Please try again in a few minutes!");
        return;
      }

      const data = await res.json();
      const fullResponse = data.answer || "Sorry, I couldn't generate a response.";

      const words = fullResponse.split(" ");
      
      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const chunk = (i === 0 ? "" : " ") + word;
        onChunk(chunk);

        let delay = 15 + Math.random() * 15;
        if (word.includes(".") || word.includes("!") || word.includes("?")) {
          delay += 100 + Math.random() * 100;
        }
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

    } catch (error) {
      console.error("Error calling ask API:", error);
      onChunk("Sorry, I'm having trouble connecting to my AI brain right now. Please try again in a few minutes!");
    } finally {
      setIsLoading(false);
    }
  }

  const handleCommand = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && command && !isLoading) {
      const lowerCmd = command.toLowerCase().trim();
      
      setLastCommand(command);
      setCommand("");
      setResponse("");
      setIsLoading(true);

      if (lowerCmd === "resume" || lowerCmd === "download cv" || lowerCmd === "cv") {
        try {
          const link = document.createElement("a");
          link.href = "/resume.pdf";
          link.download = "Vishal_Krishna_Resume.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          setResponse("Initiating download... Check your downloads folder! 📄");
        } catch (err) {
          setResponse("Error: Could not download the file. Please try again.");
        } finally {
          setIsLoading(false);
        }
        return;
      }

      if (lowerCmd === "skills" || lowerCmd === "neofetch") {
        const asciiArt = `
   .\\^/.      User:   Vishal@Portfolio
 . | ^ | .    OS:     WebOS v1.0
 | | - | |    Shell:  ZSH
  '|___|'     -----------------------
   '---'      Langs:  Python, TS, C++
              Tools:  React, Docker, AI
              Status: 🟢 Online
        `;
        setResponse(asciiArt);
        setIsLoading(false);
        return;
      }

      try {
        await askQuestion(command, (chunk: string) => {
          setResponse((prev) => prev + chunk);
        });
      } catch (error) {
        console.error("Error streaming response:", error);
        setResponse("Sorry, something went wrong. Try again?");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Auto-focus CLI input
  useEffect(() => {
    if (selectedWindow === "cli") {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
  }, [selectedWindow]);

  // Theme management
  useEffect(() => {
    const handler = () =>
      setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    window.addEventListener("toggleTheme", handler);
    return () => window.removeEventListener("toggleTheme", handler);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  // Listen for OS theme changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleChange = (e: MediaQueryListEvent) => {
        const savedTheme = localStorage.getItem("theme");
        if (!savedTheme) {
          setTheme(e.matches ? "dark" : "light");
        }
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  const isDark = theme === "dark";
  const windowThemeClass = isDark
    ? "bg-black/80 border border-gray-700"
    : "bg-[#F6F6F6]/90 border border-gray-300";
  const gridThemeClass = isDark
    ? "bg-gray-900/40 border border-gray-700"
    : "bg-gray-100/60 border border-gray-300";
  const overlayThemeClass = isDark
    ? "bg-black/90 border border-gray-700"
    : "bg-white border border-gray-300";
  const headerClass = (selected: boolean) =>
    isDark
      ? selected
        ? "bg-white text-black"
        : "bg-gray-400 text-black"
      : selected
      ? "bg-gray-400 text-black"
      : "bg-gray-200 text-black";

  const focusInput = () => {
    inputRef.current?.focus();
  };

  // Window navigation with arrow keys
  useEffect(() => {
    if (isResumeOpen || isCertificatesOpen || zoomIndex !== null || achievementZoomIndex !== null) return;

    const windowOrder = isTimerOpen
      ? ["me", "experience", "projects", "spotify", "timer", "cli"]
      : ["me", "experience", "projects", "spotify", "leetcode", "cli"];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (expandWindow) return;

      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        const currentIndex = windowOrder.indexOf(selectedWindow);
        let nextIndex;

        if (e.key === "ArrowRight") {
          nextIndex = (currentIndex + 1) % windowOrder.length;
        } else {
          nextIndex =
            (currentIndex - 1 + windowOrder.length) % windowOrder.length;
        }

        setSelectedWindow(windowOrder[nextIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    selectedWindow,
    expandWindow,
    isTimerOpen,
    isResumeOpen,
    isCertificatesOpen,
    zoomIndex,
    achievementZoomIndex,
  ]);

  // Professional Project Render Functions
  const renderProjectMetrics = (metrics: any[]) => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
        {metrics.map((metric, idx) => (
          <div 
            key={idx}
            className={`rounded-lg p-3 text-center ${
              isDark ? "bg-gray-800/50" : "bg-gray-100"
            }`}
          >
            <div className={`text-2xl font-bold ${
              metric.color === 'green' ? 'text-green-400' :
              metric.color === 'blue' ? 'text-blue-400' :
              metric.color === 'red' ? 'text-red-400' : 'text-purple-400'
            }`}>
              {metric.value}
            </div>
            <div className={`text-xs ${isDark ? "text-gray-300" : "text-gray-600"} mt-1`}>
              {metric.label}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderTechStack = (techStack: string[]) => {
    return (
      <div className="flex flex-wrap gap-2 mt-3">
        {techStack.map((tech, idx) => (
          <span
            key={idx}
            className={`px-3 py-1 rounded-full text-xs ${
              isDark 
                ? "bg-blue-900/30 text-blue-300 border border-blue-700/50" 
                : "bg-blue-100 text-blue-700 border border-blue-200"
            }`}
          >
            {tech}
          </span>
        ))}
      </div>
    );
  };

  const renderProjectFeatures = (features: string[], icon: React.ReactNode) => {
    return (
      <ul className="space-y-2 mt-3">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start space-x-2">
            <span className="mt-1">{icon}</span>
            <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  // Navigation functions for project carousel
  const nextImage = useCallback(() => {
    const selectedProjectData = projectsData.find(
      (p) => p.title === selectProject
    );
    if (!selectedProjectData || !selectedProjectData.images) return;
    const newIndex = (projectSlideIndex + 1) % selectedProjectData.images.length;
    setProjectSlideIndex(newIndex);
  }, [selectProject, projectSlideIndex]);

  const prevImage = useCallback(() => {
    const selectedProjectData = projectsData.find(
      (p) => p.title === selectProject
    );
    if (!selectedProjectData || !selectedProjectData.images) return;
    const newIndex = (projectSlideIndex - 1 + selectedProjectData.images.length) % 
      selectedProjectData.images.length;
    setProjectSlideIndex(newIndex);
  }, [selectProject, projectSlideIndex]);

  // Navigation functions for project zoomed view
  const nextZoomImage = useCallback(() => {
    if (zoomIndex === null) return;
    const selectedProjectData = projectsData.find(
      (p) => p.title === selectProject
    );
    if (!selectedProjectData || !selectedProjectData.images) return;
    const newIndex = (zoomIndex + 1) % selectedProjectData.images.length;
    setZoomIndex(newIndex);
    setProjectSlideIndex(newIndex);
  }, [zoomIndex, selectProject]);

  const prevZoomImage = useCallback(() => {
    if (zoomIndex === null) return;
    const selectedProjectData = projectsData.find(
      (p) => p.title === selectProject
    );
    if (!selectedProjectData || !selectedProjectData.images) return;
    const newIndex = (zoomIndex - 1 + selectedProjectData.images.length) % 
      selectedProjectData.images.length;
    setZoomIndex(newIndex);
    setProjectSlideIndex(newIndex);
  }, [zoomIndex, selectProject]);

  // Navigation functions for achievements
  const nextZoomAchievement = useCallback(() => {
    if (achievementZoomIndex === null) return;
    const newIndex = (achievementZoomIndex + 1) % achievementImages.length;
    setAchievementZoomIndex(newIndex);
    setAchievementIndex(newIndex);
  }, [achievementZoomIndex]);

  const prevZoomAchievement = useCallback(() => {
    if (achievementZoomIndex === null) return;
    const newIndex = (achievementZoomIndex - 1 + achievementImages.length) % achievementImages.length;
    setAchievementZoomIndex(newIndex);
    setAchievementIndex(newIndex);
  }, [achievementZoomIndex]);

  if (!entered) {
    return <WelcomeScreen onComplete={() => setEntered(true)} />;
  }

  return (
    <div
      className={`${
        isDark
          ? "bg-black text-white lg:bg-[url('/creation_of_adam.jpeg')]"
          : "bg-white text-black lg:bg-[url('/creation_of_adam_light.jpg')]"
      } min-h-screen w-screen flex items-center justify-center py-6 pb-24 lg:py-8 lg:pb-20 bg-fixed bg-cover bg-center overscroll-none relative`}
    >
      <CursorOverlay enabled={isMultiplayer} />
      <InteractiveParticles theme={theme} />
      
      {/* Snow Effect Overlay */}
      {isSnowing && (
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
          {Array.from({ length: 200 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-[-20px]"
              style={{
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                backgroundColor: 'white',
                borderRadius: '50%',
                animation: `snowfall ${Math.random() * 8 + 5}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
                boxShadow: '0 0 5px white',
                opacity: Math.random() * 0.7 + 0.3,
              }}
            />
          ))}
          <style>{`
            @keyframes snowfall {
              0% {
                transform: translateY(-20px) translateX(0px);
                opacity: 0.8;
              }
              10% {
                transform: translateY(10vh) translateX(${Math.random() * 20 - 10}px);
              }
              20% {
                transform: translateY(20vh) translateX(${Math.random() * 20 - 10}px);
              }
              30% {
                transform: translateY(30vh) translateX(${Math.random() * 20 - 10}px);
              }
              40% {
                transform: translateY(40vh) translateX(${Math.random() * 20 - 10}px);
              }
              50% {
                transform: translateY(50vh) translateX(${Math.random() * 20 - 10}px);
              }
              60% {
                transform: translateY(60vh) translateX(${Math.random() * 20 - 10}px);
              }
              70% {
                transform: translateY(70vh) translateX(${Math.random() * 20 - 10}px);
              }
              80% {
                transform: translateY(80vh) translateX(${Math.random() * 20 - 10}px);
                opacity: 0.4;
              }
              90% {
                transform: translateY(90vh) translateX(${Math.random() * 20 - 10}px);
                opacity: 0.2;
              }
              100% {
                transform: translateY(100vh) translateX(${Math.random() * 20 - 10}px);
                opacity: 0;
              }
            }
          `}</style>
        </div>
      )}
      
      <HeadTracker 
        isEnabled={isHeadTracking}
        onToggle={(val) => {
          setIsHeadTracking(val);
          // if(val) setIsHandTracking(false); // Removed, not used
        }} 
        onHeadMove={handleHeadMove} 
      />

      {/* Snow Toggle Button - Positioned below Head Motion button */}
      <div className="fixed top-20 right-4 z-20">
        <button
          onClick={toggleSnow}
          className={`px-3 py-2 rounded-lg transition-all duration-300 shadow-lg text-sm font-medium ${
            isSnowing
              ? 'bg-blue-500 text-white'
              : isDark
              ? 'bg-gray-800 text-gray-200 hover:bg-gray-700'
              : 'bg-white text-gray-800 hover:bg-gray-100'
          }`}
          title={isSnowing ? "Stop Snow" : "Let it Snow"}
        >
          {isSnowing ? '❄ Stop Snow' : '❄ Let it Snow'}
        </button>
      </div>

      {/* Bento box grid */}
      <div
        style={{
          transform: isHeadTracking 
            ? `perspective(1000px) rotateY(${headOffset.x * 15}deg) rotateX(${headOffset.y * 15}deg) scale(0.95)` 
            : undefined,
          transition: 'transform 0.1s ease-out'
        }}
        className={`relative grid grid-cols-2 lg:grid-cols-4 lg:row-span-4 w-full mx-1 gap-3 rounded-2xl p-1.5 ${gridThemeClass} max-w-6xl lg:justify-center lg:min-h-[70vh] ${
          isDark ? "shadow-xl" : "shadow-sm"
        }`}
      >
        {/* Main terminal window */}
        <div
          className={`${windowThemeClass} rounded-xl col-span-2 flex flex-col order-1 ${
            expandWindow ? "opacity-0" : ""
          } transition-opacity duration-500`}
          onClick={() => setSelectedWindow("me")}
        >
          <p
            className={`rounded-t-xl text-sm text-center relative ${headerClass(
              selectedWindow === "me"
            )}`}
          >
            me - zsh
            <button className="rounded-full p-1 bg-red-500 absolute right-10 top-1/2 -translate-y-1/2" />
            <button
              className="rounded-full p-1 bg-yellow-500 absolute right-6 top-1/2 -translate-y-1/2"
              onClick={() => setExpandWindow("")}
            />
            <button
              className="rounded-full p-1 bg-green-500 absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setExpandWindow("me")}
            />
          </p>
          <div className="my-auto flex">
            {displayMode === 'ascii' ? (
              <p
                className={`text-[4px] font-mono whitespace-pre min-w-1/2 text-center ${
                  isDark ? "text-blue-100" : "text-[#000000]"
                }`}
              >
                {selectedAscii}
              </p>
            ) : (
              <div className="min-w-1/2 flex items-center justify-center p-2">
                <img 
                  src={profileImages[currentImageIndex]} 
                  alt="Profile" 
                  className="w-48 h-48 object-cover rounded-lg shadow-lg transition-all duration-500 transform hover:scale-105"
                />
              </div>
            )}
            <div className="mx-auto min-w-1/2 mt-2">
              <p
                className={`${
                  isDark ? "text-blue-300" : "text-[#2A8EE0]"
                } text-sm lg:text-lg`}
              > 
                Vishal@MacbookPro
              </p>
              <p className="text-[9px] lg:text-sm mb-2">
                vishalkrishnakkr@gmail.com
              </p>
              <p className="ml-4 text-xs lg:text-sm">Machine Learning Engineer</p>
              <p className="ml-4 text-xs lg:text-sm">CS @ CityU</p>
              <p className="ml-4 text-xs lg:text-sm">Seattle, WA</p>
              <p className="ml-4 text-xs lg:text-sm">
                {time.toLocaleTimeString()}
              </p>
              <p className="ml-4 mt-2 text-xs hidden lg:block text-gray-400">
                <span className="inline-block text-lg">☆</span> try arrows keys & enter!
              </p>
              <div className="flex items-center gap-2 ml-4 mt-2 mb-2">
                <button
                  className="text-xs block text-left text-gray-400 underline"
                  onClick={() => setExpandWindow("me")}
                >
                  about me!
                </button>
                <button
                  onClick={toggleDisplayMode}
                  className={`p-1 rounded-full transition-all duration-300 ${
                    isDark 
                      ? "bg-gray-700 hover:bg-gray-600" 
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  title={`Switch to ${displayMode === 'ascii' ? 'images' : 'ASCII'}`}
                >
                  <RefreshCw className={`w-3 h-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Now Playing Window */}
        <div
          className={`${windowThemeClass} ${
            isTimerOpen
              ? "col-span-2 lg:col-span-1"
              : "col-span-2 lg:col-span-1 lg:row-span-1"
          } rounded-xl order-2 overflow-hidden ${
            expandWindow ? "opacity-0" : ""
          } transition-opacity duration-500`}
          onClick={() => {
            setSelectedWindow("spotify");
            setExpandWindow("spotify");
          }}
        >
          <p
            className={`rounded-t-xl text-sm text-center relative ${headerClass(
              selectedWindow === "spotify"
            )}`}
          >
            now-playing - zsh
            <button className="rounded-full p-1 bg-red-500 absolute right-10 top-1/2 -translate-y-1/2" />
            <button className="rounded-full p-1 bg-yellow-500 absolute right-6 top-1/2 -translate-y-1/2" />
            <button
              className="rounded-full p-1 bg-green-500 absolute right-2 top-1/2 -translate-y-1/2"
              onClick={(e) => {
                e.stopPropagation();
                setExpandWindow("spotify");
              }}
            />
          </p>
          <div className="mt-2 mx-2 h-full">
            <MusicWindow isDark={isDark} />
          </div>
        </div>

        {/* LeetCode */}
        {!isTimerOpen && (
          <div
            className={`${windowThemeClass} col-span-2 lg:col-span-1 rounded-xl order-7 row-start-6 lg:row-start-2 overflow-hidden ${
              expandWindow ? "opacity-0" : ""
            } transition-opacity duration-500`}
            onClick={() => setSelectedWindow("leetcode")}
          >
            <p
              className={`rounded-t-xl text-sm text-center relative ${headerClass(
                selectedWindow === "leetcode"
              )}`}
            >
              leetcode - zsh
              <button className="rounded-full p-1 bg-red-500 absolute right-10 top-1/2 -translate-y-1/2" />
              <button className="rounded-full p-1 bg-yellow-500 absolute right-6 top-1/2 -translate-y-1/2" />
              <button
                className="rounded-full p-1 bg-green-500 absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setExpandWindow("leetcode")}
              />
            </p>
            <div className="w-full flex flex-col items-center justify-center my-2">
              {leetCode && leetCode.totalSolved ? (
                <div className="flex items-center gap-4 py-4">
                  <a
                    href="https://leetcode.com/vishalkrish/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-20 h-20 rounded-xl p-1 flex items-center justify-center cursor-pointer ${
                      isDark ? "bg-gray-100" : "bg-gray-200"
                    }`}
                  >
                    <img
                      src="/leetcode_color.png"
                      alt="LeetCode Logo"
                      className={`w-20 h-20 rounded-xl p-1 object-contain ${
                        isDark ? "bg-gray-100" : "bg-gray-200"
                      }`}
                    />
                  </a>
                  <div className="flex-grow">
                    <p
                      className={`text-lg font-bold ${
                        isDark ? "text-white" : "text-gray-800"
                      }`}
                    >
                      total solved: {leetCode.totalSolved}
                    </p>
                    <div className="flex flex-col justify-between text-sm">
                      <p className="text-green-400">
                        easy: {leetCode.easySolved}
                      </p>
                      <p className="text-yellow-400">
                        medium: {leetCode.mediumSolved}
                      </p>
                      <p className="text-red-400">
                        hard: {leetCode.hardSolved}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p
                  className={`text-sm mt-4 p-4 ${
                    isDark ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  fetching leetcode stats...
                </p>
              )}
              {leetCode && leetCode.submissionCalendar && (
                <div className="max-h-24 overflow-y-auto">
                  <LeetCodeCalendar
                    submissionCalendar={leetCode.submissionCalendar}
                    isDark={isDark}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* CLI LLM about me */}
        <div
          className={`${windowThemeClass} col-span-2 lg:col-span-1 lg:row-span-2 rounded-xl order-3 ${
            expandWindow ? "opacity-0" : ""
          } transition-opacity duration-500 flex flex-col min-h-0`}
          onClick={() => {
            setSelectedWindow("cli");
            focusInput();
          }}
        >
          <p
            className={`rounded-t-xl text-sm text-center relative top-0 ${headerClass(
              selectedWindow === "cli"
            )}`}
          >
            vishal-chat - zsh
            <button
              className="rounded-full p-1 bg-red-500 absolute right-10 top-1/2 -translate-y-1/2"
              onClick={() => setExpandWindow("")}
            />
            <button
              className="rounded-full p-1 bg-yellow-500 absolute right-6 top-1/2 -translate-y-1/2"
              onClick={() => setExpandWindow("")}
            />
            <button
              className="rounded-full p-1 bg-green-500 absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setExpandWindow("cli")}
            />
          </p>
          <div
            className="font-mono text-sm flex-grow overflow-y-auto lg:h-0"
            onClick={focusInput}
          >
            {lastCommand && (
              <>
                <div className="flex items-center py-2 px-4">
                  <span className="text-blue-400">❯</span>
                  <p
                    className={`ml-2 ${
                      isDark ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    {lastCommand}
                  </p>
                </div>
                {isLoading && (
                  <p
                    className={`${
                      isDark ? "text-gray-200" : "text-gray-800"
                    } whitespace-pre-wrap px-4`}
                  >
                    hmm
                    <AnimatedEllipsis />
                  </p>
                )}
                {response && (
                  <p
                    className={`${
                      isDark ? "text-gray-200" : "text-gray-800"
                    } whitespace-pre-wrap px-4 select-text cursor-text`}
                  >
                    {response}
                  </p>
                )}
              </>
            )}
            <div className="flex items-center py-2 px-4">
              <span className="text-blue-400">❯</span>
              <input
                ref={inputRef}
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={handleCommand}
                disabled={isLoading}
                className={`bg-transparent border-none ${isLoading ? 'cursor-not-allowed opacity-50' : ''} ${
                  isDark
                    ? "text-gray-200 placeholder:text-gray-400"
                    : "text-gray-800 placeholder:text-gray-400"
                } w-full focus:outline-none ml-2`}
                placeholder={isLoading ? "thinking..." : "ask me anything!"}
              />
            </div>
          </div>
        </div>

        {/* Experience */}
        <div
          className={`${windowThemeClass} col-span-2 lg:col-span-1 rounded-xl order-4 row-start-2 ${
            expandWindow ? "opacity-0" : ""
          } transition-opacity duration-500`}
          onClick={() => setSelectedWindow("experience")}
        >
          <p
            className={`rounded-t-xl text-sm text-center relative ${headerClass(
              selectedWindow === "experience"
            )}`}
          >
            experience - zsh
            <button className="rounded-full p-1 bg-red-500 absolute right-10 top-1/2 -translate-y-1/2" />
            <button className="rounded-full p-1 bg-yellow-500 absolute right-6 top-1/2 -translate-y-1/2" />
            <button
              className="rounded-full p-1 bg-green-500 absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setExpandWindow("experience")}
            />
          </p>
          <div className="my-2 mx-4">
            {experiencesData.map((experience, index) => (
              <div
                key={index}
                className={`rounded-md text-sm lg:text-base transition-all duration-150 cursor-pointer my-2 lg:my-1 ${
                  index === experienceIndex
                    ? `${
                        isDark ? "text-white" : "text-gray-800"
                      } font-bold underline`
                    : `bg-transparent ${
                        isDark ? "text-blue-300" : "text-[#75b8eb]"
                      }`
                }`}
                onClick={() => {
                  setExpandWindow("experience");
                  setSelectExperience(experience.title);
                  setExperienceIndex(index);
                }}
              >
                {experience.title} {index == experienceIndex ? " ❮" : ""}
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div
          className={`${windowThemeClass} col-span-2 lg:col-span-1 rounded-xl order-5 row-start-3 lg:row-start-2 ${
            expandWindow ? "opacity-0" : ""
          } transition-opacity duration-500`}
          onClick={() => setSelectedWindow("projects")}
        >
          <p
            className={`rounded-t-xl text-sm text-center relative ${headerClass(
              selectedWindow === "projects"
            )}`}
          >
            projects - zsh
            <button className="rounded-full p-1 bg-red-500 absolute right-10 top-1/2 -translate-y-1/2" />
            <button className="rounded-full p-1 bg-yellow-500 absolute right-6 top-1/2 -translate-y-1/2" />
            <button
              className="rounded-full p-1 bg-green-500 absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setExpandWindow("projects")}
            />
          </p>
          <div className="mt-2 mx-4">
            {projectsData.map((project, index) => (
              <div
                key={index}
                className={`rounded-md text-sm lg:text-base transition-all duration-150 cursor-pointer my-2 lg:my-1 ${
                  index === projectIndex
                    ? `${
                        isDark ? "text-white" : "text-gray-800"
                      } font-bold underline`
                    : `bg-transparent ${
                        isDark ? "text-blue-300" : "text-[#75b8eb]"
                      }`
                }`}
                onClick={() => {
                  setExpandWindow("projects");
                  setProjectIndex(index);
                  setSelectProject(project.title);
                }}
              >
                {project.title}
                {index === projectIndex ? " ❮" : ""}
              </div>
            ))}
          </div>
        </div>

        {/* Pomodoro Timer */}
        {isTimerOpen && (
          <div
            className={`${windowThemeClass} col-span-2 lg:col-span-1 rounded-xl order-6 ${
              expandWindow ? "opacity-0" : ""
            } transition-opacity duration-500`}
            onClick={() => setSelectedWindow("timer")}
          >
            <p
              className={`rounded-t-xl text-sm text-center relative ${headerClass(
                selectedWindow === "timer"
              )}`}
            >
              pomodoro - zsh
              <button
                className="rounded-full p-1 bg-red-500 absolute right-10 top-1/2 -translate-y-1/2"
                onClick={() => setIsTimerOpen(false)}
              />
              <button className="rounded-full p-1 bg-yellow-500 absolute right-6 top-1/2 -translate-y-1/2" />
              <button
                className="rounded-full p-1 bg-green-500 absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setExpandWindow("timer")}
              />
            </p>
            <div className="mt-3 mx-4 pb-4">
              <div className="flex flex-col items-center justify-center">
                <p className={`${isDark ? "text-gray-300" : "text-gray-600"} text-xs`}>
                  {timerMode === "work"
                    ? "Work"
                    : timerMode === "break"
                    ? "Break"
                    : "Long Break"}
                  {pomodoroCount > 0 ? ` • ${pomodoroCount}/4` : ""}
                </p>
                <p
                  className={`mt-1 font-bold tracking-widest text-3xl ${
                    isDark ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  {String(timerMinutes).padStart(2, "0")}:
                  {String(timerSeconds).padStart(2, "0")}
                </p>
              </div>

              <div className="mt-3 flex flex-col gap-2 text-sm">
                <button
                  className={`text-left transition-all duration-150 cursor-pointer ${
                    selectedTimerButton === 0
                      ? `${isDark ? "text-white" : "text-gray-800"} font-bold underline`
                      : `bg-transparent ${isDark ? "text-blue-300" : "text-[#75b8eb]"}`
                  }`}
                  onClick={() => (isTimerRunning ? pauseTimer() : startTimer())}
                >
                  [1] {isTimerRunning ? "Pause" : "Start"}
                  {selectedTimerButton === 0 ? " ❮" : ""}
                </button>

                <button
                  className={`text-left transition-all duration-150 cursor-pointer ${
                    selectedTimerButton === 1
                      ? `${isDark ? "text-white" : "text-gray-800"} font-bold underline`
                      : `bg-transparent ${isDark ? "text-blue-300" : "text-[#75b8eb]"}`
                  }`}
                  onClick={resetTimer}
                >
                  [2] Reset
                  {selectedTimerButton === 1 ? " ❮" : ""}
                </button>

                <button
                  className={`text-left transition-all duration-150 cursor-pointer ${
                    selectedTimerButton === 2
                      ? `${isDark ? "text-white" : "text-gray-800"} font-bold underline`
                      : `bg-transparent ${isDark ? "text-blue-300" : "text-[#75b8eb]"}`
                  }`}
                  onClick={() => setExpandWindow("timer")}
                >
                  [3] Expand
                  {selectedTimerButton === 2 ? " ❮" : ""}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Expanded overlay when user clicks */}
        {expandWindow && (
          <div className="lg:absolute lg:inset-0 fixed inset-0 z-20 transition-opacity duration-300 lg:h-full h-screen max-h-screen overflow-y-auto flex items-center justify-center lg:items-stretch lg:justify-stretch">
            {expandWindow === "me" && (
              <div
                ref={meWindowRef}
                className={`w-full h-full lg:w-full lg:h-full max-w-4xl max-h-[90vh] lg:max-w-none lg:max-h-none ${windowThemeClass} rounded-xl lg:rounded-none overflow-y-auto focus:outline-none relative pb-24 lg:pb-24 overscroll-none`}
                tabIndex={0}
              >
                <p
                  className={`rounded-t-xl lg:rounded-none text-sm text-center sticky top-0 left-0 right-0 ${headerClass(
                    true
                  )}`}
                >
                  me - zsh
                  <button
                    className="rounded-full p-1 bg-red-500 absolute right-10 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={() => setExpandWindow("")}
                  />
                  <button
                    className="rounded-full p-1 bg-yellow-500 absolute right-6 top-1/2 -translate-y-1/2"
                    onClick={() => setExpandWindow("")}
                  />
                  <button
                    className="rounded-full p-1 bg-green-500 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={() => setExpandWindow("me")}
                  />
                </p>
                <div className="flex mt-6">
                  {displayMode === 'ascii' ? (
                    <p
                      className={`text-[4px] ${
                        isDark ? "text-blue-100" : "text-black"
                      } font-mono whitespace-pre min-w-1/2 text-center`}
                    >
                      {selectedAscii}
                    </p>
                  ) : (
                    <div className="min-w-1/2 flex items-center justify-center p-4">
                      <img 
                        src={profileImages[currentImageIndex]} 
                        alt="Profile" 
                        className="w-48 h-48 object-cover rounded-lg shadow-xl transition-all duration-500 transform hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="mx-auto min-w-1/2 mt-2">
                    <p
                      className={`${
                        isDark ? "text-blue-300" : "text-[#75b8eb]"
                      } text-sm lg:text-lg`}
                    >
                      vishal@MacbookPro
                    </p>
                    <p className="text-[9px] lg:text-sm mb-2">
                      vishalkrishnakkr@gmail.com
                    </p>
                    <p className="ml-4 text-xs lg:text-sm">ML Engineer | AI Specialist</p>
                    <p className="ml-4 text-xs lg:text-sm">CS @ CityU</p>
                    <p className="ml-4 text-xs lg:text-sm">
                      Expected Grad: May 2027
                    </p>
                    <p className="ml-4 text-xs lg:text-sm">Seattle, WA</p>
                    <p className="ml-4 text-xs lg:text-sm">
                      {time.toLocaleTimeString()}
                    </p>
                    <p className="ml-4 mt-2 text-xs hidden lg:block text-gray-400">
                      <span className="inline-block text-lg">☆</span> try arrows keys & enter!
                    </p>
                    <div className="flex items-center gap-2 ml-4 mt-4 mb-2">
                      <button
                        className="text-gray-400 text-left underline"
                        onClick={() => setExpandWindow("")}
                      >
                        back to main page ❮
                      </button>
                      <button
                        onClick={toggleDisplayMode}
                        className={`p-1 rounded-full transition-all duration-300 ${
                          isDark 
                            ? "bg-gray-700 hover:bg-gray-600" 
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                        title={`Switch to ${displayMode === 'ascii' ? 'images' : 'ASCII'}`}
                      >
                        <RefreshCw className={`w-3 h-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-5 max-w-2xl mx-auto mt-4 mb-10 px-4">
                  <p className={isDark ? "text-gray-200" : "text-gray-800"}>
                    Hello!
                  </p>

                  <p className={isDark ? "text-gray-200" : "text-gray-800"}>
                    Welcome to my portfolio — I hope you like it!  
                  </p>

                  <p className={isDark ? "text-gray-200" : "text-gray-800"}>
                    During my bachelor's , I had a strong interest  towards Machine Learning
                    through hands-on academic and practical projects. My first major project was a
                    Malaria Prediction system built using machine learning techniques as part of my
                    learning at{" "}
                    <a
                      href="https://www.mygreatlearning.com"
                      className="text-blue-300 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Great Learning Academy
                    </a>
                    .
                  </p>

                  <p className={isDark ? "text-gray-200" : "text-gray-800"}>
                    I later collaborated with{" "}
                    <a
                      href="https://www.wisen.com.au/"
                      className="text-blue-300 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Wisen Solutions
                    </a>{" "}
                    on a deepfake detection project where i was the team Lead, where I worked on the end-to-end implementation
                    of computer vision pipelines using architectures such as XceptionNet, ResNet-50 and U-Net++.
                    This experience strengthened my understanding of model training, evaluation,
                    and real-world deployment.
                  </p>

                  <p className={isDark ? "text-gray-200" : "text-gray-800"}>
                    Building on this foundation, I worked on healthcare-focused AI applications,
                    including skin lesion classification and brain tumor segmentation using U-Net++
                    architectures. These projects motivated me to pursue AI/ML with a strong focus
                    on healthcare and reliable, real-world systems.
                  </p>

                  <p className={isDark ? "text-gray-200" : "text-gray-800"}>
                    I am currently pursuing my Master's in CS specialized in Data Science at City
                    University of Seattle, with an expected graduation date of May 2027. My current
                    work focuses on Graph Augmented Intelligence {" "}
                    <a
                      href="https://github.com/Vishal-Krishna-Kumar/GraphAugmented-Intelligence_GAI"
                      className="text-blue-300 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      (GAI) 
                    </a>{" "} 
                    and  {" "}
                    Retrieval-Augmented Generation{" "}
                    <a
                      href="https://github.com/Vishal-Krishna-Kumar/RAG-Pipeline"
                      className="text-blue-300 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      (RAG)
                    </a>{" "}
                    
                    
                    a framework's introduced by{" "}
                    
                     <a
                      href="https://cloud.google.com/blog/products/databases/using-spanner-graph-with-langchain-for-graphrag"
                      className="text-blue-300 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >Google
                  </a>{" "}
                    
                     and {" "}
                     <a
                      href="https://ai.meta.com/blog/retrieval-augmented-generation-streamlining-the-creation-of-intelligent-natural-language-processing-models/"
                      className="text-blue-300 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >Meta
                  </a>{" "}



 where I design systems that combine large language models with structured
                    and unstructured data to enable grounded reasoning over complex, real-time
                    information.
                  </p>

                  <p className={isDark ? "text-gray-200" : "text-gray-800"}>
                    Outside of academics, I enjoy filming and editing videos, playing online games!!.
                  </p>

                  <p className={isDark ? "text-gray-200" : "text-gray-800"}>
                    I am currently focused on strengthening my  skills and actively
                    looking for  Summer 2026 internship opportunities.
                  </p>
                </div>
              </div>
            )}

            {expandWindow === "experience" && (
              <>
                {selectExperience !== "" ? (
                  <div
                    className={`w-full h-full lg:w-full lg:h-full max-w-4xl max-h-[90vh] lg:max-w-none lg:max-h-none ${windowThemeClass} rounded-xl lg:rounded-none overflow-y-auto pb-36 lg:pb-24 overscroll-none`}
                  >
                    <p
                      className={`rounded-t-xl lg:rounded-none text-sm text-center sticky top-0 ${headerClass(
                        selectedWindow === "experience"
                      )}`}
                    >
                      {selectExperience}
                      <button
                        className="rounded-full p-1 bg-red-500 absolute right-10 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={() => setExpandWindow("")}
                      />
                      <button
                        className="rounded-full p-1 bg-yellow-500 absolute right-6 top-1/2 -translate-y-1/2"
                        onClick={() => {
                          setExpandWindow("");
                          setSelectExperience("");
                        }}
                      />
                      <button className="rounded-full p-1 bg-green-500 absolute right-2 top-1/2 -translate-y-1/2" />
                    </p>
                    <div className="m-4">
                      {(() => {
                        const selectedExperienceData = experiencesData.find(
                          (p) => p.title === selectExperience
                        );
                        if (selectedExperienceData) {
                          return (
                            <div>
                              <img
                                src={selectedExperienceData.image}
                                alt={selectedExperienceData.title}
                                className="w-full h-48 object-cover rounded-lg mb-4 max-w-2xl mx-auto"
                              />
                              <p
                                className={`mt-2 max-w-2xl mx-auto ${
                                  isDark ? "text-gray-200" : "text-gray-800"
                                }`}
                              >
                                {selectedExperienceData.date}
                              </p>
                              <p
                                className={`mt-2 max-w-2xl mx-auto ${
                                  isDark ? "text-gray-200" : "text-gray-800"
                                }`}
                              >
                                {selectedExperienceData.description}
                              </p>
                              <div className="mt-4 max-w-2xl mx-auto flex flex-col">
                                {selectedExperienceData.links?.map(
                                  (link, index) => (
                                    <a
                                      href={link.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      key={link.name}
                                      className={`inline-block rounded transition-all duration-150 ${
                                        isDark
                                          ? "text-gray-200"
                                          : "text-gray-800"
                                      } ${
                                        index === selectedExperienceLinkIndex
                                          ? "font-bold"
                                          : ""
                                      }`}
                                    >
                                      {link.name}{" "}
                                      {index === selectedExperienceLinkIndex
                                        ? "❮ "
                                        : ""}
                                    </a>
                                  )
                                )}
                                <button
                                  className={`mt-2 rounded self-start transition-all duration-150 ${
                                    selectedExperienceLinkIndex ===
                                    (selectedExperienceData.links?.length || 0)
                                      ? "font-bold"
                                      : ""
                                  }`}
                                  onClick={() => {
                                    setSelectExperience("");
                                    setExpandWindow("");
                                  }}
                                >
                                  back to experiences{" "}
                                  {selectedExperienceLinkIndex ===
                                  (selectedExperienceData.links?.length || 0)
                                    ? "❮ "
                                    : ""}
                                </button>
                              </div>
                            </div>
                          );
                        }
                        return <p>Experience not found.</p>;
                      })()}
                    </div>
                  </div>
                ) : (
                  <div
                    className={`w-full h-full lg:w-full lg:h-full max-w-4xl max-h-[90vh] lg:max-w-none lg:max-h-none ${windowThemeClass} rounded-xl lg:rounded-none overflow-y-auto overscroll-none`}
                  >
                    <p
                      className={`rounded-t-xl lg:rounded-none text-sm text-center relative ${headerClass(
                        selectedWindow === "experience"
                      )}`}
                    >
                      experience - zsh
                      <button
                        className="rounded-full p-1 bg-red-500 absolute right-10 top-1/2 -translate-y-1/2"
                        onClick={() => setExpandWindow("")}
                      />
                      <button
                        className="rounded-full p-1 bg-yellow-500 absolute right-6 top-1/2 -translate-y-1/2"
                        onClick={() => setExpandWindow("")}
                      />
                      <button className="rounded-full p-1 bg-green-500 absolute right-2 top-1/2 -translate-y-1/2" />
                    </p>
                    <div className="mt-2 mx-4">
                      {experiencesData.map((experience, index) => (
                        <div
                          key={index}
                          className={`rounded-md transition-all duration-150 cursor-pointer ${
                            index === experienceIndex
                              ? "text-white font-bold underline"
                              : "bg-transparent text-blue-300"
                          }`}
                          onClick={() => setSelectExperience(experience.title)}
                        >
                          {experience.title}{" "}
                          {index == experienceIndex ? " ❮" : ""}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {expandWindow === "projects" && (
              <>
                {selectProject !== "" ? (
                  <div
                    className={`w-full h-full min-h-0 lg:w-full lg:h-full max-w-4xl max-h-[90vh] lg:max-w-none lg:max-h-none ${windowThemeClass} rounded-xl lg:rounded-none flex flex-col pb-36 lg:pb-24 overscroll-none`}
                    style={{ minHeight: 0, height: '100%' }}
                  >
                    <p
                      className={`rounded-t-xl lg:rounded-none text-sm text-center sticky top-0 z-10 ${headerClass(
                        selectedWindow === "projects"
                      )}`}
                    >
                      {
                        projectsData.find((p) => p.title === selectProject)
                          ?.window
                      }
                      <button
                        className="rounded-full p-1 bg-red-500 absolute right-10 top-1/2 -translate-y-1/2"
                        onClick={() => setExpandWindow("")}
                      />
                      <button
                        className="rounded-full p-1 bg-yellow-500 absolute right-6 top-1/2 -translate-y-1/2"
                        onClick={() => {
                          setExpandWindow("");
                          setSelectProject("");
                        }}
                      />
                      <button
                        className="rounded-full p-1 bg-green-500 absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setExpandWindow("projects")}
                      />
                    </p>
                    {/* Make the scrollable area always fill the overlay and be the direct parent of all content */}
                    <div className="flex-1 min-h-0 h-0 w-full overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch', overscrollBehavior: 'contain', height: '100%' }}>
                        <div className="m-4 w-full">
                          {(() => {
                            const selectedProjectData = projectsData.find(
                              (p) => p.title === selectProject
                            );
                            
                            if (selectedProjectData) {
                          // Check if it's the GAI project
                          if (selectedProjectData.title.includes('GraphAugmented Intelligence')) {
                            const demoVideos = selectedProjectData.demoVideos || [];
                            return (
                              <div className="space-y-8">
                                {/* Project Header */}
                                <div className="max-w-2xl mx-auto">
                                  <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-2`}>
                                    {selectedProjectData.title}
                                  </h1>
                                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                    {selectedProjectData.date}
                                  </p>
                                  <p className={`mt-4 ${isDark ? "text-gray-200" : "text-gray-800"}`}>
                                    {selectedProjectData.description}
                                  </p>
                                </div>

                                {/* Main Architecture Video */}
                                {selectedProjectData.VideoDemo && (
                                  <div className="max-w-2xl mx-auto">
                                    <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden shadow-xl">
                                      <video
                                        src={selectedProjectData.VideoDemo}
                                        autoPlay
                                        muted
                                        controls
                                        playsInline
                                        loop
                                        className="w-full h-64 object-contain"
                                      />
                                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                        <p className="text-white text-sm font-medium">
                                          GAI Architecture Overview
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* Key Metrics */}
                                {selectedProjectData.metrics && (
                                  <div className="max-w-2xl mx-auto">
                                    <h3 className={`text-lg font-bold mb-3 ${isDark ? "text-white" : "text-gray-800"}`}>
                                      Key Performance Metrics
                                    </h3>
                                    {renderProjectMetrics(selectedProjectData.metrics)}
                                  </div>
                                )}

                                {/* Tech Stack */}
                                {selectedProjectData.techStack && (
                                  <div className="max-w-2xl mx-auto">
                                    <h3 className={`text-lg font-bold mb-3 ${isDark ? "text-white" : "text-gray-800"}`}>
                                      Technology Stack
                                    </h3>
                                    {renderTechStack(selectedProjectData.techStack)}
                                  </div>
                                )}

                                {/* Architecture Components */}
                                {selectedProjectData.architecture && (
                                  <div className="max-w-2xl mx-auto">
                                    <h3 className={`text-lg font-bold mb-3 ${isDark ? "text-white" : "text-gray-800"}`}>
                                      System Architecture
                                    </h3>
                                    {renderProjectFeatures(Array.isArray(selectedProjectData.architecture) ? selectedProjectData.architecture : selectedProjectData.architecture ? [selectedProjectData.architecture] : [], <Database className="w-4 h-4 text-blue-400" />)}
                                  </div>
                                )}

                                {/* Demo Videos Section */}
                                {demoVideos.length > 0 && (
                                  <div className="max-w-2xl mx-auto">
                                    <div className="flex items-center justify-between mb-4">
                                      <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
                                        System Demonstrations
                                      </h3>
                                      <button
                                        onClick={toggleVideoPlay}
                                        className={`flex items-center space-x-2 px-3 py-1 rounded-lg ${
                                          isDark ? "bg-gray-800 text-gray-200" : "bg-gray-200 text-gray-800"
                                        }`}
                                      >
                                        {isVideoPlaying ? (
                                          <>
                                            <Pause size={16} />
                                            <span className="text-sm">Pause</span>
                                          </>
                                        ) : (
                                          <>
                                            <Play size={16} />
                                            <span className="text-sm">Play</span>
                                          </>
                                        )}
                                      </button>
                                    </div>

                                    <div className="space-y-6">
                                      {/* Current Video */}
                                      <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden shadow-xl">
                                        <video
                                          key={demoVideos[videoIndex].url}
                                          src={demoVideos[videoIndex].url}
                                          autoPlay={isVideoPlaying}
                                          muted
                                          controls
                                          playsInline
                                          className="w-full h-64 object-contain"
                                          onEnded={() => handleVideoEnd(demoVideos.length)}
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                          <p className="text-white text-sm font-medium">
                                            {demoVideos[videoIndex].title}
                                          </p>
                                          {demoVideos[videoIndex].description && (
                                            <p className="text-gray-300 text-xs mt-1">
                                              {demoVideos[videoIndex].description}
                                            </p>
                                          )}
                                        </div>
                                      </div>

                                      {/* Video Navigation */}
                                      <div className="flex flex-col items-center">
                                        <div className="flex gap-2 mb-2">
                                          {demoVideos.map((_, idx) => (
                                            <button
                                              key={idx}
                                              onClick={() => setVideoIndex(idx)}
                                              className={`w-2 h-2 rounded-full transition-all ${
                                                idx === videoIndex
                                                  ? "bg-blue-500 scale-125"
                                                  : isDark 
                                                    ? "bg-gray-600 hover:bg-gray-500" 
                                                    : "bg-gray-400 hover:bg-gray-500"
                                              }`}
                                              aria-label={`Go to video ${idx + 1}`}
                                            />
                                          ))}
                                        </div>
                                        <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                          {videoIndex + 1} of {demoVideos.length} • {isVideoPlaying ? "Auto-play" : "Paused"}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* Links */}
                                <div className="max-w-2xl mx-auto">
                                  <h3 className={`text-lg font-bold mb-3 ${isDark ? "text-white" : "text-gray-800"}`}>
                                    Resources & Links
                                  </h3>
                                  <div className="flex flex-col gap-3">
                                    {selectedProjectData.links?.map((link: { name: string; url: string }, index: number) => (
                                      <a
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        key={link.name}
                                        className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 ${
                                          index === selectedLinkIndex
                                            ? isDark
                                              ? "bg-blue-600 text-white"
                                              : "bg-blue-500 text-white"
                                            : isDark
                                            ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        } ${index === selectedLinkIndex ? "font-bold" : ""}`}
                                      >
                                        <div className="flex items-center space-x-3">
                                          {link.name.includes("GitHub") ? (
                                            <Code className="w-4 h-4" />
                                          ) : link.name.includes("Research") || link.name.includes("Paper") ? (
                                            <FileText className="w-4 h-4" />
                                          ) : link.name.includes("Live") ? (
                                            <Globe className="w-4 h-4" />
                                          ) : (
                                            <ExternalLink className="w-4 h-4" />
                                          )}
                                          <span>{link.name}</span>
                                        </div>
                                        {index === selectedLinkIndex && (
                                          <ChevronRight className="w-4 h-4" />
                                        )}
                                      </a>
                                    ))}
                                  </div>
                                </div>

                                {/* Back Button */}
                                <div className="max-w-2xl mx-auto">
                                  <button
                                    className={`mt-6 px-4 py-2 rounded-lg transition-all duration-300 ${
                                      selectedLinkIndex === (selectedProjectData.links?.length ?? 0)
                                        ? isDark
                                          ? "bg-white text-black font-bold"
                                          : "bg-gray-800 text-white font-bold"
                                        : isDark
                                        ? "text-gray-400 hover:text-white"
                                        : "text-gray-600 hover:text-gray-900"
                                    }`}
                                    onClick={() => {
                                      setSelectProject("");
                                      setExpandWindow("");
                                    }}
                                  >
                                    ← Back to Projects
                                    {selectedLinkIndex === (selectedProjectData.links?.length ?? 0) && " ❮"}
                                  </button>
                                </div>
                              </div>
                            );
                          }

                          // For other projects (Tumor Segmentation, etc.)
                          // const demoVideos = selectedProjectData.demoVideos || []; // Unused, removed
                          return (
                            <div className="space-y-8">
                              {/* Project Header */}
                              <div className="max-w-2xl mx-auto">
                                <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-2`}>
                                  {selectedProjectData.title}
                                </h1>
                                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                  {selectedProjectData.date}
                                </p>
                                <p className={`mt-4 ${isDark ? "text-gray-200" : "text-gray-800"}`}>
                                  {selectedProjectData.description}
                                </p>
                              </div>

                              {/* Main Video Demo */}
                              {selectedProjectData.VideoDemo && (
                                <div className="max-w-2xl mx-auto">
                                  <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden shadow-xl">
                                    <video
                                      src={selectedProjectData.VideoDemo}
                                      autoPlay
                                      muted
                                      controls
                                      playsInline
                                      loop
                                      className="w-full h-64 object-contain"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                      <p className="text-white text-sm font-medium">
                                        {selectedProjectData.title.includes("Tumor") 
                                          ? "3D MRI Segmentation Demo" 
                                          : "Project Demonstration"}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Image Carousel */}
                              {selectedProjectData.images && selectedProjectData.images.length > 0 && (
                                <div className="max-w-2xl mx-auto">
                                  <h3 className={`text-lg font-bold mb-3 ${isDark ? "text-white" : "text-gray-800"}`}>
                                    Visualizations & Results
                                  </h3>
                                  <div 
                                    className="relative overflow-hidden rounded-xl"
                                    onMouseEnter={() => setIsHoveringCarousel(true)}
                                    onMouseLeave={() => setIsHoveringCarousel(false)}
                                  >
                                    <div 
                                      className="flex transition-transform duration-500 ease-in-out" 
                                      style={{ transform: `translateX(-${projectSlideIndex * 100}%)` }}
                                    >
                                      {selectedProjectData.images.map((img: string, idx: number) => (
                                        <div 
                                          key={idx} 
                                          className="w-full flex-shrink-0 relative cursor-zoom-in"
                                          onClick={() => { setZoomIndex(idx); }}
                                        >
                                          <div className={`p-2 ${isDark ? "bg-gray-800/30" : "bg-gray-100/30"} rounded-lg`}>
                                            <img 
                                              src={img} 
                                              className="w-full rounded-lg object-contain h-48"
                                              alt={`${selectedProjectData.title} Visualization ${idx + 1}`}
                                            />
                                          </div>
                                          <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                            {idx + 1} / {selectedProjectData.images.length}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                    
                                    {/* Navigation Arrows */}
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        prevImage();
                                      }}
                                      className={`absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full ${
                                        isDark ? "bg-black/50 hover:bg-black/80" : "bg-white/50 hover:bg-white/80"
                                      } transition-all duration-300`}
                                      aria-label="Previous image"
                                    >
                                      <ChevronLeft className={`w-4 h-4 ${isDark ? "text-white" : "text-gray-800"}`} />
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        nextImage();
                                      }}
                                      className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full ${
                                        isDark ? "bg-black/50 hover:bg-black/80" : "bg-white/50 hover:bg-white/80"
                                      } transition-all duration-300`}
                                      aria-label="Next image"
                                    >
                                      <ChevronRight className={`w-4 h-4 ${isDark ? "text-white" : "text-gray-800"}`} />
                                    </button>

                                    {/* Navigation Dots */}
                                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1.5">
                                      {selectedProjectData.images.map((_, idx) => (
                                        <button
                                          key={idx}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setProjectSlideIndex(idx);
                                          }}
                                          className={`w-1.5 h-1.5 rounded-full transition-all ${
                                            idx === projectSlideIndex
                                              ? "bg-blue-500 scale-125"
                                              : isDark 
                                                ? "bg-white/50 hover:bg-white/80" 
                                                : "bg-gray-400/50 hover:bg-gray-600"
                                          }`}
                                          aria-label={`Go to image ${idx + 1}`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Key Metrics */}
                              {selectedProjectData.metrics && (
                                <div className="max-w-2xl mx-auto">
                                  <h3 className={`text-lg font-bold mb-3 ${isDark ? "text-white" : "text-gray-800"}`}>
                                    Performance Metrics
                                  </h3>
                                  {renderProjectMetrics(selectedProjectData.metrics)}
                                </div>
                              )}

                              {/* Tech Stack */}
                              {selectedProjectData.techStack && (
                                <div className="max-w-2xl mx-auto">
                                  <h3 className={`text-lg font-bold mb-3 ${isDark ? "text-white" : "text-gray-800"}`}>
                                    Technology Stack
                                  </h3>
                                  {renderTechStack(selectedProjectData.techStack)}
                                </div>
                              )}

                              {/* Features/Architecture */}
                              {selectedProjectData.features && (
                                <div className="max-w-2xl mx-auto">
                                  <h3 className={`text-lg font-bold mb-3 ${isDark ? "text-white" : "text-gray-800"}`}>
                                    Key Features
                                  </h3>
                                  {renderProjectFeatures(selectedProjectData.features ?? [], <Layers className="w-4 h-4 text-green-400" />)}
                                </div>
                              )}

                              {/* Clinical Impact for Medical Projects */}
                              {selectedProjectData.clinicalImpact && (
                                <div className="max-w-2xl mx-auto">
                                  <h3 className={`text-lg font-bold mb-3 ${isDark ? "text-white" : "text-gray-800"}`}>
                                    Clinical Impact
                                  </h3>
                                  {renderProjectFeatures(selectedProjectData.clinicalImpact ? [selectedProjectData.clinicalImpact] : [], <Shield className="w-4 h-4 text-purple-400" />)}
                                </div>
                              )}

                              {/* Algorithms for AI Projects */}
                              {selectedProjectData.algorithms && (
                                <div className="max-w-2xl mx-auto">
                                  <h3 className={`text-lg font-bold mb-3 ${isDark ? "text-white" : "text-gray-800"}`}>
                                    Core Algorithms
                                  </h3>
                                  {renderProjectFeatures(Array.isArray(selectedProjectData.algorithms) ? selectedProjectData.algorithms : selectedProjectData.algorithms ? [selectedProjectData.algorithms] : [], <Brain className="w-4 h-4 text-yellow-400" />)}
                                </div>
                              )}

                              {/* Methodologies for NLP Projects */}
                              {selectedProjectData.methodologies && (
                                <div className="max-w-2xl mx-auto">
                                  <h3 className={`text-lg font-bold mb-3 ${isDark ? "text-white" : "text-gray-800"}`}>
                                    Methodologies
                                  </h3>
                                  {renderProjectFeatures(Array.isArray(selectedProjectData.methodologies) ? selectedProjectData.methodologies : selectedProjectData.methodologies ? [selectedProjectData.methodologies] : [], <Cpu className="w-4 h-4 text-blue-400" />)}
                                </div>
                              )}

                              {/* Links */}
                              <div className="max-w-2xl mx-auto">
                                <h3 className={`text-lg font-bold mb-3 ${isDark ? "text-white" : "text-gray-800"}`}>
                                  Resources & Links
                                </h3>
                                <div className="flex flex-col gap-3">
                                  {selectedProjectData.links?.map((link: { name: string; url: string }, index: number) => (
                                    <a
                                      href={link.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      key={link.name}
                                      className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 ${
                                        index === selectedLinkIndex
                                          ? isDark
                                            ? "bg-blue-600 text-white"
                                            : "bg-blue-500 text-white"
                                          : isDark
                                          ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                      } ${index === selectedLinkIndex ? "font-bold" : ""}`}
                                      >
                                      <div className="flex items-center space-x-3">
                                        {link.name.includes("GitHub") ? (
                                          <Code className="w-4 h-4" />
                                        ) : link.name.includes("Research") || link.name.includes("Paper") ? (
                                          <FileText className="w-4 h-4" />
                                        ) : link.name.includes("Website") || link.name.includes("Live") ? (
                                          <Globe className="w-4 h-4" />
                                        ) : link.name.includes("Dataset") ? (
                                          <Database className="w-4 h-4" />
                                        ) : (
                                          <ExternalLink className="w-4 h-4" />
                                        )}
                                        <span>{link.name}</span>
                                      </div>
                                      {index === selectedLinkIndex && (
                                        <ChevronRight className="w-4 h-4" />
                                      )}
                                    </a>
                                  ))}
                                </div>
                              </div>

                              {/* Back Button */}
                              <div className="max-w-2xl mx-auto">
                                <button
                                  className={`mt-6 px-4 py-2 rounded-lg transition-all duration-300 ${
                                    selectedLinkIndex === (selectedProjectData.links?.length ?? 0)
                                      ? isDark
                                        ? "bg-white text-black font-bold"
                                        : "bg-gray-800 text-white font-bold"
                                      : isDark
                                      ? "text-gray-400 hover:text-white"
                                      : "text-gray-600 hover:text-gray-900"
                                  }`}
                                  onClick={() => {
                                    setSelectProject("");
                                    setExpandWindow("");
                                  }}
                                >
                                  ← Back to Projects
                                  {selectedLinkIndex === (selectedProjectData.links?.length ?? 0) && " ❮"}
                                </button>
                              </div>
                            </div>
                          );
                        }
                        return <p>Project not found.</p>;
                        })()}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`w-full h-full lg:w-full lg:h-full max-w-4xl max-h-[90vh] lg:max-w-none lg:max-h-none ${windowThemeClass} rounded-xl lg:rounded-none overflow-y-auto`}
                  >
                    <p
                      className={`rounded-t-xl lg:rounded-none text-sm text-center relative ${headerClass(
                        selectedWindow === "projects"
                      )}`}
                    >
                      projects - zsh
                      <button
                        className="rounded-full p-1 bg-red-500 absolute right-10 top-1/2 -translate-y-1/2"
                        onClick={() => setExpandWindow("")}
                      />
                      <button
                        className="rounded-full p-1 bg-yellow-500 absolute right-6 top-1/2 -translate-y-1/2"
                        onClick={() => setExpandWindow("")}
                      />
                      <button
                        className="rounded-full p-1 bg-green-500 absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setExpandWindow("projects")}
                      />
                    </p>
                    <div className="mt-2 mx-4">
                      {projectsData.map((project, index) => (
                        <div
                          key={index}
                          className={`rounded-md transition-all duration-150 cursor-pointer ${
                            index === projectIndex
                              ? "text-white font-bold underline"
                              : "bg-transparent text-blue-300"
                          }`}
                          onClick={() => setSelectProject(project.title)}
                        >
                          {project.title}
                          {index === projectIndex ? " ❮" : ""}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* SPOTIFY NOW PLAYING */}
            {expandWindow === "spotify" && (
              <div
                className={`w-full h-full lg:w-full lg:h-full max-w-4xl max-h-[90vh] lg:max-w-none lg:max-h-none ${windowThemeClass} rounded-xl lg:rounded-none overflow-y-auto overscroll-none`}
              >
                <p
                  className={`rounded-t-xl lg:rounded-none text-sm text-center sticky top-0 ${headerClass(
                    selectedWindow === "spotify"
                  )}`}
                >
                  now-playing - zsh
                  <button
                    className="rounded-full p-1 bg-red-500 absolute right-10 top-1/2 -translate-y-1/2"
                    onClick={() => setExpandWindow("")}
                  />
                  <button
                    className="rounded-full p-1 bg-yellow-500 absolute right-6 top-1/2 -translate-y-1/2"
                    onClick={() => setExpandWindow("")}
                  />
                  <button
                    className="rounded-full p-1 bg-green-500 absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setExpandWindow("spotify")}
                  />
                </p>
                <div className="m-4">
                  <MusicWindow isDark={isDark} />
                </div>
              </div>
            )}

            {expandWindow === "leetcode" && (
              <div
                className={`w-full h-full lg:w-full lg:h-full max-w-4xl max-h-[90vh] lg:max-w-none lg:max-h-none ${windowThemeClass} rounded-xl lg:rounded-none overflow-y-auto overscroll-none`}
              >
                <p
                  className={`${
                    isDark
                      ? "text-black bg-white"
                      : "text-gray-800 bg-[#99A1AF]"
                  } rounded-t-xl lg:rounded-none text-sm text-center sticky top-0 z-10`}
                >
                  leetcode - zsh
                  <button
                    className="rounded-full p-1 bg-red-500 absolute right-10 top-1/2 -translate-y-1/2"
                    onClick={() => setExpandWindow("")}
                  />
                  <button
                    className="rounded-full p-1 bg-yellow-500 absolute right-6 top-1/2 -translate-y-1/2"
                    onClick={() => setExpandWindow("")}
                  />
                  <button
                    className="rounded-full p-1 bg-green-500 absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setExpandWindow("leetcode")}
                  />
                </p>
                <div className="w-full flex flex-col items-center justify-center mt-4">
                  {leetCode && leetCode.totalSolved ? (
                    <div className="flex items-center gap-4 py-6">
                      <a
                        href="https://leetcode.com/vishalkrish/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-20 h-20 rounded-xl p-1 flex items-center justify-center cursor-pointer ${
                          isDark ? "bg-gray-100" : "bg-gray-200"
                        }`}
                      >
                        <img
                          src="/leetcode_color.png"
                          alt="LeetCode Logo"
                          className={`w-20 h-20 rounded-xl p-1 object-contain ${
                            isDark ? "bg-gray-100" : "bg-gray-200"
                          }`}
                        />
                      </a>
                      <div className="flex-grow">
                        <p
                          className={`text-lg font-bold ${
                            isDark ? "text-white" : "text-gray-800"
                          }`}
                        >
                          total solved: {leetCode.totalSolved}
                        </p>
                        <div className="flex flex-col justify-between text-sm">
                          <p className="text-green-400">
                            easy: {leetCode.easySolved}
                          </p>
                          <p className="text-yellow-400">
                            medium: {leetCode.mediumSolved}
                          </p>
                          <p className="text-red-400">
                            hard: {leetCode.hardSolved}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p
                      className={`text-sm mt-4 ${
                        isDark ? "text-gray-200" : "text-gray-800"
                      }`}
                    >
                      fetching leetcode stats...
                    </p>
                  )}
                  {leetCode && leetCode.submissionCalendar && (
                    <div className="min-w-xs lg:min-w-md max-h-48 overflow-y-auto">
                      <LeetCodeCalendar
                        submissionCalendar={leetCode.submissionCalendar}
                        viewMode="month"
                        isDark={isDark}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {expandWindow === "cli" && (
              <div
                className={`w-full h-full lg:w-full lg:h-full max-w-4xl max-h-[90vh] lg:max-w-none lg:max-h-none ${windowThemeClass} rounded-xl lg:rounded-none flex flex-col overflow-y-auto overscroll-none`}
              >
                <p
                  className={`rounded-t-xl lg:rounded-none text-sm text-center sticky top-0 ${headerClass(
                    selectedWindow === "cli"
                  )}`}
                >
                  vishal-code - zsh
                  <button
                    className="rounded-full p-1 bg-red-500 absolute right-10 top-1/2 -translate-y-1/2"
                    onClick={() => setExpandWindow("")}
                  />
                  <button
                    className="rounded-full p-1 bg-yellow-500 absolute right-6 top-1/2 -translate-y-1/2"
                    onClick={() => setExpandWindow("")}
                  />
                  <button
                    className="rounded-full p-1 bg-green-500 absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setExpandWindow("cli")}
                  />
                </p>
                <div
                  className="mt-2 mx-4 font-mono text-sm flex-grow overflow-y-auto"
                  onClick={focusInput}
                >
                  {lastCommand && (
                    <>
                      <div className="flex items-center">
                        <span className="text-blue-400">❯</span>
                        <p
                          className={`ml-2 ${
                            isDark ? "text-gray-200" : "text-gray-800"
                          }`}
                        >
                          {lastCommand}
                        </p>
                      </div>
                      {!response && (
                        <p
                          className={`${
                            isDark ? "text-gray-200" : "text-gray-800"
                          } whitespace-pre-wrap`}
                        >
                          hmm
                          <AnimatedEllipsis />
                        </p>
                      )}
                      <p
                        className={`${
                          isDark ? "text-gray-200" : "text-gray-800"
                        } whitespace-pre-wrap select-text cursor-text`}
                      >
                        {response}
                      </p>
                    </>
                  )}
                  <div className="flex items-center">
                    <span className="text-blue-400">❯</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={command}
                      onChange={(e) => setCommand(e.target.value)}
                      onKeyDown={handleCommand}
                      className={`bg-transparent border-none ${
                        isDark
                          ? "text-gray-200 placeholder:text-gray-400"
                          : "text-gray-800 placeholder:text-gray-400"
                      } w-full focus:outline-none ml-2`}
                      placeholder="ask me anything about myself!"
                    />
                  </div>
                </div>
              </div>
            )}

            {expandWindow === "timer" && isTimerOpen && (
              <div
                className={`w-full h-full lg:w-full lg:h-full max-w-4xl max-h-[90vh] lg:max-w-none lg:max-h-none ${windowThemeClass} rounded-xl lg:rounded-none flex flex-col overflow-y-auto overscroll-none`}
              >
                <p
                  className={`rounded-t-xl lg:rounded-none text-sm text-center sticky top-0 ${headerClass(
                    selectedWindow === "timer"
                  )}`}
                >
                  pomodoro - zsh
                  <button
                    className="rounded-full p-1 bg-red-500 absolute right-10 top-1/2 -translate-y-1/2"
                    onClick={() => setExpandWindow("")}
                  />
                  <button className="rounded-full p-1 bg-yellow-500 absolute right-6 top-1/2 -translate-y-1/2" />
                  <button
                    className="rounded-full p-1 bg-green-500 absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setExpandWindow("timer")}
                  />
                </p>
                <div className="flex-grow p-6 lg:p-10 overflow-y-auto">
                  <div className="max-w-3xl mx-auto flex flex-col items-center">
                    <p className={`${isDark ? "text-gray-300" : "text-gray-600"} text-sm`}>
                      {timerMode === "work"
                        ? "Work"
                        : timerMode === "break"
                        ? "Break"
                        : "Long Break"}
                      {pomodoroCount > 0 ? ` • ${pomodoroCount}/4` : ""}
                    </p>

                    <p
                      className={`mt-2 font-bold tracking-widest text-6xl ${
                        isDark ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      {String(timerMinutes).padStart(2, "0")}:
                      {String(timerSeconds).padStart(2, "0")}
                    </p>

                    <div className="mt-8 w-full flex flex-col gap-4">
                      <div
                        className={`grid grid-cols-3 gap-3 text-sm ${
                          isDark ? "text-gray-100" : "text-gray-900"
                        }`}
                      >
                        <button
                          className={`rounded-lg border p-3 transition-all ${
                            isDark
                              ? "border-gray-700 bg-gray-900"
                              : "border-gray-300 bg-white"
                          } ${selectedExpandedTimerButton === 0 ? "underline font-bold" : ""}`}
                          onClick={() => (isTimerRunning ? pauseTimer() : startTimer())}
                        >
                          {isTimerRunning ? "Pause" : "Start"}
                        </button>
                        <button
                          className={`rounded-lg border p-3 transition-all ${
                            isDark
                              ? "border-gray-700 bg-gray-900"
                              : "border-gray-300 bg-white"
                          } ${selectedExpandedTimerButton === 1 ? "underline font-bold" : ""}`}
                          onClick={resetTimer}
                        >
                          Reset
                        </button>
                        <button
                          className={`rounded-lg border p-3 transition-all ${
                            isDark
                              ? "border-gray-700 bg-gray-900"
                              : "border-gray-300 bg-white"
                          } ${selectedExpandedTimerButton === 2 ? "underline font-bold" : ""}`}
                          onClick={() => setExpandWindow("")}
                        >
                          Close
                        </button>
                      </div>

                      <div className="grid grid-cols-5 gap-3 text-xs">
                        {[5, 15, 30, 45, 60].map((minutes, idx) => (
                          <button
                            key={minutes}
                            className={`rounded-lg border p-3 transition-all ${
                              isDark
                                ? "border-gray-700 bg-gray-900 text-gray-100"
                                : "border-gray-300 bg-white text-gray-900"
                            } ${selectedExpandedTimerButton === idx + 3 ? "underline font-bold" : ""}`}
                            onClick={() => setCustomTimer(minutes)}
                          >
                            {minutes}m
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Resume overlay window */}
      {isResumeOpen && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsResumeOpen(false);
            }
          }}
        >
          <div
            className={`w-full lg:w-1/2 h-[70vh] max-w-4xl max-h-[90vh] ${overlayThemeClass} rounded-xl flex flex-col shadow-sm`}
          >
            <div
              className={`rounded-t-xl text-sm text-center relative ${headerClass(
                true
              )}`}
            >
              vishal_krishna_kumar_resume.pdf
              <button
                className="rounded-full p-1 bg-red-500 absolute right-10 top-1/2 -translate-y-1/2 cursor-pointer hover:bg-red-600 transition-colors"
                onClick={() => setIsResumeOpen(false)}
              />
              <button
                className="rounded-full p-1 bg-yellow-500 absolute right-6 top-1/2 -translate-y-1/2"
                onClick={() => setIsResumeOpen(false)}
              />
              <button className="rounded-full p-1 bg-green-500 absolute right-2 top-1/2 -translate-y-1/2" />
            </div>
            <a
              href="/vishal_krishna_kumar_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 mx-4 mt-4 underline"
            >
              click to view in new tab
            </a>
            <div className="flex-1 p-4 overflow-hidden">
              <iframe
                src="/vishal_krishna_kumar_resume.pdf#view=FitH&zoom=page-fit"
                className="w-full h-full rounded-lg border border-gray-600"
                title="Vishal Krishna Resume"
              />
            </div>
          </div>
        </div>
      )}

      {/* Certificates overlay window */}
      {isCertificatesOpen && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/90"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsCertificatesOpen(false);
              setIsCertificateZoomed(false);
            }
          }}
        >
          <div
            className={`w-full h-full lg:w-full lg:h-full max-w-full max-h-none ${overlayThemeClass} rounded-xl lg:rounded-none flex flex-col shadow-2xl`}
          >
            <div
              className={`rounded-t-xl lg:rounded-none text-sm text-center relative ${headerClass(
                true
              )}`}
            >
              certificates - zsh {isCertificateZoomed && "(zoomed)"}
              <button
                className="rounded-full p-1 bg-red-500 absolute right-10 top-1/2 -translate-y-1/2 cursor-pointer hover:bg-red-600 transition-colors"
                onClick={() => {
                  setIsCertificatesOpen(false);
                  setIsCertificateZoomed(false);
                }}
              />
              <button
                className="rounded-full p-1 bg-yellow-500 absolute right-6 top-1/2 -translate-y-1/2"
                onClick={() => {
                  setIsCertificatesOpen(false);
                  setIsCertificateZoomed(false);
                }}
              />
              <button className="rounded-full p-1 bg-green-500 absolute right-2 top-1/2 -translate-y-1/2" />
            </div>
            <div className="flex-1 p-8 overflow-hidden flex flex-col items-center justify-center relative">
              {/* Main certificate image */}
              <div className={`flex-1 w-full flex items-center justify-center mb-4 relative px-16`}>
                <button
                  onClick={() => {
                    setCurrentCertificateIndex(
                      (prev) => (prev - 1 + achievementImages.length) % achievementImages.length
                    );
                  }}
                  className="absolute left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all"
                >
                  <ChevronLeft className={`w-8 h-8 ${isDark ? 'text-white' : 'text-gray-800'}`} />
                </button>
                
                <img
                  src={achievementImages[currentCertificateIndex]}
                  alt={`Certificate ${currentCertificateIndex + 1}`}
                  className={`${
                    isCertificateZoomed 
                      ? 'max-h-[75vh] max-w-[95%] cursor-pointer' 
                      : 'max-h-[65vh] max-w-[85%] cursor-pointer'
                  } object-contain rounded-lg shadow-2xl border-2 border-gray-600 transition-all duration-300`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCertificateZoomed(!isCertificateZoomed);
                  }}
                />
                
                <button
                  onClick={() => {
                    setCurrentCertificateIndex((prev) => (prev + 1) % achievementImages.length);
                  }}
                  className="absolute right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all"
                >
                  <ChevronRight className={`w-8 h-8 ${isDark ? 'text-white' : 'text-gray-800'}`} />
                </button>
              </div>
              
              {/* Navigation dots */}
              <div className="flex gap-2 mt-4">
                {achievementImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentCertificateIndex(idx)}
                    className={`h-2.5 rounded-full transition-all ${
                      idx === currentCertificateIndex
                        ? 'bg-blue-500 w-10'
                        : isDark ? 'bg-gray-600 hover:bg-gray-500 w-2.5' : 'bg-gray-400 hover:bg-gray-500 w-2.5'
                    }`}
                  />
                ))}
              </div>
              
              {/* Counter and instructions */}
              <div className={`text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <p className="mb-1 font-medium">Certificate {currentCertificateIndex + 1} of {achievementImages.length}</p>
                <p className="text-xs opacity-75">
                  {isCertificateZoomed 
                    ? 'Click image to zoom out • Use arrows to navigate' 
                    : 'Auto-slides every 3 seconds • Click image to zoom • Use ←→ arrows to navigate'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Image Zoom Overlay */}
      {zoomIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setZoomIndex(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black/50 hover:bg-black/70 rounded-full p-3 transition-all"
            onClick={() => setZoomIndex(null)}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Navigation Arrow */}
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black/50 hover:bg-black/70 rounded-full p-3 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              prevZoomImage();
            }}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Right Navigation Arrow */}
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black/50 hover:bg-black/70 rounded-full p-3 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              nextZoomImage();
            }}
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="relative max-w-5xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            {(() => {
              const selectedProjectData = projectsData.find(
                (p) => p.title === selectProject
              );
              if (!selectedProjectData || !selectedProjectData.images) return null;
              
              return (
                <img
                  src={selectedProjectData.images[zoomIndex]}
                  className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl transition-opacity duration-300"
                  alt="Zoomed project image"
                />
              );
            })()}
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/80 text-sm bg-black/50 px-4 py-2 rounded-full">
              {(() => {
                const selectedProjectData = projectsData.find(
                  (p) => p.title === selectProject
                );
                if (!selectedProjectData || !selectedProjectData.images) return "Image";
                return `${zoomIndex + 1} / ${selectedProjectData.images.length}`;
              })()}
            </div>
            
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white/60 text-xs bg-black/30 px-3 py-1 rounded-full">
              Use arrow keys or click arrows to navigate • ESC to close
            </div>
          </div>
        </div>
      )}

      {/* Achievement Zoom Overlay */}
      {achievementZoomIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setAchievementZoomIndex(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black/50 hover:bg-black/70 rounded-full p-3 transition-all"
            onClick={() => setAchievementZoomIndex(null)}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Navigation Arrow */}
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black/50 hover:bg-black/70 rounded-full p-3 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              prevZoomAchievement();
            }}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Right Navigation Arrow */}
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black/50 hover:bg-black/70 rounded-full p-3 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              nextZoomAchievement();
            }}
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="relative max-w-5xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={achievementImages[achievementZoomIndex]}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl transition-opacity duration-300"
              alt="Zoomed achievement"
            />
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/80 text-sm bg-black/50 px-4 py-2 rounded-full">
              {achievementZoomIndex + 1} / {achievementImages.length}
            </div>
            
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white/60 text-xs bg-black/30 px-3 py-1 rounded-full">
              Use arrow keys or click arrows to navigate • ESC to close
            </div>
          </div>
        </div>
      )}

      {/* Taskbar menu */}
      <Taskbar theme={theme} isTimerOpen={isTimerOpen} />
    </div>
  );
};


export default App;