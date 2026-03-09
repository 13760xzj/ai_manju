import { Button } from '@/components/common';
import './index.css';

export interface EditorToolbarProps {
  canUndo?: boolean;
  canRedo?: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
  onCopy?: () => void;
  onClear?: () => void;
  onImport?: () => void;
  onHistory?: () => void;
  onSave?: () => void;
  onNext?: () => void;
}

export function EditorToolbar({
  canUndo = false,
  canRedo = false,
  onUndo,
  onRedo,
  onCopy,
  onClear,
  onImport,
  onHistory,
  onSave,
  onNext
}: EditorToolbarProps) {
  return (
    <div className="editor-toolbar">
      <div className="toolbar-left">
        <Button 
          variant="secondary" 
          size="mini" 
          onClick={onUndo}
          disabled={!canUndo}
        >
          ↩ 撤销
        </Button>
        <Button 
          variant="secondary" 
          size="mini" 
          onClick={onRedo}
          disabled={!canRedo}
        >
          ↪ 重做
        </Button>
        <Button variant="secondary" size="mini" onClick={onCopy}>
          📋 复制
        </Button>
        <Button variant="secondary" size="mini" onClick={onClear}>
          🗑 清空
        </Button>
      </div>
      
      <div className="toolbar-right">
        <Button variant="secondary" size="mini" onClick={onImport}>
          导入剧本 (单集)
        </Button>
        <Button variant="secondary" size="mini" onClick={onHistory}>
          ① 历史版本
        </Button>
        {onNext && (
          <Button variant="secondary" size="mini" onClick={onNext}>
            下一步
          </Button>
        )}
        {onSave && (
          <Button variant="primary" size="mini" onClick={onSave}>
            保存
          </Button>
        )}
      </div>
    </div>
  );
}
