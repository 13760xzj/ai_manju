import { Button } from '@/components/common';
import './index.css';

export interface TopBarProps {
  projectName?: string;
  currentStep?: string;
  stats?: string;
  tabs?: Array<{ label: string; value: string }>;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onRegenerate?: () => void;
  onNext?: () => void;
  regenerateButtonText?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
}

export function TopBar({
  projectName,
  currentStep,
  stats,
  tabs = [],
  activeTab,
  onTabChange,
  onRegenerate,
  onNext,
  regenerateButtonText = '重新生成',
  leftContent,
  rightContent
}: TopBarProps) {
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        {leftContent || (
          projectName && currentStep && (
            <div className="project-info">
              <span className="project-name">{projectName}</span>
              <span className="step-separator">/</span>
              <span className="current-step">{currentStep}</span>
            </div>
          )
        )}
      </div>
      
      <div className="top-bar-center">
        <div className="segmented-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              className={`segmented-tab ${activeTab === tab.value ? 'active' : ''}`}
              onClick={() => onTabChange?.(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="top-bar-right">
        {rightContent || (
          <>
            {stats && <span className="stats-text">{stats}</span>}
            <div className="top-bar-actions">
              <Button 
                variant="secondary" 
                size="small"
                onClick={onRegenerate}
              >
                {regenerateButtonText}
              </Button>
              <Button 
                variant="primary" 
                size="small"
                onClick={onNext}
              >
                下一步
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
