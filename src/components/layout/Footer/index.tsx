import './index.css';

export interface FooterProps {
  userId?: string | number;
  status?: string;
}

export function Footer({ userId = '1515', status = '在线' }: FooterProps) {
  return (
    <footer className="footer">
      <div className="status-info">
        <span>ID: {userId}</span>
        <span>{status}</span>
      </div>
    </footer>
  );
}
