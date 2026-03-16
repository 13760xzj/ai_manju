/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";
import "./index.css";

export interface SelectOption {
  label: string;
  value: string | number;
  [key: string]: any;
}

interface Props {
  icon?: React.ReactNode;
  options: SelectOption[];
  style?: React.CSSProperties;
  value?: string | number | null;
  placeholder?: string;
  renderItem?: (option: SelectOption, selected: boolean) => React.ReactNode;
  onChange?: (value: string | number, option: SelectOption) => void;
  panelWidth?: number;
  position?: "top" | "bottom"; // 优先方向
  highlight?: boolean;
  children?: React.ReactNode;
}

export const CustomSelect: React.FC<Props> = ({
  options,
  value,
  placeholder = "请选择",
  onChange,
  renderItem,
  panelWidth,
  icon,
  position,
  highlight = true,
  children,
  style,
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<SelectOption | undefined>(
    options.find((i) => i.value === value),
  );

  const [direction, setDirection] = useState<"top" | "bottom">("bottom");
  const [dropdownPos, setDropdownPos] = useState<{
    top: number;
    left: number;
    width: number;
  }>({
    top: 0,
    left: 0,
    width: 0,
  });

  const ref = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        !ref.current?.contains(target) &&
        !dropdownRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggle = () => {
    setOpen(!open);
  };

  const selectOption = (option: SelectOption) => {
    setSelected(option);
    onChange?.(option.value, option);
    setOpen(false);
  };

  useLayoutEffect(() => {
    if (!open || !dropdownRef.current || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    // 先设置宽度，再读取真实高度
    const dropdown = dropdownRef.current;
    dropdown.style.maxHeight = "300px"; // 默认最大高度
    dropdown.style.width = panelWidth ? `${panelWidth}px` : `${rect.width}px`;

    // 等下一帧再读取高度
    requestAnimationFrame(() => {
      const dropdownHeight = dropdown.offsetHeight;
      const spaceBottom = window.innerHeight - rect.bottom;
      const spaceTop = rect.top;

      const canShowTop = spaceTop > dropdownHeight;
      const canShowBottom = spaceBottom > dropdownHeight;
      const finalDirection: "top" | "bottom" =
        position || (canShowBottom ? "bottom" : canShowTop ? "top" : "bottom");

      const top =
        finalDirection === "top"
          ? rect.top - dropdownHeight - 5
          : rect.bottom + 5;

      // 根据可用空间动态调整高度
      if (finalDirection === "bottom" && dropdownHeight > spaceBottom) {
        dropdown.style.maxHeight = `${spaceBottom - 10}px`;
      } else if (finalDirection === "top" && dropdownHeight > spaceTop) {
        dropdown.style.maxHeight = `${spaceTop - 10}px`;
      }

      setDirection(finalDirection);
      setDropdownPos({
        top,
        left: rect.left,
        width: panelWidth || rect.width,
      });
    });
  }, [open, options.length, position, panelWidth]);

  return (
    <div ref={ref} className="custom_select w-full">
      <div
        className="select_input w-full border border-(--text-color)/20"
        style={style}
        onClick={toggle}
      >
        {children ? (
          children
        ) : (
          <div className="flex w-full items-center justify-between">
            <div className="flex-1 flex items-center gap-2">
              {icon && <span>{icon}</span>}
              <span className="flex-1 text-ellipsis line-clamp-1 text-sm">
                {selected ? selected.label : placeholder}
              </span>
            </div>
            <span className={`arrow ${open ? "rotate" : ""}`}>
              <MdOutlineKeyboardArrowDown />
            </span>
          </div>
        )}
      </div>

      {open &&
        createPortal(
          <div
            ref={dropdownRef}
            className={`select_dropdown ${direction} border border-(--text-color)/20`}
            style={{
              position: "fixed",
              top: dropdownPos.top,
              left: dropdownPos.left,
              width: dropdownPos.width,
              zIndex: 9999,
            }}
          >
            {options.map((item) => (
              <div
                key={item.value}
                onClick={() => selectOption(item)}
                className={`select_option flex items-center justify-between ${
                  highlight && selected?.value === item.value ? "selected" : ""
                }`}
              >
                <div className="text-(--text-color) text-sm">
                  {renderItem
                    ? renderItem(item, selected?.value === item.value)
                    : item.label}
                </div>
                {highlight && selected?.value === item.value && (
                  <FaRegCircleCheck
                    style={{ fontSize: "14px", color: "var(--success-color)" }}
                  />
                )}
              </div>
            ))}
          </div>,
          document.body,
        )}
    </div>
  );
};
