import './index.css';

export interface CountBadgeProps {
  count: number;
  label?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'small' | 'medium' | 'large';
}

export function CountBadge({ 
  count, 
  label,
  variant = 'default',
  size = 'medium'
}: CountBadgeProps) {
  return (
    <div className={`count-badge count-badge-${size} count-badge-${variant}`}>
      <span className="count-badge-count">{count}</span>
      {label && <span className="count-badge-label">{label}</span>}
    </div>
  );
}

export interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'small' | 'medium';
  onClose?: () => void;
}

export function Tag({ 
  children, 
  variant = 'default',
  size = 'medium',
  onClose 
}: TagProps) {
  return (
    <div className={`tag tag-${size} tag-${variant}`}>
      <span className="tag-text">{children}</span>
      {onClose && (
        <button className="tag-close" onClick={onClose}>
          ×
        </button>
      )}
    </div>
  );
}

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ 
  icon = '📭',
  title,
  description,
  action
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <div className="empty-state-title">{title}</div>
      {description && (
        <div className="empty-state-description">{description}</div>
      )}
      {action && (
        <div className="empty-state-action">{action}</div>
      )}
    </div>
  );
}

export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'image';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

export function Skeleton({ 
  variant = 'text',
  width,
  height,
  lines = 1
}: SkeletonProps) {
  if (variant === 'text' || variant === 'circular') {
    return (
      <div 
        className={`skeleton skeleton-${variant}`}
        style={{ 
          width: width || (variant === 'circular' ? '40px' : '100%'),
          height: height || (variant === 'circular' ? '40px' : '1em')
        }}
      />
    );
  }
  
  if (variant === 'image' || variant === 'rectangular') {
    return (
      <div 
        className="skeleton skeleton-rectangular"
        style={{ 
          width: width || '100%',
          height: height || '200px'
        }}
      />
    );
  }
  
  return (
    <div className="skeleton-lines">
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i} 
          className="skeleton skeleton-line"
          style={{ width: i === lines - 1 ? '60%' : '100%' }}
        />
      ))}
    </div>
  );
}
