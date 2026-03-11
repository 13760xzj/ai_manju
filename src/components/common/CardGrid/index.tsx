import type { ReactNode } from 'react';
import { EmptyState } from '@/components/common/StatusComponents';
import './index.css';

export type CardGridVariant = 'auto' | 'one' | 'two';

export interface CardGridProps {
  children?: ReactNode;
  className?: string;
  variant?: CardGridVariant;
  maxWidth?: number | string;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: ReactNode;
}

export function CardGrid({
  children,
  className = '',
  variant = 'auto',
  maxWidth,
  emptyTitle,
  emptyDescription,
  emptyAction,
}: CardGridProps) {
  const hasChildren = Array.isArray(children) ? children.length > 0 : Boolean(children);

  if (!hasChildren && emptyTitle) {
    return (
      <div className={['card-grid-wrap', className].filter(Boolean).join(' ')} style={maxWidth ? { maxWidth } : undefined}>
        <EmptyState title={emptyTitle} description={emptyDescription} action={emptyAction} />
      </div>
    );
  }

  return (
    <div className={['card-grid-wrap', className].filter(Boolean).join(' ')} style={maxWidth ? { maxWidth } : undefined}>
      <div className={['card-grid', `card-grid-${variant}`].join(' ')}>
        {children}
      </div>
    </div>
  );
}

