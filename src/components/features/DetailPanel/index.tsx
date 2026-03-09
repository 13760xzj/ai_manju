import { useEffect } from 'react';
import type { Asset, Work, AssetCategoryInfo } from '@/types';
import { Button } from '@/components/common';
import { getStatusLabel } from '@/utils';
import './index.css';

export interface DetailPanelProps {
  item: Asset | Work | null;
  isOpen: boolean;
  onClose: () => void;
  categories?: AssetCategoryInfo[];
}

export function DetailPanel({ item, isOpen, onClose, categories }: DetailPanelProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!item || !isOpen) return null;

  const isWork = 'status' in item;
  const categoryName =
    'category' in item && categories ? categories.find(c => c.id === item.category)?.name : undefined;

  return (
    <>
      <div className="detail-overlay" onClick={onClose} />

      <div className={`detail-panel ${isOpen ? 'show' : ''}`} role="dialog" aria-modal="true" aria-label="详情">
      <div className="detail-header">
          <div className="detail-header-title">
        <h3>详情</h3>
            <div className="detail-header-subtitle" title={item.name}>{item.name}</div>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="关闭">×</button>
      </div>

      <div className="detail-content">
        <div className="detail-preview">
          <img 
            src={'preview' in item ? item.preview : item.cover} 
            alt={item.name} 
              loading="lazy"
          />
          </div>

          <div className="detail-info">
            <div className="detail-grid">
              <div className="detail-field">
                <div className="detail-label">名称</div>
                <div className="detail-value">{item.name}</div>
              </div>

              {categoryName && (
                <div className="detail-field">
                  <div className="detail-label">分类</div>
                  <div className="detail-value">{categoryName}</div>
            </div>
          )}

          {isWork && (
                <div className="detail-field">
                  <div className="detail-label">状态</div>
                  <div className="detail-value">
              <span className={`status-badge status-${(item as Work).status}`}>
                {getStatusLabel((item as Work).status)}
              </span>
                  </div>
                </div>
              )}

              <div className="detail-field">
                <div className="detail-label">更新时间</div>
                <div className="detail-value">{item.updateTime}</div>
              </div>
            </div>

            {'tags' in item && item.tags?.length > 0 && (
              <div className="detail-section">
                <div className="detail-label">标签</div>
                <div className="tags">
                  {item.tags.map((tag, idx) => (
                    <span key={`${tag}_${idx}`} className="tag">{tag}</span>
                  ))}
                </div>
            </div>
          )}
          </div>
        </div>

        <div className="detail-actions">
          <Button variant="primary">使用</Button>
          <div className="detail-actions-row">
          <Button variant="secondary">编辑</Button>
          <Button variant="secondary">下载</Button>
          </div>
          <Button variant="danger">删除</Button>
        </div>
      </div>
    </>
  );
}
