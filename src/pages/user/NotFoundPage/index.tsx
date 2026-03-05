import { useNavigate } from 'react-router-dom';
import './NotFoundPage.css';

export function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-icon">404</div>
        <h1 className="not-found-title">页面未找到</h1>
        <p className="not-found-message">
          抱歉，您访问的页面不存在或已被移除。
        </p>
        <div className="not-found-actions">
          <button className="not-found-btn primary" onClick={handleGoHome}>
            返回首页
          </button>
          <button className="not-found-btn" onClick={handleGoBack}>
            返回上一页
          </button>
        </div>
      </div>
    </div>
  );
}
