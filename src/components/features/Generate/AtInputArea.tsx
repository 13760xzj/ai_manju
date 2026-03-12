import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import AtInput, { type AtInputRef } from "./AtInput";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiCopy } from "react-icons/fi";
import { useCopy } from "@/hooks/useCopy";

export interface AtInputAreaProps {
  defaultValue?: string; // 回显内容，格式 xxx@[xxx]xxx
  maxLength?: number;
  onChange?: (text: string) => void;
  options?: object[];
  renderOptionItem?: (item: string) => React.ReactNode;
  placeholder?: string;
  emptyText?: string;
  openAt?: boolean;
  editable?: boolean;
  fontSize?: string;
  showCounter?: boolean;
  iconSize?: number;
  showBtns?: boolean;
  btnPosition?: "left" | "right";
}

// 定义暴露给父组件的 ref 方法
export interface AtInputAreaRef {
  getText: () => string;
  clear: () => void;
  settValue?: (text: string) => void;
}

export const AtInputArea = forwardRef<AtInputAreaRef, AtInputAreaProps>(
  (
    {
      defaultValue = "",
      maxLength = 30,
      onChange,
      options = [],
      renderOptionItem,
      placeholder,
      emptyText = "没有匹配到结果，请先导入图片",
      openAt = true,
      editable = true,
      fontSize,
      showCounter = true,
      iconSize,
      showBtns = true,
      btnPosition = "left",
    },
    ref,
  ) => {
    const [content, setContent] = useState(defaultValue);
    const { copyText } = useCopy();
    const contentRef = useRef<AtInputRef>(null);

    // 暴露给父组件的方法
    useImperativeHandle(ref, () => ({
      getText: () => contentRef.current?.getText() || "",
      clear: () => {
        contentRef.current?.clear();
        setContent("");
        onChange?.("");
      },
      settValue: (value: string) => {
        contentRef.current?.setValue!(value);
      },
    }));

    const clearHandler = () => {
      contentRef.current?.clear();
      setContent("");
      onChange?.("");
    };

    const copyHandler = () => {
      const text: string = contentRef.current?.getText() || "";
      if (!text) return;
      copyText(text);
    };

    return (
      <div className="w-full h-full flex flex-col">
        <div className="flex-1 overflow-hidden">
          <AtInput
            ref={contentRef}
            defaultValue={defaultValue}
            openAt={openAt}
            fontSize={fontSize}
            onChange={(e) => {
              setContent(e);
              onChange?.(e);
            }}
            maxLength={maxLength}
            placeholder={placeholder}
            options={options}
            renderOptionItem={renderOptionItem}
            emptyText={emptyText}
            editable={editable}
          />
        </div>
        {showBtns && (
          <div
            className={`flex items-center pt-2! ${btnPosition === "right" && !showCounter ? "justify-end" : "justify-between"}`}
          >
            {showCounter && btnPosition === "right" && (
              <div className="text-white/70 text-xs">
                {content.length}/{maxLength}
              </div>
            )}
            <div className="flex items-center gap-2">
              <div
                onClick={copyHandler}
                style={{
                  opacity: !content ? 0.5 : 1,
                  cursor: !content ? "not-allowed" : "pointer",
                  width: iconSize ? iconSize + "px" : "24px",
                  height: iconSize ? iconSize + "px" : "24px",
                }}
                className="p-1! box-border bg-white/10 hover:opacity-80 cursor-pointer rounded-md flex items-center justify-center border border-white/20"
              >
                <FiCopy style={{ width: "100%", height: "100%" }} />
              </div>
              <div
                onClick={clearHandler}
                style={{
                  width: iconSize ? iconSize + "px" : "24px",
                  height: iconSize ? iconSize + "px" : "24px",
                }}
                className="p-1! box-border bg-white/10 hover:opacity-80 cursor-pointer rounded-md flex items-center justify-center border border-white/20"
              >
                <RiDeleteBin6Line style={{ width: "100%", height: "100%" }} />
              </div>
            </div>
            {showCounter && btnPosition === "left" && (
              <div className="text-white/70 text-xs">
                {content.length}/{maxLength}
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);
