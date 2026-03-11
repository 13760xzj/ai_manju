import './index.css';
import { Button } from '@/components/common';

export interface FormSectionProps {
  formName: string;
  voiceover?: string;
  status?: 'completed' | 'processing' | 'failed';
  onEditFormImage?: () => void;
  onCopyForm?: () => void;
  onDeleteForm?: () => void;
  onAudition?: () => void;
  children?: React.ReactNode;
}

export function FormSection({
  formName,
  voiceover,
  status,
  onEditFormImage,
  onCopyForm,
  onDeleteForm,
  onAudition,
  children
}: FormSectionProps) {
  const statusTextMap: Record<NonNullable<FormSectionProps['status']>, string> = {
    completed: '已完成',
    processing: '生成中',
    failed: '失败'
  };

  return (
    <div className="form-section">
      <div className="form-section-header">
        <div className="form-section-info">
          <span className="form-section-name">{formName}</span>
          {status && (
            <>
              <span className="form-section-divider">|</span>
              <span className={`form-section-status status-${status}`}>
                {statusTextMap[status]}
              </span>
            </>
          )}
          {voiceover && (
            <>
              <span className="form-section-divider">|</span>
              <span className="form-section-voiceover">配音：{voiceover}</span>
              <Button
                variant="secondary"
                size="mini"
                onClick={onAudition}
                className="form-section-audition-btn"
              >
                ▶ 试听
              </Button>
            </>
          )}
        </div>
        <div className="form-section-actions">
          <Button variant="primary" size="small" onClick={onEditFormImage}>
            编辑形态图
          </Button>
          <Button variant="secondary" size="small" onClick={onCopyForm}>
            复制形态
          </Button>
          <Button variant="danger" size="small" onClick={onDeleteForm}>
            删除形态
          </Button>
        </div>
      </div>
      
      {children && (
        <div className="form-images">
          {children}
        </div>
      )}
    </div>
  );
}
