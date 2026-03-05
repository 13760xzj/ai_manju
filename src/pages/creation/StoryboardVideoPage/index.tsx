import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/useToast';
import { ConfirmDialog } from '@/components/common';
import './index.css';

export function StoryboardVideoPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
  const [progressCount] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleNext = () => {
    navigate('/dubbing');
  };

  const handleRegenerate = () => {
    setShowConfirmDialog(true);
  };

  const confirmRegenerate = () => {
    toast.info('正在重新生成分镜...');
  };

  const toggleDropdown = (dropdownId: string) => {
    setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  return (
    <div className="settings-page" onClick={closeDropdown}>
      <div className="page-toolbar">
        <div className="toolbar-left">
          <div className="toggle-group">
            <button 
              className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={(e) => { e.stopPropagation(); setViewMode('list'); }}
            >
              列表
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'card' ? 'active' : ''}`}
              onClick={(e) => { e.stopPropagation(); setViewMode('card'); }}
            >
              卡片
            </button>
          </div>
          <div className="progress-info">
            视频完成进度：<span>{progressCount}</span>/16
          </div>
        </div>
        <div className="toolbar-right">
          <button className="btn-small btn-secondary" onClick={handleRegenerate}>重新生成分镜</button>
          <button className="btn-small btn-primary-small" onClick={handleNext}>下一步</button>
        </div>
      </div>

      {viewMode === 'list' && (
        <div className="list-view-container">
          {[1, 2, 3].map((num) => (
            <div key={num} className="storyboard-card">
              <div className="storyboard-header">
                <div className="storyboard-title">分镜视频 {num}：分镜 1-{num}</div>
                <div className="storyboard-actions">
                  <button className="btn-mini btn-cyan">配音对口型</button>
                  <button className="btn-mini btn-blue">编辑分镜视频</button>
                  <button className="btn-mini btn-gray">复制分镜</button>
                  <button className="btn-mini btn-red">删除分镜</button>
                </div>
              </div>
              <div className="storyboard-grid">
                <div className="storyboard-item">
                  <div className="storyboard-label">分镜视频：</div>
                  <div className="storyboard-image-box">
                    <div style={{ fontSize: '12px', marginTop: '8px' }}>编辑分镜视频</div>
                    <div style={{ fontSize: '10px', color: '#999', marginTop: '4px' }}>点击生成或编辑分镜视频</div>
                  </div>
                </div>
                <div className="storyboard-item">
                  <div className="storyboard-label">图生视频：</div>
                  <div className="storyboard-image-box" style={{ width: '200px', height: '180px' }}>
                    <span>暂无图片</span>
                  </div>
                </div>
                <div className="storyboard-item">
                  <div className="storyboard-label">详情描述：</div>
                  <div style={{ fontSize: '12px', color: '#666', lineHeight: 1.6 }}>
                    可点击"自动生成视频"或"编辑视频"生成视频
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {viewMode === 'card' && (
        <div className="card-view-container active">
          <div className="card-grid">
            {[1, 2, 3].map((num) => (
              <div key={num} className="video-card-compact">
                <div className="video-card-header">
                  <div className="video-card-title">分镜视频 0{num}：分镜 1-{num}</div>
                  <button 
                    className="video-card-menu-btn" 
                    onClick={(e) => { e.stopPropagation(); toggleDropdown(`video-dropdown${num}`); }}
                  >
                    ⋮
                  </button>
                  {activeDropdown === `video-dropdown${num}` && (
                    <div className="video-card-dropdown show">
                      <button className="video-card-dropdown-item">
                        <span className="icon">✏️</span>
                        <span>编辑分镜视频</span>
                      </button>
                      <button className="video-card-dropdown-item">
                        <span className="icon">📋</span>
                        <span>复制分镜</span>
                      </button>
                      <div className="video-card-dropdown-divider"></div>
                      <button className="video-card-dropdown-item danger">
                        <span className="icon">🗑️</span>
                        <span>删除分镜</span>
                      </button>
                      <div className="video-card-dropdown-divider"></div>
                      <button className="video-card-dropdown-item">
                        <span className="icon">🎙️</span>
                        <span>配音对口型</span>
                      </button>
                    </div>
                  )}
                </div>
                <div className="video-card-image-box">
                  <span>点击编辑分镜视频</span>
                </div>
                <div className="video-card-footer">
                  <div className="video-card-info">分镜 1-{num}</div>
                  <div className="video-card-actions">
                    <button className="video-card-action-btn primary">编辑</button>
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
        message="确定要重新生成分镜吗？当前内容将会被覆盖。"
        confirmText="确定"
        cancelText="取消"
        variant="warning"
      />
    </div>
  );
}
