import React, { useState } from "react";
import { IoDocumentTextSharp } from "react-icons/io5";
import { RiRefreshLine } from "react-icons/ri";
import { RiAiGenerate } from "react-icons/ri";
import { PropsSelectVideo } from "./PropsSelectVideo";
import PopoverSelect from "./PopoverSelect";
import { HorizontalScroll } from "@/components/features";
import { ToggleLayout } from "@/components/common";
import { IoMdAdd } from "react-icons/io";
import { AtInputArea } from "./AtInputArea";
import "./index.css";
export const GenerateMultiToVideo: React.FC = () => {
  const [content, setContent] = useState("");
  const [framing, setFraming] = useState("");

  const options = new Array(15).fill(0).map((v, i) => ({
    label: "构图" + (i + 1),
    value: i + "",
    image: `https://picsum.photos/120/70?random=${i}`,
  }));

  return (
    <div className="h-full overflow-hidden flex flex-col gap-4">
      <div className="bg-[#203429] p-1! rounded-sm flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <IoDocumentTextSharp />
          <span className="text-sm">@分镜脚本1：分镜1-1</span>
        </div>
        <div className="bg-[#32443a] text-sm px-2! py-1! rounded-sm flex items-center gap-1 cursor-pointer">
          <RiRefreshLine />
          生成提示词
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <ToggleLayout
          className="overflow-hidden shrink-0 rounded-xl border border-[#38447c]"
          areaA={
            <div className="h-full overflow-y-auto flex flex-col gap-4 p-3!">
              <div className="flex items-center shrink-0 overflow-hidden">
                <div className="text-sm text-white/80 mr-3!">
                  场<br />景
                </div>
                <div className="flex-1 shrink-0 overflow-hidden">
                  <HorizontalScroll
                    gap={8}
                    buttonPosition="split"
                    data={new Array(1).fill(0).map((_, i) => ({
                      id: i,
                      url: `https://picsum.photos/120/70?random=${i}`,
                    }))}
                    childWidth={80}
                    renderItem={(item, index) => {
                      if (index === 0) {
                        return (
                          <div
                            key={index}
                            className="flex-1 flex flex-col hover:opacity-80 items-center justify-center cursor-pointer border border-dashed rounded-md bg-white/10 border-white/50 h-13"
                          >
                            <IoMdAdd style={{ fontSize: "20px" }} />
                            <div className="text-xs">导入场景</div>
                          </div>
                        );
                      }
                      return (
                        <div className="bg-white/50 h-13 rounded-md overflow-hidden">
                          <img
                            src={item.url}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      );
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center shrink-0">
                <div className="text-sm text-white/80 mr-3!">
                  角<br />色
                </div>
                <div className="flex-1 overflow-hidden">
                  <HorizontalScroll
                    gap={8}
                    buttonPosition="split"
                    data={new Array(3).fill(0).map((_, i) => ({
                      id: i,
                      url: `https://picsum.photos/120/70?random=${i}`,
                    }))}
                    childWidth={80}
                    renderItem={(item, index) => {
                      if (index === 2) {
                        return (
                          <div
                            key={index}
                            className="flex-1 flex flex-col hover:opacity-80 items-center justify-center cursor-pointer border border-dashed rounded-md bg-white/10 border-white/50 h-13"
                          >
                            <IoMdAdd style={{ fontSize: "20px" }} />
                            <div className="text-xs">导入角色</div>
                          </div>
                        );
                      }
                      return (
                        <div className="bg-white/50 h-13 rounded-md overflow-hidden">
                          <img
                            src={item.url}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      );
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center shrink-0">
                <div className="text-sm text-white/80 mr-3!">
                  道<br />具
                </div>
                <div className="flex-1 overflow-hidden">
                  <HorizontalScroll
                    gap={8}
                    buttonPosition="split"
                    data={new Array(2).fill(0).map((_, i) => ({
                      id: i,
                      url: `https://picsum.photos/120/70?random=${i}`,
                    }))}
                    childWidth={80}
                    renderItem={(item, index) => {
                      if (index === 1) {
                        return (
                          <div
                            key={index}
                            className="flex-1 flex flex-col hover:opacity-80 items-center justify-center cursor-pointer border border-dashed rounded-md bg-white/10 border-white/50 h-13"
                          >
                            <IoMdAdd style={{ fontSize: "20px" }} />
                            <div className="text-xs">导入道具</div>
                          </div>
                        );
                      }
                      return (
                        <div className="bg-white/50 h-13 rounded-md overflow-hidden">
                          <img
                            src={item.url}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      );
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center shrink-0">
                <div className="text-sm text-white/80 mr-3!">
                  其<br />他
                </div>
                <div className="flex-1 overflow-hidden">
                  <HorizontalScroll
                    gap={8}
                    buttonPosition="split"
                    data={new Array(6).fill(0).map((_, i) => ({
                      id: i,
                      url: `https://picsum.photos/120/70?random=${i}`,
                    }))}
                    childWidth={80}
                    renderItem={(item, index) => {
                      if (index === 5) {
                        return (
                          <div
                            key={index}
                            className="flex-1 flex flex-col hover:opacity-80 items-center justify-center cursor-pointer border border-dashed rounded-md bg-white/10 border-white/50 h-13"
                          >
                            <IoMdAdd style={{ fontSize: "20px" }} />
                            <div className="text-xs">导入其他</div>
                          </div>
                        );
                      }
                      return (
                        <div className="bg-white/50 h-13 rounded-md overflow-hidden">
                          <img
                            src={item.url}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          }
          areaB={
            <div className="h-full overflow-y-auto flex flex-col gap-2 p-2!">
              <div>
                <PopoverSelect
                  title="特殊拍摄手法"
                  value={framing}
                  options={options}
                  onChange={(item) => {
                    console.log("选择了", item);
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
        <PropsSelectVideo isMulti={true} />
      </div>
      <div className="h-14 rounded-xl w-full cursor-pointer hover:opacity-90 bg-[linear-gradient(to_right_bottom,#6deafb,#66aef7)] text-black flex items-center justify-center">
        <RiAiGenerate style={{ fontSize: 20 }} />
        <div className="mx-2!">开始生视频</div>
        <span>消耗</span>
        <span className="mx-1! font-bold">12</span>
        <span>积分</span>
      </div>
    </div>
  );
};
