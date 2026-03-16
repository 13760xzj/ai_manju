import React from "react";
import Markdown from "@/assets/markdown.png";
import { ImCheckboxChecked } from "react-icons/im";
import type { ResourceBase } from "@/types";

export interface DocumentResProps {
  active: boolean;
  item: ResourceBase;
  onSelect: (id: string | number) => void;
}
const DocumentRes: React.FC<DocumentResProps> = ({
  active = false,
  onSelect,
  item,
}) => {
  return (
    <div
      key={item.id}
      onClick={() => onSelect(item.id)}
      className={`flex flex-col items-center w-30 p-2! rounded-md relative cursor-pointer border ${active ? "border-(--primary-color)" : "border-transparent"}`}
    >
      <img src={Markdown} alt="icon" className="w-20" />
      <div className="text-xs text-(--text-color) mt-0.5!">故事剧本_001</div>
      <div className="text-[10px] text-(--text-color)/60">2026/01/02 15:30</div>
      <div className="absolute right-2 top-2 w-4 h-4 bg-black rounded-sm overflow-hidden border border-(--text-color)60">
        {active && (
          <ImCheckboxChecked
            style={{ color: "#84de7b" }}
            className="w-full h-full"
          />
        )}
      </div>
    </div>
  );
};

export default DocumentRes;
