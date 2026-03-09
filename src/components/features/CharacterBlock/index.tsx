import { Button } from '@/components/common';
import './index.css';

export interface CharacterBlockProps {
  characterId: string | number;
  characterName: string;
  description?: string;
  characterCount?: number;
  onEditCharacter?: () => void;
  onCopyCharacter?: () => void;
  onDeleteCharacter?: () => void;
  onAddForm?: () => void;
  children?: React.ReactNode;
}

export function CharacterBlock({
  characterId,
  characterName,
  description,
  characterCount,
  onEditCharacter,
  onCopyCharacter,
  onDeleteCharacter,
  onAddForm,
  children
}: CharacterBlockProps) {
  return (
    <div className="character-block">
      <div className="character-header">
        <div className="character-info">
          <span className="character-title">{characterName}</span>
          <span className="character-meta">
            {`ID: ${characterId}`}
            {typeof characterCount === 'number' ? ` · 形态数：${characterCount}` : ''}
          </span>
          {description && <div className="character-desc">{description}</div>}
        </div>
        <div className="character-actions">
          <Button variant="secondary" size="small" onClick={onEditCharacter}>
            修改角色设定
          </Button>
          {onCopyCharacter && (
            <Button variant="secondary" size="small" onClick={onCopyCharacter}>
              复制角色
            </Button>
          )}
          <Button variant="danger" size="small" onClick={onDeleteCharacter}>
            删除角色
          </Button>
        </div>
      </div>
      
      <div className="character-body">
        {children}
        {onAddForm && (
          <div className="add-form-footer">
            <button className="add-form-btn" onClick={onAddForm}>
              <span className="add-form-icon">+</span>
              <span>新增形态</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
