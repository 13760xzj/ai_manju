import React, { useState } from "react";
import { FaRegImages } from "react-icons/fa";
import { Popover } from "antd";
import "./components.css";
import { AiOutlineArrowsAlt } from "react-icons/ai";
import { RiDownloadLine } from "react-icons/ri";
import { ImagePreview } from "@/components/common";

export interface PicListItemProps {
  item: { index: number; selected?: boolean };
  generateThreeBtn?: boolean;
  isVideo?: boolean;
}
export const PicListItem: React.FC<PicListItemProps> = ({
  item,
  generateThreeBtn = false,
  isVideo = false,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  return (
    <div className="h-85 flex flex-col">
      <div className="flex items-center gap-2">
        <FaRegImages />
        <span>场景四宫格图</span>
        <div className="w-px h-3 bg-white/30"></div>
        <span className="px-1! border text-xs border-white/30 rounded-sm text-white/90">
          纳米修图Pro（高速版）
        </span>
        <span className="px-1! text-xs border border-white/30 rounded-sm text-white/90">
          16:9
        </span>
        <span className="text-xs text-white/50">2026-02-05 17:21</span>
      </div>
      <div className="flex-1 mt-2! overflow-hidden relative">
        <img
          src={`https://picsum.photos/1270/720?random=${item.index}`}
          className="object-contain w-full h-full transition-all duration-500 rounded-xl"
          style={{
            border: item.selected
              ? `2px solid var(--primary-color)`
              : "2px solid transparent",
          }}
        />
        <div className="absolute right-3 top-3 flex items-center gap-1 justify-end">
          <ImagePreview images={["https://picsum.photos/id/1015/800/600"]}>
            <div className="w-6 h-6 bg-black/60 hover:opacity-80 cursor-pointer rounded-md flex items-center justify-center border border-white/60">
              <AiOutlineArrowsAlt style={{ fontSize: "16px" }} />
            </div>
          </ImagePreview>

          <div className="w-6 h-6 bg-black/60 hover:opacity-80 cursor-pointer rounded-md flex items-center justify-center border border-white/60">
            <RiDownloadLine style={{ fontSize: "16px" }} />
          </div>
        </div>
      </div>
      <div className="flex items-center mt-2! gap-2">
        <div className="h-7 px-2! bg-white/10 hover:opacity-80 cursor-pointer rounded-md flex items-center justify-center border border-white/20">
          <span className="text-xs">添加为场景图</span>
        </div>
        <div className="flex-1"></div>
        {generateThreeBtn && !isVideo && (
          <div className="h-7 px-2! bg-white/10 hover:opacity-80 cursor-pointer rounded-md flex items-center justify-center border border-white/20">
            <span className="text-xs">生成三视图</span>
          </div>
        )}
        <div className="h-7 px-2! bg-white/10 hover:opacity-80 cursor-pointer rounded-md flex items-center justify-center border border-white/20">
          <span className="text-xs">重新编辑</span>
        </div>
        {!isVideo && (
          <div className="h-7 px-2! bg-white/10 hover:opacity-80 cursor-pointer rounded-md flex items-center justify-center border border-white/20">
            <span className="text-xs">对话作图</span>
          </div>
        )}
        {!isVideo && (
          <Popover
            title=""
            trigger="click"
            overlayClassName="custom-popover"
            placement="bottom"
            arrow={false}
            open={open}
            onOpenChange={handleOpenChange}
            content={
              <div className="left-full top-0 p-2! bg-[#2f3032] rounded-md  shadow-3xl">
                <div
                  onClick={() => setOpen(false)}
                  className="text-xs text-white/90  cursor-pointer rounded-md flex flex-col gap-2"
                >
                  {[1, 2].map((item) => (
                    <div className="flex items-center gap-2 hover:bg-[#444547] p-2! w-60 rounded-md">
                      <img
                        src={`https://picsum.photos/120/70?random=${item}`}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="text-sm font-bold">
                          <span>重绘高清{item}</span>
                          <span className="text-xs text-white/50 my-0.5!">
                            （消耗 10 积分）
                          </span>
                        </div>
                        <div className="text-[10px] text-white/50 mt-1!">
                          AI 补充细节与纹理，生成4K大片质感
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            }
          >
            <div className="h-7 px-2! bg-white/10 hover:opacity-80 cursor-pointer rounded-md flex items-center justify-center border border-white/20">
              <span className="text-xs">变清晰</span>
            </div>
          </Popover>
        )}
        {!isVideo && (
          <div className="h-7 px-2! bg-white/10 hover:opacity-80 cursor-pointer rounded-md flex items-center justify-center border border-white/20">
            <span className="text-xs">多机位</span>
          </div>
        )}
      </div>
      <div className="h-2"></div>
    </div>
  );
};
