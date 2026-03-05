import { useNavigate } from 'react-router-dom';
import { classNames } from '@/utils';
import './index.css';

export interface SidebarProps {
  activeStep: number;
  collapsed: boolean;
  onToggle: () => void;
}

const STEPS = [
  { step: 0, label: '全局设定', path: '/global-settings' },
  { step: 1, label: '故事情节', path: '/story-plot' },
  { step: 2, label: '场景角色道具', path: '/scene-character-props' },
  { step: 3, label: '分镜脚本', path: '/storyboard' },
  { step: 4, label: '分镜视频', path: '/storyboard-video' },
  { step: 5, label: '配音对口型', path: '/dubbing' },
  { step: 6, label: '视频预览', path: '/video-preview' }
];

export function Sidebar({
  activeStep,
  collapsed,
  onToggle
}: SidebarProps) {
  const navigate = useNavigate();

  const handleStepClick = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <button
        className={classNames('collapse-btn', collapsed ? 'show' : '')}
        onClick={onToggle}
      >
        {collapsed ? '▶' : '◀'}
      </button>
      
      {!collapsed && (
        <aside className="sidebar">
          <nav className="steps">
            {STEPS.map((item) => (
              <div
                key={item.step}
                className={classNames('step', activeStep === item.step ? 'active' : '')}
                onClick={() => handleStepClick(item.path)}
              >
                <span className="step-number">{item.step + 1}</span>
                <span className="step-name">{item.label}</span>
              </div>
            ))}
          </nav>
        </aside>
      )}
    </>
  );
}
