import type { ViewMode } from "@/types";
import { classNames } from "@/utils";
import "./index.css";

export interface ToolbarProps {
  title: string;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categories?: Array<{ id: string; name: string }>;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  showCreate?: boolean;
  showBatch?: boolean;
}

export function Toolbar({
  title,
  viewMode,
  onViewModeChange,
  searchQuery,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
  showCreate = true,
  showBatch = true,
}: ToolbarProps) {
  return (
    <div className="assets-toolbar">
      <div className="toolbar-left">
        <h2 className="section-title shrink-0">{title}</h2>
        {categories && onCategoryChange && (
          <div className="category-filter">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={classNames(
                  "filter-btn",
                  selectedCategory === cat.id ? "active" : "",
                )}
                onClick={() => onCategoryChange(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="toolbar-right">
        <input
          type="text"
          className="search-input"
          placeholder="搜索素材..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <div className="view-toggle">
          <button
            className={classNames(
              "toggle-btn",
              viewMode === "card" ? "active" : "",
            )}
            onClick={() => onViewModeChange("card")}
          >
            卡片
          </button>
          <button
            className={classNames(
              "toggle-btn",
              viewMode === "list" ? "active" : "",
            )}
            onClick={() => onViewModeChange("list")}
          >
            列表
          </button>
        </div>
        {showCreate && (
          <HButton variant="primary" size="small">
            新建
          </HButton>
        )}
        {showBatch && (
          <HButton variant="secondary" size="small">
            批量操作
          </HButton>
        )}
      </div>
    </div>
  );
}
