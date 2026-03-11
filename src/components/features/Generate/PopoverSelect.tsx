import React, { useState } from "react";
import { Popover } from "antd";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

interface PopoverSelectOption {
  label: string;
  value: string | number;
  image?: string;
}

interface PopoverSelectProps {
  title: string;
  value?: string | number;
  options: PopoverSelectOption[];
  onChange?: (item: PopoverSelectOption) => void;
}

const PopoverSelect: React.FC<PopoverSelectProps> = ({
  title,
  value,
  options,
  onChange,
}) => {
  const [open, setOpen] = useState(false);

  const selectedOption = options.find((item) => item.value === value);

  const handleSelect = (item: PopoverSelectOption) => {
    onChange?.(item);
    setOpen(false);
  };

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      trigger="click"
      placement="bottom"
      arrow={false}
      overlayClassName="popover-select-overlay"
      content={
        <div className="bg-[#2f3032] rounded-md p-2! min-w-[200px] max-h-[300px] overflow-y-auto">
          <div className="text-xs text-white/50 mb-2!">{title}</div>
          <div className="flex flex-col gap-1">
            {options.map((item) => (
              <div
                key={item.value}
                onClick={() => handleSelect(item)}
                className={`flex items-center gap-2 p-2! rounded-md cursor-pointer hover:bg-white/10 ${
                  selectedOption?.value === item.value ? "bg-white/10" : ""
                }`}
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-10 h-10 rounded object-cover"
                  />
                )}
                <span className="text-sm text-white/90">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      }
    >
      <div className="flex items-center justify-between p-2! bg-white/5 rounded-md cursor-pointer hover:bg-white/10">
        <div className="flex items-center gap-2">
          {selectedOption?.image && (
            <img
              src={selectedOption.image}
              alt={selectedOption.label}
              className="w-6 h-6 rounded object-cover"
            />
          )}
          <span className="text-sm text-white/90">
            {selectedOption ? selectedOption.label : title}
          </span>
        </div>
        <MdOutlineKeyboardArrowDown
          style={{ fontSize: "16px", color: "white/50" }}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </div>
    </Popover>
  );
};

export default PopoverSelect;
