import React, { useState } from "react";
import { CustomSelect } from "@/components/common";
import { Popover } from "antd";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import "@/components/features/Storyboard/components.css";
import { AtInputArea } from "./AtInputArea";

export interface PropsSelectVideoProps {
  position?: "top" | "bottom";
  isMulti?: boolean; // 多参|首位帧
  showRatio?: boolean;
}
export const PropsSelectVideo: React.FC<PropsSelectVideoProps> = ({
  position,
  isMulti = false,
  showRatio = true,
}) => {
  const [audioType, setAudioType] = useState<number | null>(1);
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <div className="w-45">
        <CustomSelect
          placeholder="生图模型"
          panelWidth={280}
          position={position}
          options={[
            {
              label: "纳米修图",
              value: "all",
              icon: "https://picsum.photos/120/70?random=1",
              price: "2积分/1张",
              desc: "5秒内生成，精美的图片",
              dpi: "2k",
            },
            {
              label: "即梦5.0",
              value: "image",
              price: "5积分/1张",
              icon: "https://picsum.photos/120/70?random=2",
              dpi: "2k.4k",
              desc: "5秒内生成，高清图片",
            },
            {
              label: "可图",
              value: "video",
              price: "4积分/1张",
              dpi: "2k",
              icon: "https://picsum.photos/120/70?random=3",
              desc: "5秒内生成，高清图片",
            },
            {
              label: "可图2.0",
              value: "kt2",
              price: "4积分/1张",
              dpi: "2k",
              icon: "https://picsum.photos/120/70?random=3",
              desc: "5秒内生成，高清图片",
            },
          ]}
          onChange={(v) => console.log(v)}
          renderItem={(option) => (
            <div className="flex items-center gap-2">
              <img src={option.icon} className="w-10 h-10 rounded-full" />
              <div>
                <div className="text-md text-white">{option.label}</div>
                <div className="text-xs text-white/50 my-0.5!">
                  {option.desc}
                </div>
                <div className="text-xs text-white">
                  {option.dpi} {option.price}
                </div>
              </div>
            </div>
          )}
        />
      </div>
      {isMulti && showRatio && (
        <div className="flex-1">
          <CustomSelect
            placeholder="比例"
            position={position}
            options={[
              { label: "16:9", value: "16:9" },
              { label: "9:16", value: "9:16" },
              { label: "4:3", value: "3:4" },
              { label: "3:4", value: "4:3" },
              { label: "1:1", value: "1:1" },
              { label: "2:3", value: "2:3" },
              { label: "3:2", value: "3:2" },
              { label: "4:5", value: "4:5" },
              { label: "5:4", value: "5:4" },
              { label: "21:9", value: "21:9" },
            ]}
            onChange={(v) => console.log(v)}
          />
        </div>
      )}
      <div className="flex-1">
        <CustomSelect
          placeholder="时长"
          position={position}
          value={4}
          options={new Array(16)
            .fill(0)
            .map((_, i) => ({ label: `${i + 1}s`, value: i + 1 }))}
          onChange={(v) => console.log(v)}
        />
      </div>
      <div className="flex-1">
        <CustomSelect
          placeholder="数量"
          position={position}
          value={1}
          options={new Array(4)
            .fill(0)
            .map((_, i) => ({ label: `${i + 1}个`, value: i + 1 }))}
          onChange={(v) => console.log(v)}
        />
      </div>
      <div className="w-29">
        <CustomSelect
          placeholder="画质"
          position={position}
          value={2}
          options={[
            { label: "超清(2k)", value: 1 },
            { label: "高清(1080)", value: 2 },
            {
              label: "标准(720)",
              value: 3,
            },
          ]}
          onChange={(v) => console.log(v)}
        />
      </div>
      {!isMulti && (
        <div className="w-28">
          <Popover
            title=""
            trigger="click"
            overlayClassName="custom-popover"
            placement="top"
            arrow={false}
            open={open}
            onOpenChange={handleOpenChange}
            content={
              <div className="flex w-50 flex-col gap-2 p-2! bg-[#1f1f1f] shadow-3xl rounded-xl border border-[#38447c]">
                <CustomSelect
                  placeholder="选择音效"
                  position={position}
                  value={audioType}
                  options={[
                    { label: "无声视频", value: 1 },
                    { label: "添加音效", value: 2 },
                  ]}
                  onChange={(v) => {
                    setAudioType(v as number);
                    if (v === 2) {
                      setContent(
                        "雷暴环境音：远处雷声低沉闷响，雨点密集敲打窗户玻璃，室内电脑主机低频运转声，偶尔闪电瞬间的电流噼啪声，营造闷热压抑的雨夜氛围",
                      );
                    } else {
                      setContent("");
                    }
                  }}
                />
                <div className="h-35 border border-[#38447c] rounded-md p-2! text-white">
                  <AtInputArea
                    defaultValue={content}
                    openAt={false}
                    fontSize="13px"
                    onChange={(e) => {
                      setContent(e);
                    }}
                    maxLength={200}
                    placeholder="描述要生成的画面..."
                  />
                </div>
              </div>
            }
          >
            <div className="flex w-full items-center justify-between border select_input">
              <div className="flex-1 flex items-center gap-2">
                <span className="flex-1 text-ellipsis line-clamp-1 text-sm">
                  {!audioType
                    ? "音效"
                    : audioType === 1
                      ? "无声视频"
                      : "添加音效"}
                </span>
              </div>
              <span className={`arrow ${open ? "rotate" : ""}`}>
                <MdOutlineKeyboardArrowDown />
              </span>
            </div>
          </Popover>
        </div>
      )}
    </div>
  );
};
