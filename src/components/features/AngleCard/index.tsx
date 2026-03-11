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
                下载
              </button>
              <button
                className="angle-card-dropdown-item danger"
                onClick={() => {
                  onDelete?.();
                  setShowDropdown(false);
                }}
              >
                删除
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
          <button className="angle-action-btn">
            <span className="angle-action-icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </span>
            预览
          </button>
        </ImagePreview>
        <button className="angle-action-btn" onClick={onReplace}>
          <span className="angle-action-icon" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 1l4 4-4 4" />
              <path d="M3 11V9a4 4 0 0 1 4-4h14" />
              <path d="M7 23l-4-4 4-4" />
              <path d="M21 13v2a4 4 0 0 1-4 4H3" />
            </svg>
          </span>
          替换
        </button>
        <button className="angle-action-btn" onClick={onDownload}>
          <span className="angle-action-icon" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <path d="M7 10l5 5 5-5" />
              <path d="M12 15V3" />
            </svg>
          </span>
          下载
        </button>
      </div>

      {children}
    </div>
  );
}
