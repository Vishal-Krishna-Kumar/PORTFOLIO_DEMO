// import React, { useEffect, useRef, useState, useCallback } from "react";
// import {
//   HandLandmarker,
//   FilesetResolver,
//   type NormalizedLandmark,
// } from "@mediapipe/tasks-vision";
// import { Hand, Ban, Loader2 } from "lucide-react";

// interface HandTrackerProps {
//   isEnabled: boolean;
//   onToggle: (enabled: boolean) => void;
// }

// const HandTracker: React.FC<HandTrackerProps> = ({ isEnabled, onToggle }) => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [handLandmarker, setHandLandmarker] = useState<HandLandmarker | null>(
//     null
//   );
//   const [isInitializing, setIsInitializing] = useState(false);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const requestRef = useRef<number>(0);
//   const [gestureStatus, setGestureStatus] = useState<string>("");

//   // Smoothing variables
//   const cursorRef = useRef({ x: 0, y: 0 });
  
//   // Click state to prevent rapid firing
//   const isClickingRef = useRef(false);

//   // Initialize MediaPipe HandLandmarker
//   useEffect(() => {
//     const initLandmarker = async () => {
//       setIsInitializing(true);
//       try {
//         const vision = await FilesetResolver.forVisionTasks(
//             "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
//         );
//         // ...existing code...
//       } catch (err) {
//         // ...existing error handling...
//       }
//     };

//   // --- GESTURE LOGIC: Only one function ---



//   const stopCamera = () => {
//     if (videoRef.current && videoRef.current.srcObject) {
//       const stream = videoRef.current.srcObject as MediaStream;
//       stream.getTracks().forEach((track) => track.stop());
//       videoRef.current.srcObject = null;
//     }
//     if (requestRef.current) {
//       cancelAnimationFrame(requestRef.current);
//     }
//     // Remove custom cursor if it exists
//     removeCustomCursor();
//   };

//   const processGestures = (landmarks: NormalizedLandmark[]) => {
//     // 1. Cursor Control: Index Finger Tip (8)
//     // Map coordinates: webcam is mirrored, so x is inverted relative to screen? 
//     // We already mirrored canvas context, but landmarks are normalized 0-1.
//     // In mirrored video: 
//     // Left side of camera image = Right side of screen for user.
//     // Default MediaPipe output x is 0 (left of image) to 1 (right of image).
//     // If I move my hand right (in reality), on screen (mirrored) it moves right.
//     // Landmarks x: 0 -> 1.
    
//     const indexTip = landmarks[8];
//     const thumbTip = landmarks[4];

//     // Coordinates mapping
//     // landmarks.x goes 0 to 1.
//     // To map to screen: 
//     // We strictly want 1-x because we want mirror effect for the cursor logic too.
//     const rawX = (1 - indexTip.x) * window.innerWidth;
//     const rawY = indexTip.y * window.innerHeight;

//     // Smoothing (Linear Interpolation)
//     const smoothFactor = 0.2; // Adjust for responsiveness vs jitter
//     cursorRef.current.x += (rawX - cursorRef.current.x) * smoothFactor;
//     cursorRef.current.y += (rawY - cursorRef.current.y) * smoothFactor;

//     // Update Cursor UI
//     updateCustomCursor(cursorRef.current.x, cursorRef.current.y);

//     // 2. Click Detection: Pinch Index & Thumb
//     const distance = Math.hypot(
//         (1 - indexTip.x) - (1 - thumbTip.x),
//         indexTip.y - thumbTip.y
//     );
    
//     // Threshold usually around 0.05 - 0.1 depending on camera z-depth
//     const CLICK_THRESHOLD = 0.05; 

//     if (distance < CLICK_THRESHOLD) {
//       if (!isClickingRef.current) {
//           isClickingRef.current = true;
//           setGestureStatus("CLICK!");
          
//           // Trigger click on the element at the cursor position
//           triggerClick(cursorRef.current.x, cursorRef.current.y);
          
//           // Visual feedback on cursor
//           setCursorClickState(true);
//       }
//     } else {
//       if (isClickingRef.current) {
//          // Debounce release slightly
//          isClickingRef.current = false;
//          setGestureStatus("Move");
//          setCursorClickState(false);
//       }
//     }

//     // 3. Scroll Detection: Pinsch Middle & Thumb ? Or checking Palm position relative to previous?
//     // Let's use specific gesture: High Five (Open Hand) = Scroll Mode? No that's annoying.
//     // Better: If hand is a Fist, drag to scroll?
//     // Let's use: Pinching Index+Thumb AND Middle+Thumb (Double Pinch) -> Scroll?
//     // Simple approach: Use relative movement when "Grabbed" (Fist).
//     // Detect Fist: Tips of fingers are close to wrist/palm.
    
//     // Let's keep it simple for now: Cursor + Click is 90% of value.
//     // Maybe scrolling can be done by moving cursor to edges?
//     // Implementation: Edge Scrolling.
//     const SCROLL_ZONE = 100; // pixels
//     if (cursorRef.current.y > window.innerHeight - SCROLL_ZONE) {
//         window.scrollBy({ top: 10, behavior: "instant" });
//         setGestureStatus("Scroll Down");
//     } else if (cursorRef.current.y < SCROLL_ZONE) {
//         window.scrollBy({ top: -10, behavior: "instant" });
//         setGestureStatus("Scroll Up");
//     }
//   };

//   // --- UI Helpers ---

//   const getCursorEl = () => document.getElementById("hand-cursor");

//   const updateCustomCursor = (x: number, y: number) => {
//     let cursor = getCursorEl();
//     if (!cursor) {
//       cursor = document.createElement("div");
//       cursor.id = "hand-cursor";
//       cursor.style.position = "fixed";
//       cursor.style.width = "20px";
//       cursor.style.height = "20px";
//       cursor.style.borderRadius = "50%";
//       cursor.style.border = "2px solid rgba(0, 255, 255, 0.8)";
//       cursor.style.backgroundColor = "rgba(0, 255, 255, 0.2)";
//       cursor.style.pointerEvents = "none";
//       cursor.style.zIndex = "9999";
//       cursor.style.transform = "translate(-50%, -50%)";
//       cursor.style.boxShadow = "0 0 10px rgba(0,255,255,0.5)";
//       cursor.style.transition = "background-color 0.1s, transform 0.1s";
//       document.body.appendChild(cursor);
//     }
//     cursor.style.left = `${x}px`;
//     cursor.style.top = `${y}px`;
//   };

//   const setCursorClickState = (isClicking: boolean) => {
//       const cursor = getCursorEl();
//       if(cursor) {
//           cursor.style.backgroundColor = isClicking ? "rgba(255, 0, 0, 0.5)" : "rgba(0, 255, 255, 0.2)";
//           cursor.style.transform = isClicking ? "translate(-50%, -50%) scale(0.8)" : "translate(-50%, -50%) scale(1)";
//       }
//   }

//   const removeCustomCursor = () => {
//     const cursor = getCursorEl();
//     if (cursor) cursor.remove();
//   };

//   const triggerClick = (x: number, y: number) => {
//       // Hide cursor momentarily so we don't click the cursor div itself (though pointer-events: none handles this)
//       const el = document.elementFromPoint(x, y) as HTMLElement;
//       if (el) {
//           el.click();
//           // Also trigger focus if it's an input
//           el.focus();
//       }
//   };

//   const drawHand = (ctx: CanvasRenderingContext2D, landmarks: NormalizedLandmark[]) => {
//       // Connect key points for visual feedback (Skeleton)
//       ctx.strokeStyle = "#00FFFF";
//       ctx.lineWidth = 2;
      
//       const connect = (i: number, j: number) => {
//           const p1 = landmarks[i];
//           const p2 = landmarks[j];
//           ctx.beginPath();
//           ctx.moveTo(p1.x * ctx.canvas.width, p1.y * ctx.canvas.height);
//           ctx.lineTo(p2.x * ctx.canvas.width, p2.y * ctx.canvas.height);
//           ctx.stroke();
//       };

//       // Thumb
//       connect(0, 1); connect(1, 2); connect(2, 3); connect(3, 4);
//       // Index
//       connect(0, 5); connect(5, 6); connect(6, 7); connect(7, 8);
//       // Pinks & Others (Simplified)
//       connect(0, 17); connect(5, 9); connect(9, 13); connect(13, 17);
      
//       // Draw tips
//       ctx.fillStyle = "red";
//       [4, 8, 12, 16, 20].forEach(i => {
//           const p = landmarks[i];
//           ctx.beginPath();
//           ctx.arc(p.x * ctx.canvas.width, p.y * ctx.canvas.height, 4, 0, 2 * Math.PI);
//           ctx.fill();
//       });
//   };

//   // Render video/canvas into the #hand-cam-preview if present, else fallback to floating panel (for dev/testing)
//   // Hide floating panel if preview is present
//   if (typeof window !== 'undefined') {
//     const preview = document.getElementById("hand-cam-preview");
//     if (preview && isEnabled && videoRef.current && canvasRef.current) {
//       // Move video/canvas into preview
//       preview.innerHTML = "";
//       preview.appendChild(videoRef.current);
//       preview.appendChild(canvasRef.current);
//       videoRef.current.className = "w-full h-full object-cover -scale-x-100 opacity-80 rounded-md";
//       canvasRef.current.className = "absolute top-0 left-0 w-full h-full pointer-events-none";
//       videoRef.current.style.position = "relative";
//       canvasRef.current.style.position = "absolute";
//       return null;
//     }
//   }

//   // Fallback: floating panel (for dev/testing)
//   return (
//     <div className="fixed bottom-16 right-4 z-[50] flex flex-col items-end gap-2">
//       {/* ...existing code... */}
//     </div>
//   );
// }

// export default HandTracker;
