import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";

interface ModalProps {
  visible: boolean;
  title?: string;
  showHeader?: boolean;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  headerRight?: React.ReactNode;
  onCancel?: () => void;
  width?: string | number;
  height?: string | number;
  headerCenter?: React.ReactNode;
  isDark?: boolean;
}

export const ContentModal: React.FC<ModalProps> = ({
  visible,
  title = "标题",
  showHeader = true,
  children,
  footer,
  headerRight,
  onCancel,
  width = "80%",
  height = "85vh",
  headerCenter,
  isDark,
}) => {
  const [show, setShow] = useState(visible);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    let enterTimer: number;
    let animateTimer: number;
    let leaveTimer: number;

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
        backgroundColor: "rgba(0,0,0,0.7)",
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
          backgroundColor: isDark ? "#0f1115" : "#fff",
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
        {showHeader && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "16px 24px",
              borderBottom: `1px solid ${isDark ? "#282a2c" : "#f0f0f0"}`,
              fontWeight: 600,
              fontSize: 16,
              flexShrink: 0,
            }}
          >
            <span
              className={`shrink-0 ${isDark ? "text-white" : "text-black"}`}
            >
              {title}
            </span>
            <div className="flex-1 px-4! overflow-hidden">{headerCenter}</div>
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
                <IoClose
                  style={{ fontSize: "24px", color: isDark ? "#fff" : "#111" }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Body */}
        <div
          style={{
            flex: 1,
            overflowY: "hidden",
          }}
        >
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            style={{
              borderTop: `1px solid ${isDark ? "#282a2c" : "#f0f0f0"}`,
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
