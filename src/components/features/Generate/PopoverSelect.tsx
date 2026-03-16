import React, { useState } from "react";
import { Popover } from "antd";
import { MdKeyboardArrowRight } from "react-icons/md";
import { RiCheckboxCircleFill } from "react-icons/ri";

export interface PopoverOption {
  label: string;
  value: string | number;
  desc?: string;
  cost?: string;
  image?: string;
}

interface Props {
  title?: string;
  value?: string | number;
  options: PopoverOption[];
  onChange?: (item: PopoverOption) => void;
}

const PopoverSelect: React.FC<Props> = ({
  title,
  value,
  options,
  onChange,
}) => {
  const [open, setOpen] = useState(false);

  const current = options.find((i) => i.value === value);

  const handleSelect = (item: PopoverOption) => {
    onChange?.(item);
    setOpen(false);
  };

  return (
    <div className="h-full overflow-y-auto">
      {title && <div className="text-[13px]">{title}</div>}

      <Popover
        trigger="click"
        placement="right"
        arrow={false}
        open={open}
        overlayClassName="custom-popover"
        onOpenChange={setOpen}
        content={
          <div className="bg-[#2f3032] rounded-md shadow-3xl">
            <div className="text-xs text-(--text-color)/90 flex flex-wrap gap-2 max-w-108 max-h-100 overflow-y-auto p-2!">
              {options.map((item) => {
                const selected = item.value === value;

                return (
                  <div
                    key={item.value}
                    onClick={() => handleSelect(item)}
                    className={`flex items-center justify-between gap-2 p-2! rounded-md cursor-pointer transition
                    ${selected ? "bg-[#444547]" : "hover:bg-[#444547]"}`}
                  >
                    <div className="w-20 overflow-hidden flex flex-col items-center gap-2 relative">
                      {item.image && (
                        <img
                          src={item.image}
                          className="w-20 h-20  object-cover rounded-md"
                          style={{
                            border: selected ? "2px solid #526bef" : "none",
                          }}
                        />
                      )}
                      <div className="absolute right-1 top-1">
                        {selected && (
                          <RiCheckboxCircleFill className="text-green-400 text-xl bg-(--bg-light) rounded-full" />
                        )}
                      </div>
                      <div className="text-sm w-full font-bold text-ellipsis line-clamp-1 text-center">
                        <span>{item.label}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        }
      >
        <div className="h-8 px-2! mt-1! bg-(--bg-color) hover:opacity-80 cursor-pointer rounded-md flex items-center justify-between border border-(--border-color)">
          <span className="text-[13px] flex-1 text-ellipsis line-clamp-1">
            {current?.label || "请选择"}
          </span>
          <MdKeyboardArrowRight />
        </div>
      </Popover>
    </div>
  );
};

export default PopoverSelect;
