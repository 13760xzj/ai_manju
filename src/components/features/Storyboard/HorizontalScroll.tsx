import React, { useRef, useState, useEffect, useCallback } from "react";
import { IoChevronBack } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";

export interface HorizontalScrollProps<T = object> {
  data: T[];
  childWidth: number;
  gap?: number;
  renderItem: (item: T, index: number) => React.ReactNode;

  /** 按钮布局: split 左右各一个, right 都在右边 */
  buttonPosition?: "split" | "right";
  markColor?: string;
}

function HorizontalScroll<T>({
  data,
  childWidth,
  gap = 8,
  renderItem,
  buttonPosition = "right",
  markColor,
}: HorizontalScrollProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [visibleCount, setVisibleCount] = useState(1);

  const updateState = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const count = Math.max(Math.floor(el.clientWidth / childWidth), 1);
    setVisibleCount(count);

    setCanPrev(el.scrollLeft > 0);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, [childWidth]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    updateState();

    el.addEventListener("scroll", updateState, { passive: true });
    window.addEventListener("resize", updateState);

    return () => {
      el.removeEventListener("scroll", updateState);
      window.removeEventListener("resize", updateState);
    };
  }, [data, updateState]);

  const scroll = useCallback(
    (dir: "prev" | "next") => {
      const el = containerRef.current;
      if (!el) return;

      const distance = visibleCount * childWidth;

      el.scrollBy({
        left: dir === "next" ? distance : -distance,
        behavior: "smooth",
      });
    },
    [visibleCount, childWidth],
  );

  return (
    <div className="flex items-center w-full relative">
      {/* 左按钮 */}
      {buttonPosition === "split" && canPrev && (
        <div
          className={`absolute top-0 bottom-0 flex items-center justify-center z-10 left-0`}
          style={{
            background: `linear-gradient(to left,transparent 0%,${markColor || "var(--bg-color)"} 70%,${markColor || "var(--bg-color)"} 100%)`,
          }}
        >
          <button
            onClick={() => scroll("prev")}
            disabled={!canPrev}
            className={`w-8 h-8 rounded-full flex items-center justify-center mx-2! cursor-pointer
                      ${
                        canPrev
                          ? "bg-(--text-color)/10 border border-(--text-color)/30"
                          : "bg-gray-700 opacity-40 cursor-not-allowed"
                      }`}
          >
            <IoChevronBack
              style={{ width: 20, height: 20, color: "var(--text-color)" }}
            />
          </button>
        </div>
      )}

      {/* 滚动区域 */}
      <div
        ref={containerRef}
        className="flex flex-1 shrink-0 overflow-x-auto [&::-webkit-scrollbar]:hidden"
        style={{
          gap,
          scrollSnapType: "x mandatory",
        }}
      >
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              width: childWidth,
              flexShrink: 0,
              scrollSnapAlign: "start",
            }}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      {/* 右按钮 */}
      {buttonPosition === "right" && (
        <div className="flex gap-2 px-3!">
          <button
            onClick={() => scroll("prev")}
            disabled={!canPrev}
            className={`w-8 h-8 rounded-full flex items-center justify-center 
                      ${
                        canPrev
                          ? "bg-(--text-color)/10 border border-(--text-color)/30 cursor-pointer"
                          : "bg-(--text-color)/20 opacity-40 cursor-not-allowed"
                      }`}
          >
            <IoChevronBack
              style={{ width: 20, height: 20, color: "var(--text-color)" }}
            />
          </button>
          <button
            onClick={() => scroll("next")}
            disabled={!canNext}
            className={`w-8 h-8 rounded-full flex items-center justify-center 
                      ${
                        canNext
                          ? "bg-(--text-color)/10 border border-(--text-color)/30 cursor-pointer"
                          : "bg-(--text-color)/20 opacity-40 cursor-not-allowed"
                      }`}
          >
            <IoIosArrowForward
              style={{ width: 20, height: 20, color: "var(--text-color)" }}
            />
          </button>
        </div>
      )}

      {/* split模式右按钮 */}
      {buttonPosition === "split" && canNext && (
        <div
          className={`absolute top-0 bottom-0 flex items-center justify-center z-10 right-0`}
          style={{
            background: `linear-gradient(to right,transparent 0%,${markColor || "var(--bg-color)"} 70%,${markColor || "var(--bg-color)"} 100%)`,
          }}
        >
          <button
            onClick={() => scroll("next")}
            disabled={!canNext}
            className={`w-8 h-8 rounded-full flex items-center justify-center mx-2! cursor-pointer
                      ${
                        canNext
                          ? "bg-(--text-color)/10 border border-(--text-color)/30"
                          : "bg-gray-700 opacity-40 cursor-not-allowed"
                      }`}
          >
            <IoIosArrowForward
              style={{ width: 20, height: 20, color: "var(--text-color)" }}
            />
          </button>
        </div>
      )}
    </div>
  );
}

export { HorizontalScroll };
