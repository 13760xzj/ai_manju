import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/useToast';
import { Button } from '@/components/common';
import { DocumentTopBar, HistoryDrawer } from '@/components/features';
import type { HistoryVersion } from '@/components/features/HistoryDrawer';
import './index.css';

export function StoryPlotPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [storyTitle, setStoryTitle] = useState('第 1 集：重逢');
  const [storyContent, setStoryContent] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showHistoryDrawer, setShowHistoryDrawer] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const addToHistory = (content: string) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(content);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setHasUnsavedChanges(true);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setStoryContent(newContent);
    addToHistory(newContent);
  };

  const handleUndo = () => {
    if (canUndo) {
      setHistoryIndex(historyIndex - 1);
      setStoryContent(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (canRedo) {
      setHistoryIndex(historyIndex + 1);
      setStoryContent(history[historyIndex + 1]);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(storyContent);
    toast.success('已复制到剪贴板');
  };

  const handleClear = () => {
    setStoryContent('');
    addToHistory('');
    toast.success('内容已清空');
  };

  const handleImport = () => {
    toast.info('导入剧本 (单集) 功能开发中');
  };

  const handleHistory = () => {
    setShowHistoryDrawer(true);
  };

  const handleSave = () => {
    toast.success('故事已保存!');
    setHasUnsavedChanges(false);
  };

  const handleTitleChange = (newTitle: string) => {
    setStoryTitle(newTitle);
    toast.success(`标题已更新为：${newTitle}`);
  };

  const handleRestoreVersion = (version: HistoryVersion) => {
    setStoryContent(version.content);
    setStoryTitle(version.title);
    addToHistory(version.content);
    setShowHistoryDrawer(false);
    toast.success('已恢复到此版本');
  };

  const handleNext = () => {
    navigate('/scene-character-props');
  };

  const mockVersions: HistoryVersion[] = [
    {
      id: 1,
      timestamp: '2024-03-05 14:30',
      title: '第 1 集：重逢',
      content: '这是之前的版本内容',
      isCurrent: true
    },
    {
      id: 2,
      timestamp: '2024-03-05 12:15',
      title: '第 1 集：重逢',
      content: '更早的版本内容'
    },
    {
      id: 3,
      timestamp: '2024-03-04 18:45',
      title: '第 1 集：重逢',
      content: '最初的版本'
    }
  ];

  return (
    <div className="story-plot-page">
      <DocumentTopBar
        title={storyTitle}
        unsaved={hasUnsavedChanges}
        onTitleChange={handleTitleChange}
        onSave={handleSave}
        onNext={handleNext}
      />
      <div className="editor-content">
        <div className="story-plot-actions">
          <div className="story-plot-actions-left">
            <Button
              variant="secondary"
              size="mini"
              onClick={handleUndo}
              disabled={!canUndo}
            >
              ↩ 撤销
            </Button>
            <Button
              variant="secondary"
              size="mini"
              onClick={handleRedo}
              disabled={!canRedo}
            >
              ↪ 重做
            </Button>
            <Button variant="secondary" size="mini" onClick={handleCopy}>
              📋 复制
            </Button>
            <Button variant="secondary" size="mini" onClick={handleClear}>
              🗑 清空
            </Button>
          </div>

          <div className="story-plot-actions-right">
            <Button variant="secondary" size="mini" onClick={handleImport}>
              导入剧本 (单集)
            </Button>
            <Button variant="secondary" size="mini" onClick={handleHistory}>
              ① 历史版本
            </Button>
          </div>
        </div>
        <textarea
          className="script-editor"
          placeholder={`【剧本格式示例】

第 1 场  古代寺庙  日  外

△ 林柯宇站在寺庙前，望着远方。

林柯宇
（OS）
三年了，终于又回到这里...

【闪回】
三年前，同样的地点...
【闪回结束】

出场人物：林柯宇、顾言
---
提示：
- 场次号加粗显示
- △ 表示动作描述
- （OS）表示内心独白
- 【闪回】表示回忆片段`}
          value={storyContent}
          onChange={handleContentChange}
        />
        </div>
      
      <HistoryDrawer
        visible={showHistoryDrawer}
        versions={mockVersions}
        onClose={() => setShowHistoryDrawer(false)}
        onRestore={handleRestoreVersion}
      />
    </div>
  );
}
