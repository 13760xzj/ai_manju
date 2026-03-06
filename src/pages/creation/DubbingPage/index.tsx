import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/useToast";
import { Button, ConfirmDialog } from "@/components/common";
import "./index.css";

export function DubbingPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [viewMode, setViewMode] = useState<"list" | "card">("list");
  const [progressCount] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleNext = () => {
    navigate("/video-preview");
  };

  const handleRegenerate = () => {
    setShowConfirmDialog(true);
  };

  const confirmRegenerate = () => {
    toast.info("正在重新生成配音...");
  };

  const toggleDropdown = (dropdownId: string) => {
    setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  return (
    <div className="dubbing-page" onClick={closeDropdown}>
      <div className="page-toolbar ui-toolbar">
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
            配音完成进度：<span>{progressCount}</span>/16
          </div>
        </div>
        <div className="toolbar-right">
          <Button variant="secondary" size="small" onClick={handleRegenerate}>
            重新生成配音
          </Button>
          <Button variant="primary" size="small" onClick={handleNext}>
            下一步
          </Button>
        </div>
      </div>

      {viewMode === "list" && (
        <div className="list-view-container">
          {[1, 2, 3].map((num) => (
            <div key={num} className="dubbing-card">
              <div className="dubbing-header">
                <div className="dubbing-title">
                  分镜配音 {num}：分镜 1-{num}
                </div>
                <div className="dubbing-actions">
                  <Button variant="secondary" size="mini">
                    分镜脚本
                  </Button>
                  <Button variant="secondary" size="mini">
                    分镜视频
                  </Button>
                  <Button variant="primary" size="mini">
                    编辑分镜配音
                  </Button>
                  <Button variant="secondary" size="mini">
                    复制分镜
                  </Button>
                  <Button variant="danger" size="mini">
                    删除分镜
                  </Button>
                </div>
              </div>
              <div className="dubbing-grid">
                <div className="dubbing-image-section">
                  <div className="dubbing-image-label">配音对口型：</div>
                  <div className="dubbing-image-box"></div>
                </div>
                <div className="dubbing-content">
                  <div className="dubbing-section">
                    <div className="dubbing-label">台词：</div>
                    <div className="dubbing-text empty">
                      本段视频没有台词哦，点击右侧编辑按钮，可以添加台词哦～
                    </div>
                  </div>
                  <div className="dubbing-section">
                    <div className="dubbing-label">配音：</div>
                    <div className="voice-settings">
                      <div className="voice-setting-item">
                        <span className="voice-setting-label">类型：</span>
                        <span className="voice-setting-value">旁白/画外音</span>
                      </div>
                      <div className="voice-setting-item">
                        <span className="voice-setting-label">发言角色：</span>
                        <span className="voice-setting-value">未选择</span>
                      </div>
                      <Button variant="primary" size="mini">
                        试听
                      </Button>
                      <Button variant="secondary" size="mini">
                        未配置
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {viewMode === "card" && (
        <div className="card-view-container active">
          <div className="card-grid">
            {[1, 2, 3].map((num) => (
              <div key={num} className="dubbing-card-compact">
                <div className="dubbing-card-header">
                  <div className="dubbing-card-title">
                    分镜配音 {num}：分镜 1-{num}
                  </div>
                  <button
                    className="dubbing-card-menu-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown(`dropdown-${num}`);
                    }}
                  >
                    ⋮
                  </button>
                  {activeDropdown === `dropdown-${num}` && (
                    <div className="dubbing-card-dropdown show">
                      <button className="dubbing-card-dropdown-item">
                        <span className="icon">✏️</span>
                        <span>编辑分镜配音</span>
                      </button>
                      <button className="dubbing-card-dropdown-item">
                        <span className="icon">📋</span>
                        <span>复制分镜</span>
                      </button>
                      <div className="dubbing-card-dropdown-divider"></div>
                      <button className="dubbing-card-dropdown-item danger">
                        <span className="icon">🗑️</span>
                        <span>删除分镜</span>
                      </button>
                    </div>
                  )}
                </div>
                <div className="dubbing-card-image-box"></div>
                <div className="dubbing-card-content">
                  <div className="dubbing-card-label">台词：</div>
                  <div className="dubbing-card-text">本段视频没有台词哦～</div>
                </div>
                <div className="dubbing-card-voice-settings">
                  <div className="dubbing-card-voice-item">
                    <span>类型：</span>
                    <span className="dubbing-card-voice-value">
                      旁白/画外音
                    </span>
                  </div>
                  <div className="dubbing-card-voice-item">
                    <span>角色：</span>
                    <span className="dubbing-card-voice-value">未选择</span>
                  </div>
                </div>
                <div className="dubbing-card-footer">
                  <div className="dubbing-card-info">未配置</div>
                  <div className="dubbing-card-actions">
                    <Button variant="primary" size="mini">
                      试听
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
        message="确定要重新生成配音吗？当前内容将会被覆盖。"
        confirmText="确定"
        cancelText="取消"
        variant="warning"
      />
    </div>
  );
}
