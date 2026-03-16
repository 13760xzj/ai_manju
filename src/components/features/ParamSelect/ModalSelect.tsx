// ModalSelect.tsx
import React, { useState } from "react";

// 定义单个模型的数据结构
export interface ModelOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode; // 支持 SVG 或图片
  priceList: Array<{
    resolution: string;
    price: string;
  }>;
  tags?: Array<{
    label: string;
    color: "orange" | "purple"; // 标签颜色
  }>;
}

// 定义组件接收的 Props
interface ModalSelectProps {
  /**
   * 模型选项列表
   */
  options: ModelOption[];
  /**
   * 默认选中的模型 ID
   */
  defaultValue?: string;
  /**
   * 选中值改变时的回调函数
   * @param value - 新选中的模型 ID
   */
  onChange?: (value: string) => void;
}

const ModalSelect: React.FC<ModalSelectProps> = ({
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
  const getCardClassNames = (id: string) => {
    const baseClasses =
      "flex p-3! gap-2 relative rounded-xl border cursor-pointer transition-all duration-200 hover:bg-(--primary-color)/10";
    if (id === selectedId) {
      return `${baseClasses} border-(--primary-color)/70 bg-(--primary-color)/20`;
    }
    return `${baseClasses} bg-(--bg-color) border-(--text-color)/20`;
  };

  // 获取标签的样式类名
  const getTagClassNames = (color: "orange" | "purple") => {
    if (color === "orange") {
      return "bg-orange-500 text-white text-[10px] text-nowrap px-2! rounded-bl-lg rounded-tr-lg py-0.5! absolute top-0 right-0";
    }
    return "bg-purple-500 text-white text-[10px] text-nowrap px-2! py-0.5! rounded-bl-lg rounded-tr-lg absolute top-0 right-0";
  };

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {options.map((option) => (
        <div
          key={option.id}
          className={getCardClassNames(option.id)}
          onClick={() => handleSelect(option.id)}
        >
          {/* 图标 */}
          <div className="flex items-center mb-2">{option.icon}</div>

          <div>
            {/* 名称 */}
            <h3 className="text-(--text-color) font-medium text-sm">
              {option.name}
            </h3>

            {/* 描述 */}
            <p className="text-(--text-color)/60 text-xs mt-1!">
              {option.description}
            </p>

            {/* 价格列表 */}
            <div className="mt-2! flex flex-wrap gap-1">
              {option.priceList.map((priceItem, index) => (
                <span
                  key={index}
                  className="text-[10px] text-(--text-color)/40 flex items-center border border-(--text-color)/10 px-1! rounded-full"
                >
                  <span>{priceItem.resolution}</span>
                  <span className="ml-1">🍪</span>
                  <span>{priceItem.price}</span>
                </span>
              ))}
            </div>
          </div>

          {/* 标签 */}
          {option.tags && option.tags.length > 0 && (
            <div className="absolute top-0 right-0 flex space-x-1 text-[10px]">
              {option.tags.map((tag, index) => (
                <span key={index} className={getTagClassNames(tag.color)}>
                  {tag.label}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ModalSelect;
