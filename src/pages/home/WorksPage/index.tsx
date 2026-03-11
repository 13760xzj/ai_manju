import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/useToast';
import { Button, IconButton } from '@/components/common';
import './index.css';

export function WorksPage() {
  const toast = useToast();
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [workTitles, setWorkTitles] = useState<{ [key: number]: string }>({
    1: '作品1', 2: '作品2', 3: '作品3', 4: '作品4',
    5: '作品5', 6: '作品6', 7: '作品7', 8: '作品8'
  });

  const toggleDropdown = (id: number) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  useEffect(() => {
    if (activeDropdown === null) return;
    const onDocMouseDown = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) {
        closeDropdown();
        return;
      }
      if (target.closest('.work-menu') || target.closest('.work-dropdown')) return;
      closeDropdown();
    };
    document.addEventListener('mousedown', onDocMouseDown);
    return () => document.removeEventListener('mousedown', onDocMouseDown);
  }, [activeDropdown]);

  const handleRename = (id: number) => {
    setEditingId(id);
    setActiveDropdown(null);
  };

  const handleSaveRename = (id: number, newTitle: string) => {
    setWorkTitles({ ...workTitles, [id]: newTitle });
    setEditingId(null);
    toast.success('重命名成功!');
  };

  const handleDelete = (id: number) => {
    toast.info(`删除作品: ${workTitles[id]}`);
    setActiveDropdown(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: number, newTitle: string) => {
    if (e.key === 'Enter') {
      handleSaveRename(id, newTitle);
    } else if (e.key === 'Escape') {
      setEditingId(null);
    }
  };

  return (
    <div className="works-page">
      <div className="works-grid">
        <button
          className="create-card"
          onClick={() => navigate('/create-work', { state: { backgroundPath: '/case' } })}
          type="button"
        >
          <div className="create-thumbnail">
            <div className="create-btn-large">+</div>
          </div>
          <div className="create-text">创建新视频</div>
        </button>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div key={item} className="work-card">
            <div className="work-thumbnail">
              <div className="work-preview"></div>
              <div className="work-menu">
                <IconButton
                  ariaLabel="打开作品菜单"
                  className="work-menu-btn"
                  onClick={(e) => { e.stopPropagation(); toggleDropdown(item); }}
                >
                  ⋮
                </IconButton>
                {activeDropdown === item && (
                  <div className="work-dropdown">
                    <Button
                      variant="secondary"
                      size="small"
                      className="work-dropdown-item"
                      onClick={(e) => { e.stopPropagation(); handleRename(item); }}
                    >
                      ✏️ 重命名
                    </Button>
                    <Button
                      variant="danger"
                      size="small"
                      className="work-dropdown-item danger"
                      onClick={(e) => { e.stopPropagation(); handleDelete(item); }}
                    >
                      🗑️ 删除
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div className="work-info">
              {editingId === item ? (
                <input
                  type="text"
                  className="work-title-input"
                  value={workTitles[item]}
                  onChange={(e) => setWorkTitles({ ...workTitles, [item]: e.target.value })}
                  onBlur={() => handleSaveRename(item, workTitles[item])}
                  onKeyDown={(e) => handleKeyDown(e, item, workTitles[item])}
                  autoFocus
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <>
                  <div className="work-title" title={workTitles[item]}>{workTitles[item]}</div>
                  <div className="work-meta">
                    <span className="work-status">已完成</span>
                    <span className="work-date">2024-02-28 15:30</span>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
