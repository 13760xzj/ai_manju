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

interface StoryboardItem {
  id: number;
  title: string;
}

function SortableListCard({
  item,
  onEditImage,
  onCopy,
  onPreview,
  onReplace,
  onDownload,
  onDelete,
}: {
  item: StoryboardItem;
  onEditImage: () => void;
  onCopy: () => void;
  onPreview: () => void;
  onReplace: () => void;
  onDownload: () => void;
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
          <Button variant="info" size="mini">
            配音对口型
          </Button>
          <Button variant="secondary" size="mini" onClick={onEditImage}>
            修改脚本描述
          </Button>
          <Button variant="primary" size="mini" onClick={onEditImage}>
            编辑分镜图片
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
          <div className="storyboard-label">分镜图片：</div>
          <div className="storyboard-image-box">
            <div className="storyboard-image-title">编辑分镜图片</div>
            <div className="storyboard-image-subtitle">点击生成或编辑分镜图片</div>
          </div>
        </div>
        <div className="storyboard-item">
          <div className="storyboard-label">参考图片：</div>
          <div className="ref-grid">
            {[1, 2, 3, 4].map((i) => (
              <button
                key={i}
                type="button"
                className="ref-tile"
                aria-label={i === 4 ? "添加参考图" : `参考图 ${i}`}
              >
                <span className={`ref-plus ${i === 4 ? "is-add" : ""}`}>+</span>
              </button>
            ))}
          </div>
        </div>
        <div className="storyboard-item">
          <div className="storyboard-label">脚本描述：</div>
          <div
            style={{
              fontSize: "12px",
              color: "var(--text-weak)",
              lineHeight: 1.8,
            }}
          >
            <div style={{ marginBottom: "6px" }}>
              <strong>镜号：</strong>
              {item.id}
            </div>
            <div style={{ marginBottom: "6px" }}>
              <strong>剧本内容：</strong>
            </div>
            <div style={{ marginBottom: "6px" }}>
              <strong>画面描述：</strong>
            </div>
            <div style={{ marginBottom: "6px" }}>
              <strong>台词：</strong>
            </div>
            <div style={{ marginBottom: "6px" }}>
              <strong>动作状态：</strong>
            </div>
            <div>
              <strong>叙事功能：</strong>
            </div>
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
  onEditImage,
  onCopy,
  onPreview,
  onReplace,
  onDownload,
  onDelete,
}: {
  item: StoryboardItem;
  index: number;
  onEditImage: () => void;
  onCopy: () => void;
  onPreview: () => void;
  onReplace: () => void;
  onDownload: () => void;
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

  const [activeCardMenu, setActiveCardMenu] = useState<number | null>(null);

  const toggleCardMenu = () => {
    setActiveCardMenu(activeCardMenu === index ? null : index);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="storyboard-card-compact relative"
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
      <div className="card-header">
        <div className="flex items-center gap-1 -translate-x-1">
          <div
            className="drag-handle cursor-move active:cursor-grabbing z-20 p-0.5! rounded hover:bg-gray-200"
            {...listeners}
            style={{ opacity: isDragging ? 1 : 0.5 }}
          >
            <MdDragIndicator />
          </div>
          <div className="card-title">{item.title}</div>
        </div>
        <div className="card-menu-wrapper">
          <button
            className="card-menu-btn"
            onClick={(e) => {
              e.stopPropagation();
              toggleCardMenu();
            }}
          >
            ...
          </button>
          {activeCardMenu === index && (
            <div className="card-menu-dropdown">
              <div className="menu-item" onClick={onEditImage}>
                <span>编辑分镜图</span>
              </div>
              <div className="menu-item" onClick={onCopy}>
                <span>复制分镜</span>
              </div>
              <div className="menu-item" onClick={onPreview}>
                <span>预览</span>
              </div>
              <div className="menu-item" onClick={onReplace}>
                <span>替换</span>
              </div>
              <div className="menu-item" onClick={onDownload}>
                <span>下载</span>
              </div>
              <div className="menu-item delete" onClick={onDelete}>
                <span>删除分镜</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="card-image-container">
        <span>暂无图片</span>
      </div>
    </div>
  );
}

export function StoryboardPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [viewMode, setViewMode] = useState<"list" | "card">("list");
  const [progressCount] = useState(0);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [activeCardMenu, setActiveCardMenu] = useState<number | null>(null);
  const [listItems, setListItems] = useState<StoryboardItem[]>([
    { id: 1, title: "分镜脚本 1：分镜 1-1" },
    { id: 2, title: "分镜脚本 2：分镜 1-2" },
    { id: 3, title: "分镜脚本 3：分镜 1-3" },
  ]);
  const [cardItems, setCardItems] = useState<StoryboardItem[]>([
    { id: 1, title: "分镜 1-1" },
    { id: 2, title: "分镜 1-2" },
    { id: 3, title: "分镜 1-3" },
    { id: 4, title: "分镜 1-4" },
    { id: 5, title: "分镜 1-5" },
    { id: 6, title: "分镜 1-6" },
    { id: 7, title: "分镜 1-7" },
    { id: 8, title: "分镜 1-8" },
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
    navigate("/storyboard-video");
  };

  const handleRegenerate = () => {
    setShowConfirmDialog(true);
  };

  const confirmRegenerate = () => {
    toast.info("正在重新生成分镜...");
  };

  const handleAddStoryboard = () => {
    toast.info("添加新分镜功能");
  };

  const handleEditImage = () => {
    toast.info("编辑分镜图片");
    setActiveCardMenu(null);
  };

  const handleCopyCard = () => {
    toast.info("复制分镜");
    setActiveCardMenu(null);
  };

  const handlePreview = () => {
    toast.info("预览");
    setActiveCardMenu(null);
  };

  const handleReplace = () => {
    toast.info("替换");
    setActiveCardMenu(null);
  };

  const handleDownload = () => {
    toast.info("下载");
    setActiveCardMenu(null);
  };

  const handleDeleteCard = () => {
    toast.info("删除分镜");
    setActiveCardMenu(null);
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
    <div className="storyboard-page">
      <div className="page-toolbar">
        <div className="navigation-box ui-toolbar">
          <div className="nav-left">
            <div className="toggle-group">
              <Button
                variant={viewMode === "list" ? "primary" : "secondary"}
                size="small"
                className={
                  viewMode === "list" ? "toggle-btn text-white!" : "toggle-btn"
                }
                onClick={() => setViewMode("list")}
              >
                列表
              </Button>
              <Button
                variant={viewMode === "card" ? "primary" : "secondary"}
                size="small"
                className={
                  viewMode === "card" ? "toggle-btn text-white!" : "toggle-btn"
                }
                onClick={() => setViewMode("card")}
              >
                卡片
              </Button>
            </div>
            <div className="nav-divider"></div>
            <div className="progress-info">
              分镜完成进度：<span>{progressCount}</span>/16
            </div>
          </div>
          <div className="nav-right">
            <Button
              variant="secondary"
              size="small"
              onClick={handleAddStoryboard}
            >
              添加分镜
            </Button>
            <Button variant="secondary" size="small" onClick={handleRegenerate}>
              重新生成分镜
            </Button>
            <Button variant="primary" size="small" onClick={handleNext}>
              下一步
            </Button>
          </div>
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
                  onEditImage={handleEditImage}
                  onCopy={handleCopyCard}
                  onPreview={handlePreview}
                  onReplace={handleReplace}
                  onDownload={handleDownload}
                  onDelete={handleDeleteCard}
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
                    onEditImage={handleEditImage}
                    onCopy={handleCopyCard}
                    onPreview={handlePreview}
                    onReplace={handleReplace}
                    onDownload={handleDownload}
                    onDelete={handleDeleteCard}
                  />
                ))}
              </SortableContext>

              <div
                className="storyboard-card-compact storyboard-card-add"
                onClick={handleAddStoryboard}
              >
                <div className="card-header">
                  <div className="card-title">添加新分镜</div>
                </div>
                <div className="card-image-container card-image-container-add">
                  <span className="card-add-plus">+</span>
                </div>
              </div>
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
