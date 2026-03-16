import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/useToast";
import {
  Button,
  ConfirmDialog,
  ContentModal,
  IconButton,
  MarkdownPreview,
  PillActionButton,
} from "@/components/common";
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
import type { DragEndEvent } from "@dnd-kit/core";
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
import { ParamSelect, StoryboardScript } from "@/components/features";
import { markdownContent } from "@/mocks";

interface StoryboardItem {
  id: number;
  title: string;
  imageUrl?: string;
  refImageUrls?: string[];
}

function SortableListCard({
  item,
  onEditImage,
  onEditScript,
  onCopy,
  onReplaceStoryboardImage,
  onDownloadStoryboardImage,
  onDelete,
}: {
  item: StoryboardItem;
  onEditImage: () => void;
  onCopy: () => void;
  onReplaceStoryboardImage: (id: number) => void;
  onDownloadStoryboardImage: (id: number) => void;
  onDelete: () => void;
  onEditScript: () => void;
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
          <Button variant="secondary" size="mini" onClick={onEditScript}>
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
          <div
            onClick={onEditImage}
            className={`storyboard-image-box ${item.imageUrl ? "has-image" : ""}`}
          >
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={`分镜 ${item.id}`}
                className="storyboard-image"
              />
            ) : (
              <>
                <div className="storyboard-image-title">点击生成分镜图片</div>
                <div className="storyboard-image-subtitle">（Demo Mock）</div>
              </>
            )}
          </div>
          <div className="angle-card-actions storyboard-image-actions">
            <PillActionButton
              type="button"
              disabled={!item.imageUrl}
              onClick={() =>
                item.imageUrl && window.open(item.imageUrl, "_blank")
              }
              icon={
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              }
            >
              预览
            </PillActionButton>
            <PillActionButton
              type="button"
              disabled={!item.imageUrl}
              onClick={() => onReplaceStoryboardImage(item.id)}
              icon={
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 1l4 4-4 4" />
                  <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                  <path d="M7 23l-4-4 4-4" />
                  <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                </svg>
              }
            >
              替换
            </PillActionButton>
            <PillActionButton
              type="button"
              disabled={!item.imageUrl}
              onClick={() => onDownloadStoryboardImage(item.id)}
              icon={
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <path d="M7 10l5 5 5-5" />
                  <path d="M12 15V3" />
                </svg>
              }
            >
              下载
            </PillActionButton>
          </div>
        </div>
        <div className="storyboard-item">
          <div className="storyboard-label">参考图片：</div>
          <div className="ref-grid">
            {[1, 2, 3, 4].map((i) => (
              <Button
                key={i}
                type="button"
                variant={i === 4 ? "dashed" : "secondary"}
                size="large"
                className={`ref-tile ${
                  i === 4
                    ? "is-add"
                    : item.refImageUrls?.[i - 1]
                      ? "has-image"
                      : ""
                }`}
                aria-label={i === 4 ? "添加参考图" : `参考图 ${i}`}
              >
                {i === 4 ? (
                  <span className="ref-plus is-add">+</span>
                ) : item.refImageUrls?.[i - 1] ? (
                  <img
                    src={item.refImageUrls[i - 1]}
                    alt={`参考图 ${i}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <span className="ref-plus">+</span>
                )}
              </Button>
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
      <div className="h-4 w-full absolute left-0 translate-y-4! bottom-0 z-99 group overflow-visible">
        <div className="opacity-0 flex h-full items-center group-hover:opacity-100 pr-5!">
          <Tooltip title="插入空白卡片">
            <IoIosAddCircleOutline
              className="scale-150 cursor-pointer"
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
  onDelete,
}: {
  item: StoryboardItem;
  index: number;
  onEditImage: () => void;
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

  const [activeCardMenu, setActiveCardMenu] = useState<number | null>(null);

  const toggleCardMenu = () => {
    setActiveCardMenu(activeCardMenu === index ? null : index);
  };

  useEffect(() => {
    if (activeCardMenu !== index) return;
    const onDocMouseDown = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) {
        setActiveCardMenu(null);
        return;
      }
      if (target.closest(".card-menu-btn") || target.closest(".menu-item"))
        return;
      setActiveCardMenu(null);
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [activeCardMenu, index]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="storyboard-card-compact relative"
      {...attributes}
    >
      <div className="h-full w-3 absolute left-0 -translate-x-3! top-0 z-10 group overflow-visible">
        <div className="opacity-0 flex h-full flex-col items-center group-hover:opacity-100">
          <Tooltip title="插入空白卡片">
            <IoIosAddCircleOutline
              className="scale-150 cursor-pointer"
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
          <IconButton
            ariaLabel="打开分镜菜单"
            className="card-menu-btn"
            onClick={(e) => {
              e.stopPropagation();
              toggleCardMenu();
            }}
          >
            ...
          </IconButton>
          {activeCardMenu === index && (
            <div className="card-menu-dropdown">
              <Button
                className="menu-item"
                variant="secondary"
                size="small"
                onClick={() => {
                  setActiveCardMenu(null);
                  onEditImage();
                }}
              >
                <span>编辑分镜图</span>
              </Button>
              <Button
                className="menu-item"
                variant="secondary"
                size="small"
                onClick={onCopy}
              >
                <span>复制分镜</span>
              </Button>
              <Button
                className="menu-item delete"
                variant="danger"
                size="small"
                onClick={onDelete}
              >
                <span>删除分镜</span>
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="card-image-container" onClick={onEditImage}>
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span>暂无图片</span>
        )}
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
  const [paramsPopVisible, setParamsPopVisible] = useState(false);
  const [editPicture, setEditPicture] = useState(false);
  const [editScript, setEditScript] = useState(false);
  const [listItems, setListItems] = useState<StoryboardItem[]>([
    {
      id: 1,
      title: "分镜脚本 1：分镜 1-1",
      imageUrl: undefined,
      refImageUrls: [],
    },
    {
      id: 2,
      title: "分镜脚本 2：分镜 1-2",
      imageUrl: undefined,
      refImageUrls: [],
    },
    {
      id: 3,
      title: "分镜脚本 3：分镜 1-3",
      imageUrl: undefined,
      refImageUrls: [],
    },
  ]);
  const [cardItems, setCardItems] = useState<StoryboardItem[]>([
    { id: 1, title: "分镜 1-1" },
    { id: 2, title: "分镜 1-2" },
    { id: 3, title: "分镜 1-3" },
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
    setShowConfirmDialog(false);
    toast.info("正在重新生成分镜...");
  };

  const handleAddStoryboard = () => {
    toast.info("添加新分镜功能");
  };

  const handleEditImage = () => {
    toast.info("编辑分镜图片");
  };

  const handleCopyCard = () => {
    toast.info("复制分镜");
  };

  const handleDeleteCard = () => {
    toast.info("删除分镜");
  };

  const replaceStoryboardImage = () => toast.info("替换分镜图");
  const downloadStoryboardImage = () => toast.info("下载分镜图");

  const handleListDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setListItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleCardDragEnd = (event: DragEndEvent) => {
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
      <div className="page-toolbar px-3! mb-2! mt-3!">
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
              size="medium"
              onClick={() => setParamsPopVisible(true)}
            >
              生成参数设置
            </Button>
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
          <div className="list-view-container px-3!">
            <SortableContext
              items={listItems.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              {listItems.map((item) => (
                <SortableListCard
                  key={item.id}
                  item={item}
                  onEditScript={() => setEditScript(true)}
                  onEditImage={() => setEditPicture(true)}
                  onCopy={handleCopyCard}
                  onReplaceStoryboardImage={() => replaceStoryboardImage()}
                  onDownloadStoryboardImage={() => downloadStoryboardImage()}
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
            <div className="card-grid px-4!">
              <SortableContext
                items={cardItems.map((item) => item.id)}
                strategy={horizontalListSortingStrategy}
              >
                {cardItems.map((item, index) => (
                  <SortableCardView
                    key={item.id}
                    item={item}
                    index={index}
                    onEditImage={() => setEditPicture(true)}
                    onCopy={handleCopyCard}
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

      <ContentModal
        visible={paramsPopVisible}
        onCancel={() => setParamsPopVisible(false)}
        subTitle="为分镜脚本、分镜图设置生成参数"
        title="生成设置"
      >
        <ParamSelect
          type="script"
          onCancel={() => setParamsPopVisible(false)}
        />
      </ContentModal>

      <StoryboardScript
        visible={editPicture}
        onCancel={() => setEditPicture(false)}
      />

      <MarkdownPreview
        visible={editScript}
        title="我的第一动漫.md"
        editable={true}
        headerRight={
          <div className="flex items-center gap-2">
            <button
              className={`px-2! font-normal flex items-center gap-1 py-1! text-xs  bg-(--text-color)/10 rounded cursor-pointer hover:bg-(--text-color)/20`}
            >
              <span>保存</span>
            </button>
          </div>
        }
        onCancel={() => setEditScript(false)}
        content={markdownContent}
      />
    </div>
  );
}
