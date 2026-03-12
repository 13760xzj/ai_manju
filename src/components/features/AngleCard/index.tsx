import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  IconButton,
  MediaPreview,
  PillActionButton,
} from "@/components/common";
import "./index.css";

export interface AngleCardProps {
  title: string;
  imageUrl?: string;
  onReplace?: () => void;
  onDownload?: () => void;
  onDelete?: () => void;
  previewImages?: string[];
  children?: ReactNode;
}

export function AngleCard({
  title,
  imageUrl,
  onReplace,
  onDownload,
  onDelete,
  previewImages,
  children,
}: AngleCardProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const images = useMemo(() => {
    if (previewImages && previewImages.length > 0) return previewImages;
    return imageUrl ? [imageUrl] : [];
  }, [imageUrl, previewImages]);

  useEffect(() => {
    if (!showDropdown) return;
    const onDocMouseDown = (e: MouseEvent) => {
      const el = rootRef.current;
      if (!el) return;
      if (e.target instanceof Node && el.contains(e.target)) return;
      setShowDropdown(false);
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [showDropdown]);

  return (
    <div className="angle-card" ref={rootRef}>
      <div className="angle-card-header">
        <div className="angle-card-title">{title}</div>
        <div className="angle-card-menu">
          <IconButton
            ariaLabel="打开更多操作"
            className="angle-card-menu-btn"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            ⋮
          </IconButton>
          {showDropdown && (
            <div className="angle-card-dropdown">
              <button
                type="button"
                className="angle-card-menu-item"
                onClick={() => {
                  onDownload?.();
                  setShowDropdown(false);
                }}
              >
                <span className="angle-card-menu-icon" aria-hidden="true">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <path d="M7 10l5 5 5-5" />
                    <path d="M12 15V3" />
                  </svg>
                </span>
                <span className="angle-card-menu-text">下载</span>
              </button>

              <button
                type="button"
                className="angle-card-menu-item is-danger"
                onClick={() => {
                  onDelete?.();
                  setShowDropdown(false);
                }}
              >
                <span className="angle-card-menu-icon" aria-hidden="true">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 6h18" />
                    <path d="M8 6V4h8v2" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                  </svg>
                </span>
                <span className="angle-card-menu-text">删除</span>
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
        {images.length > 0 ? (
          <MediaPreview urls={images}>
            <PillActionButton
              icon={
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              }
            >
              预览
            </PillActionButton>
          </MediaPreview>
        ) : (
          <PillActionButton
            disabled
            icon={
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            }
          >
            预览
          </PillActionButton>
        )}
        <PillActionButton
          onClick={onReplace}
          icon={
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M17 1l4 4-4 4" />
              <path d="M3 11V9a4 4 0 0 1 4-4h14" />
              <path d="M7 23l-4-4 4-4" />
              <path d="M21 13v2a4 4 0 0 1-4 4H3" />
            </svg>
          }
        >
          替换
        </PillActionButton>
        <PillActionButton
          onClick={onDownload}
          icon={
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <path d="M7 10l5 5 5-5" />
              <path d="M12 15V3" />
            </svg>
          }
        >
          下载
        </PillActionButton>
      </div>

      {children}
    </div>
  );
}
