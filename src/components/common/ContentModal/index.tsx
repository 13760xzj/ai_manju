import { CloseOutlined } from "@ant-design/icons";

interface ModalProps {
  visible: boolean;
  title?: string;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  headerRight?: React.ReactNode;
  onCancel?: () => void;
  width?: string | number;
  height?: string | number;
}

export const ContentModal: React.FC<ModalProps> = ({
  visible,
  title = "标题",
  content,
  footer,
  headerRight,
  onCancel,
  width = "80%",
  height = "85vh",
}) => {
  const [show, setShow] = useState(visible);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    let enterTimer: NodeJS.Timeout;
    let animateTimer: NodeJS.Timeout;
    let leaveTimer: NodeJS.Timeout;

    if (visible) {
      // 延迟挂载 DOM，避免同步 setState 报警
      enterTimer = setTimeout(() => setShow(true), 0);
      // 延迟触发动画
      animateTimer = setTimeout(() => setAnimate(true), 20);
    } else {
      // 延迟关闭动画，避免同步 setState 报警
      animateTimer = setTimeout(() => setAnimate(false), 0);
      leaveTimer = setTimeout(() => setShow(false), 300);
    }

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(animateTimer);
      clearTimeout(leaveTimer);
    };
  }, [visible]);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        opacity: animate ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
      onClick={onCancel} // 点击遮罩关闭
    >
      <div
        style={{
          width,
          height,
          backgroundColor: "#fff",
          borderRadius: 12,
          display: "flex",
          flexDirection: "column",
          transform: animate ? "scale(1)" : "scale(0.8)",
          opacity: animate ? 1 : 0,
          transition: "all 0.3s ease",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()} // 阻止点击穿透到遮罩
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 24px",
            borderBottom: "1px solid #f0f0f0",
            fontWeight: 600,
            fontSize: 16,
            flexShrink: 0,
          }}
        >
          <span>{title}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {headerRight}
            <div
              onClick={onCancel}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <CloseOutlined style={{ fontSize: "18px" }} />
            </div>
          </div>
        </div>

        {/* Body */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
          }}
        >
          {content}
        </div>

        {/* Footer */}
        {footer && (
          <div
            style={{
              borderTop: "1px solid #f0f0f0",
              flexShrink: 0,
              padding: "8px 16px",
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
