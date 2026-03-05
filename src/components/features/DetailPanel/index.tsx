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
  if (!item || !isOpen) return null;

  const isWork = 'status' in item;

  return (
    <div className={`detail-panel ${isOpen ? 'show' : ''}`}>
      <div className="detail-header">
        <h3>详情</h3>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      <div className="detail-content">
        <div className="detail-preview">
          <img 
            src={'preview' in item ? item.preview : item.cover} 
            alt={item.name} 
          />
        </div>
        <div className="detail-info">
          <div className="detail-row">
            <label>名称：</label>
            <span>{item.name}</span>
          </div>
          {'category' in item && categories && (
            <div className="detail-row">
              <label>分类：</label>
              <span>{categories.find(c => c.id === item.category)?.name}</span>
            </div>
          )}
          {'tags' in item && (
            <div className="detail-row">
              <label>标签：</label>
              <div className="tags">
                {item.tags.map((tag, idx) => (
                  <span key={idx} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          )}
          {isWork && (
            <div className="detail-row">
              <label>状态：</label>
              <span className={`status-badge status-${(item as Work).status}`}>
                {getStatusLabel((item as Work).status)}
              </span>
            </div>
          )}
          <div className="detail-row">
            <label>更新时间：</label>
            <span>{item.updateTime}</span>
          </div>
        </div>
        <div className="detail-actions">
          <Button variant="primary">使用</Button>
          <Button variant="secondary">编辑</Button>
          <Button variant="secondary">下载</Button>
          <Button variant="danger">删除</Button>
        </div>
      </div>
    </div>
  );
}
