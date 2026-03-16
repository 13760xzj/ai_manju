import { useState } from "react";
import { Button } from "@/components/common";
import "./index.css";

export interface DocumentTopBarProps {
  title?: string;
  subtitle?: string;
  unsaved?: boolean;
  onSave?: () => void;
  onNext?: () => void;
  onTitleChange?: (title: string) => void;
}

export function DocumentTopBar({
  title = "未命名剧本",
  subtitle,
  unsaved = false,
  onSave,
  onNext,
  onTitleChange,
}: DocumentTopBarProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(title);

  const handleTitleClick = () => {
    setIsEditing(true);
    setEditValue(title);
  };

  const handleTitleBlur = () => {
    setIsEditing(false);
    onTitleChange?.(editValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      onTitleChange?.(editValue);
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setEditValue(title);
    }
  };

  return (
    <div className="document-top-bar">
      <div className="document-top-bar-left">
        {unsaved && <span className="unsaved-indicator">●</span>}
      </div>

      <div className="document-top-bar-center">
        {isEditing ? (
          <input
            type="text"
            className="document-title-input"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleTitleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <div className="document-title" onClick={handleTitleClick}>
            <span className="title-text">{title}</span>
            <span className="title-edit-icon">✎</span>
          </div>
        )}
        {subtitle && <span className="document-subtitle">{subtitle}</span>}
      </div>

      <div className="document-top-bar-right">
        <div className="document-top-bar-actions">
          {onSave && (
            <Button
              variant="secondary"
              size="small"
              onClick={onSave}
              disabled={!unsaved}
            >
              保存
            </Button>
          )}
          {onNext && (
            <Button variant="primary" size="small" onClick={onNext}>
              下一步
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
