import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
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

export interface AtInputRef {
  getText: () => string;
  clear: () => void;
  setValue: (text: string) => void;
}

const AtInput = forwardRef<AtInputRef, Props>(
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
    },
    ref,
  ) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const popRef = useRef<HTMLDivElement>(null);
    const rangeRef = useRef<Range | null>(null);
    const mentionNodeRef = useRef<HTMLElement | null>(null);
    const isComposingRef = useRef(false);

    const [show, setShow] = useState(false);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [isEmpty, setIsEmpty] = useState(true);
    const [selected, setSelected] = useState<string | null>(null);

    function getTextFromNode(node: Node): string {
      let text = "";

      node.childNodes.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          text += child.textContent;
        } else if (
          child.nodeType === Node.ELEMENT_NODE &&
          (child as HTMLElement).classList.contains("mention")
        ) {
          text += `@[${(child as HTMLElement).dataset.value}]`;
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          const el = child as HTMLElement;
          const tag = el.tagName;

          // 块级元素换行
          if (tag === "DIV" || tag === "P") {
            text += getTextFromNode(el) + "\n";
          } else if (tag === "BR") {
            text += "\n";
          } else {
            text += getTextFromNode(el);
          }
        }
      });
      return text;
    }

    const getText = (): string => {
      const editor = editorRef.current;
      if (!editor) return "";
      return getTextFromNode(editor).replace(/\n$/, ""); // 去掉最后多余换行
    };
    // ===== 获取输出字符串 =====
    const callOnChange = () => {
      const editor = editorRef.current;
      if (!editor || !onChange) return;
      const text = getText();
      onChange(text);
    };

    const setDefaultValue = (value: string) => {
      if (value === undefined) return;
      if (value.length > maxLength) {
        value = value.substring(0, maxLength);
      }
      const editor = editorRef.current;
      if (!editor) return;

      editor.innerHTML = "";
      const frag = document.createDocumentFragment();

      const regex = /@\[(.*?)\]/g;
      let lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = regex.exec(value)) !== null) {
        const index = match.index;
        const name = match[1];

        // 普通文字
        if (index > lastIndex) {
          frag.appendChild(
            document.createTextNode(value.slice(lastIndex, index)),
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

      if (lastIndex < value.length) {
        frag.appendChild(document.createTextNode(value.slice(lastIndex)));
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
    };

    // ===== 初始化 defaultValue =====
    useEffect(() => {
      setDefaultValue(defaultValue);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    function removePrevAt(range: Range) {
      const node = range.startContainer;
      const offset = range.startOffset;

      let textNode: Text | null = null;

      if (node.nodeType === Node.TEXT_NODE) {
        textNode = node as Text;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const child = node.childNodes[offset - 1];
        if (child && child.nodeType === Node.TEXT_NODE) {
          textNode = child as Text;
        }
      }

      if (textNode) {
        const text = textNode.data;

        if (text.endsWith("@")) {
          textNode.deleteData(text.length - 1, 1);

          range.setStart(textNode, text.length - 1);
          range.collapse(true);
        }
      }
    }

    // ===== 插入 mention =====
    const insertMention = (name: string, isReplace: boolean = false) => {
      const sel = window.getSelection();
      if (!sel) return;

      // ===== 替换 mention =====
      if (isReplace && mentionNodeRef.current) {
        const oldMention = mentionNodeRef.current;

        const mention = document.createElement("span");
        mention.textContent = `@${name}`;
        mention.className = "mention";
        mention.style.fontSize = fontSize ? fontSize : "13px";
        mention.contentEditable = "false";
        mention.dataset.value = name;

        oldMention.replaceWith(mention); // ⭐替换

        const range = document.createRange();
        range.setStartAfter(mention);
        range.collapse(true);

        sel.removeAllRanges();
        sel.addRange(range);

        mentionNodeRef.current = null;

        setShow(false);
        setSelected(null);
        callOnChange();
        return;
      }

      // ===== 普通插入 =====
      if (!sel.rangeCount) return;
      const range: Range = sel.getRangeAt(0);

      removePrevAt(range);

      const mention = document.createElement("span");
      mention.textContent = `@${name}`;
      mention.className = "mention";
      mention.style.fontSize = fontSize ? fontSize : "13px";
      mention.contentEditable = "false";
      mention.dataset.value = name;

      range.insertNode(mention);

      const space = document.createTextNode(" ");
      mention.after(space);

      const newRange = document.createRange();
      newRange.setStartAfter(space);
      newRange.collapse(true);

      sel.removeAllRanges();
      sel.addRange(newRange);

      setShow(false);
      setSelected(null);
      callOnChange();
    };

    const checkIsEmpty = () => {
      const editor = editorRef.current;
      if (!editor) return true;

      const text = editor.textContent?.replace(/\u200B/g, "").trim() || "";
      return text.length === 0;
    };

    // ===== 输入事件 =====
    const handleInput = () => {
      if (isComposingRef.current) return; // ⭐关键
      const editor = editorRef.current;
      if (!editor) return;
      setIsEmpty(checkIsEmpty());
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
        mentionNodeRef.current = target; // ⭐记录

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
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useImperativeHandle(ref, () => ({
      getText,
      clear: () => {
        if (!editorRef.current) return;
        editorRef.current.innerHTML = "";
        setIsEmpty(true);
        callOnChange();
      },
      setValue: setDefaultValue,
    }));

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
          onKeyUp={() => {
            setIsEmpty(checkIsEmpty());
          }}
          onPaste={handlePaste}
          onCompositionStart={() => {
            isComposingRef.current = true;
          }}
          onCompositionEnd={() => {
            isComposingRef.current = false;
          }}
          style={{ outline: "none" }}
        />

        {show && (
          <div
            ref={popRef}
            className="shadow-lg border p-2! border-[#38447c] bg-[#1f1f1f] text-white rounded-xl overflow-hidden"
            style={{
              position: "fixed",
              zIndex: 2002,
              left: pos.x,
              top: pos.y,
              minWidth: 140,
            }}
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
                    insertMention(u.name, true);
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
                        flexShrink: 0,
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
  },
);

export default AtInput;
