// TabSelector.tsx
import React, { useState } from "react";

// 定义单个 Tab 的数据结构
export interface TabOption {
  id: string;
  label: string;
  description: string;
}

// 定义组件接收的 Props
interface TabSelectorProps {
  /**
   * Tab 选项列表
   */
  options: TabOption[];
  /**
   * 默认选中的 Tab ID
   */
  defaultValue?: string;
  /**
   * 选中值改变时的回调函数
   * @param value - 新选中的 Tab ID
   */
  onChange?: (value: string) => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({
  options,
  defaultValue,
  onChange,
}) => {
  const [selectedId, setSelectedId] = useState<string>(
    defaultValue || options[0]?.id,
  );

  const handleSelect = (id: string) => {
    setSelectedId(id);
    onChange?.(id);
  };

  // 获取选中项的样式类名
  const getTabClassNames = (id: string) => {
    const baseClasses =
      "flex flex-col items-center px-2! py-2! text-center cursor-pointer  rounded-lg transition-all duration-200";
    if (id === selectedId) {
      return `${baseClasses} bg-(--primary-color)/20 border border-(--primary-color)/70 rounded-lg text-(--text-color) bg-[var(--primary-color)]/10`;
    }
    return `${baseClasses} bg-(--bg-color)/30 text-(-text-color) hover:bg-(--primary-color)/20 border border-(--border-color)`;
  };

  // 计算滑块的位置和宽度
  return (
    <div className="w-full">
      {/* Tab 容器 */}
      <div className="relative bg-(--bg-color) rounded-xl overflow-hidden p-1!">
        {/* Tab 按钮 */}
        <div className="flex justify-between">
          {options.map((option) => (
            <div
              key={option.id}
              className={getTabClassNames(option.id)}
              onClick={() => handleSelect(option.id)}
            >
              <div className="text-xs">{option.label}</div>
              <div className="text-[10px] text-(--text-color)/60 mt-1!">
                {option.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabSelector;
