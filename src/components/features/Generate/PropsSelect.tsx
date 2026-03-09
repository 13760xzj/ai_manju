import React from "react";
import { CustomSelect } from "@/components/common";

export interface PropsSelectProps {
  position?: "top" | "bottom";
}
export const PropsSelect: React.FC = ({ position }) => {
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="w-55">
        <CustomSelect
          placeholder="生图模型"
          panelWidth={"280px"}
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
          width={240}
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
          width={240}
          onChange={(v) => console.log(v)}
        />
      </div>
      <div className="flex-1">
        <CustomSelect
          placeholder="数量"
          position={position}
          options={[
            { label: "1张", value: "1" },
            { label: "2张", value: "2" },
            {
              label: "3张",
              value: "3",
              children: [{ label: "1张", value: "5" }],
            },
            { label: "4张", value: "4" },
          ]}
          width={240}
          onChange={(v) => console.log(v)}
        />
      </div>
      <div className="flex-1">
        <CustomSelect
          placeholder="分辨率"
          position={position}
          options={[
            { label: "1k", value: "1" },
            { label: "2k", value: "2" },
            { label: "4k", value: "4" },
          ]}
          width={240}
          onChange={(v) => console.log(v)}
        />
      </div>
    </div>
  );
};
