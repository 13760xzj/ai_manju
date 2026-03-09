import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import './index.css';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  size?: 'small' | 'medium' | 'large';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, size = 'medium', className = '', ...props },
  ref
) {
  const classes = [
    'input-wrapper',
    `input-${size}`,
    error ? 'input-error' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {label && <label className="input-label">{label}</label>}
      <input ref={ref} className="input-field" {...props} />
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
});
