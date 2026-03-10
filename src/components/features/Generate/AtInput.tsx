import React, { useRef, useState, useEffect } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import "./index.css";

interface Props {
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
}

export default function AtInput({
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
}: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const rangeRef = useRef<Range | null>(null);

  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isEmpty, setIsEmpty] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);

  const getText = () => {
    const editor = editorRef.current;
    if (!editor) return "";
    let text = "";
    editor.childNodes.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        text += child.textContent || "";
      } else if (
        child.nodeType === Node.ELEMENT_NODE &&
        (child as HTMLElement).classList.contains("mention")
      ) {
        const val = (child as HTMLElement).dataset.value || "";
        text += `@[${val}]`;
      }
    });
    return text;
  };
  // ===== 获取输出字符串 =====
  const callOnChange = () => {
    const editor = editorRef.current;
    if (!editor || !onChange) return;

    let text = "";
    editor.childNodes.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        text += child.textContent || "";
      } else if (
        child.nodeType === Node.ELEMENT_NODE &&
        (child as HTMLElement).classList.contains("mention")
      ) {
        const val = (child as HTMLElement).dataset.value || "";
        text += `@[${val}]`;
      }
    });
    onChange(text);
  };

  // ===== 初始化 defaultValue =====
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    editor.innerHTML = "";

    if (!defaultValue) {
      setIsEmpty(true);
      callOnChange();
      return;
    }
    const frag = document.createDocumentFragment();

    const regex = /@\[(.*?)\]/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(defaultValue)) !== null) {
      const index = match.index;
      const name = match[1];

      // 普通文字
      if (index > lastIndex) {
        frag.appendChild(
          document.createTextNode(defaultValue.slice(lastIndex, index)),
        );
      }

      // mention span，显示为 @name
      const span = document.createElement("span");
      span.textContent = `@${name}`;
      span.className = "mention";
      span.style.fontSize = fontSize ? fontSize : "13px";
      span.contentEditable = "false";
      span.dataset.value = name;
      frag.appendChild(span);

      lastIndex = index + match[0].length;
    }

    if (lastIndex < defaultValue.length) {
      frag.appendChild(document.createTextNode(defaultValue.slice(lastIndex)));
    }

    editor.appendChild(frag);

    // 光标放末尾
    const sel = window.getSelection();
    if (editor.lastChild) {
      const range = document.createRange();
      range.setStartAfter(editor.lastChild);
      range.collapse(true);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }

    setIsEmpty(editor.innerText.length === 0);
    callOnChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  // ===== 弹框位置 =====
  const showPopover = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0).cloneRange();
    rangeRef.current = range;

    const rect = range.getClientRects()[0] || range.getBoundingClientRect();
    const popWidth = 140;
    const popHeight = 120;

    let x = rect.left + window.scrollX;
    let y = rect.bottom + window.scrollY;

    if (x + popWidth > window.scrollX + window.innerWidth) {
      x = window.scrollX + window.innerWidth - popWidth - 10;
    }
    if (y + popHeight > window.scrollY + window.innerHeight) {
      y = rect.top + window.scrollY - popHeight;
    }

    setPos({ x, y });
    setShow(true);
    setSelected(null);
  };

  const showPopoverFromNode = (target: Node | HTMLElement) => {
    let rect: DOMRect;

    if (target instanceof HTMLElement) {
      rect = target.getBoundingClientRect();
    } else {
      const range = document.createRange();
      range.setStart(target, target.textContent?.length || 0);
      range.collapse(true);
      rect = range.getClientRects()[0] || range.getBoundingClientRect();
    }

    const popWidth = 140;
    const popHeight = 120;

    let x = rect.left + window.scrollX;
    let y = rect.bottom + window.scrollY;

    if (x + popWidth > window.scrollX + window.innerWidth) {
      x = window.scrollX + window.innerWidth - popWidth - 10;
    }
    if (y + popHeight > window.scrollY + window.innerHeight) {
      y = rect.top + window.scrollY - popHeight;
    }

    setPos({ x, y });
    setShow(true);
  };

  // ===== 插入 mention =====
  const insertMention = (name: string) => {
    const range = rangeRef.current;
    if (!range) return;

    // 删除输入的 @
    range.setStart(range.startContainer, range.startOffset - 1);
    range.deleteContents();

    const mention = document.createElement("span");
    mention.textContent = `@${name}`; // 编辑器显示 @name
    mention.className = "mention";
    mention.style.fontSize = fontSize ? fontSize : "13px";
    mention.contentEditable = "false";
    mention.dataset.value = name; // 内部值

    range.insertNode(mention);

    const space = document.createTextNode(" ");
    mention.after(space);

    const selection = window.getSelection();
    const newRange = document.createRange();
    newRange.setStartAfter(space);
    newRange.collapse(true);
    selection?.removeAllRanges();
    selection?.addRange(newRange);

    setShow(false);
    setSelected(null);
    callOnChange();
  };

  // ===== 输入事件 =====
  const handleInput = () => {
    const editor = editorRef.current;
    if (!editor) return;
    setIsEmpty(editor.innerText.length <= 0 || editor.innerText === "\n");
    callOnChange();

    if (!openAt) return;

    const selection = window.getSelection();
    if (!selection || !selection.anchorNode) return;

    const nodeText = selection.anchorNode.textContent || "";
    if (nodeText.endsWith("@")) {
      showPopover();
    } else {
      setShow(false);
      setSelected(null);
    }
  };

  // ===== maxlength =====
  const handleBeforeInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (!maxLength) return;
    const text = getText();
    if (text.length >= maxLength) e.preventDefault();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    if (!maxLength) return;
    const paste = e.clipboardData.getData("text");
    const current = getText();
    if (current.length + paste.length > maxLength) {
      e.preventDefault();
      const remain = maxLength - current.length;
      document.execCommand("insertText", false, paste.slice(0, remain));
    }
  };

  // ===== 点击 mention 弹框 =====
  const handleEditorClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("mention")) {
      const name = target.dataset.value || "";
      setSelected(name);
      showPopoverFromNode(target);

      const range = document.createRange();
      range.setStartAfter(target);
      range.collapse(true);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
      rangeRef.current = range;
    }
  };

  // ===== 点击外部关闭弹框 =====
  const removeSingleAt = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    const node = range.startContainer;
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || "";
      if (text.endsWith("@")) node.textContent = text.slice(0, -1);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const editor = editorRef.current;
      const pop = popRef.current;
      if (
        editor &&
        !editor.contains(e.target as Node) &&
        pop &&
        !pop.contains(e.target as Node)
      ) {
        removeSingleAt();
        setShow(false);
        setSelected(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      style={{ fontSize: fontSize }}
      className="at-editor h-full relative overflow-y-auto text-sm"
      data-empty={isEmpty}
      data-placeholder={placeholder}
    >
      <div
        ref={editorRef}
        contentEditable={editable}
        onClick={handleEditorClick}
        onInput={handleInput}
        onBeforeInput={handleBeforeInput}
        onPaste={handlePaste}
        style={{ outline: "none" }}
      />

      {show && (
        <div
          ref={popRef}
          className="shadow-lg z-2002 border p-2! border-[#38447c] bg-[#1f1f1f] text-white rounded-xl overflow-hidden"
          style={{ position: "fixed", left: pos.x, top: pos.y, minWidth: 140 }}
        >
          {options.length === 0 ? (
            <div className="py-2!">
              <div className="text-[#b5b5b5] text-xs">{emptyText}</div>
            </div>
          ) : (
            options.map((u, i) => (
              <div
                key={i}
                className={`px-2! max-w-55 py-1! my-1! cursor-pointer rounded-sm hover:bg-[#333333] gap-2 flex items-center justify-between ${
                  selected === u ? "bg-[#333333]" : ""
                }`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  insertMention(u.name);
                }}
              >
                <img src={u.img} className="w-12 h-8 rounded-xs" />
                <div className="flex-1 text-xs overflow-hidden">
                  {renderOptionItem ? (
                    renderOptionItem(u)
                  ) : (
                    <div className="text-ellipsis line-clamp-1 w-full whitespace-nowrap">
                      {u.name}
                    </div>
                  )}
                </div>
                {selected === u.name && (
                  <FaRegCircleCheck
                    style={{
                      fontSize: "16px",
                      color: "var(--success-color)",
                      shrink: "0",
                    }}
                  />
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
