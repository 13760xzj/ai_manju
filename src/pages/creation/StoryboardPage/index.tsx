import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/useToast';
import { ConfirmDialog } from '@/components/common';
import './index.css';

export function StoryboardPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
  const [progressCount] = useState(0);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleNext = () => {
    navigate('/storyboard-video');
  };

  const handleRegenerate = () => {
    setShowConfirmDialog(true);
  };

  const confirmRegenerate = () => {
    toast.info('正在重新生成分镜...');
  };

  const handleAddStoryboard = () => {
    toast.info('添加新分镜功能');
  };

  return (
    <div className="settings-page">
      <div className="page-toolbar">
        <div className="toolbar-left">
          <div className="toggle-group">
            <button 
              className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              列表
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'card' ? 'active' : ''}`}
              onClick={() => setViewMode('card')}
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
                <div className="storyboard-title">分镜脚本 {num}：分镜 1-{num}</div>
                <div className="storyboard-actions">
                  <button className="btn-mini btn-cyan">配音对口型</button>
                  <button className="btn-mini btn-gray">修改脚本描述</button>
                  <button className="btn-mini btn-blue">编辑分镜图片</button>
                  <button className="btn-mini btn-gray">复制分镜</button>
                  <button className="btn-mini btn-red">删除分镜</button>
                </div>
              </div>
              <div className="storyboard-grid">
                <div className="storyboard-item">
                  <div className="storyboard-label">分镜图片：</div>
                  <div className="storyboard-image-box">
                    <div style={{ fontSize: '12px', marginTop: '8px' }}>编辑分镜图片</div>
                    <div style={{ fontSize: '10px', color: '#999', marginTop: '4px' }}>点击生成或编辑分镜图片</div>
                  </div>
                </div>
                <div className="storyboard-item">
                  <div className="storyboard-label">参考图片：</div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {[1, 2, 3, 4].map((i) => (
                      <div 
                        key={i} 
                        style={{ 
                          width: '80px', 
                          height: '80px', 
                          background: 'linear-gradient(135deg, #f0f4ff 0%, #e6ecff 100%)', 
                          borderRadius: '6px', 
                          border: '2px dashed #d0d0d0', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          cursor: 'pointer', 
                          transition: 'all 0.2s ease' 
                        }}
                      >
                        <span style={{ fontSize: i === 4 ? '24px' : '20px', color: i === 4 ? '#4a6cf7' : '#999', fontWeight: i === 4 ? 'bold' : 'normal' }}>+</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="storyboard-item">
                  <div className="storyboard-label">脚本描述：</div>
                  <div style={{ fontSize: '12px', color: '#666', lineHeight: 1.8 }}>
                    <div style={{ marginBottom: '6px' }}><strong>镜号：</strong>1-{num}</div>
                    <div style={{ marginBottom: '6px' }}><strong>剧本内容：</strong></div>
                    <div style={{ marginBottom: '6px' }}><strong>画面描述：</strong></div>
                    <div style={{ marginBottom: '6px' }}><strong>台词：</strong></div>
                    <div style={{ marginBottom: '6px' }}><strong>动作状态：</strong></div>
                    <div><strong>叙事功能：</strong></div>
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
            {[
              { title: '分镜 1-1', scene: '古代寺庙' },
              { title: '分镜 1-2', scene: '暴风雨天空' },
              { title: '分镜 1-3', scene: '古代寺庙内' }
            ].map((card, index) => (
              <div key={index} className="storyboard-card-compact">
                <div className="card-header">
                  <div className="card-title">{card.title}</div>
                  <button className="card-menu-btn">⋮</button>
                </div>
                <div className="card-image-container">
                  <span>暂无图片</span>
                </div>
                <div className="card-footer">
                  <div className="card-info">场景：{card.scene}</div>
                  <div className="card-actions">
                    <button className="card-action-btn primary">编辑</button>
                    <button className="card-action-btn">操作 ▼</button>
                  </div>
                </div>
              </div>
            ))}
            
            <div 
              className="storyboard-card-compact" 
              style={{ background: 'linear-gradient(135deg, #fafafa 0%, #ffffff 100%)', border: '2px dashed #d0d0d0' }}
              onClick={handleAddStoryboard}
            >
              <div className="card-header">
                <div className="card-title">添加新分镜</div>
              </div>
              <div className="card-image-container" style={{ border: 'none', background: 'transparent' }}>
                <span style={{ fontSize: '24px', color: '#666' }}>+</span>
              </div>
              <div className="card-footer">
                <div className="card-info">点击添加新分镜</div>
              </div>
            </div>
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
