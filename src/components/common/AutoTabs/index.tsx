import { Popover } from "antd";
import React, { useLayoutEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

interface Item {
  label: string;
  value: string | number;
}

interface Props {
  items: Item[];
  itemWidth?: number;
  itemGap?: number; // 每个 item 间距
  containerPadding?: number; // 容器左右 padding
}

function middleEllipsis(text: string, max = 8) {
  if (text.length <= max) return text;
  const half = Math.floor(max / 2);
  return text.slice(0, half) + "..." + text.slice(-half);
}

const AutoTabs: React.FC<Props> = ({
  items,
  itemWidth = 140,
  itemGap = 8,
  containerPadding = 2,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  const [visibleCount, setVisibleCount] = useState(items.length);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(items[0]?.value);

  const activeIndex = items.findIndex((i) => i.value === active);
  const hiddenItems = items.slice(visibleCount);
  const sliderIndex = activeIndex < visibleCount ? activeIndex : visibleCount;

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const calculate = () => {
      const containerWidth = container.offsetWidth;
      const moreWidth = (moreRef.current?.offsetWidth || itemWidth) + itemGap;

      // 每个 item 真实占位 = 宽 + 间距
      const itemTotalWidth = itemWidth + itemGap;
      const count = Math.floor(
        (containerWidth - 2 * containerPadding - moreWidth + itemGap) /
          itemTotalWidth,
      );
      const c = Math.max(0, Math.min(count, items.length));
      setVisibleCount(c);
    };

    calculate();

    const observer = new ResizeObserver(() => {
      calculate();
    });

    observer.observe(container);

    return () => observer.disconnect();
  }, [items, itemWidth, itemGap, containerPadding]);

  const moreLabel =
    activeIndex >= visibleCount ? items[activeIndex]?.label : "更多作品资源";

  return (
    <div className="flex justify-center" ref={containerRef}>
      <div
        className="relative h-9 box-border bg-white/80 rounded-full flex items-center overflow-hidden border border-[rgba(22,119,255,0.22)] backdrop-blur-sm"
        style={{ padding: `${containerPadding}px` }}
      >
        {items.slice(0, visibleCount).map((item, index) => (
          <div
            key={item.value}
            style={{
              width: itemWidth,
              marginRight: index < visibleCount - 1 ? itemGap : 0,
              flexShrink: 0,
              color: sliderIndex === index ? "#1677ff" : "",
            }}
            className="text-xs px-2! text-slate-700 text-center cursor-pointer relative z-1"
            onClick={() => setActive(item.value)}
          >
            {middleEllipsis(item.label)}
          </div>
        ))}

        {hiddenItems.length > 0 && (
          <Popover
            trigger="click"
            open={open}
            onOpenChange={setOpen}
            arrow={false}
            placement="bottom"
            overlayClassName="custom-popover"
            content={
              <div className="p-2!">
                {hiddenItems.map((item) => (
                  <div
                    key={item.value}
                    className="px-3! py-2! text-xs rounded-md cursor-pointer text-slate-700 hover:bg-[rgba(22,119,255,0.10)]"
                    onClick={() => {
                      setActive(item.value);
                      setOpen(false);
                    }}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            }
          >
            <div
              ref={moreRef}
              style={{
                width: itemWidth,
                flexShrink: 0,
                marginLeft: itemGap,
              }}
              className="flex items-center justify-center px-2! text-xs text-slate-700 cursor-pointer relative z-1"
            >
              <span
                className="flex-w shrink-0"
                style={{
                  color:
                    sliderIndex === items.length - hiddenItems.length
                      ? "#1677ff"
                      : "",
                }}
              >
                {middleEllipsis(moreLabel)}
              </span>
              <IoMdArrowDropdown
                style={{ fontSize: "18px" }}
                className={`transition-transform ${open ? "rotate-180" : ""}`}
              />
            </div>
          </Popover>
        )}

        {/* slider */}
        <div
          style={{
            width: itemWidth,
            transform: `translateX(${sliderIndex * (itemWidth + itemGap)}px)`,
            top: containerPadding + "px",
            bottom: containerPadding + "px",
          }}
          className="absolute rounded-full bg-[linear-gradient(to_right,rgba(22,119,255,0.16),rgba(22,119,255,0.28))] transition-all duration-300"
        />
      </div>
    </div>
  );
};

export default AutoTabs;
