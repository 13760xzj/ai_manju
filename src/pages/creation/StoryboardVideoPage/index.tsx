import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/useToast";
import { Button, ConfirmDialog } from "@/components/common";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Divider, Tooltip } from "antd";
import { MdDragIndicator } from "react-icons/md";
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

interface VideoItem {
  id: number;
  title: string;
  subtitle: string;
}

function SortableListCard({
  item,
  onEdit,
  onCopy,
  onDelete,
  onDubbing,
}: {
  item: VideoItem;
  onEdit: () => void;
  onCopy: () => void;
  onDelete: () => void;
  onDubbing: () => void;
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
      className="storyboard-card relative"
      {...attributes}
    >
      <div className="storyboard-header">
        <div className="flex items-center gap-1 -translate-x-1">
          <div
            className="drag-handle cursor-move active:cursor-grabbing z-20 p-0.5! rounded hover:bg-gray-200"
            {...listeners}
            style={{ opacity: isDragging ? 1 : 0.5 }}
          >
            <MdDragIndicator />
          </div>
          <div className="storyboard-title">{item.title}</div>
        </div>
        <div className="storyboard-actions">
          <Button variant="info" size="mini" onClick={onDubbing}>
            配音对口型
          </Button>
          <Button variant="primary" size="mini" onClick={onEdit}>
            编辑分镜视频
          </Button>
          <Button variant="secondary" size="mini" onClick={onCopy}>
            复制分镜
          </Button>
          <Button variant="danger" size="mini" onClick={onDelete}>
            删除分镜
          </Button>
        </div>
      </div>
      <div className="storyboard-grid">
        <div className="storyboard-item">
          <div className="storyboard-label">分镜视频：</div>
          <div className="storyboard-image-box">
            <div style={{ fontSize: "12px", marginTop: "8px" }}>
              编辑分镜视频
            </div>
            <div
              style={{
                fontSize: "10px",
                color: "var(--text-faint)",
                marginTop: "4px",
              }}
            >
              点击生成或编辑分镜视频
            </div>
          </div>
        </div>
        <div className="storyboard-item">
          <div className="storyboard-label">图生视频：</div>
          <div
            className="storyboard-image-box"
            style={{ width: "200px", height: "180px" }}
          >
            <span>暂无图片</span>
          </div>
        </div>
        <div className="storyboard-item">
          <div className="storyboard-label">详情描述：</div>
          <div
            style={{
              fontSize: "12px",
              color: "var(--text-weak)",
              lineHeight: 1.6,
            }}
          >
            可点击"自动生成视频"或"编辑视频"生成视频
          </div>
        </div>
      </div>
      <div className="h-5 w-full absolute left-0 translate-y-5! bottom-0 z-10 group">
        <div className="opacity-0 flex h-full items-center group-hover:opacity-100 pr-5!">
          <Tooltip title="插入空白卡片">
            <IoIosAddCircleOutline
              className="scale-150"
              style={{ color: "var(--primary-color)", flexShrink: 0 }}
              onClick={() => alert()}
            />
          </Tooltip>
          <Divider
            dashed={true}
            style={{
              flex: 1,
              borderWidth: "1px",
              borderColor: "var(--primary-color)",
            }}
          />
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
  onDubbing,
}: {
  item: VideoItem;
  index: number;
  onEdit: () => void;
  onCopy: () => void;
  onDelete: () => void;
  onDubbing: () => void;
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
    setActiveDropdown(
      activeDropdown === `dropdown-${index}` ? null : `dropdown-${index}`,
    );
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="video-card-compact relative"
      {...attributes}
    >
      <div className="h-full w-5 absolute left-0 -translate-x-5! top-0 z-10 group">
        <div className="opacity-0 flex h-full flex-col items-center group-hover:opacity-100">
          <Tooltip title="插入空白卡片">
            <IoIosAddCircleOutline
              className="scale-150"
              style={{ color: "var(--primary-color)" }}
              onClick={() => alert()}
            />
          </Tooltip>
          <Divider
            type="vertical"
            dashed={true}
            style={{
              flex: 1,
              borderWidth: "1px",
              borderColor: "var(--primary-color)",
            }}
          />
        </div>
      </div>
      <div className="video-card-header">
        <div className="flex items-center gap-1 -translate-x-1">
          <div
            className="drag-handle cursor-move active:cursor-grabbing z-20 p-0.5! rounded hover:bg-gray-200"
            {...listeners}
            style={{ opacity: isDragging ? 1 : 0.5 }}
          >
            <MdDragIndicator />
          </div>
          <div className="video-card-title">{item.title}</div>
        </div>
        <button
          className="video-card-menu-btn"
          onClick={(e) => {
            e.stopPropagation();
            toggleDropdown();
          }}
        >
          ⋮
        </button>
        {activeDropdown === `dropdown-${index}` && (
          <div className="video-card-dropdown show top-10! right-2!">
            <button className="video-card-dropdown-item" onClick={onEdit}>
              <span>编辑分镜视频</span>
            </button>
            <button className="video-card-dropdown-item" onClick={onCopy}>
              <span>复制分镜</span>
            </button>
            <div className="video-card-dropdown-divider"></div>
            <button
              className="video-card-dropdown-item danger"
              onClick={onDelete}
            >
              <span>删除分镜</span>
            </button>
            <div className="video-card-dropdown-divider"></div>
            <button className="video-card-dropdown-item" onClick={onDubbing}>
              <span>配音对口型</span>
            </button>
          </div>
        )}
      </div>
      <div className="video-card-image-box">
        <span>点击编辑分镜视频</span>
      </div>
    </div>
  );
}

export function StoryboardVideoPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [viewMode, setViewMode] = useState<"list" | "card">("list");
  const [progressCount] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [listItems, setListItems] = useState<VideoItem[]>([
    { id: 1, title: "分镜视频 1：分镜 1-1", subtitle: "分镜 1-1" },
    { id: 2, title: "分镜视频 2：分镜 1-2", subtitle: "分镜 1-2" },
    { id: 3, title: "分镜视频 3：分镜 1-3", subtitle: "分镜 1-3" },
  ]);
  const [cardItems, setCardItems] = useState<VideoItem[]>([
    { id: 1, title: "分镜视频 01：分镜 1-1", subtitle: "分镜 1-1" },
    { id: 2, title: "分镜视频 02：分镜 1-2", subtitle: "分镜 1-2" },
    { id: 3, title: "分镜视频 03：分镜 1-3", subtitle: "分镜 1-3" },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleNext = () => {
    navigate("/dubbing");
  };

  const handleRegenerate = () => {
    setShowConfirmDialog(true);
  };

  const confirmRegenerate = () => {
    toast.info("正在重新生成分镜...");
  };

  const handleEdit = () => {
    toast.info("编辑分镜视频");
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

  const handleDubbing = () => {
    toast.info("配音对口型");
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
    <div
      className="storyboard-video-page"
      onClick={() => setActiveDropdown(null)}
    >
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
            视频完成进度：<span>{progressCount}</span>/16
          </div>
        </div>
        <div className="toolbar-right">
          <Button variant="secondary" size="small" onClick={handleRegenerate}>
            重新生成分镜
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
                  onEdit={handleEdit}
                  onCopy={handleCopy}
                  onDelete={handleDelete}
                  onDubbing={handleDubbing}
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
                    onEdit={handleEdit}
                    onCopy={handleCopy}
                    onDelete={handleDelete}
                    onDubbing={handleDubbing}
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
        message="确定要重新生成分镜吗？当前内容将会被覆盖。"
        confirmText="确定"
        cancelText="取消"
        variant="warning"
      />
    </div>
  );
}
