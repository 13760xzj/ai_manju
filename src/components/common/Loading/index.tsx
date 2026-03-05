import './Loading.css';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  fullScreen?: boolean;
}

export function Loading({ size = 'medium', text, fullScreen = false }: LoadingProps) {
  if (fullScreen) {
    return (
      <div className="loading-fullscreen">
        <div className={`loading-spinner loading-${size}`}>
          <div className="spinner"></div>
        </div>
        {text && <p className="loading-text">{text}</p>}
      </div>
    );
  }

  return (
    <div className={`loading-container loading-${size}`}>
      <div className="spinner"></div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
}
