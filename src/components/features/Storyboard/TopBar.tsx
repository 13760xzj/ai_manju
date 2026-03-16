import React from "react";
import { HorizontalScroll } from "./HorizontalScroll";
import { IoChevronBack } from "react-icons/io5";

export interface TopBarProps<T = object> {
  data: T[];
  childWidth: number;
  onCancel?: () => void;
  renderItem: (item: T, index: number) => React.ReactNode;
}

function TopBar<T>({
  data = [],
  childWidth,
  onCancel,
  renderItem,
}: TopBarProps<T>) {
  return (
    <div className="flex items-center w-full h-25">
      {/* 返回按钮 */}
      <button
        className="bg-(--bg-color) cursor-pointer border border-(--text-color)/20 rounded-2xl py-1! px-3! flex items-center justify-center mx-4!"
        onClick={onCancel}
      >
        <IoChevronBack
          style={{ width: 14, height: 14, color: "var(--text-color)" }}
        />
        <span className="ml-1 text-(--text-color)">返回</span>
      </button>

      <div className="flex-1 overflow-hidden">
        <HorizontalScroll
          data={data}
          childWidth={childWidth}
          renderItem={renderItem}
        />
      </div>
    </div>
  );
}

export default TopBar;
