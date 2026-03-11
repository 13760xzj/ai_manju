import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './index.css';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  ariaLabel: string;
}

export function IconButton({ children, ariaLabel, className = '', type = 'button', ...props }: IconButtonProps) {
  return (
    <button
      type={type}
      className={['icon-btn', className].filter(Boolean).join(' ')}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
}

