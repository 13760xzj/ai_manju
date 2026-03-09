import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/useToast";
import { Button, ConfirmDialog } from "@/components/common";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./index.css";

interface DubbingItem {
  id: number;
  title: string;
  subtitle: string;
}

function SortableListCard({
  item,
  onEditScript,
  onEditVideo,
  onEditDubbing,
  onCopy,
  onDelete,
}: {
  item: DubbingItem;
  onEditScript: () => void;
  onEditVideo: () => void;
  onEditDubbing: () => void;
  onCopy: () => void;
  onDelete: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="dubbing-card"
      {...attributes}
    >
      <div
        className="drag-handle absolute left-2 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing z-20 p-2 rounded hover:bg-gray-200"
        {...listeners}
        style={{ opacity: isDragging ? 1 : 0.5 }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="text-gray-500"
        >
          <circle cx="4" cy="4" r="2" />
          <circle cx="4" cy="8" r="2" />
          <circle cx="4" cy="12" r="2" />
          <circle cx="12" cy="4" r="2" />
          <circle cx="12" cy="8" r="2" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      </div>
      <div className="dubbing-header pl-10!">
        <div className="dubbing-title">{item.title}</div>
        <div className="dubbing-actions">
          <Button variant="secondary" size="mini" onClick={onEditScript}>
            分镜脚本
          </Button>
          <Button variant="secondary" size="mini" onClick={onEditVideo}>
            分镜视频
          </Button>
          <Button variant="primary" size="mini" onClick={onEditDubbing}>
            编辑分镜配音
          </Button>
          <Button variant="secondary" size="mini" onClick={onCopy}>
            复制分镜
          </Button>
          <Button variant="danger" size="mini" onClick={onDelete}>
            删除分镜
          </Button>
        </div>
      </div>
      <div className="dubbing-grid">
        <div className="dubbing-image-section">
          <div className="dubbing-image-label">配音对口型：</div>
          <div className="dubbing-image-box"></div>
        </div>
        <div className="dubbing-content">
          <div className="dubbing-section">
            <div className="dubbing-label">台词：</div>
            <div className="dubbing-text empty">
              本段视频没有台词哦，点击右侧编辑按钮，可以添加台词哦～
            </div>
          </div>
          <div className="dubbing-section">
            <div className="dubbing-label">配音：</div>
            <div className="voice-settings">
              <div className="voice-setting-item">
                <span className="voice-setting-label">类型：</span>
                <span className="voice-setting-value">旁白/画外音</span>
              </div>
              <div className="voice-setting-item">
                <span className="voice-setting-label">发言角色：</span>
                <span className="voice-setting-value">未选择</span>
              </div>
              <Button variant="primary" size="mini">
                试听
              </Button>
              <Button variant="secondary" size="mini">
                未配置
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SortableCardView({
  item,
  index,
  onEdit,
  onCopy,
  onDelete,
}: {
  item: DubbingItem;
  index: number;
  onEdit: () => void;
  onCopy: () => void;
  onDelete: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 0,
  };

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = () => {
    setActiveDropdown(activeDropdown === `dropdown-${index}` ? null : `dropdown-${index}`);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="dubbing-card-compact"
      {...attributes}
    >
      <div
        className="drag-handle absolute -left-8 top-0 cursor-grab active:cursor-grabbing z-20 p-2 rounded h-full flex items-center hover:bg-gray-200"
        {...listeners}
        style={{ opacity: isDragging ? 1 : 0.5 }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="text-gray-500"
        >
          <circle cx="4" cy="4" r="2" />
          <circle cx="4" cy="8" r="2" />
          <circle cx="4" cy="12" r="2" />
          <circle cx="12" cy="4" r="2" />
          <circle cx="12" cy="8" r="2" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      </div>
      <div className="dubbing-card-header">
        <div className="dubbing-card-title">{item.title}</div>
        <button
          className="dubbing-card-menu-btn"
          onClick={(e) => {
            e.stopPropagation();
            toggleDropdown();
          }}
        >
          ⋮
        </button>
        {activeDropdown === `dropdown-${index}` && (
          <div className="dubbing-card-dropdown show">
            <button className="dubbing-card-dropdown-item" onClick={onEdit}>
              <span>编辑分镜配音</span>
            </button>
            <button className="dubbing-card-dropdown-item" onClick={onCopy}>
              <span>复制分镜</span>
            </button>
            <div className="dubbing-card-dropdown-divider"></div>
            <button className="dubbing-card-dropdown-item danger" onClick={onDelete}>
              <span>删除分镜</span>
            </button>
          </div>
        )}
      </div>
      <div className="dubbing-card-image-box"></div>
      <div className="dubbing-card-content">
        <div className="dubbing-card-label">台词：</div>
        <div className="dubbing-card-text">本段视频没有台词哦～</div>
      </div>
      <div className="dubbing-card-voice-settings">
        <div className="dubbing-card-voice-item">
          <span>类型：</span>
          <span className="dubbing-card-voice-value">
            旁白/画外音
          </span>
        </div>
        <div className="dubbing-card-voice-item">
          <span>角色：</span>
          <span className="dubbing-card-voice-value">未选择</span>
        </div>
      </div>
      <div className="dubbing-card-footer">
        <div className="dubbing-card-info">未配置</div>
        <div className="dubbing-card-actions">
          <Button variant="primary" size="mini">
            试听
          </Button>
        </div>
      </div>
    </div>
  );
}

export function DubbingPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [viewMode, setViewMode] = useState<"list" | "card">("list");
  const [progressCount] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [listItems, setListItems] = useState<DubbingItem[]>([
    { id: 1, title: "分镜配音 1：分镜 1-1", subtitle: "分镜 1-1" },
    { id: 2, title: "分镜配音 2：分镜 1-2", subtitle: "分镜 1-2" },
    { id: 3, title: "分镜配音 3：分镜 1-3", subtitle: "分镜 1-3" },
  ]);
  const [cardItems, setCardItems] = useState<DubbingItem[]>([
    { id: 1, title: "分镜配音 1：分镜 1-1", subtitle: "分镜 1-1" },
    { id: 2, title: "分镜配音 2：分镜 1-2", subtitle: "分镜 1-2" },
    { id: 3, title: "分镜配音 3：分镜 1-3", subtitle: "分镜 1-3" },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleNext = () => {
    navigate("/video-preview");
  };

  const handleRegenerate = () => {
    setShowConfirmDialog(true);
  };

  const confirmRegenerate = () => {
    toast.info("正在重新生成配音...");
  };

  const handleEditScript = () => {
    toast.info("分镜脚本");
    setActiveDropdown(null);
  };

  const handleEditVideo = () => {
    toast.info("分镜视频");
    setActiveDropdown(null);
  };

  const handleEditDubbing = () => {
    toast.info("编辑分镜配音");
    setActiveDropdown(null);
  };

  const handleCopy = () => {
    toast.info("复制分镜");
    setActiveDropdown(null);
  };

  const handleDelete = () => {
    toast.info("删除分镜");
    setActiveDropdown(null);
  };

  const handleListDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setListItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleCardDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setCardItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="dubbing-page" onClick={() => setActiveDropdown(null)}>
      <div className="page-toolbar ui-toolbar">
        <div className="toolbar-left">
          <div className="toggle-group">
            <Button
              variant={viewMode === "list" ? "primary" : "secondary"}
              size="small"
              className={
                viewMode === "list" ? "toggle-btn text-white!" : "toggle-btn"
              }
              onClick={(e) => {
                e.stopPropagation();
                setViewMode("list");
              }}
            >
              列表
            </Button>
            <Button
              variant={viewMode === "card" ? "primary" : "secondary"}
              size="small"
              className={
                viewMode === "card" ? "toggle-btn text-white!" : "toggle-btn"
              }
              onClick={(e) => {
                e.stopPropagation();
                setViewMode("card");
              }}
            >
              卡片
            </Button>
          </div>
          <div className="progress-info">
            配音完成进度：<span>{progressCount}</span>/16
          </div>
        </div>
        <div className="toolbar-right">
          <Button variant="secondary" size="small" onClick={handleRegenerate}>
            重新生成配音
          </Button>
          <Button variant="primary" size="small" onClick={handleNext}>
            下一步
          </Button>
        </div>
      </div>

      {viewMode === "list" && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleListDragEnd}
        >
          <div className="list-view-container">
            <SortableContext
              items={listItems.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              {listItems.map((item) => (
                <SortableListCard
                  key={item.id}
                  item={item}
                  onEditScript={handleEditScript}
                  onEditVideo={handleEditVideo}
                  onEditDubbing={handleEditDubbing}
                  onCopy={handleCopy}
                  onDelete={handleDelete}
                />
              ))}
            </SortableContext>
          </div>
        </DndContext>
      )}

      {viewMode === "card" && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleCardDragEnd}
        >
          <div className="card-view-container active">
            <div className="card-grid">
              <SortableContext
                items={cardItems.map((item) => item.id)}
                strategy={horizontalListSortingStrategy}
              >
                {cardItems.map((item, index) => (
                  <SortableCardView
                    key={item.id}
                    item={item}
                    index={index}
                    onEdit={handleEditDubbing}
                    onCopy={handleCopy}
                    onDelete={handleDelete}
                  />
                ))}
              </SortableContext>
            </div>
          </div>
        </DndContext>
      )}

      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={confirmRegenerate}
        title="确认操作"
        message="确定要重新生成配音吗？当前内容将会被覆盖。"
        confirmText="确定"
        cancelText="取消"
        variant="warning"
      />
    </div>
  );
}
