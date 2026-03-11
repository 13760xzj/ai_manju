import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/useToast';
import { TopBar, SectionHeader, AngleCard, CharacterBlock, FormSection } from '@/components/features';
import { Button } from '@/components/common';
import './index.css';

export function SceneCharacterPropsPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<'scene' | 'character' | 'props'>('scene');
  const closeDropdown = () => {};

  const handleDelete = (type: string, name: string) => {
    toast.info(`删除${type}: ${name}`);
  };

  const handleDownload = (type: string, name: string) => {
    toast.success(`下载${type}: ${name}`);
  };

  const handleRegenerate = () => toast.info(getRegenerateButtonText());

  const handleNext = () => {
    if (activeTab === 'scene') {
      setActiveTab('character');
    } else if (activeTab === 'character') {
      setActiveTab('props');
    } else {
      navigate('/storyboard');
    }
  };

  const getRegenerateButtonText = () => {
    if (activeTab === 'character') return '重新生成角色图';
    if (activeTab === 'props') return '重新生成道具图';
    return '重新生成场景图';
  };

  return (
    <div className="scene-character-props-page">
      <div className="scp-topbar">
        <TopBar
          tabs={[
            { label: '场景', value: 'scene' },
            { label: '角色', value: 'character' },
            { label: '道具', value: 'props' }
          ]}
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab as 'scene' | 'character' | 'props')}
          onRegenerate={handleRegenerate}
          onNext={handleNext}
          regenerateButtonText={getRegenerateButtonText()}
          stats={undefined}
        />
      </div>

      {activeTab === 'scene' && (
        <div className="tab-content" onClick={closeDropdown}>
          <div className="scp-content">
            <div className="tab-toolbar">
              <div className="scene-page-info">
                <span className="scene-count-text">场景数：5 项</span>
              </div>
              <div className="scene-page-actions">
                <Button variant="ghost" size="small" onClick={() => toast.info('添加场景')}>
                  + 添加场景
                </Button>
              </div>
            </div>

            <div className="scene-section">
              <SectionHeader
                title="场景 1"
                description="场景描述内容"
                actions={
                  <>
                    <Button variant="secondary" size="small">修改场景设定</Button>
                    <Button variant="secondary" size="small">复制场景</Button>
                    <Button variant="danger" size="small">删除场景</Button>
                  </>
                }
              />
              <div className="angles-grid">
                {['正面视角', '反面视角', '左侧面视角', '右侧面视角'].map((view) => (
                  <AngleCard
                    key={view}
                    title={view}
                    onPreview={() => toast.info(`预览：${view}`)}
                    onReplace={() => toast.info(`替换：${view}`)}
                    onDownload={() => handleDownload('场景图', view)}
                    onDelete={() => handleDelete('场景图', view)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'character' && (
        <div className="tab-content" onClick={closeDropdown}>
          <div className="scp-content">
            <div className="tab-toolbar">
              <div className="character-page-info">
                <span className="character-count-text">角色数：2 项</span>
              </div>
              <div className="character-page-actions">
                <Button variant="ghost" size="small" onClick={() => toast.info('添加角色')}>
                  + 添加角色
                </Button>
              </div>
            </div>

            {[1, 2].map((charNum) => (
              <CharacterBlock
                key={charNum}
                characterId={charNum}
                characterName={charNum === 1 ? '角色1: 林柯宇' : '角色2: 林柯宇'}
                onEditCharacter={() => toast.info('修改角色设定')}
                onDeleteCharacter={() => toast.info('删除角色')}
                onAddForm={() => toast.info('添加形态')}
              >
                <FormSection
                  formName={charNum === 1 ? '形态 1: 林柯宇 - 现代装' : '形态 1: 林柯宇 - 现代装'}
                  voiceover="温柔女声"
                  onEditFormImage={() => toast.info('编辑形态图')}
                  onCopyForm={() => toast.info('复制形态')}
                  onDeleteForm={() => toast.info('删除形态')}
                  onAudition={() => toast.info('试听配音')}
                >
                  {['三视图', '全身照'].map((view) => (
                    <AngleCard
                      key={view}
                      title={view}
                      onPreview={() => toast.info(`预览：${view}`)}
                      onReplace={() => toast.info(`替换：${view}`)}
                      onDownload={() => handleDownload('角色图', `角色${charNum}-形态 1-${view}`)}
                      onDelete={() => handleDelete('角色图', `角色${charNum}-形态 1-${view}`)}
                    />
                  ))}
                </FormSection>

                <FormSection
                  formName={charNum === 1 ? '形态 2: 林柯宇 - 古装' : '形态 2: 林柯宇 - 古装'}
                  voiceover="清冷女声"
                  onEditFormImage={() => toast.info('编辑形态图')}
                  onCopyForm={() => toast.info('复制形态')}
                  onDeleteForm={() => toast.info('删除形态')}
                  onAudition={() => toast.info('试听配音')}
                >
                  {['三视图', '全身照'].map((view) => (
                    <AngleCard
                      key={view}
                      title={view}
                      onPreview={() => toast.info(`预览：${view}`)}
                      onReplace={() => toast.info(`替换：${view}`)}
                      onDownload={() => handleDownload('角色图', `角色${charNum}-形态 2-${view}`)}
                      onDelete={() => handleDelete('角色图', `角色${charNum}-形态 2-${view}`)}
                    />
                  ))}
                </FormSection>
              </CharacterBlock>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'props' && (
        <div className="tab-content" onClick={closeDropdown}>
          <div className="scp-content">
            <div className="tab-toolbar">
              <div className="props-page-info">
                <span className="props-count-text">道具数：2 项</span>
              </div>
              <div className="props-page-actions">
                <Button variant="ghost" size="small" onClick={() => toast.info('添加道具')}>
                  + 添加道具
                </Button>
              </div>
            </div>

            {[1, 2].map((propNum) => (
              <div key={propNum} className="props-section">
                <div className="props-header">
                  <span className="props-title">道具 {propNum}</span>
                  <div className="props-actions">
                    <Button variant="secondary" size="small">修改道具设定</Button>
                    <Button variant="danger" size="small">删除道具</Button>
                  </div>
                </div>
                <div className="props-form-section">
                  <FormSection
                    formName="形态 1"
                    onEditFormImage={() => toast.info('编辑形态图')}
                    onCopyForm={() => toast.info('复制形态')}
                    onDeleteForm={() => toast.info('删除形态')}
                  >
                    <div className="angles-grid angles-grid-1">
                      <AngleCard
                        title=""
                        onPreview={() => toast.info('预览：道具图')}
                        onReplace={() => toast.info('替换：道具图')}
                        onDownload={() => handleDownload('道具图', `道具${propNum}`)}
                        onDelete={() => handleDelete('道具图', `道具${propNum}`)}
                      />
                    </div>
                  </FormSection>
                  <div className="add-form-footer">
                    <button className="add-form-btn" onClick={() => toast.info('添加形态')}>
                      <span className="add-form-icon">+</span>
                      <span>添加形态</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
