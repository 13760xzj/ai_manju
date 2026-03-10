import React, { useState } from "react";
import { IoDocumentTextSharp } from "react-icons/io5";
import { RiRefreshLine } from "react-icons/ri";
import { RiAiGenerate } from "react-icons/ri";
import { PropsSelect } from "./PropsSelect";
import { AtInputArea } from "./AtInputArea";
import { ToggleLayout } from "@/components/common";
import PopoverSelect from "./PopoverSelect";
import { HorizontalScroll } from "@/components/features";
import { IoMdAdd } from "react-icons/io";
export const GenerateMultiToPic: React.FC = () => {
  const [content, setContent] = useState("");
  const [framing, setFraming] = useState();

  const options = new Array(15).fill(0).map((v, i) => ({
    label: "构图" + (i + 1),
    value: i,
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
          className="overflow-hidden rounded-xl border border-[#38447c]"
          areaA={
            <div className="h-full overflow-y-auto flex flex-col gap-4 p-3!">
              <div className="flex items-center overflow-hidden">
                <div className="text-sm text-white/80 mr-3!">
                  场<br />景
                </div>
                <div className="flex-1 overflow-hidden">
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
              <div className="flex items-center">
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
              <div className="flex items-center">
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
              <div className="flex items-center">
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
                  title="构图"
                  value={framing}
                  options={options}
                  onChange={(item) => {
                    console.log("选择了", item);
                    setFraming(item.value);
                  }}
                />
              </div>
              <div className="h-30 shrink-0 p-2! overflow-hidden rounded-xl border border-[#38447c]">
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
                  maxLength={100}
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
                  title="景别"
                  value={framing}
                  options={options}
                  onChange={(item) => {
                    console.log("选择了", item);
                  }}
                />
              </div>
              <div>
                <PopoverSelect
                  title="拍摄角度"
                  value={framing}
                  options={options}
                  onChange={(item) => {
                    console.log("选择了", item);
                  }}
                />
              </div>
              <div>
                <PopoverSelect
                  title="镜头焦距"
                  value={framing}
                  options={options}
                  onChange={(item) => {
                    console.log("选择了", item);
                  }}
                />
              </div>
              <div>
                <PopoverSelect
                  title="色彩倾向"
                  value={framing}
                  options={options}
                  onChange={(item) => {
                    console.log("选择了", item);
                  }}
                />
              </div>
              <div>
                <PopoverSelect
                  title="光线"
                  value={framing}
                  options={options}
                  onChange={(item) => {
                    console.log("选择了", item);
                  }}
                />
              </div>
              <div>
                <PopoverSelect
                  title="摄影技法"
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
            <div className="h-full flex flex-col gap-2 p-2!">
              <AtInputArea
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
                defaultValue={content}
                onChange={(e) => {
                  setContent(e);
                }}
                maxLength={3000}
                placeholder="描述要生成的画面..."
                renderOptionItem={(item) => (
                  <div className="text-ellipsis line-clamp-1">{item.name}</div>
                )}
              />
            </div>
          }
        />
      </div>

      <div className="flex items-center gap-2">
        <PropsSelect />
      </div>
      <div className="h-14 rounded-xl w-full cursor-pointer hover:opacity-90 bg-[linear-gradient(to_right_bottom,#6deafb,#66aef7)] text-black flex items-center justify-center">
        <RiAiGenerate style={{ fontSize: 20 }} />
        <div className="mx-2!">开始生图</div>
        <span>消耗</span>
        <span className="mx-1! font-bold">12</span>
        <span>积分</span>
      </div>
    </div>
  );
};
