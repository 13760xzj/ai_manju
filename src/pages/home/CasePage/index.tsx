import "./index.css";

export function CasePage() {
  return (
    <div className="case-page">
      <div className="hero-section">
        <h2>三倍速出片，电影级质感</h2>
        <HButton
          variant="primary"
          size="large"
          className="create-btn"
          onClick={() => window.open("/global-settings", "_blank")}
        >
          我要创作 →
        </HButton>
        <div className="hero-image">
          <div className="all-in-one">ALL-IN-ONE</div>
        </div>
      </div>
      <div className="user-works">
        <h3>用户作品</h3>
        <div className="works-grid">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="work-card">
              <div className="work-thumbnail">
                <div className="play-btn">▶</div>
              </div>
              <div className="work-title">作品{item}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
