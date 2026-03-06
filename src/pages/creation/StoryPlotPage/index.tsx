import "./index.css";

export function StoryPlotPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [storyTitle, setStoryTitle] = useState("");
  const [storyContent, setStoryContent] = useState("");

  const handleSave = () => {
    toast.success("故事已保存!");
  };

  const handleNext = () => {
    navigate("/scene-character-props");
  };

  return (
    <div className="settings-page">
      <div className="setting-card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              className="btn btn-secondary"
              onClick={() => toast.info("撤销功能")}
            >
              ↩ 撤销
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => toast.info("重做功能")}
            >
              ↪ 重做
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => toast.info("复制功能")}
            >
              📋 复制
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setStoryContent("");
                toast.success("内容已清空");
              }}
            >
              🗑 清空
            </button>
          </div>
          <div
            className="action-buttons"
            style={{
              marginTop: 0,
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              flexShrink: 0,
            }}
          >
            <button
              className="btn btn-primary"
              onClick={() => toast.info("导入剧本功能")}
            >
              导入剧本
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              保存
            </button>
            <button className="btn btn-primary" onClick={handleNext}>
              下一步
            </button>
          </div>
        </div>

        <div className="setting-group label">
          <label>故事标题</label>
          <input
            type="text"
            className="text-input"
            placeholder="请输入故事标题"
            value={storyTitle}
            onChange={(e) => setStoryTitle(e.target.value)}
          />
        </div>

        <div className="setting-group content">
          <label>单集故事剧本</label>
          <textarea
            className="text-input"
            placeholder="请输入单集故事剧本内容..."
            value={storyContent}
            onChange={(e) => setStoryContent(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
