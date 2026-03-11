import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/useToast';
import { TopBar, SectionHeader, AngleCard, CharacterBlock, FormSection } from '@/components/features';
import { Button, CardGrid, Toolbar } from '@/components/common';
import './index.css';

type ActiveTab = 'scene' | 'character' | 'props';

type ImageView = {
  id: string;
  title: string;
  imageUrl?: string;
};

type SceneAsset = {
  id: string;
  title: string;
  description?: string;
  views: ImageView[];
};

type CharacterForm = {
  id: string;
  name: string;
  voiceover?: string;
  views: ImageView[];
};

type CharacterAsset = {
  id: string;
  name: string;
  forms: CharacterForm[];
};

type PropAsset = {
  id: string;
  title: string;
  forms: Array<{
    id: string;
    name: string;
    views: ImageView[];
  }>;
};

const DEFAULT_SCENE_VIEWS: Array<Omit<ImageView, 'id'>> = [
  { title: '正面视角' },
  { title: '反面视角' },
  { title: '左侧面视角' },
  { title: '右侧面视角' },
];

const DEFAULT_CHARACTER_VIEWS: Array<Omit<ImageView, 'id'>> = [
  { title: '三视图' },
  { title: '全身照' },
];

export function SceneCharacterPropsPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<ActiveTab>('scene');

  const [scenes, setScenes] = useState<SceneAsset[]>(() => [
    {
      id: 'scene-1',
      title: '场景 1',
      description: '场景描述内容',
      views: DEFAULT_SCENE_VIEWS.map((v) => ({ id: `scene-1-${v.title}`, title: v.title })),
    },
  ]);

  const [characters, setCharacters] = useState<CharacterAsset[]>(() => [
    {
      id: 'char-1',
      name: '角色1: 林柯宇',
      forms: [
        {
          id: 'char-1-form-1',
          name: '形态 1: 林柯宇 - 现代装',
          voiceover: '温柔女声',
          views: DEFAULT_CHARACTER_VIEWS.map((v) => ({ id: `char-1-form-1-${v.title}`, title: v.title })),
        },
        {
          id: 'char-1-form-2',
          name: '形态 2: 林柯宇 - 古装',
          voiceover: '清冷女声',
          views: DEFAULT_CHARACTER_VIEWS.map((v) => ({ id: `char-1-form-2-${v.title}`, title: v.title })),
        },
      ],
    },
    {
      id: 'char-2',
      name: '角色2: 林柯宇',
      forms: [
        {
          id: 'char-2-form-1',
          name: '形态 1: 林柯宇 - 现代装',
          voiceover: '温柔女声',
          views: DEFAULT_CHARACTER_VIEWS.map((v) => ({ id: `char-2-form-1-${v.title}`, title: v.title })),
        },
        {
          id: 'char-2-form-2',
          name: '形态 2: 林柯宇 - 古装',
          voiceover: '清冷女声',
          views: DEFAULT_CHARACTER_VIEWS.map((v) => ({ id: `char-2-form-2-${v.title}`, title: v.title })),
        },
      ],
    },
  ]);

  const [propsAssets, setPropsAssets] = useState<PropAsset[]>(() => [
    {
      id: 'prop-1',
      title: '道具 1',
      forms: [
        {
          id: 'prop-1-form-1',
          name: '形态 1',
          views: [{ id: 'prop-1-form-1-view-1', title: '道具图' }],
        },
      ],
    },
    {
      id: 'prop-2',
      title: '道具 2',
      forms: [
        {
          id: 'prop-2-form-1',
          name: '形态 1',
          views: [{ id: 'prop-2-form-1-view-1', title: '道具图' }],
        },
      ],
    },
  ]);

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

  const handleAddScene = () => {
    const nextIndex = scenes.length + 1;
    const id = `scene-${Date.now()}`;
    setScenes((prev) => [
      ...prev,
      {
        id,
        title: `场景 ${nextIndex}`,
        description: '场景描述内容',
        views: DEFAULT_SCENE_VIEWS.map((v) => ({ id: `${id}-${v.title}`, title: v.title })),
      },
    ]);
    toast.success('已添加场景');
  };

  const handleDeleteScene = (sceneId: string) => {
    setScenes((prev) => prev.filter((s) => s.id !== sceneId));
    toast.success('已删除场景');
  };

  const handleAddCharacter = () => {
    const nextIndex = characters.length + 1;
    const id = `char-${Date.now()}`;
    setCharacters((prev) => [
      ...prev,
      {
        id,
        name: `角色${nextIndex}: 新角色`,
        forms: [
          {
            id: `${id}-form-1`,
            name: '形态 1: 新角色 - 默认装',
            voiceover: '默认配音',
            views: DEFAULT_CHARACTER_VIEWS.map((v) => ({ id: `${id}-form-1-${v.title}`, title: v.title })),
          },
        ],
      },
    ]);
    toast.success('已添加角色');
  };

  const handleDeleteCharacter = (characterId: string) => {
    setCharacters((prev) => prev.filter((c) => c.id !== characterId));
    toast.success('已删除角色');
  };

  const handleAddProp = () => {
    const nextIndex = propsAssets.length + 1;
    const id = `prop-${Date.now()}`;
    setPropsAssets((prev) => [
      ...prev,
      {
        id,
        title: `道具 ${nextIndex}`,
        forms: [
          {
            id: `${id}-form-1`,
            name: '形态 1',
            views: [{ id: `${id}-form-1-view-1`, title: '道具图' }],
          },
        ],
      },
    ]);
    toast.success('已添加道具');
  };

  const handleDeleteProp = (propId: string) => {
    setPropsAssets((prev) => prev.filter((p) => p.id !== propId));
    toast.success('已删除道具');
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
          onTabChange={(tab) => setActiveTab(tab as ActiveTab)}
          onRegenerate={handleRegenerate}
          onNext={handleNext}
          regenerateButtonText={getRegenerateButtonText()}
          stats={undefined}
          rightContent={
            <div className="top-bar-actions scp-topbar-actions">
              <Button
                variant="secondary"
                size="medium"
                onClick={handleRegenerate}
              >
                {getRegenerateButtonText()}
              </Button>
              <Button
                variant="primary"
                size="medium"
                onClick={handleNext}
              >
                下一步
              </Button>
            </div>
          }
        />
      </div>

      {activeTab === 'scene' && (
        <div className="tab-content">
          <div className="scp-content">
            <Toolbar
              left={<span className="scene-count-text">场景数：{scenes.length} 项</span>}
              right={
                <Button variant="ghost" size="medium" onClick={handleAddScene}>
                  + 添加场景
                </Button>
              }
            />

            {scenes.map((scene) => (
              <div className="scene-section" key={scene.id}>
                <SectionHeader
                  title={scene.title}
                  description={scene.description}
                  actions={
                    <>
                      <Button variant="secondary" size="medium" onClick={() => toast.info('修改场景设定')}>
                        修改场景设定
                      </Button>
                      <Button variant="secondary" size="medium" onClick={() => toast.info('复制场景')}>
                        复制场景
                      </Button>
                      <Button variant="danger" size="medium" onClick={() => handleDeleteScene(scene.id)}>
                        删除场景
                      </Button>
                    </>
                  }
                />
                <CardGrid variant="auto">
                  {scene.views.map((view) => (
                    <AngleCard
                      key={view.id}
                      title={view.title}
                      imageUrl={view.imageUrl}
                      onReplace={() => toast.info(`替换：${scene.title}-${view.title}`)}
                      onDownload={() => handleDownload('场景图', `${scene.title}-${view.title}`)}
                      onDelete={() => handleDelete('场景图', `${scene.title}-${view.title}`)}
                    />
                  ))}
                </CardGrid>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'character' && (
        <div className="tab-content">
          <div className="scp-content">
            <Toolbar
              left={<span className="character-count-text">角色数：{characters.length} 项</span>}
              right={
                <Button variant="ghost" size="medium" onClick={handleAddCharacter}>
                  + 添加角色
                </Button>
              }
            />

            {characters.map((character) => (
              <CharacterBlock
                key={character.id}
                characterId={character.id}
                characterName={character.name}
                characterCount={character.forms.length}
                onEditCharacter={() => toast.info('修改角色设定')}
                onDeleteCharacter={() => handleDeleteCharacter(character.id)}
                onAddForm={() => toast.info('添加形态')}
              >
                {character.forms.map((form) => (
                  <FormSection
                    key={form.id}
                    formName={form.name}
                    voiceover={form.voiceover}
                    onEditFormImage={() => toast.info('编辑形态图')}
                    onCopyForm={() => toast.info('复制形态')}
                    onDeleteForm={() => toast.info('删除形态')}
                    onAudition={() => toast.info('试听配音')}
                  >
                    {form.views.map((view) => (
                      <AngleCard
                        key={view.id}
                        title={view.title}
                        imageUrl={view.imageUrl}
                        onReplace={() => toast.info(`替换：${character.name}-${form.name}-${view.title}`)}
                        onDownload={() => handleDownload('角色图', `${character.name}-${form.name}-${view.title}`)}
                        onDelete={() => handleDelete('角色图', `${character.name}-${form.name}-${view.title}`)}
                      />
                    ))}
                  </FormSection>
                ))}
              </CharacterBlock>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'props' && (
        <div className="tab-content">
          <div className="scp-content">
            <Toolbar
              left={<span className="props-count-text">道具数：{propsAssets.length} 项</span>}
              right={
                <Button variant="ghost" size="medium" onClick={handleAddProp}>
                  + 添加道具
                </Button>
              }
            />

            {propsAssets.map((prop) => (
              <div key={prop.id} className="props-section">
                <div className="props-header">
                  <span className="props-title">{prop.title}</span>
                  <div className="props-actions">
                    <Button variant="secondary" size="medium" onClick={() => toast.info('修改道具设定')}>
                      修改道具设定
                    </Button>
                    <Button variant="danger" size="medium" onClick={() => handleDeleteProp(prop.id)}>
                      删除道具
                    </Button>
                  </div>
                </div>
                {prop.forms.map((form) => (
                  <div key={form.id} className="props-form-section">
                    <FormSection
                      formName={form.name}
                      onEditFormImage={() => toast.info('编辑形态图')}
                      onCopyForm={() => toast.info('复制形态')}
                      onDeleteForm={() => toast.info('删除形态')}
                    >
                      <CardGrid variant="one" maxWidth={520}>
                        {form.views.map((view) => (
                          <AngleCard
                            key={view.id}
                            title={view.title}
                            imageUrl={view.imageUrl}
                            onReplace={() => toast.info(`替换：${prop.title}-${form.name}`)}
                            onDownload={() => handleDownload('道具图', `${prop.title}-${form.name}`)}
                            onDelete={() => handleDelete('道具图', `${prop.title}-${form.name}`)}
                          />
                        ))}
                      </CardGrid>
                    </FormSection>
                    <div className="add-form-footer">
                      <Button variant="dashed" size="small" onClick={() => toast.info('添加形态')}>
                        + 添加形态
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
