import React from "react";

export interface ToggleButtonProps {
  value: "card" | "list";
  onToggle: (val: "card" | "list") => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ value, onToggle }) => {
  return (
    <div className="bg-white/10 flex items-center  p-1! rounded-lg text-sm cursor-pointer">
      <div
        onClick={() => onToggle("list")}
        className={`w-15 flex items-center justify-center rounded-md py-1! ${value === "list" ? "bg-white/20" : ""}`}
      >
        列表
      </div>
      <div
        onClick={() => onToggle("card")}
        className={`w-15 flex items-center justify-center rounded-md py-1! ${value === "card" ? "bg-white/20" : ""}`}
      >
        卡片
      </div>
    </div>
  );
};

export default ToggleButton;
