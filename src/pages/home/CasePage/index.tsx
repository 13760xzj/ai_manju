import { Button } from "@/components/common";
import { StoryboardScript } from "@/components/features";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./index.css";

export function CasePage() {
  const navigate = useNavigate();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div className="case-page">
      <div className="hero-section">
        <div className="hero-content">
          <h2>三倍速出片，电影级质感</h2>
          <Button
            variant="primary"
            size="large"
            className="create-btn"
            onClick={() =>
              navigate("/create-work", { state: { backgroundPath: "/case" } })
            }
          >
            我要创作 →
          </Button>
        </div>
        <div className="hero-banner">
          <div className="banner-card card-1">
            <div className="card-content">AI 生成</div>
          </div>
          <div
            className="banner-card card-2"
            onClick={() => setIsPreviewOpen(true)}
          >
            <div className="card-content">智能剪辑</div>
          </div>
          <div className="banner-card card-3">
            <div className="card-content">一键成片</div>
          </div>
        </div>
      </div>

      <div className="user-works">
        <h3>用户作品</h3>
        <div className="card-rail">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="rail-card">
              <div className="rail-thumbnail">
                <div className="play-btn">▶</div>
              </div>
              <div className="rail-title">作品{item}</div>
            </div>
          ))}
        </div>
      </div>

      {/* <MarkdownPreview
        visible={isPreviewOpen}
        title="我的第一动漫.md"
        onCancel={() => setIsPreviewOpen(false)}
        content={markdownContent}
      /> */}

      <StoryboardScript
        visible={isPreviewOpen}
        onCancel={() => setIsPreviewOpen(false)}
      />
    </div>
  );
}
