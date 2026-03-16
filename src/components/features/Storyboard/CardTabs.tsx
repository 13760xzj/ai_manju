import React, { useState } from "react";

interface CardTabProps {
  tabs: {
    label: string; // 卡片文字
    content: React.ReactNode; // 对应内容
    width?: string; // 可选：单个 tab 的宽度，如 '100px' 或 '20%'
  }[];
  defaultWidth?: string; // 默认宽度，所有 tab 没设置 width 时使用
}

const CardTabs: React.FC<CardTabProps> = ({ tabs, defaultWidth = "120px" }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="h-full flex flex-col rounded-2xl overflow-hidden">
      {/* 卡片 Tabs */}
      <div className="flex space-x-2 items-end relative ">
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => setActiveIndex(index)}
            style={{ width: tab.width || defaultWidth }}
            className={`cursor-pointer tab_item flex-1 p-4! text-center  ${
              index === activeIndex ? "tab_item_active" : ""
            }`}
          >
            {index === activeIndex && index !== 0 && (
              <div className="corner-mask left"></div>
            )}
            {tab.label}
            {index === activeIndex && index !== tabs.length - 1 && (
              <div className="corner-mask right"></div>
            )}
          </div>
        ))}
      </div>

      {/* 内容区域 */}
      <div className="p-4! rounded-b-lg overflow-hidden bg-(--bg-color) text-(--text-color) flex-1 border border-t-0 border-(--border-color)">
        {tabs[activeIndex].content}
      </div>
    </div>
  );
};

export default CardTabs;
