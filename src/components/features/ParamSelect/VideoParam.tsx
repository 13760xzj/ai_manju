import React, { useState } from "react";
import type { ModelOption } from "./ModalSelect";
import AgentSelect from "./AgentSelect";
import ModalSelect from "./ModalSelect";
import { CustomSelect } from "@/components/common";

const VideoParam: React.FC = () => {
  const agentOptions = [
    {
      value: "manhua_v3",
      label: "分镜编剧（漫剧版v3）",
      description: "将场景拆解成分镜脚本,情节推进有节奏!",
      icon: "https://picsum.photos/100?random=1",
    },
    {
      value: "space_v3",
      label: "分镜编剧（空间版v3）",
      description: "适用于空间叙事场景",
      icon: "https://picsum.photos/100?random=2",
    },
    {
      value: "explain_beta",
      label: "分镜编剧（解说版beta）",
      description: "用于解说类视频分镜",
      icon: "https://picsum.photos/100?random=3",
    },
  ];
  const modelOptions: Array<ModelOption> = [
    {
      id: "nano-pro",
      name: "纳米修图Pro（高速版）",
      description: "适配各类创作，提升出图适配性",
      icon: (
        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
          <span className="text-white text-lg">😊</span>
        </div>
      ),
      priceList: [
        { resolution: "1k", price: "9/张" },
        { resolution: "2k", price: "9/张" },
        { resolution: "4k", price: "16/张" },
      ],
      tags: [{ label: "效果最好", color: "orange" }],
    },
    {
      id: "nano-2",
      name: "纳米修图2",
      description: "画质、成本、速度，全面均衡",
      icon: (
        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
          <span className="text-white text-lg">😊</span>
        </div>
      ),
      priceList: [
        { resolution: "1k", price: "5/张" },
        { resolution: "2k", price: "8/张" },
        { resolution: "4k", price: "14/张" },
      ],
    },
    {
      id: "jimeng-50-lite",
      name: "即梦5.0lite",
      description: "原图极致保持、专业美学质感",
      icon: (
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
          <span className="text-white text-lg">5.0</span>
        </div>
      ),
      priceList: [
        { resolution: "2k", price: "4/张" },
        { resolution: "3k", price: "4/张" },
      ],
      tags: [{ label: "性价比最高", color: "purple" }],
    },
    {
      id: "jimeng-45",
      name: "即梦4.5",
      description: "原图极致保持、专业美学质感",
      icon: (
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
          <span className="text-white text-lg">4.5</span>
        </div>
      ),
      priceList: [
        { resolution: "2k", price: "3/张" },
        { resolution: "4k", price: "3/张" },
      ],
    },
    {
      id: "jimeng-40",
      name: "即梦4.0",
      description: "兼顾清晰度与美感，日常出图优选",
      icon: (
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
          <span className="text-white text-lg">4.0</span>
        </div>
      ),
      priceList: [
        { resolution: "2k", price: "2/张" },
        { resolution: "4k", price: "2/张" },
      ],
    },
    {
      id: "ke-tu-omni",
      name: "可图omni",
      description: "兼顾画质效率，适配日常出图",
      icon: (
        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
          <span className="text-white text-lg">🌀</span>
        </div>
      ),
      priceList: [
        { resolution: "1k", price: "2/张" },
        { resolution: "2k", price: "2/张" },
        { resolution: "4k", price: "4/张" },
      ],
    },
  ];
  const [currentAgent, setCurrentAgent] = useState(agentOptions[0].value);
  const [selectedModel, setSelectedModel] = useState<string>("jimeng-50-lite");

  return (
    <div className="w-full h-full">
      <div className="text-xs">场景图（消耗16/张）</div>
      <div className="mt-3! flex items-center gap-3">
        <div className="flex-1">
          <div className="text-xs">智能体</div>
          <div className="mt-2!">
            <AgentSelect
              options={agentOptions}
              defaultValue={currentAgent} // 默认选中项
              onChange={(newValue) => {
                console.log("选中的值:", newValue);
                setCurrentAgent(newValue); // 更新父组件的状态
              }}
            />
          </div>
        </div>
        <div className="flex-2 "></div>
      </div>
      <div className="text-xs mt-3!">生图模型</div>
      <div className="mt-2!">
        <ModalSelect
          options={modelOptions}
          defaultValue={selectedModel}
          onChange={(value) => {
            console.log("选中的模型:", value);
            setSelectedModel(value);
          }}
        />
      </div>
      <div className="text-xs mt-3! grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div>
          <div className="text-xs">比例</div>
          <div className="mt-2!">
            <CustomSelect
              placeholder="比例"
              style={{
                height: "60px",
                background: "var(--bg-color)",
              }}
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
        </div>
        <div>
          <div className="text-xs">清晰度</div>
          <div className="mt-2!">
            <CustomSelect
              placeholder="清晰度"
              style={{
                height: "60px",
                background: "var(--bg-color)",
              }}
              options={[
                { label: "1k", value: "1" },
                { label: "2k", value: "2" },
              ]}
              onChange={(v) => console.log(v)}
            />
          </div>
        </div>
        <div>
          <div className="text-xs">音效</div>
          <div className="mt-2!">
            <CustomSelect
              placeholder="音效"
              style={{
                height: "60px",
                background: "var(--bg-color)",
              }}
              options={[
                { label: "无声视频", value: "1" },
                { label: "添加音效", value: "2" },
              ]}
              onChange={(v) => console.log(v)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoParam;
