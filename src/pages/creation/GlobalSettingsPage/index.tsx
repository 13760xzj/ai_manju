import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/useToast';
import { Button } from '@/components/common';
import './index.css';

export function GlobalSettingsPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [creationMode, setCreationMode] = useState('图生视频模式');
  const [storyboardMode, setStoryboardMode] = useState('自动生成单张分镜图');
  const [scriptType, setScriptType] = useState('剧情演绎');

  const handleSave = () => {
    toast.success('设置已保存!');
  };

  const handleNext = () => {
    navigate('/story-plot');
  };

  return (
    <div className="global-settings-page">
      <div className="setting-card ui-card">
        <div className="setting-card-header">
          <h3>基本设置</h3>
          <div className="action-buttons">
            <Button variant="secondary" onClick={handleSave}>
              保存设置
            </Button>
            <Button variant="primary" onClick={handleNext}>
              下一步
            </Button>
          </div>
        </div>
          
          <div className="setting-group">
            <label>默认画面比例</label>
            <div className="options-group">
              {['16:9', '9:16', '4:3', '3:4', '1:1'].map((ratio) => (
                <button 
                  key={ratio}
                  className={`option-btn ${aspectRatio === ratio ? 'active' : ''}`}
                  onClick={() => setAspectRatio(ratio)}
                >
                  {ratio}
                </button>
              ))}
            </div>
          </div>
          
          <div className="setting-group">
            <label>选择剧本类型</label>
            <div className="options-group">
              <button 
                className={`option-btn ${scriptType === '剧情演绎' ? 'active' : ''}`}
                onClick={() => setScriptType('剧情演绎')}
              >
                剧情演绎
              </button>
              <button 
                className={`option-btn ${scriptType === '真人解说漫' ? 'active' : ''}`}
                onClick={() => setScriptType('真人解说漫')}
              >
                真人解说漫
              </button>
            </div>
          </div>

          <div className="setting-group">
            <label>创作模式</label>
            <div className="options-group">
              <button 
                className={`option-btn ${creationMode === '图生视频模式' ? 'active' : ''}`}
                onClick={() => setCreationMode('图生视频模式')}
              >
                图生视频模式
              </button>
              <button 
                className={`option-btn ${creationMode === '多参生视频模式' ? 'active' : ''}`}
                onClick={() => setCreationMode('多参生视频模式')}
              >
                多参生视频模式
              </button>
            </div>
          </div>
          
          <div className="setting-group">
            <label>选择分镜图生成模式</label>
            <div className="options-group">
              {['自动生成单张分镜图', '自动生成九宫格机位分镜图'].map((mode) => (
                <button 
                  key={mode}
                  className={`option-btn ${storyboardMode === mode ? 'active' : ''}`}
                  onClick={() => setStoryboardMode(mode)}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
          
          <div className="setting-group">
            <label>选择画面风格</label>
            <div className="style-section">
              <h4 className="style-subtitle">已选风格</h4>
              <div className="style-grid">
                <div className="style-card">
                  <img
                    src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=anime%20style%20character%20in%20city%20background&image_size=square"
                    alt="2D 死亡之神"
                    className="style-image"
                  />
                  <div className="style-name">2D 死亡之神</div>
                </div>
              </div>

              <h4 className="style-subtitle">我的风格库</h4>
              <div className="style-grid">
                <button type="button" className="style-card style-add-card">
                  <div className="style-add-icon">+</div>
                  <div className="style-add-text">添加风格</div>
                </button>

                <div className="style-card">
                  <img
                    src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=anime%20style%20character%20portrait&image_size=square"
                    alt="2D 精品漫"
                    className="style-image"
                  />
                  <div className="style-name">2D 精品漫</div>
                </div>
              </div>
            </div>
          </div>
      </div>
      </div>
  );
}
