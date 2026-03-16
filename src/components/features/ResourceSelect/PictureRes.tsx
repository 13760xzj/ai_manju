import { MediaPreview } from "@/components/common";
import type { ResourceBase } from "@/types";
import React from "react";
import { AiOutlineArrowsAlt } from "react-icons/ai";
import { ImCheckboxChecked } from "react-icons/im";

export interface PictureResProps {
  item: ResourceBase;
  onSelect: (id: string | number) => void;
  active: boolean;
}
const PictureRes: React.FC<PictureResProps> = ({ item, onSelect, active }) => {
  return (
    <div
      key={item.id}
      onClick={() => onSelect(item.id)}
      className={`flex flex-col border cursor-pointer relative rounded-xl overflow-hidden ${active ? "border-(--primary-color)" : "border-(--text-color)/30"}`}
    >
      <img src={item.image} className="w-50 h-30 object-cover" alt="picture" />
      <div className="text-xs text-(--text-color)/50 px-2! py-3!">
        {item.time}
      </div>
      <div className="absolute right-2 top-2 z-2 gap-1 flex items-center justify-end">
        <div
          className="w-4 h-4"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <MediaPreview urls={item.image ? [item.image] : []}>
            <div className="w-4 h-4 bg-black/60 hover:opacity-80 cursor-pointer rounded-sm flex items-center justify-center border border-(--text-color)/30">
              <AiOutlineArrowsAlt
                style={{ color: "#fff" }}
                className="w-full h-full"
              />
            </div>
          </MediaPreview>
        </div>
        <div className=" w-4 h-4 bg-black rounded-sm overflow-hidden">
          {active && (
            <ImCheckboxChecked
              style={{ color: "#84de7b" }}
              className="w-full h-full"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PictureRes;
