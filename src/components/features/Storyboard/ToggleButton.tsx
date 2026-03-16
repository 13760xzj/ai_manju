import React from "react";

export interface ToggleButtonProps {
  value: "card" | "list";
  onToggle: (val: "card" | "list") => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ value, onToggle }) => {
  return (
    <div className="bg-(--text-color)/5 flex items-center  p-1! rounded-lg text-sm cursor-pointer">
      <div
        onClick={() => onToggle("list")}
        className={`w-15 flex items-center justify-center rounded-md py-1! ${value === "list" ? "bg-(--bg-light)" : ""}`}
      >
        列表
      </div>
      <div
        onClick={() => onToggle("card")}
        className={`w-15 flex items-center justify-center rounded-md py-1! ${value === "card" ? "bg-(--bg-light)" : ""}`}
      >
        卡片
      </div>
    </div>
  );
};

export default ToggleButton;
