import { MarkdownPreview } from "@/components/common";
import { markdownContent } from "@/mocks";
import "./index.css";

export function WorksPage() {
  const toast = useToast();
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [workTitles, setWorkTitles] = useState<{ [key: number]: string }>({
    1: "作品1",
    2: "作品2",
    3: "作品3",
    4: "作品4",
    5: "作品5",
    6: "作品6",
    7: "作品7",
    8: "作品8",
  });

  const [isOpenMarkdown, setIsOpenMarkdown] = useState(false);

  const toggleDropdown = (id: number) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  const handleRename = (id: number) => {
    setEditingId(id);
    setActiveDropdown(null);
  };

  const handleSaveRename = (id: number, newTitle: string) => {
    setWorkTitles({ ...workTitles, [id]: newTitle });
    setEditingId(null);
    toast.success("重命名成功!");
  };

  const handleDelete = (id: number) => {
    toast.info(`删除作品: ${workTitles[id]}`);
    setActiveDropdown(null);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    id: number,
    newTitle: string,
  ) => {
    if (e.key === "Enter") {
      handleSaveRename(id, newTitle);
    } else if (e.key === "Escape") {
      setEditingId(null);
    }
  };

  return (
    <>
      <div className="works-page" onClick={closeDropdown}>
        <div className="works-header">
          <h2>我的作品</h2>
        </div>

        <div className="works-grid">
          <div
            className="create-card"
            onClick={() => window.open("/global-settings", "_blank")}
            style={{ cursor: "pointer" }}
          >
            <div className="create-btn-large">+</div>
            <div className="create-text">创建新视频</div>
          </div>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div
              key={item}
              className="work-card"
              onClick={() => setIsOpenMarkdown(true)}
            >
              <div className="work-thumbnail">
                <div className="work-preview"></div>
              </div>
              <div className="work-info">
                {editingId === item ? (
                  <input
                    type="text"
                    className="work-title-input"
                    value={workTitles[item]}
                    onChange={(e) =>
                      setWorkTitles({ ...workTitles, [item]: e.target.value })
                    }
                    onBlur={() => handleSaveRename(item, workTitles[item])}
                    onKeyDown={(e) => handleKeyDown(e, item, workTitles[item])}
                    autoFocus
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <div className="work-title">{workTitles[item]}</div>
                )}
                <div className="work-date">2024-02-28 15:30</div>
              </div>
              <div className="work-menu">
                <button
                  className="work-menu-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown(item);
                  }}
                >
                  ⋮
                </button>
                {activeDropdown === item && (
                  <div className="work-dropdown">
                    <button
                      className="work-dropdown-item"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRename(item);
                      }}
                    >
                      ✏️ 重命名
                    </button>
                    <button
                      className="work-dropdown-item danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item);
                      }}
                    >
                      🗑️ 删除
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <MarkdownPreview
        visible={isOpenMarkdown}
        title="我的第一动漫.md"
        onCancel={() => setIsOpenMarkdown(false)}
        content={markdownContent}
      />
    </>
  );
}
