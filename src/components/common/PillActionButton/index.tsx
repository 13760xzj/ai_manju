import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './index.css';

export interface PillActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  children: ReactNode;
}

export function PillActionButton({ icon, children, className = '', type = 'button', ...props }: PillActionButtonProps) {
  return (
    <button
      type={type}
      className={['pill-action-btn', className].filter(Boolean).join(' ')}
      {...props}
    >
      {icon ? <span className="pill-action-icon" aria-hidden="true">{icon}</span> : null}
      <span className="pill-action-text">{children}</span>
    </button>
  );
}

