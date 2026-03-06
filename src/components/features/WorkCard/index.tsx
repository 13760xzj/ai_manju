import type { Work } from "@/types";
import { classNames, getStatusLabel } from "@/utils";
import "./index.css";

export interface WorkCardProps {
  work: Work;
  viewMode: "card" | "list";
  onClick: (work: Work) => void;
}

export function WorkCard({ work, viewMode, onClick }: WorkCardProps) {
  return (
    <div
      className={classNames(
        "work-card",
        viewMode === "list" ? "list-item" : "",
      )}
      onClick={() => onClick(work)}
    >
      <div className="work-cover">
        <img src={work.cover} alt={work.name} />
        <div
          className={classNames(
            "status-badge",
            "status-badge-position",
            `status-${work.status}`,
          )}
        >
          {getStatusLabel(work.status)}
        </div>
      </div>
      <div className="work-info">
        <div className="work-name">{work.name}</div>
        <div className="work-meta">
          <span className="update-time">{work.updateTime}</span>
        </div>
      </div>
    </div>
  );
}
