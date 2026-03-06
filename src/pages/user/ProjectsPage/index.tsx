import { useAppSelector, useAppDispatch } from "@/store/hooks";
import type { RootState } from "@/store";
import {
  createProject,
  deleteProject,
  setCurrentProject,
} from "@/store/slices/projectSlice";
import { Input } from "@/components/common";
import type { Project } from "@/types";
import "./ProjectsPage.css";

export function ProjectsPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const projects = useAppSelector((state: RootState) => state.project.projects);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");

  const handleCreateProject = () => {
    if (!newProjectName.trim()) {
      toast.error("请输入项目名称");
      return;
    }

    dispatch(
      createProject({
        name: newProjectName.trim(),
        description: newProjectDescription.trim(),
      }),
    );

    toast.success("项目创建成功");
    setShowCreateModal(false);
    setNewProjectName("");
    setNewProjectDescription("");
  };

  const handleOpenProject = (project: Project) => {
    dispatch(setCurrentProject(project.id));
    navigate("/global-settings");
  };

  const handleDeleteClick = (project: Project) => {
    setProjectToDelete(project);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (projectToDelete) {
      dispatch(deleteProject(projectToDelete.id));
      toast.success("项目已删除");
    }
    setShowDeleteModal(false);
    setProjectToDelete(null);
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      draft: "草稿",
      in_progress: "进行中",
      completed: "已完成",
      archived: "已归档",
    };
    return statusMap[status] || status;
  };

  const getStatusClass = (status: string) => {
    return `status-${status.replace("_", "-")}`;
  };

  return (
    <div className="projects-page">
      <div className="projects-header">
        <h1 className="projects-title">我的项目</h1>
        <HButton variant="primary" onClick={() => setShowCreateModal(true)}>
          + 新建项目
        </HButton>
      </div>

      {projects.length === 0 ? (
        <div className="projects-empty">
          <div className="empty-icon">📁</div>
          <p className="empty-text">暂无项目</p>
          <p className="empty-hint">点击上方"新建项目"按钮创建您的第一个项目</p>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-cover">
                {project.cover ? (
                  <img src={project.cover} alt={project.name} />
                ) : (
                  <div className="project-cover-placeholder">
                    <span>🎬</span>
                  </div>
                )}
              </div>
              <div className="project-info">
                <h3 className="project-name">{project.name}</h3>
                {project.description && (
                  <p className="project-description">{project.description}</p>
                )}
                <div className="project-meta">
                  <span className={getStatusClass(project.status)}>
                    {getStatusLabel(project.status)}
                  </span>
                  <span className="project-date">
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="project-actions">
                <HButton
                  variant="primary"
                  size="small"
                  onClick={() => handleOpenProject(project)}
                >
                  打开
                </HButton>
                <HButton
                  variant="ghost"
                  size="small"
                  onClick={() => handleDeleteClick(project)}
                >
                  删除
                </HButton>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="新建项目"
        size="small"
        footer={
          <>
            <HButton variant="ghost" onClick={() => setShowCreateModal(false)}>
              取消
            </HButton>
            <HButton variant="primary" onClick={handleCreateProject}>
              创建
            </HButton>
          </>
        }
      >
        <div className="create-project-form">
          <Input
            label="项目名称"
            type="text"
            value={newProjectName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewProjectName(e.target.value)
            }
            placeholder="请输入项目名称"
            required
          />
          <Input
            label="项目描述"
            type="text"
            value={newProjectDescription}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewProjectDescription(e.target.value)
            }
            placeholder="请输入项目描述（可选）"
          />
        </div>
      </Modal>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="确认删除"
        size="small"
        footer={
          <>
            <HButton variant="ghost" onClick={() => setShowDeleteModal(false)}>
              取消
            </HButton>
            <HButton variant="danger" onClick={handleConfirmDelete}>
              删除
            </HButton>
          </>
        }
      >
        <p className="delete-confirm-text">
          确定要删除项目"{projectToDelete?.name}"吗？此操作不可撤销。
        </p>
      </Modal>
    </div>
  );
}
