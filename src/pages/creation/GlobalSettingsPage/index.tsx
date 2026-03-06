import "./index.css";

export function GlobalSettingsPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [creationMode, setCreationMode] = useState("图生视频模式");
  const [storyboardMode, setStoryboardMode] = useState("自动生成单张分镜图");
  const [scriptType, setScriptType] = useState("剧情演绎");

  const handleSave = () => {
    toast.success("设置已保存!");
  };

  const handleNext = () => {
    navigate("/story-plot");
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
          <h3>基本设置</h3>
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
            <button className="btn btn-primary" onClick={handleSave}>
              保存设置
            </button>
            <button className="btn btn-primary" onClick={handleNext}>
              下一步
            </button>
          </div>
        </div>

        <div className="setting-group">
          <label>默认画面比例</label>
          <div className="options-group">
            {["16:9", "9:16", "4:3", "3:4", "1:1"].map((ratio) => (
              <button
                key={ratio}
                className={`option-btn ${
                  aspectRatio === ratio ? "active" : ""
                }`}
                onClick={() => setAspectRatio(ratio)}
              >
                {ratio}
              </button>
            ))}
          </div>
        </div>

        <div className="setting-group">
          <label>选择剧本类型</label>
          <div className="options-group">
            <button
              className={`option-btn ${
                scriptType === "剧情演绎" ? "active" : ""
              }`}
              onClick={() => setScriptType("剧情演绎")}
            >
              剧情演绎
            </button>
            <button
              className={`option-btn ${
                scriptType === "真人解说漫" ? "active" : ""
              }`}
              onClick={() => setScriptType("真人解说漫")}
            >
              真人解说漫
            </button>
          </div>
        </div>

        <div className="setting-group">
          <label>创作模式</label>
          <div className="options-group">
            <button
              className={`option-btn ${
                creationMode === "图生视频模式" ? "active" : ""
              }`}
              onClick={() => setCreationMode("图生视频模式")}
            >
              图生视频模式
            </button>
            <button
              className={`option-btn ${
                creationMode === "多参生视频模式" ? "active" : ""
              }`}
              onClick={() => setCreationMode("多参生视频模式")}
            >
              多参生视频模式
            </button>
          </div>
        </div>

        <div className="setting-group">
          <label>选择分镜图生成模式</label>
          <div className="options-group">
            {["自动生成单张分镜图", "自动生成九宫格机位分镜图"].map((mode) => (
              <button
                key={mode}
                className={`option-btn ${
                  storyboardMode === mode ? "active" : ""
                }`}
                onClick={() => setStoryboardMode(mode)}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div className="setting-group">
          <label>选择画面风格</label>
          <div style={{ marginTop: "10px" }}>
            <h4
              style={{
                fontSize: "14px",
                fontWeight: 500,
                marginBottom: "10px",
              }}
            >
              已选风格
            </h4>
            <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "100px",
                    height: "120px",
                    backgroundColor: "#f0f4ff",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px",
                  }}
                >
                  <img
                    src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=anime%20style%20character%20in%20city%20background&image_size=square"
                    alt="2D 死亡之神"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                  <div
                    style={{
                      marginTop: "8px",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                  >
                    2D 死亡之神
                  </div>
                </div>
              </div>
            </div>
            <h4
              style={{
                fontSize: "14px",
                fontWeight: 500,
                marginBottom: "10px",
              }}
            >
              我的风格库
            </h4>
            <div style={{ display: "flex", gap: "15px" }}>
              <div
                style={{
                  width: "100px",
                  height: "120px",
                  border: "2px dashed #e0e0e0",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  style={{
                    fontSize: "32px",
                    color: "#4a6cf7",
                    marginBottom: "8px",
                  }}
                >
                  +
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    textAlign: "center",
                    color: "#666",
                  }}
                >
                  添加风格
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "100px",
                    height: "120px",
                    backgroundColor: "#f0f4ff",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px",
                  }}
                >
                  <img
                    src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=anime%20style%20character%20portrait&image_size=square"
                    alt="2D 精品漫"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                  <div
                    style={{
                      marginTop: "8px",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                  >
                    2D 精品漫
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
