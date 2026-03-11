import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/useToast';
import { useAppDispatch } from '@/store/hooks';
import { clearCreationData } from '@/store/slices/creationSlice';
import { createProject } from '@/store/slices/projectSlice';
import { Button, IconButton } from '@/components/common';
import './index.css';

const MAX_NAME_LEN = 25;

export function CreateWorkPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');

  const countText = useMemo(() => `${name.length} / ${MAX_NAME_LEN}`, [name.length]);

  const handleClose = () => {
    navigate(-1);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleConfirm = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      toast.error('请填写本集作品名称');
      return;
    }

    dispatch(clearCreationData());
    dispatch(createProject({ name: trimmed, description: '' }));
    
    // 在新标签页中打开全局设定页面
    const url = window.location.origin + '/global-settings';
    window.open(url, '_blank');
    
    // 关闭当前模态框
    navigate(-1);
  };

  return (
    <div className="create-work-page">
      <button
        type="button"
        className="create-work-mask"
        onClick={handleClose}
        aria-label="关闭新建作品弹窗"
      />

      <div className="create-work-modal" role="dialog" aria-modal="true" aria-label="新建作品">
        <IconButton ariaLabel="关闭" className="create-work-close" onClick={handleClose}>
          ×
        </IconButton>

        <div className="create-work-header">
          <div className="create-work-title">新建作品</div>
          <div className="create-work-subtitle">仅需填写名称，即可新建作品（所有作品素材将自动保存在资产库）</div>
        </div>

        <div className="create-work-form">
          <div className="create-work-label">作品名称(单集) <span className="create-work-label-hint">（适用于有连续剧情的作品）</span></div>

          <div className="create-work-input-row">
            <input
              className="create-work-input"
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, MAX_NAME_LEN))}
              placeholder="请填写本集作品名称"
              autoFocus
            />
            <div className="create-work-counter">{countText}</div>
          </div>
        </div>

        <div className="create-work-steps">
          <div className="create-work-steps-title">作品创作，仅需4步</div>
          <div className="create-work-steps-track">
            {[
              '全局设定',
              '添加剧本(单集)',
              '生成资产',
              '生成视频'
            ].map((label, idx) => (
              <div key={label} className="create-work-step">
                <div className="create-work-step-badge">{idx + 1}</div>
                <div className="create-work-step-text">{label}</div>
                {idx !== 3 && <div className="create-work-step-arrow">▶</div>}
              </div>
            ))}
          </div>
        </div>

        <div className="create-work-footer">
          <Button variant="ghost" onClick={handleCancel} className="create-work-btn">
            取消
          </Button>
          <Button variant="primary" onClick={handleConfirm} className="create-work-btn primary">
            确定新建
          </Button>
        </div>
      </div>
    </div>
  );
}

