import React, { useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { IoMdMore } from "react-icons/io";
import { Tooltip, Popover } from "antd";
import "./components.css";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaRegImages } from "react-icons/fa";
import { AiOutlineArrowsAlt } from "react-icons/ai";
import { RiDownloadLine } from "react-icons/ri";
import { MediaPreview } from "@/components/common";

export interface PicCardItemProps {
  item: object;
  generateThreeBtn?: boolean; // 是否显示生成三视图按钮
  isVideo?: boolean;
}
export const PicCardItem: React.FC<PicCardItemProps> = ({
  item,
  generateThreeBtn = false,
  isVideo = false,
}) => {
  const [open, setOpen] = useState(false);
  const [openSec, setOpenSec] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  const handleOpenChange2 = (newOpen: boolean) => {
    setOpenSec(newOpen);
  };

  return (
    <div className="h-50 flex flex-col gap-2">
      <div
        className="flex-1 overflow-hidden rounded-xl relative"
        style={{
          border: item.selected
            ? `2px solid var(--primary-color)`
            : "2px solid transparent",
        }}
      >
        <img
          src={`https://picsum.photos/1270/720?random=${item.index}`}
          className="object-cover w-full h-full transition-all duration-500  hover:scale-125"
        />
        <div
          className="absolute right-2 top-2 flex items-center gap-1 justify-end"
          onClick={(e) => e.stopPropagation()}
        >
          <MediaPreview urls={["https://picsum.photos/id/1015/800/600"]}>
            <div className="w-6 h-6 bg-(--bg-color)/30 hover:opacity-80 cursor-pointer rounded-md flex items-center justify-center border border-(--text-color)/40">
              <AiOutlineArrowsAlt
                style={{ fontSize: "16px", color: "var(--text-color)" }}
              />
            </div>
          </MediaPreview>

          <div className="w-6 h-6 bg-(--bg-color)/30 hover:opacity-80 cursor-pointer rounded-md flex items-center justify-center border border-(--text-color)/40">
            <RiDownloadLine
              style={{ fontSize: "16px", color: "var(--text-color)" }}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="h-6 px-2! bg-(--bg-light)/10 hover:opacity-80 cursor-pointer rounded-md flex items-center justify-center border border-(--text-color)/20">
          <span className="text-xs">添加为场景图</span>
        </div>
        <div className="flex-1"></div>
        {generateThreeBtn && !isVideo && (
          <div className="h-6 w-6 bg-(--bg-light)/10 hover:opacity-80 cursor-pointer rounded-md flex items-center justify-center border border-(--text-color)/20">
            <Tooltip title={"生成三视图"}>
              <FaRegImages />
            </Tooltip>
          </div>
        )}
        <div className="h-6 w-6 bg-(--bg-light)/10 hover:opacity-80 cursor-pointer rounded-md flex items-center justify-center border border-(--text-color)/20">
          <Tooltip title={"重新编辑"}>
            <BiSolidEdit />
          </Tooltip>
        </div>
        {!isVideo && (
          <div className="h-6 w-6 bg-(--bg-light)/10 hover:opacity-80 cursor-pointer rounded-md flex items-center justify-center border border-(--text-color)/20">
            <Popover
              key={1}
              content={
                <div className="p-2!">
                  <div
                    onClick={() => setOpen(false)}
                    className="p-2! w-22 text-xs text-(--text-color)/90 hover:bg-(--primary-color)/20 cursor-pointer rounded-md"
                  >
                    对话作图
                  </div>
                  <div className="p-2! w-22 text-xs relative text-(--text-color)/90 hover:bg-(--primary-color)/20 cursor-pointer rounded-md group">
                    <Popover
                      key={2}
                      arrow={false}
                      open={openSec}
                      placement="right"
                      overlayClassName="custom-popover"
                      onOpenChange={handleOpenChange2}
                      content={
                        <div
                          onClick={() => {
                            setOpenSec(false);
                            setTimeout(() => {
                              setOpen(false);
                            }, 100);
                          }}
                          className="p-2! text-xs text-(--text-color)/90  cursor-pointer rounded-md flex flex-col gap-2"
                        >
                          {[1, 2].map((item) => (
                            <div className="flex items-center gap-2 hover:bg-(--primary-color)/20 p-2! w-60 rounded-md">
                              <img
                                src={`https://picsum.photos/120/70?random=${item}`}
                                className="w-10 h-10 rounded-full"
                              />
                              <div>
                                <div className="text-sm font-bold">
                                  <span>重绘高清{item}</span>
                                  <span className="text-xs text-(--text-color)/50 my-0.5!">
                                    （消耗 10 积分）
                                  </span>
                                </div>
                                <div className="text-[10px] text-(--text-color)/50 mt-1!">
                                  AI 补充细节与纹理，生成4K大片质感
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      }
                    >
                      <div className="flex items-center justify-between">
                        <span>变清晰</span>
                        <MdOutlineKeyboardArrowRight />
                      </div>
                    </Popover>
                    {/* <div className="absolute left-full bottom-0 p-1! bg-[#2f3032] rounded-md hidden group-hover:block shadow-3xl">
                      <div
                        onClick={() => setOpen(false)}
                        className="p-2! text-xs text-(--text-color)/90  cursor-pointer rounded-md flex flex-col gap-2"
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
                                <span className="text-xs text-(--text-color)/50 my-0.5!">
                                  （消耗 10 积分）
                                </span>
                              </div>
                              <div className="text-[10px] text-(--text-color)/50 mt-1!">
                                AI 补充细节与纹理，生成4K大片质感
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div> */}
                  </div>
                  <div
                    onClick={() => setOpen(false)}
                    className="p-2! w-22 text-xs text-(--text-color)/90 hover:bg-(--primary-color)/20 cursor-pointer rounded-md"
                  >
                    多机位
                  </div>
                </div>
              }
              title=""
              trigger="click"
              placement="bottom"
              overlayClassName="custom-popover"
              arrow={false}
              open={open}
              onOpenChange={handleOpenChange}
            >
              <Tooltip title={"更多功能"}>
                <IoMdMore />
              </Tooltip>
            </Popover>
          </div>
        )}
      </div>
    </div>
  );
};
