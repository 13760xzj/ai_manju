import { FiCopy } from "react-icons/fi";
import { useCopy } from "@/hooks/useCopy";
import { ContentModal } from "../ContentModal";

import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import TurndownService from "turndown";
import { RiArrowGoBackFill, RiDeleteBin6Line } from "react-icons/ri";
import { GrClearOption } from "react-icons/gr";
import { MdDriveFolderUpload, MdHistory } from "react-icons/md";
import { CommonDownload } from "../CommonDownload";
import { ResourceSelect } from "@/components/features";
import { TbHistoryToggle } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import { Popover } from "antd";

interface MarkdownViewProps {
  initialValue?: string;
  editable?: boolean;
  fontSize?: string;
  isDark?: boolean;
}

export interface MarkdownViewRef {
  getText: () => string;
  setContent?: (text: string) => void;
}

export const MarkdownView = forwardRef<MarkdownViewRef, MarkdownViewProps>(
  ({ initialValue = "", editable = false, fontSize, isDark }, ref) => {
    const [markdownContent, setMarkdownContent] = useState(initialValue);
    const [show, setShow] = useState(false);
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [showHistory, setShowHistory] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const turndownService = new TurndownService({
      headingStyle: "atx", // ### 风格
      codeBlockStyle: "fenced",
    });
    const { copyText } = useCopy();

    // 撤销
    const handleUndo = () => {
      document.execCommand("undo");
    };

    // 重做
    const handleRedo = () => {
      document.execCommand("redo");
    };

    const cleanHTML = (html: string) => {
      const div = document.createElement("div");
      div.innerHTML = html;

      div.querySelectorAll("[node]").forEach((el) => {
        el.removeAttribute("node");
      });

      return div.innerHTML;
    };

    function htmlToMarkdown(html: string) {
      const clean = cleanHTML(html);
      return turndownService.turndown(clean);
    }
    // 复制
    const handleCopy = () => {
      const markdown = getText();
      copyText(markdown);
    };

    const setContentValue = (value: string) => {
      setMarkdownContent(value);
    };

    const clearHandle = () => {
      const el = contentRef.current;
      if (!el) return;

      el.focus();

      const selection = window.getSelection();
      const range = document.createRange();

      range.selectNodeContents(el);
      selection?.removeAllRanges();
      selection?.addRange(range);

      document.execCommand("delete");
    };

    const getText = (): string => {
      if (!contentRef.current) return "";

      const markdown = htmlToMarkdown(contentRef.current.innerHTML);
      return markdown;
    };

    useImperativeHandle(ref, () => ({
      getText,
      setContent: setContentValue,
    }));

    return (
      <div className="flex flex-col w-full h-full gap-2 relative overflow-hidden">
        {editable && (
          <div className="flex items-center justify-between px-3! pt-2!">
            <div className="flex gap-2">
              <button
                onClick={handleUndo}
                className={`px-2! py-1! flex items-center gap-1 text-xs bg-(--text-color)/20 rounded cursor-pointer hover:bg-(--text-color)/40 text-(--text-color)`}
              >
                <RiArrowGoBackFill />
                <span>撤销</span>
              </button>
              <button
                onClick={handleRedo}
                className={`px-2! py-1! flex items-center gap-1 text-xs bg-(--text-color)/20 rounded cursor-pointer hover:bg-(--text-color)/40 text-(--text-color)`}
              >
                <RiArrowGoBackFill style={{ transform: "scaleX(-1)" }} />
                <span>重做</span>
              </button>
              <button
                onClick={handleCopy}
                className={`px-2! py-1! flex items-center gap-1 text-xs bg-(--text-color)/20 rounded cursor-pointer hover:bg-(--text-color)/40 text-(--text-color)`}
              >
                <FiCopy />
                <span>复制</span>
              </button>
              <button
                onClick={clearHandle}
                className={`px-2! py-1! flex items-center gap-1 text-xs bg-(--text-color)/20 rounded cursor-pointer hover:bg-(--text-color)/40 text-(--text-color)`}
              >
                <GrClearOption />
                <span>清空</span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShow(true)}
                className={`px-2! flex items-center gap-1 py-1! text-xs bg-(--text-color)/20 rounded cursor-pointer hover:bg-(--text-color)/40 text-(--text-color)`}
              >
                <MdDriveFolderUpload style={{ fontSize: 14 }} />
                <span>导入文档</span>
              </button>

              <button
                onClick={() => setShowHistory(true)}
                className={`px-2! flex items-center gap-1 py-1! text-xs bg-(--text-color)/20 rounded cursor-pointer hover:bg-(--text-color)/40 text-(--text-color)`}
              >
                <MdHistory style={{ fontSize: 14 }} />
                <span>历史版本</span>
              </button>
            </div>
          </div>
        )}

        <div
          ref={contentRef}
          contentEditable={editable}
          suppressContentEditableWarning
          className={`h-full overflow-y-auto p-3! outline-none w-full markdown-body`}
          style={{ minHeight: 200 }}
        >
          <ReactMarkdown
            children={markdownContent}
            remarkPlugins={[remarkGfm, remarkBreaks]}
            components={{
              h1: ({ ...props }) => (
                <h1
                  className="font-bold text-(--primary-color) my-2!"
                  {...props}
                  style={{
                    fontSize: fontSize ? `${fontSize}` : "20px",
                  }}
                />
              ),
              h2: ({ ...props }) => (
                <h2
                  className="font-semibold text-(--primary-color) mt-2!"
                  {...props}
                  style={{
                    fontSize: fontSize ? `${fontSize}` : "16px",
                  }}
                />
              ),
              h3: ({ ...props }) => (
                <h3
                  className="font-semibold text-(--primary-color) mt-1! mb-2!"
                  {...props}
                  style={{
                    fontSize: fontSize ? `${fontSize}` : "16px",
                  }}
                />
              ),
              p: ({ ...props }) => (
                <p
                  className={`text-(--text-color)/80`}
                  {...props}
                  style={{
                    fontSize: fontSize ? `${fontSize}` : "14px",
                  }}
                />
              ),
              code({ className, children }) {
                const match = /language-(\w+)/.exec(className || "");
                if (!match) {
                  return (
                    <code className="bg-gray-200 px-1 rounded">{children}</code>
                  );
                }
                return (
                  <SyntaxHighlighter
                    style={oneDark as { [key: string]: React.CSSProperties }}
                    language={match[1]}
                    PreTag="div"
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                );
              },
            }}
          />
        </div>

        <ResourceSelect
          visible={show}
          isPicture={false}
          onCancel={() => setShow(false)}
        />

        <div
          className={`w-70 h-full flex flex-col bg-(--bg-white) border border-(--border-color) absolute right-0 z-10 top-0 transition-transform duration-200 ${showHistory ? "translate-x-0" : "translate-x-full"}`}
          style={{
            borderRadius: "10px 0 0 10px",
            boxShadow: !show ? "0 0 15px 0 var(--bg-color)" : "",
          }}
        >
          <div className="flex items-center justify-between ">
            <div className="text-xs flex items-center p-3! gap-1">
              <TbHistoryToggle
                style={{ color: "var(--text-color)", fontSize: "16px" }}
              />
              <span>历史版本</span>
            </div>
            <div
              className="p-3! cursor-pointer"
              onClick={() => setShowHistory(false)}
            >
              <IoClose
                style={{
                  color: "var(--text-color)",
                  fontSize: "20px",
                }}
              />
            </div>
          </div>
          <div className="h-px bg-(--border-color) w-full"></div>
          <div className="flex-1 overflow-y-auto w-full p-2!">
            {Array.from(
              { length: 20 },
              () =>
                `## 食神宗山门破败，三名弟子哭泣，就在魔云宗大军压境之时 \n \n 核心男主，从颓废宅男穿越为游戏BOSS，通过经营系统改变乐园生态`,
            ).map((item, index) => (
              <div
                key={index}
                className="hover:bg-(--bg-color) p-2! rounded-md cursor-pointer relative group"
                onClick={() => setMarkdownContent(index + 1 + "\n" + item)}
              >
                <div className="text-xs text-(--text-color) text-nowrap text-ellipsis">
                  {item}
                </div>
                <div className="text-[10px] text-(--text-color)/50 mt-0.5!">
                  2026-02-05
                </div>
                <div className="absolute right-1 top-1 bg-(--bg-color) w-15  flex items-center justify-end opacity-0 group-hover:opacity-100">
                  <Popover
                    trigger="click"
                    placement="bottomRight"
                    arrow={false}
                    open={openIndex === index}
                    overlayClassName="custom-popover"
                    onOpenChange={(v) => setOpenIndex(v ? index : null)}
                    content={
                      <div
                        onClick={() => setOpenIndex(null)}
                        className="text-red-500 text-sm flex items-center gap-1 justify-center w-16 h-8 cursor-pointer hover:bg-(--primary-color)/20 rounded-lg hover:border hover:border-(--primary-color)/70"
                      >
                        <RiDeleteBin6Line
                          style={{
                            fontSize: "15px",
                          }}
                        />
                        <span>删除</span>
                      </div>
                    }
                  >
                    <div className="p-0.5! hover:bg-(--primary-color)/20 rounded-sm">
                      <IoIosMore
                        style={{
                          color: "var(--text-color)",
                          fontSize: "16px",
                        }}
                      />
                    </div>
                  </Popover>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
);

interface MarkdownPreviewProps {
  visible: boolean;
  title?: string;
  onCancel?: () => void;
  content: string;
  editable?: boolean;
  fontSize?: string;
  headerRight?: React.ReactNode;
  isDark?: boolean;
}

export const MarkdownPreview = forwardRef<
  MarkdownViewRef,
  MarkdownPreviewProps
>(
  (
    {
      visible,
      title,
      onCancel,
      content,
      editable,
      fontSize,
      headerRight,
      isDark,
    },
    ref,
  ) => {
    const { copyText } = useCopy();
    const markdownRef = useRef<MarkdownViewRef>(null);

    useImperativeHandle(ref, () => ({
      getText: () => markdownRef.current?.getText() || "",
      setContent: markdownRef.current?.setContent,
    }));

    return (
      <ContentModal
        visible={visible}
        title={title}
        onCancel={onCancel}
        isDark={isDark}
        headerRight={
          headerRight || (
            <div className="flex items-center">
              <div className="mx-3!">
                <CommonDownload title={title} content={content} />
              </div>
              <div
                className="mx-3! cursor-pointer"
                onClick={() =>
                  copyText(markdownRef.current?.getText() || content)
                }
              >
                <FiCopy style={{ fontSize: "18px" }} />
              </div>
            </div>
          )
        }
      >
        <MarkdownView
          ref={markdownRef}
          isDark={isDark}
          initialValue={content}
          editable={editable}
          fontSize={fontSize}
        />
      </ContentModal>
    );
  },
);
