import "./index.css";

export function SceneCharacterPropsPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<"scene" | "character" | "props">(
    "scene",
  );
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  const handleDelete = (type: string, name: string) => {
    toast.info(`删除${type}: ${name}`);
    setActiveDropdown(null);
  };

  const handleDownload = (type: string, name: string) => {
    toast.success(`下载${type}: ${name}`);
    setActiveDropdown(null);
  };

  const handleNext = () => {
    if (activeTab === "scene") {
      setActiveTab("character");
    } else if (activeTab === "character") {
      setActiveTab("props");
    } else {
      navigate("/storyboard");
    }
  };

  const getRegenerateButtonText = () => {
    if (activeTab === "character") return "重新生成角色图";
    if (activeTab === "props") return "重新生成道具图";
    return "重新生成场景图";
  };

  return (
    <div className="settings-page">
      <div className="tabs">
        <div className="tabs-center">
          <button
            className={`tab ${activeTab === "scene" ? "active" : ""}`}
            onClick={() => setActiveTab("scene")}
          >
            场景
          </button>
          <button
            className={`tab ${activeTab === "character" ? "active" : ""}`}
            onClick={() => setActiveTab("character")}
          >
            角色
          </button>
          <button
            className={`tab ${activeTab === "props" ? "active" : ""}`}
            onClick={() => setActiveTab("props")}
          >
            道具
          </button>
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginLeft: "auto",
            marginRight: "10px",
          }}
        >
          <button className="btn-small btn-success-small">
            {getRegenerateButtonText()}
          </button>
          <button className="btn-small btn-primary-small" onClick={handleNext}>
            下一步
          </button>
        </div>
      </div>

      {activeTab === "scene" && (
        <div className="tab-content" onClick={closeDropdown}>
          <div className="scene-card">
            <div className="scene-header">
              <div className="scene-title">场景 1:</div>
              <div className="scene-actions">
                <button className="btn-mini btn-gray">修改场景设定</button>
                <button className="btn-mini btn-gray">复制场景</button>
                <button className="btn-mini btn-red">删除场景</button>
              </div>
            </div>
            <div className="view-grid">
              {["正面视角", "反面视角", "左侧面视角", "右侧面视角"].map(
                (view) => (
                  <div key={view} className="view-card">
                    <div className="view-card-header">
                      <div className="view-title">{view}</div>
                      <div className="view-card-menu">
                        <button
                          className="view-card-menu-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDropdown(`scene-${view}`);
                          }}
                        >
                          ⋮
                        </button>
                        {activeDropdown === `scene-${view}` && (
                          <div className="view-card-dropdown">
                            <button
                              className="view-card-dropdown-item"
                              onClick={() => handleDownload("场景图", view)}
                            >
                              📥 下载
                            </button>
                            <button
                              className="view-card-dropdown-item danger"
                              onClick={() => handleDelete("场景图", view)}
                            >
                              🗑️ 删除
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="view-image">
                      <span>暂无图片</span>
                    </div>
                    <div className="view-actions">
                      <button className="view-action-btn">预览</button>
                      <button className="view-action-btn">替换</button>
                      <button className="view-action-btn">下载</button>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          <button className="add-scene-btn">
            <span>+</span>
            <span>添加场景</span>
          </button>
        </div>
      )}

      {activeTab === "character" && (
        <div className="tab-content" onClick={closeDropdown}>
          {[1, 2].map((charNum) => (
            <div key={charNum} className="scene-card">
              <div className="scene-header">
                <div className="scene-title">角色 {charNum}:</div>
                <div className="scene-actions">
                  <button className="btn-mini btn-gray">修改角色设定</button>
                  <button className="btn-mini btn-red">删除角色</button>
                </div>
              </div>

              {[1, 2].map((formNum) => (
                <div
                  key={formNum}
                  style={{
                    marginBottom: "20px",
                    paddingBottom: formNum === 1 ? "20px" : "0",
                    borderBottom: formNum === 1 ? "1px solid #f0f0f0" : "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "15px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#333",
                      }}
                    >
                      形态 {formNum}
                    </div>
                    <div className="scene-actions">
                      <button className="btn-mini btn-gray">编辑形态图</button>
                      <button className="btn-mini btn-gray">复制形态</button>
                      <button className="btn-mini btn-red">删除形态</button>
                    </div>
                  </div>
                  <div
                    className="view-grid"
                    style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
                  >
                    {["三视图", "全身照"].map((view) => (
                      <div key={view} className="view-card">
                        <div className="view-card-header">
                          <div className="view-title">{view}</div>
                          <div className="view-card-menu">
                            <button
                              className="view-card-menu-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleDropdown(
                                  `char-${charNum}-${formNum}-${view}`,
                                );
                              }}
                            >
                              ⋮
                            </button>
                            {activeDropdown ===
                              `char-${charNum}-${formNum}-${view}` && (
                              <div className="view-card-dropdown">
                                <button
                                  className="view-card-dropdown-item"
                                  onClick={() =>
                                    handleDownload(
                                      "角色图",
                                      `角色${charNum}-形态${formNum}-${view}`,
                                    )
                                  }
                                >
                                  📥 下载
                                </button>
                                <button
                                  className="view-card-dropdown-item danger"
                                  onClick={() =>
                                    handleDelete(
                                      "角色图",
                                      `角色${charNum}-形态${formNum}-${view}`,
                                    )
                                  }
                                >
                                  🗑️ 删除
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="view-image">
                          <span>暂无图片</span>
                        </div>
                        <div className="view-actions">
                          <button className="view-action-btn">预览</button>
                          <button className="view-action-btn">替换</button>
                          <button className="view-action-btn">下载</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <button className="add-scene-btn" style={{ marginTop: "15px" }}>
                <span>+</span>
                <span>添加形态</span>
              </button>
            </div>
          ))}

          <button className="add-scene-btn">
            <span>+</span>
            <span>添加角色</span>
          </button>
        </div>
      )}

      {activeTab === "props" && (
        <div className="tab-content" onClick={closeDropdown}>
          {[1, 2].map((propNum) => (
            <div key={propNum} className="scene-card">
              <div className="scene-header">
                <div className="scene-title">道具 {propNum}:</div>
                <div className="scene-actions">
                  <button className="btn-mini btn-gray">修改道具设定</button>
                  <button className="btn-mini btn-red">删除道具</button>
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "15px",
                  }}
                >
                  <div
                    style={{ fontSize: "14px", fontWeight: 600, color: "#333" }}
                  >
                    形态 1
                  </div>
                  <div className="scene-actions">
                    <button className="btn-mini btn-gray">编辑形态图</button>
                    <button className="btn-mini btn-gray">复制形态</button>
                    <button className="btn-mini btn-red">删除形态</button>
                  </div>
                </div>
                <div
                  className="view-grid"
                  style={{
                    gridTemplateColumns: "repeat(1, 1fr)",
                    maxWidth: "300px",
                  }}
                >
                  <div className="view-card">
                    <div className="view-card-header">
                      <div className="view-title">道具图</div>
                      <div className="view-card-menu">
                        <button
                          className="view-card-menu-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDropdown(`prop-${propNum}`);
                          }}
                        >
                          ⋮
                        </button>
                        {activeDropdown === `prop-${propNum}` && (
                          <div className="view-card-dropdown">
                            <button
                              className="view-card-dropdown-item"
                              onClick={() =>
                                handleDownload("道具图", `道具${propNum}`)
                              }
                            >
                              📥 下载
                            </button>
                            <button
                              className="view-card-dropdown-item danger"
                              onClick={() =>
                                handleDelete("道具图", `道具${propNum}`)
                              }
                            >
                              🗑️ 删除
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="view-image">
                      <span>暂无图片</span>
                    </div>
                    <div className="view-actions">
                      <button className="view-action-btn">预览</button>
                      <button className="view-action-btn">替换</button>
                      <button className="view-action-btn">下载</button>
                    </div>
                  </div>
                </div>
              </div>

              <button className="add-scene-btn" style={{ marginTop: "15px" }}>
                <span>+</span>
                <span>添加形态</span>
              </button>
            </div>
          ))}

          <button className="add-scene-btn">
            <span>+</span>
            <span>添加道具</span>
          </button>
        </div>
      )}
    </div>
  );
}
