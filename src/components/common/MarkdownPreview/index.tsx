import { RiDownloadLine } from "react-icons/ri";
import { FiCopy } from "react-icons/fi";
import { useCopy } from "@/hooks/useCopy";
import { useDownload } from "@/hooks/useDownload";
import { ContentModal } from "../ContentModal";

import React, { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import TurndownService from "turndown";
import { RiArrowGoBackFill } from "react-icons/ri";
import { GrClearOption } from "react-icons/gr";
import { MdDriveFolderUpload, MdHistory } from "react-icons/md";

interface MarkdownViewProps {
  initialValue?: string;
  editable?: boolean;
}

export const MarkdownView: React.FC<MarkdownViewProps> = ({
  initialValue = "",
  editable = false,
}) => {
  const [markdownContent, setMarkdownContent] = useState(initialValue);
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
    if (!contentRef.current) return;

    const markdown = htmlToMarkdown(contentRef.current.innerHTML);
    console.log(markdown);
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

  return (
    <div className="flex flex-col w-full h-full gap-2">
      {editable && (
        <div className="flex items-center justify-between px-3! pt-2!">
          <div className="flex gap-2">
            <button
              onClick={handleUndo}
              className="px-2! flex items-center gap-1 py-1! text-xs bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
            >
              <RiArrowGoBackFill />
              <span>撤销</span>
            </button>
            <button
              onClick={handleRedo}
              className="px-2! py-1! flex items-center gap-1 text-xs bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
            >
              <RiArrowGoBackFill style={{ transform: "scaleX(-1)" }} />
              <span>重做</span>
            </button>
            <button
              onClick={handleCopy}
              className="px-2! py-1! flex items-center gap-1 text-xs bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
            >
              <FiCopy />
              <span>复制</span>
            </button>
            <button
              onClick={clearHandle}
              className="px-2! py-1! flex items-center gap-1 text-xs bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
            >
              <GrClearOption />
              <span>清空</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setContentValue("## 123")}
              className="px-2! flex items-center gap-1 py-1! text-xs bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
            >
              <MdDriveFolderUpload style={{ fontSize: 14 }} />
              <span>导入文档</span>
            </button>

            <button
              onClick={() => setContentValue("## 456")}
              className="px-2! flex items-center gap-1 py-1! text-xs bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
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
                className="text-xl font-bold text-blue-600 my-2!"
                {...props}
              />
            ),
            h2: ({ ...props }) => (
              <h2
                className="text-md font-semibold text-blue-400 mt-2!"
                {...props}
              />
            ),
            h3: ({ ...props }) => (
              <h3
                className="text-md font-semibold text-purple-600 mt-1! mb-2!"
                {...props}
              />
            ),
            p: ({ ...props }) => (
              <p className="text-gray-800 text-sm" {...props} />
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
    </div>
  );
};

interface MarkdownPreviewProps {
  visible: boolean;
  title?: string;
  onCancel?: () => void;
  content: string;
  editable?: boolean;
}

export const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({
  visible,
  title,
  onCancel,
  content,
  editable,
}) => {
  const { copyText } = useCopy();
  const { downloadFile } = useDownload();
  return (
    <ContentModal
      visible={visible}
      title={title}
      onCancel={onCancel}
      headerRight={
        <div className="flex items-center">
          <div
            className="mx-3! cursor-pointer"
            onClick={() => downloadFile(content, title)}
          >
            <RiDownloadLine style={{ fontSize: "18px" }} />
          </div>
          <div
            className="mx-3! cursor-pointer"
            onClick={() => copyText(content)}
          >
            <FiCopy style={{ fontSize: "18px" }} />
          </div>
        </div>
      }
    >
      <MarkdownView initialValue={content} editable={editable} />
    </ContentModal>
  );
};
