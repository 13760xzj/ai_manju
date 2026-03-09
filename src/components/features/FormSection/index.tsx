import './index.css';

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
              <button className="form-section-audition-btn" onClick={onAudition}>
                ▶ 试听
              </button>
            </>
          )}
        </div>
        <div className="form-section-actions">
          <button className="action-btn primary" onClick={onEditFormImage}>编辑形态图</button>
          <button className="action-btn" onClick={onCopyForm}>复制形态</button>
          <button className="action-btn danger" onClick={onDeleteForm}>删除形态</button>
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
