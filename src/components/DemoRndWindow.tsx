// import React from "react"; // Not needed for React 17+
import { Rnd } from "react-rnd";

interface DemoRndWindowProps {
  title: string;
  children: React.ReactNode;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
}

const DemoRndWindow = ({ title, children, defaultPosition, defaultSize }: DemoRndWindowProps) => {
  return (
    <Rnd
      default={{
        x: defaultPosition?.x || 100,
        y: defaultPosition?.y || 100,
        width: defaultSize?.width || 320,
        height: defaultSize?.height || 240,
      }}
      minWidth={200}
      minHeight={120}
      bounds="window"
      dragHandleClassName="rnd-title-bar"
      className="shadow-lg rounded-lg bg-white/90 border border-gray-300 overflow-hidden"
    >
      <div className="rnd-title-bar cursor-move bg-blue-600 text-white px-3 py-1 text-sm font-bold flex items-center justify-between">
        <span>{title}</span>
        {/* Add close/min/max buttons here if needed */}
      </div>
      <div className="p-3">{children}</div>
    </Rnd>
  );
};

export default DemoRndWindow;
