import React, { useEffect, useRef, useState, useCallback } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";


interface HeadTrackerProps {
  onHeadMove: (x: number, y: number) => void;
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
}

const HeadTracker: React.FC<HeadTrackerProps> = ({ onHeadMove, isEnabled, onToggle }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const faceLandmarkerRef = useRef<FaceLandmarker | null>(null);
  const requestRef = useRef<number | null>(null);
  const lastVideoTimeRef = useRef<number>(-1);

  const cleanup = useCallback(() => {
    if (requestRef.current != null) {
      cancelAnimationFrame(requestRef.current);
    }
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    // We don't close the landmarker here to avoid reloading the heavy WASM model if the user toggles quickly
    // But in a real app you might want to if you need to free memory.
  }, []);

  useEffect(() => {
    const initLandmarker = async () => {
      try {
        setIsInitializing(true);
        const filesetResolver = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
        );
        faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(filesetResolver, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
            delegate: "GPU",
          },
          outputFaceBlendshapes: false,
          runningMode: "VIDEO",
          numFaces: 1,
        });
        setIsInitializing(false);
      } catch (err) {
        console.error("Failed to load MediaPipe FaceLandmarker:", err);
        setError("Failed to load AI model");
        setIsInitializing(false);
      }
    };

    if (!faceLandmarkerRef.current) {
        initLandmarker();
    }
    
    return () => {
        // Cleanup if component unmounts
        cleanup();
        if (faceLandmarkerRef.current) {
            faceLandmarkerRef.current.close();
        }
    }
  }, [cleanup]);

  const enableCam = async () => {
    if (!faceLandmarkerRef.current) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.addEventListener("loadeddata", predictWebcam);
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
      setError("Camera access denied");
      onToggle(false);
    }
  };

  const predictWebcam = () => {
    if (!faceLandmarkerRef.current || !videoRef.current) return;

    // Only process if video has played and time has advanced
    if (videoRef.current.currentTime !== lastVideoTimeRef.current) {
        lastVideoTimeRef.current = videoRef.current.currentTime;
        const startTimeMs = performance.now();
        const results = faceLandmarkerRef.current.detectForVideo(videoRef.current, startTimeMs);

        if (results.faceLandmarks && results.faceLandmarks.length > 0) {
            // Get the nose tip (index 1) and maybe average with other points for stability
            // Landmarks are normalized [0, 1] (x, y, z)
            const landmarks = results.faceLandmarks[0];
            const nose = landmarks[1]; 
            // const leftEye = landmarks[33];
            // const rightEye = landmarks[263];

            // Normalize coordinates to -1 to 1 range (center 0)
            // x increases to the left of the image (user's right), so we might flip
            const rawX = (nose.x - 0.5) * 2; 
            const rawY = (nose.y - 0.5) * 2;

            // Invert X because webcam is usually mirrored or we want "looking left moves window right"
            // Let's pass the raw offset from center. Parent decides how to use it.
            // Using a bit of smoothing could be good, but let's send raw first.
            onHeadMove(rawX, rawY);
        }
    }

    if (isEnabled) {
      requestRef.current = requestAnimationFrame(predictWebcam);
    }
  };

  useEffect(() => {
    if (isEnabled) {
      enableCam();
    } else {
      cleanup();
      onHeadMove(0,0); // Reset position
    }
  }, [isEnabled]); // removed enableCam and cleanup from deps to avoid re-triggering loop issue

  // Show error/status below the button in App if present
  React.useEffect(() => {
    if (!isEnabled) return;
    const statusDiv = document.getElementById("head-motion-status");
    if (statusDiv) {
      statusDiv.textContent = error ? `Error: ${error}` : isInitializing ? "Initializing..." : "AI Vision Active";
      statusDiv.style.color = error ? '#f87171' : '#a78bfa';
    }
    return () => {
      if (statusDiv) statusDiv.textContent = "";
    };
  }, [isEnabled, error, isInitializing]);

  // Hide floating panel (legacy) if button is present
  return null;
};

export default HeadTracker;
