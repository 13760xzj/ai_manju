import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { VerticalAlignBottomOutlined, CopyOutlined } from "@ant-design/icons";
import remarkBreaks from "remark-breaks";

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
                className="text-md font-semibold text-primary my-2!"
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
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className="bg-gray-200 px-1 rounded" {...props}>
                  {children}
                </code>
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
            <VerticalAlignBottomOutlined style={{ fontSize: "18px" }} />
          </div>
          <div
            className="mx-3! cursor-pointer"
            onClick={() => copyText(content)}
          >
            <CopyOutlined style={{ fontSize: "18px" }} />
          </div>
        </div>
      }
      content={<MarkdownView initialValue={content} />}
    />
  );
};
