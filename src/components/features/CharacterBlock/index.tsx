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
  characterName,
  description,
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
            <Button variant="dashed" size="small" onClick={onAddForm}>
              + 新增形态
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
