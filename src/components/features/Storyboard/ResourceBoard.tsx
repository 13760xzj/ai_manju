import React, { useRef, useState } from "react";
import ToggleButton from "./ToggleButton";
import { FiUpload } from "react-icons/fi";
import { GrDocumentUpload } from "react-icons/gr";
import { Spin } from "antd";

export interface ResourceBoardProps<T = object> {
  layoutType: "list" | "card";
  index: number | null;
  onSelect: (index: number) => void;
  loading?: boolean;
  data: T[];
  buildListItem: ({
    item: T,
    index: number,
    selected: number,
  }) => React.ReactNode;
  buildCardItem: ({
    item: T,
    index: number,
    selected: number,
  }) => React.ReactNode;
  dataChange?: (data: T[]) => void;
}

const ResourceBoard: React.FC = ({
  layoutType = "list",
  index = null,
  onSelect,
  loading = false,
  buildListItem,
  buildCardItem,
  dataChange,
  data = [],
}) => {
  const [type, setType] = useState(layoutType);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(index);

  const [list, setList] = useState(data);

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightRefs = useRef<(HTMLDivElement | null)[]>([]);
  const leftContainerRef = useRef<HTMLDivElement | null>(null);

  /**
   * 点击左侧
   */
  function handleLeftClick(index: number) {
    setSelectedIndex(index);
    onSelect?.(index);

    rightRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }

  /**
   * 点击右侧
   */
  function handleRightClick(index: number) {
    setSelectedIndex(index);
    onSelect?.(index);

    itemRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function updateData() {
    // 处理上传图片逻辑
    const newData = [...list, list.length + 1];
    setList(newData);
    dataChange?.(newData);
    setTimeout(() => {
      leftContainerRef.current?.scrollTo({
        top: leftContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  }

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spin />
      </div>
    );
  }

  return (
    <div className="h-full flex w-full gap-5 overflow-hidden">
      {/* 左侧 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between">
          <ToggleButton value={type} onToggle={setType} />

          <div className="flex gap-2">
            <div
              onClick={updateData}
              className="border border-white/30 rounded-md px-4! py-1! text-sm cursor-pointer flex items-center gap-1"
            >
              <FiUpload />
              本地图片上传
            </div>

            <div className="border border-white/30 rounded-md px-4! py-1! text-sm cursor-pointer flex items-center gap-1">
              <GrDocumentUpload />
              资源库导入图片
            </div>
          </div>
        </div>

        {type === "list" && (
          <div
            ref={leftContainerRef}
            className="flex-1 overflow-y-auto mt-4! p-1!"
          >
            {list.map((item, index) => (
              <div
                key={item}
                ref={(el) => (itemRefs.current[index] = el)}
                onClick={() => handleLeftClick(index)}
                className="cursor-pointer box-border transition-all duration-500 mb-4! rounded-xl"
              >
                {buildListItem &&
                  buildListItem({
                    item,
                    index,
                    selected: selectedIndex === index ? 1 : 0,
                  })}
              </div>
            ))}
          </div>
        )}
        {type === "card" && (
          <div
            ref={leftContainerRef}
            className="flex-1 overflow-y-auto mt-4! p-1! grid grid-cols-3 gap-4"
          >
            {list.map((item, index) => (
              <div
                key={item}
                ref={(el) => (itemRefs.current[index] = el)}
                onClick={() => handleLeftClick(index)}
                className="cursor-pointer box-border transition-all duration-500 rounded-xl"
              >
                {buildCardItem &&
                  buildCardItem({
                    item,
                    index,
                    selected: selectedIndex === index ? 1 : 0,
                  })}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 右侧 */}
      {type === "list" && (
        <div className="w-25 h-full overflow-y-auto flex flex-col gap-2 p-1! box-border">
          {list.map((item, index) => (
            <div
              key={item}
              ref={(el) => (rightRefs.current[index] = el)}
              onClick={() => handleRightClick(index)}
              className="h-20 shrink-0 bg-[#292b2d] rounded-md select-none flex items-center justify-center cursor-pointer transition-all duration-500"
              style={{
                border:
                  selectedIndex === index
                    ? `2px solid var(--primary-color)`
                    : "2px solid transparent",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourceBoard;
