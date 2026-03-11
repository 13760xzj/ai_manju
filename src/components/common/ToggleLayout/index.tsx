import { useState } from "react";
import {
  MdKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import "./index.css";

export interface ToggleLayoutProps {
  areaA: React.ReactNode;
  areaB: React.ReactNode;
  areaC: React.ReactNode;
  className?: string;
}

export function ToggleLayout({
  areaA,
  areaB,
  areaC,
  className = "",
}: ToggleLayoutProps) {
  const [expand, setExpand] = useState(false);

  return (
    <div className={`container ${expand ? "expand" : "fold"}`}>
      <div className={"a overflow-hidden" + " " + className}>{areaA}</div>

      <div className={"b flex flex-col" + " " + className}>
        <div className="flex-1 overflow-hidden">{areaB}</div>
        <div
          onClick={() => setExpand(!expand)}
          className="py-2! items-center justify-center flex cursor-pointer"
        >
          <span className="text-xs text-white/60">
            {expand ? "收起" : "展开"}
          </span>
          {expand ? (
            <MdKeyboardDoubleArrowUp
              style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}
            />
          ) : (
            <MdKeyboardDoubleArrowDown
              style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}
            />
          )}
        </div>
      </div>

      <div className={"c" + " " + className}>{areaC}</div>
    </div>
  );
}
