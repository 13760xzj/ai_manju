import React, { useEffect, useRef, useState } from "react";
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
  buildListItem: (args: { item: T; index: number; selected: boolean }) => React.ReactNode;
  buildCardItem: (args: { item: T; index: number; selected: boolean }) => React.ReactNode;
  dataChange?: (data: T[]) => void;
  onLocalUpload?: () => Promise<T[] | T | null> | T[] | T | null;
  onImportFromLibrary?: () => Promise<T[] | T | null> | T[] | T | null;
}

export default function ResourceBoard<T>({
  layoutType = "list",
  index = null,
  onSelect,
  loading = false,
  buildListItem,
  buildCardItem,
  dataChange,
  data = [],
  onLocalUpload,
  onImportFromLibrary,
}: ResourceBoardProps<T>) {
  const [type, setType] = useState<ResourceBoardProps<T>["layoutType"]>(
    layoutType,
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(index);
  const [list, setList] = useState<T[]>(data);

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightRefs = useRef<(HTMLDivElement | null)[]>([]);
  const leftContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setType(layoutType);
  }, [layoutType]);

  useEffect(() => {
    setSelectedIndex(index);
  }, [index]);

  useEffect(() => {
    setList(data);
  }, [data]);

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

  async function applyDataResult(result: T[] | T | null | undefined) {
    if (result == null) return;
    const next = Array.isArray(result) ? result : [...list, result];
    setList(next);
    dataChange?.(next);
    setTimeout(() => {
      leftContainerRef.current?.scrollTo({
        top: leftContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  }

  async function handleLocalUpload() {
    const result = await onLocalUpload?.();
    await applyDataResult(result);
  }

  async function handleImportFromLibrary() {
    const result = await onImportFromLibrary?.();
    await applyDataResult(result);
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
              onClick={handleLocalUpload}
              className="border border-white/30 rounded-md px-4! py-1! text-sm cursor-pointer flex items-center gap-1"
            >
              <FiUpload />
              本地图片上传
            </div>

            <div
              onClick={handleImportFromLibrary}
              className="border border-white/30 rounded-md px-4! py-1! text-sm cursor-pointer flex items-center gap-1"
            >
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
                key={index}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                onClick={() => handleLeftClick(index)}
                className="cursor-pointer box-border transition-all duration-500 mb-4! rounded-xl"
              >
                {buildListItem &&
                  buildListItem({
                    item,
                    index,
                    selected: selectedIndex === index,
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
                key={index}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                onClick={() => handleLeftClick(index)}
                className="cursor-pointer box-border transition-all duration-500 rounded-xl"
              >
                {buildCardItem &&
                  buildCardItem({
                    item,
                    index,
                    selected: selectedIndex === index,
                  })}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 右侧 */}
      {type === "list" && (
        <div className="w-25 h-full overflow-y-auto flex flex-col gap-2 p-1! box-border">
          {list.map((_item, index) => (
            <div
              key={index}
              ref={(el) => {
                rightRefs.current[index] = el;
              }}
              onClick={() => handleRightClick(index)}
              className="h-20 shrink-0 bg-[#292b2d] rounded-md select-none flex items-center justify-center cursor-pointer transition-all duration-500"
              style={{
                border:
                  selectedIndex === index
                    ? `2px solid var(--primary-color)`
                    : "2px solid transparent",
              }}
            >
              {String(index + 1)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
