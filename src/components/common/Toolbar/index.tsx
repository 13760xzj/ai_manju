import type { ReactNode } from 'react';
import './index.css';

export interface ToolbarProps {
  left?: ReactNode;
  right?: ReactNode;
  className?: string;
  compact?: boolean;
}

export function Toolbar({ left, right, className = '', compact = false }: ToolbarProps) {
  return (
    <div
      className={['ui-toolbar', compact ? 'ui-toolbar--compact' : '', className]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="ui-toolbar__left">{left}</div>
      <div className="ui-toolbar__right">{right}</div>
    </div>
  );
}

