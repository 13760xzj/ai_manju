/* eslint-disable react-hooks/rules-of-hooks */
// AgentSelect.tsx
import React, { useState, useEffect, useRef } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";

// 定义单个选项的数据结构
interface AgentOption {
  value: string;
  label: string;
  description: string;
  icon: string; // 图片 URL
}

// 定义组件接收的 Props
interface AgentSelectProps {
  /**
   * 下拉选项列表
   */
  options: AgentOption[];
  /**
   * 默认选中的值
   */
  defaultValue?: string;
  /**
   * 选中值改变时的回调函数
   * @param value - 新选中的值
   */
  onChange?: (value: string) => void;
}

const AgentSelect: React.FC<AgentSelectProps> = ({
  options,
  defaultValue,
  onChange,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  // 如果 defaultValue 存在且在 options 中，则使用它；否则使用第一个选项
  const initialSelectedValue =
    defaultValue && options.some((opt) => opt.value === defaultValue)
      ? defaultValue
      : options[0]?.value;

  const [selectedValue, setSelectedValue] =
    useState<string>(initialSelectedValue);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onChange?.(value); // 将新值通过回调传出
    setIsOpen(false); // 选择后自动关闭下拉
  };

  // 根据选中的 value 找到对应的选项数据
  const selectedOption =
    options.find((opt) => opt.value === selectedValue) || options[0];

  if (!selectedOption) {
    return <div className="text-red-500">错误：没有可用的选项</div>;
  }

  // --- 修正逻辑：useEffect 依赖于 isOpen ---
  // 当 isOpen 改变时，这个 effect 会重新运行
  useEffect(() => {
    // 定义事件处理器
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // 当下拉菜单打开时，添加事件监听器
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // 清理函数：移除事件监听器
    // 这个函数会在组件卸载或下次 effect 执行前运行
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // 重要：将 isOpen 添加到依赖数组中
    // 这样当 isOpen 从 true 变为 false 时，
    // 会先运行清理函数移除监听器，然后 effect 结束
    // 当 isOpen 从 false 变为 true 时，
    // 会再次运行 effect 添加新的监听器
  }, [isOpen]);
  // --- END ---

  return (
    <div ref={dropdownRef} className="relative w-full">
      {/* 主触发按钮 */}
      <div
        className="flex items-center justify-between px-4! py-3! box-border border bg-(--bg-color) text-(--text-color) rounded-xl border-(--border-color) cursor-pointer transition-all hover:shadow-[0_0_0_2px_rgba(var(--primary-rgb),0.3)] hover:border-(--primary-color)/70"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-3">
          <img
            src={selectedOption.icon}
            alt={`${selectedOption.label} Icon`}
            className="w-10 h-10 rounded-lg object-cover"
          />
          <div className="ml-3!">
            <div className="text-sm text-(--text-color)">
              {selectedOption.label}
            </div>
            <div className="text-xs mt-1! text-(--text-color)/60">
              {selectedOption.description}
            </div>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 text-(--text-color)/60 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* 下拉菜单 - 添加了动画相关的类 */}
      <div
        className={`absolute top-full bg-(--bg-color) shadow left-0 right-0 mt-1 overflow-hidden z-10 rounded-xl border border-(--border-color) ${
          isOpen
            ? "max-h-60 opacity-100 transform translate-y-0 transition-all duration-300 ease-in-out"
            : "max-h-0 opacity-0 -translate-y-2 transition-all duration-300 ease-in-out"
        }`}
      >
        <div className="max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option.value}
              className="flex items-center px-4! py-3! hover:bg-(--primary-color)/20 cursor-pointer transition-colors"
              onClick={() => handleSelect(option.value)}
            >
              <img
                src={option.icon}
                alt={`${option.label} Icon`}
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div className="ml-3! flex-1">
                <div className="text-(--text-color) text-sm">
                  {option.label}
                </div>
                <div className="text-xs mt-1! text-(--text-color)/60">
                  {option.description}
                </div>
              </div>
              {/* 仅在当前选项被选中时显示绿色对勾 */}
              {selectedValue === option.value && (
                <div className="w-6 h-6 flex items-center justify-center">
                  <FaRegCircleCheck
                    style={{ fontSize: "18px", color: "var(--success-color)" }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentSelect;
