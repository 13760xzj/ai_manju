import { Button } from '@/components/common';
import './index.css';

export interface HistoryVersion {
  id: string | number;
  timestamp: string;
  title: string;
  content: string;
  isCurrent?: boolean;
}

export interface HistoryDrawerProps {
  visible: boolean;
  versions?: HistoryVersion[];
  onClose: () => void;
  onRestore: (version: HistoryVersion) => void;
}

export function HistoryDrawer({
  visible,
  versions = [],
  onClose,
  onRestore
}: HistoryDrawerProps) {
  if (!visible) return null;

  return (
    <>
      <div className="history-drawer-overlay" onClick={onClose} />
      <div className={`history-drawer ${visible ? 'visible' : ''}`}>
        <div className="history-drawer-header">
          <h3>历史版本</h3>
          <button className="history-close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className="history-drawer-content">
          {versions.length === 0 ? (
            <div className="history-empty">
              <div className="history-empty-icon">📜</div>
              <div className="history-empty-text">暂无历史版本</div>
            </div>
          ) : (
            <div className="history-list">
              {versions.map((version) => (
                <div 
                  key={version.id} 
                  className={`history-item ${version.isCurrent ? 'current' : ''}`}
                >
                  <div className="history-item-header">
                    <span className="history-item-title">{version.title}</span>
                    {version.isCurrent && (
                      <span className="history-current-tag">当前版本</span>
                    )}
                  </div>
                  <div className="history-item-time">{version.timestamp}</div>
                  {!version.isCurrent && (
                    <Button 
                      variant="primary" 
                      size="small" 
                      className="history-restore-btn"
                      onClick={() => onRestore(version)}
                    >
                      恢复此版本
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
