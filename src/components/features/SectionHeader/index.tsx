import type { ReactNode } from 'react';
import { Button } from '@/components/common';
import './index.css';

export interface SectionHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  onAdd?: () => void;
  addButtonText?: string;
}

export function SectionHeader({
  title,
  description,
  actions,
  onAdd,
  addButtonText = '添加'
}: SectionHeaderProps) {
  return (
    <div className="section-header">
      <div className="section-header-left">
        <div className="section-title">{title}</div>
        {description && <div className="section-description">{description}</div>}
      </div>
      <div className="section-header-right">
        {actions}
        {onAdd && (
          <Button variant="dashed" size="small" onClick={onAdd}>
            + {addButtonText}
          </Button>
        )}
      </div>
    </div>
  );
}
