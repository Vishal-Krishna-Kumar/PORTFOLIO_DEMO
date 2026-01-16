import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

// Define the prop type
interface CursorOverlayProps {
  enabled: boolean;
}

const CursorOverlay = ({ enabled }: CursorOverlayProps) => {
  const [cursors, setCursors] = useState<Record<string, { x: number; y: number; color: string }>>({});
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // 1. If disabled, disconnect everything and clear cursors
    if (!enabled) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      setCursors({});
      return;
    }

    // 2. If enabled, connect to the server
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    // 3. Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      newSocket.emit("cursor-move", { x, y });
    };

    // 4. Listen for updates
    newSocket.on("cursor-update", (data: any) => {
      setCursors((prev) => ({
        ...prev,
        [data.id]: { x: data.x, y: data.y, color: data.color },
      }));
    });

    newSocket.on("cursor-remove", (id: string) => {
      setCursors((prev) => {
        const newCursors = { ...prev };
        delete newCursors[id];
        return newCursors;
      });
    });

    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      newSocket.disconnect();
    };
  }, [enabled]); // Re-run this effect when 'enabled' changes

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {Object.entries(cursors).map(([id, { x, y, color }]) => (
        <div
          key={id}
          className="absolute flex items-center transition-all duration-100 ease-linear"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-lg">
            <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
          </svg>
          <span className="ml-2 rounded bg-black/50 px-1 py-0.5 text-[10px] font-mono text-white backdrop-blur border border-green-500/30">
            User-{id.slice(0, 4)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CursorOverlay;