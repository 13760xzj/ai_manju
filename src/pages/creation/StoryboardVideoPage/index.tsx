import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/useToast";
import { Button, ConfirmDialog } from "@/components/common";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Divider, Tooltip } from "antd";
import "./index.css";

export function StoryboardVideoPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [viewMode, setViewMode] = useState<"list" | "card">("list");
  const [progressCount] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleNext = () => {
    navigate("/dubbing");
  };

  const handleRegenerate = () => {
    setShowConfirmDialog(true);
  };

  const confirmRegenerate = () => {
    toast.info("正在重新生成分镜...");
  };

  const toggleDropdown = (dropdownId: string) => {
    setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  return (
    <div className="storyboard-video-page" onClick={closeDropdown}>
      <div className="page-toolbar ui-toolbar mx-5! mt-5!">
        <div className="toolbar-left">
          <div className="toggle-group">
            <Button
              variant={viewMode === "list" ? "primary" : "secondary"}
              size="small"
              className={
                viewMode === "list" ? "toggle-btn text-white!" : "toggle-btn"
              }
              onClick={(e) => {
                e.stopPropagation();
                setViewMode("list");
              }}
            >
              列表
            </Button>
            <Button
              variant={viewMode === "card" ? "primary" : "secondary"}
              size="small"
              className={
                viewMode === "card" ? "toggle-btn text-white!" : "toggle-btn"
              }
              onClick={(e) => {
                e.stopPropagation();
                setViewMode("card");
              }}
            >
              卡片
            </Button>
          </div>
          <div className="progress-info">
            视频完成进度：<span>{progressCount}</span>/16
          </div>
        </div>
        <div className="toolbar-right">
          <Button variant="secondary" size="small" onClick={handleRegenerate}>
            重新生成分镜
          </Button>
          <Button variant="primary" size="small" onClick={handleNext}>
            下一步
          </Button>
        </div>
      </div>

      {viewMode === "list" && (
        <div className="list-view-container px-5! pb-5!">
          {[1, 2, 3].map((num) => (
            <div key={num} className="storyboard-card relative">
              <div className="storyboard-header">
                <div className="storyboard-title">
                  分镜视频 {num}：分镜 1-{num}
                </div>
                <div className="storyboard-actions">
                  <Button variant="info" size="mini">
                    配音对口型
                  </Button>
                  <Button variant="primary" size="mini">
                    编辑分镜视频
                  </Button>
                  <Button variant="secondary" size="mini">
                    复制分镜
                  </Button>
                  <Button variant="danger" size="mini">
                    删除分镜
                  </Button>
                </div>
              </div>
              <div className="storyboard-grid">
                <div className="storyboard-item">
                  <div className="storyboard-label">分镜视频：</div>
                  <div className="storyboard-image-box">
                    <div style={{ fontSize: "12px", marginTop: "8px" }}>
                      编辑分镜视频
                    </div>
                    <div
                      style={{
                        fontSize: "10px",
                        color: "var(--text-faint)",
                        marginTop: "4px",
                      }}
                    >
                      点击生成或编辑分镜视频
                    </div>
                  </div>
                </div>
                <div className="storyboard-item">
                  <div className="storyboard-label">图生视频：</div>
                  <div
                    className="storyboard-image-box"
                    style={{ width: "200px", height: "180px" }}
                  >
                    <span>暂无图片</span>
                  </div>
                </div>
                <div className="storyboard-item">
                  <div className="storyboard-label">详情描述：</div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--text-weak)",
                      lineHeight: 1.6,
                    }}
                  >
                    可点击"自动生成视频"或"编辑视频"生成视频
                  </div>
                </div>
              </div>
              <div className="h-5 w-full absolute left-0 translate-y-5! bottom-0 z-10 group">
                <div className="opacity-0 flex h-full items-center group-hover:opacity-100 pr-5!">
                  <Tooltip title="插入空白卡片">
                    <IoIosAddCircleOutline
                      className="scale-150"
                      style={{ color: "var(--primary-color)", flexShrink: 0 }}
                      onClick={() => alert()}
                    />
                  </Tooltip>
                  <Divider
                    dashed={true}
                    style={{
                      flex: 1,
                      borderWidth: "1px",
                      borderColor: "var(--primary-color)",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {viewMode === "card" && (
        <div className="card-view-container active px-5! pb-5!">
          <div className="card-grid">
            {[1, 2, 3].map((num) => (
              <div key={num} className="video-card-compact relative">
                <div className="h-full w-5 absolute left-0 -translate-x-5! top-0 z-10 group">
                  <div className="opacity-0 flex h-full flex-col items-center group-hover:opacity-100">
                    <Tooltip title="插入空白卡片">
                      <IoIosAddCircleOutline
                        className="scale-150"
                        style={{ color: "var(--primary-color)" }}
                        onClick={() => alert()}
                      />
                    </Tooltip>
                    <Divider
                      type="vertical"
                      dashed={true}
                      style={{
                        flex: 1,
                        borderWidth: "1px",
                        borderColor: "var(--primary-color)",
                      }}
                    />
                  </div>
                </div>
                <div className="video-card-header">
                  <div className="video-card-title">
                    分镜视频 0{num}：分镜 1-{num}
                  </div>
                  <button
                    className="video-card-menu-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown(`video-dropdown${num}`);
                    }}
                  >
                    ⋮
                  </button>
                  {activeDropdown === `video-dropdown${num}` && (
                    <div className="video-card-dropdown show top-10! right-2!">
                      <button className="video-card-dropdown-item">
                        <span className="icon">✏️</span>
                        <span>编辑分镜视频</span>
                      </button>
                      <button className="video-card-dropdown-item">
                        <span className="icon">📋</span>
                        <span>复制分镜</span>
                      </button>
                      <div className="video-card-dropdown-divider"></div>
                      <button className="video-card-dropdown-item danger">
                        <span className="icon">🗑️</span>
                        <span>删除分镜</span>
                      </button>
                      <div className="video-card-dropdown-divider"></div>
                      <button className="video-card-dropdown-item">
                        <span className="icon">🎙️</span>
                        <span>配音对口型</span>
                      </button>
                    </div>
                  )}
                </div>
                <div className="video-card-image-box">
                  <span>点击编辑分镜视频</span>
                </div>
                <div className="video-card-footer">
                  <div className="video-card-info">分镜 1-{num}</div>
                  <div className="video-card-actions">
                    <Button variant="primary" size="mini">
                      编辑
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={confirmRegenerate}
        title="确认操作"
        message="确定要重新生成分镜吗？当前内容将会被覆盖。"
        confirmText="确定"
        cancelText="取消"
        variant="warning"
      />
    </div>
  );
}
