import React, { useState } from "react";
import { IoDocumentTextSharp } from "react-icons/io5";
import { RiRefreshLine } from "react-icons/ri";
import { RiAiGenerate } from "react-icons/ri";
import { PropsSelectVideo } from "./PropsSelectVideo";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ToggleLayout, ImagePreview } from "@/components/common";
import PopoverSelect from "./PopoverSelect";
import { AiOutlineArrowsAlt } from "react-icons/ai";
import { BiTransfer } from "react-icons/bi";
import { Switch } from "antd";
import { AtInputArea } from "./AtInputArea";
import "./index.css";
export const GeneratePicToVideo: React.FC = () => {
  const [content, setContent] = useState("");
  const [framing, setFraming] = useState("");

  const options = new Array(15).fill(0).map((_v, i) => ({
    label: "构图" + (i + 1),
    value: i + "",
    image: `https://picsum.photos/120/70?random=${i}`,
  }));

  return (
    <div className="h-full overflow-hidden flex flex-col gap-4">
      <div className="bg-[var(--panel-1)] border border-[var(--border-light)] p-1! rounded-sm backdrop-blur-sm flex items-center justify-between">
        <div className="flex items-center gap-2 text-[var(--text-strong)]">
          <IoDocumentTextSharp />
          <span className="text-sm text-[var(--text-weak)]">@分镜脚本1：分镜1-1</span>
        </div>
        <div className="bg-[var(--panel-2)] text-sm px-2! py-1! rounded-sm flex items-center gap-1 cursor-pointer text-[var(--text-weak)] hover:opacity-90">
          <RiRefreshLine />
          生成提示词
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <ToggleLayout
          className="overflow-hidden rounded-xl border border-[#38447c]"
          areaA={
            <div className="h-full overflow-y-auto flex flex-col gap-3 p-3!">
              <div className="flex items-center gap-2">
                <span className="text-sm">九宫格多机位</span>
                <Switch size="small" defaultChecked />
              </div>
              <div className="flex-1 overflow-y-auto">
                <div className="w-30 h-20 border border-white/40 overflow-hidden rounded-xl cursor-pointer relative group">
                  <img
                    src={"https://picsum.photos/1270/720?random=6"}
                    className="w-full h-full object-contain hover:scale-125 transition-all duration-300 ease-in-out"
                  />
                  <div className="absolute top-1 left-1 right-1  group-hover:block">
                    <div className="flex items-center  justify-end">
                      <ImagePreview
                        images={["https://picsum.photos/1270/720?random=6"]}
                      >
                        <div className="w-6 h-6 bg-black/70 hover:opacity-80 cursor-pointer rounded-sm flex items-center justify-center border border-white/20">
                          <AiOutlineArrowsAlt style={{ fontSize: "17px" }} />
                        </div>
                      </ImagePreview>
                      <div className="w-6 h-6 bg-black/70 hover:opacity-80 cursor-pointer mx-2! rounded-sm flex items-center justify-center border border-white/20">
                        <BiTransfer style={{ fontSize: "15px" }} />
                      </div>
                      <div className="w-6 h-6 bg-black/70 hover:opacity-80 cursor-pointer rounded-sm flex items-center justify-center border border-white/20">
                        <RiDeleteBin6Line style={{ fontSize: "15px" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
          areaB={
            <div className="h-full overflow-y-auto flex flex-col gap-2 p-2!">
              <div>
                <PopoverSelect
                  title="镜头运动"
                  value={framing}
                  options={options}
                  onChange={(item) => {
                    setFraming(String(item?.value ?? ""));
                  }}
                />
              </div>
              <div className="h-30 shrink-0 p-2! flex flex-col overflow-hidden rounded-xl border border-[#38447c]">
                <AtInputArea
                  fontSize="12px"
                  options={[
                    {
                      img: "https://picsum.photos/120/70?random=1",
                      name: "李元宝-布衣少年-三视图",
                    },
                    {
                      img: "https://picsum.photos/120/70?random=2",
                      name: "食神宗山门-林小当苏醒与魔云宗逼迫-正面视角",
                    },
                    {
                      img: "https://picsum.photos/120/70?random=3",
                      name: "苏清瑶-落难少女-三视图",
                    },
                  ]}
                  defaultValue="场景是角色@[李元宝-布衣少年-三视图]在卧室里面看电视。"
                  onChange={(e) => {
                    setContent(e);
                  }}
                  iconSize={21}
                  maxLength={1000}
                  showCounter={false}
                  btnPosition="right"
                  placeholder="描述要生成的画面..."
                  renderOptionItem={(item) => (
                    <div className="text-ellipsis line-clamp-1">
                      {item.name}
                    </div>
                  )}
                />
              </div>
              <div>
                <PopoverSelect
                  title="特殊拍摄手法"
                  value={framing}
                  options={options}
                  onChange={(item) => {
                    setFraming(String(item?.value ?? ""));
                  }}
                />
              </div>
            </div>
          }
          areaC={
            <div className="h-full p-2!">
              <AtInputArea
                defaultValue={content}
                openAt={false}
                onChange={(e) => {
                  setContent(e);
                }}
                maxLength={3000}
                placeholder="描述要生成的画面内容和动作..."
              />
            </div>
          }
        />
      </div>

      <div className="flex items-center gap-2">
        <PropsSelectVideo />
      </div>
      <div className="h-14 rounded-xl w-full cursor-pointer hover:opacity-90 bg-[linear-gradient(135deg,var(--secondary-color),var(--primary-color))] text-white flex items-center justify-center">
        <RiAiGenerate style={{ fontSize: 20 }} />
        <div className="mx-2!">开始生视频</div>
        <span>消耗</span>
        <span className="mx-1! font-bold">12</span>
        <span>积分</span>
      </div>
    </div>
  );
};
