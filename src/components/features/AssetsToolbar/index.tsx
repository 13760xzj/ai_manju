import { Button } from "@/components/common";
import type { ViewMode } from "@/types";
import { classNames } from "@/utils";
import "./index.css";

export interface AssetsToolbarProps {
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

export function AssetsToolbar({
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
}: AssetsToolbarProps) {
  return (
    <div className="assets-toolbar">
      <div className="assets-toolbar__left">
        <h2 className="assets-toolbar__title">{title}</h2>
        {categories && onCategoryChange && (
          <div className="assets-toolbar__category-filter">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant="secondary"
                size="small"
                className={classNames(
                  "assets-toolbar__filter-btn",
                  selectedCategory === cat.id ? "is-active" : ""
                )}
                onClick={() => onCategoryChange(cat.id)}
              >
                {cat.name}
              </Button>
            ))}
          </div>
        )}
      </div>
      <div className="assets-toolbar__right">
        <input
          type="text"
          className="assets-toolbar__search-input"
          placeholder="搜索素材..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <div className="assets-toolbar__view-toggle">
          <Button
            variant={viewMode === "card" ? "primary" : "secondary"}
            size="small"
            className="assets-toolbar__toggle-btn"
            onClick={() => onViewModeChange("card")}
          >
            卡片
          </Button>
          <Button
            variant={viewMode === "list" ? "primary" : "secondary"}
            size="small"
            className="assets-toolbar__toggle-btn"
            onClick={() => onViewModeChange("list")}
          >
            列表
          </Button>
        </div>
        {showCreate && (
          <Button variant="primary" size="small">
            新建
          </Button>
        )}
        {showBatch && (
          <Button variant="secondary" size="small">
            批量操作
          </Button>
        )}
      </div>
    </div>
  );
}

