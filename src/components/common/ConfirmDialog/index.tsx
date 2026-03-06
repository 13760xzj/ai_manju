import "./ConfirmDialog.css";
import { HButton } from "@components/common";

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "确认操作",
  message,
  confirmText = "确定",
  cancelText = "取消",
  variant = "warning",
}: ConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="small"
      footer={
        <div className="confirm-dialog-actions">
          <HButton variant="ghost" onClick={onClose}>
            {cancelText}
          </HButton>
          <HButton
            variant={variant === "danger" ? "danger" : "primary"}
            onClick={handleConfirm}
          >
            {confirmText}
          </HButton>
        </div>
      }
    >
      <div className={`confirm-dialog-content confirm-dialog-${variant}`}>
        <div className="confirm-dialog-icon">
          {variant === "danger" && "⚠️"}
          {variant === "warning" && "⚠️"}
          {variant === "info" && "ℹ️"}
        </div>
        <p className="confirm-dialog-message">{message}</p>
      </div>
    </Modal>
  );
}
