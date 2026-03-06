import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/useToast";
import { Button, ConfirmDialog } from "@/components/common";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Divider, Tooltip } from "antd";
import "./index.css";

export function StoryboardPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [viewMode, setViewMode] = useState<"list" | "card">("list");
  const [progressCount] = useState(0);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [activeCardMenu, setActiveCardMenu] = useState<number | null>(null);

  const handleNext = () => {
    navigate("/storyboard-video");
  };

  const handleRegenerate = () => {
    setShowConfirmDialog(true);
  };

  const confirmRegenerate = () => {
    toast.info("正在重新生成分镜...");
  };

  const handleAddStoryboard = () => {
    toast.info("添加新分镜功能");
  };

  const toggleCardMenu = (index: number) => {
    setActiveCardMenu(activeCardMenu === index ? null : index);
  };

  const handleEditImage = () => {
    toast.info("编辑分镜图片");
    setActiveCardMenu(null);
  };

  const handleCopyCard = () => {
    toast.info("复制分镜");
    setActiveCardMenu(null);
  };

  const handlePreview = () => {
    toast.info("预览");
    setActiveCardMenu(null);
  };

  const handleReplace = () => {
    toast.info("替换");
    setActiveCardMenu(null);
  };

  const handleDownload = () => {
    toast.info("下载");
    setActiveCardMenu(null);
  };

  const handleDeleteCard = () => {
    toast.info("删除分镜");
    setActiveCardMenu(null);
  };

  return (
    <div className="storyboard-page">
      <div className="page-toolbar px-5! pt-5!">
        <div className="navigation-box ui-toolbar">
          <div className="nav-left">
            <div className="toggle-group">
              <Button
                variant={viewMode === "list" ? "primary" : "secondary"}
                size="small"
                className={
                  viewMode === "list" ? "toggle-btn text-white!" : "toggle-btn"
                }
                onClick={() => setViewMode("list")}
              >
                列表
              </Button>
              <Button
                variant={viewMode === "card" ? "primary" : "secondary"}
                size="small"
                className={
                  viewMode === "card" ? "toggle-btn text-white!" : "toggle-btn"
                }
                onClick={() => setViewMode("card")}
              >
                卡片
              </Button>
            </div>
            <div className="nav-divider"></div>
            <div className="progress-info">
              分镜完成进度：<span>{progressCount}</span>/16
            </div>
          </div>
          <div className="nav-right">
            <Button
              variant="secondary"
              size="small"
              onClick={handleAddStoryboard}
            >
              添加分镜
            </Button>
            <Button variant="secondary" size="small" onClick={handleRegenerate}>
              重新生成分镜
            </Button>
            <Button variant="primary" size="small" onClick={handleNext}>
              下一步
            </Button>
          </div>
        </div>
      </div>

      {viewMode === "list" && (
        <div className="list-view-container px-5! pb-5!">
          {[1, 2, 3].map((num) => (
            <div key={num} className="storyboard-card relative">
              <div className="storyboard-header">
                <div className="storyboard-title">
                  分镜脚本 {num}：分镜 1-{num}
                </div>
                <div className="storyboard-actions">
                  <Button variant="info" size="mini">
                    配音对口型
                  </Button>
                  <Button variant="secondary" size="mini">
                    修改脚本描述
                  </Button>
                  <Button variant="primary" size="mini">
                    编辑分镜图片
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
                  <div className="storyboard-label">分镜图片：</div>
                  <div className="storyboard-image-box">
                    <div style={{ fontSize: "12px", marginTop: "8px" }}>
                      编辑分镜图片
                    </div>
                    <div
                      style={{
                        fontSize: "10px",
                        color: "var(--text-faint)",
                        marginTop: "4px",
                      }}
                    >
                      点击生成或编辑分镜图片
                    </div>
                  </div>
                </div>
                <div className="storyboard-item">
                  <div className="storyboard-label">参考图片：</div>
                  <div className="ref-grid">
                    {[1, 2, 3, 4].map((i) => (
                      <button
                        key={i}
                        type="button"
                        className="ref-tile"
                        aria-label={i === 4 ? "添加参考图" : `参考图 ${i}`}
                      >
                        <span className={`ref-plus ${i === 4 ? "is-add" : ""}`}>
                          +
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="storyboard-item">
                  <div className="storyboard-label">脚本描述：</div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--text-weak)",
                      lineHeight: 1.8,
                    }}
                  >
                    <div style={{ marginBottom: "6px" }}>
                      <strong>镜号：</strong>1-{num}
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>剧本内容：</strong>
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>画面描述：</strong>
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>台词：</strong>
                    </div>
                    <div style={{ marginBottom: "6px" }}>
                      <strong>动作状态：</strong>
                    </div>
                    <div>
                      <strong>叙事功能：</strong>
                    </div>
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
            {[
              { title: "分镜 1-1" },
              { title: "分镜 1-2" },
              { title: "分镜 1-3" },
              { title: "分镜 1-4" },
              { title: "分镜 1-5" },
              { title: "分镜 1-6" },
              { title: "分镜 1-7" },
              { title: "分镜 1-8" },
            ].map((card, index) => (
              <div key={index} className="storyboard-card-compact relative">
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
                <div className="card-header">
                  <div className="card-title">{card.title}</div>
                  <div className="card-menu-wrapper">
                    <button
                      className="card-menu-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCardMenu(index);
                      }}
                    >
                      ...
                    </button>
                    {activeCardMenu === index && (
                      <div className="card-menu-dropdown">
                        <div className="menu-item" onClick={handleEditImage}>
                          <span className="menu-icon">✏️</span>
                          <span>编辑分镜图</span>
                        </div>
                        <div className="menu-item" onClick={handleCopyCard}>
                          <span className="menu-icon">📋</span>
                          <span>复制分镜</span>
                        </div>
                        <div className="menu-item" onClick={handlePreview}>
                          <span className="menu-icon">🔍</span>
                          <span>预览</span>
                        </div>
                        <div className="menu-item" onClick={handleReplace}>
                          <span className="menu-icon">🔄</span>
                          <span>替换</span>
                        </div>
                        <div className="menu-item" onClick={handleDownload}>
                          <span className="menu-icon">⬇️</span>
                          <span>下载</span>
                        </div>
                        <div
                          className="menu-item delete"
                          onClick={handleDeleteCard}
                        >
                          <span className="menu-icon">🗑️</span>
                          <span>删除分镜</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="card-image-container">
                  <span>暂无图片</span>
                </div>
              </div>
            ))}

            <div
              className="storyboard-card-compact storyboard-card-add"
              onClick={handleAddStoryboard}
            >
              <div className="card-header">
                <div className="card-title">添加新分镜</div>
              </div>
              <div className="card-image-container card-image-container-add">
                <span className="card-add-plus">+</span>
              </div>
            </div>
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
