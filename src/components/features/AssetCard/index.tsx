import type { Asset } from '@/types';
import { classNames } from '@/utils';
import './index.css';

export interface AssetCardProps {
  asset: Asset;
  viewMode: 'card' | 'list';
  onClick: (asset: Asset) => void;
}

export function AssetCard({ asset, viewMode, onClick }: AssetCardProps) {
  return (
    <div
      className={classNames('asset-card', viewMode === 'list' ? 'list-item' : '')}
      onClick={() => onClick(asset)}
    >
      <div className="asset-preview">
        <img src={asset.preview} alt={asset.name} />
      </div>
      <div className="asset-info">
        <div className="asset-name">{asset.name}</div>
        <div className="asset-tags">
          {asset.tags.map((tag, idx) => (
            <span key={idx} className="tag">{tag}</span>
          ))}
        </div>
        <div className="asset-meta">
          <span className="update-time">{asset.updateTime}</span>
        </div>
      </div>
    </div>
  );
}
