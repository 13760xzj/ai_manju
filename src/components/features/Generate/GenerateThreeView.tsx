import React from "react";
import ThreeIcon from "@/assets/three.webp";
import { Tooltip } from "antd";
import { AiOutlineArrowsAlt } from "react-icons/ai";
import { BiTransfer } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MediaPreview } from "@/components/common";
import { RiAiGenerate } from "react-icons/ri";
export const GenerateThreeView: React.FC = () => {
  return (
    <div className="h-full overflow-hidden flex flex-col gap-4">
      <img src={ThreeIcon} alt="参考图" className="w-full object-cover" />
      <div className="h-40 overflow-hidden relative bg-(--bg-color) cursor-pointer rounded-xl group">
        <MediaPreview urls={["https://picsum.photos/id/1015/800/600"]}>
          <div className="flex h-full items-center justify-center overflow-hidden">
            <img
              src={"https://picsum.photos/id/1015/800/600"}
              alt="img"
              className="h-full object-contain"
            />
          </div>
        </MediaPreview>
        <div className="absolute right-2 top-2 hidden group-hover:block">
          <div
            className="flex items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-6 w-6 bg-(--text-color)/10 hover:opacity-80 cursor-pointer rounded-md flex items-center justify-center border border-(--text-color)/20">
              <MediaPreview urls={["https://picsum.photos/id/1015/800/600"]}>
                <Tooltip title={"全屏"}>
                  <AiOutlineArrowsAlt />
                </Tooltip>
              </MediaPreview>
            </div>
            <div className="h-6 w-6 bg-(--text-color)/10 hover:opacity-80 cursor-pointer rounded-md flex items-center justify-center border border-(--text-color)/20">
              <Tooltip title={"替换"}>
                <BiTransfer />
              </Tooltip>
            </div>
            <div className="h-6 w-6 bg-(--text-color)/10 hover:opacity-80 cursor-pointer rounded-md flex items-center justify-center border border-(--text-color)/20">
              <Tooltip title={"删除"}>
                <RiDeleteBin6Line />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1" />
      <div className="h-14 rounded-xl w-full cursor-pointer hover:opacity-90 bg-[linear-gradient(to_left,var(--primary-color),var(--primary-color-dark))] text-(--text-color) flex items-center justify-center">
        <RiAiGenerate style={{ fontSize: 20 }} />
        <div className="mx-2!">生成三视图</div>
        <span>消耗</span>
        <span className="mx-1! font-bold">12</span>
        <span>积分</span>
      </div>
    </div>
  );
};
