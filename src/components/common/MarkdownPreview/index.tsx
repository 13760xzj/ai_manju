import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { RiDownloadLine } from "react-icons/ri";
import { FiCopy } from "react-icons/fi";
import remarkBreaks from "remark-breaks";
import { useState } from "react";
import { useCopy } from "@/hooks/useCopy";
import { useDownload } from "@/hooks/useDownload";
import { ContentModal } from "../ContentModal";

interface MarkdownViewProps {
  initialValue?: string;
  editable?: boolean;
}

export const MarkdownView: React.FC<MarkdownViewProps> = ({
  initialValue = "",
  editable = false,
}) => {
  const [markdown, setMarkdown] = useState(initialValue);

  return (
    <div className="flex w-full gap-4 h-full overflow-hidden">
      {editable && (
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          className="w-1/2 p-3! h-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
      <div
        className={`h-full overflow-y-auto p-3!  ${
          editable ? "w-1/2" : "w-full"
        } markdown-body`}
      >
        <ReactMarkdown
          children={markdown}
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
                className="text-md font-semibold text-(--primary-color) my-2!"
                {...props}
              />
            ),
            h3: ({ ...props }) => (
              <h3
                className="text-md font-semibold text-purple-600 my-2!"
                {...props}
              />
            ),
            p: ({ ...props }) => (
              <p className="text-gray-800 text-sm" {...props} />
            ),
            code(props) {
              const { className, children } = props;
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
}

export const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({
  visible,
  title,
  onCancel,
  content,
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
      <MarkdownView initialValue={content} />
    </ContentModal>
  );
};
