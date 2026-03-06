import { useState } from "react";
import type { ReactNode } from "react";
import { ImagePreview } from "@/components/common";
import "./index.css";

export interface AngleCardProps {
  title: string;
  imageUrl?: string;
  onPreview?: () => void;
  onReplace?: () => void;
  onDownload?: () => void;
  onDelete?: () => void;
  children?: ReactNode;
}

export function AngleCard({
  title,
  imageUrl,
  // onPreview,
  onReplace,
  onDownload,
  onDelete,
  children,
}: AngleCardProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="angle-card">
      <div className="angle-card-header">
        <div className="angle-card-title">{title}</div>
        <div className="angle-card-menu">
          <button
            className="angle-card-menu-btn"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            ⋮
          </button>
          {showDropdown && (
            <div className="angle-card-dropdown">
              <button
                className="angle-card-dropdown-item"
                onClick={() => {
                  onDownload?.();
                  setShowDropdown(false);
                }}
              >
                📥 下载
              </button>
              <button
                className="angle-card-dropdown-item danger"
                onClick={() => {
                  onDelete?.();
                  setShowDropdown(false);
                }}
              >
                🗑️ 删除
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="angle-card-image">
        {imageUrl ? (
          <img src={imageUrl} alt={title} />
        ) : (
          <div className="image-placeholder">
            <span>暂无图片</span>
          </div>
        )}
      </div>

      <div className="angle-card-actions">
        <ImagePreview
          images={[
            "https://picsum.photos/id/1015/800/600",
            "https://picsum.photos/id/1016/800/600",
            "https://picsum.photos/id/1018/800/600",
          ]}
        >
          <button className="angle-action-btn">👁 </button>
        </ImagePreview>
        <button className="angle-action-btn" onClick={onReplace}>
          ⇄ 替换
        </button>
        <button className="angle-action-btn" onClick={onDownload}>
          ⬇ 下载
        </button>
      </div>

      {children}
    </div>
  );
}
