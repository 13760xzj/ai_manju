import './index.css';

export interface MetaRowProps {
  count?: number;
  label?: string;
  children?: React.ReactNode;
}

export function MetaRow({ count, label, children }: MetaRowProps) {
  return (
    <div className="meta-row">
      <div className="meta-info">
        {count !== undefined && (
          <span className="meta-count">{count}项</span>
        )}
        {label && <span className="meta-label">{label}</span>}
      </div>
      {children && <div className="meta-actions">{children}</div>}
    </div>
  );
}
