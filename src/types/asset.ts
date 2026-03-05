// 资产类型定义

export interface Asset {
  id: string;
  name: string;
  category: AssetCategory;
  tags: string[];
  updateTime: string;
  preview: string;
}

export interface Work {
  id: string;
  name: string;
  status: WorkStatus;
  cover: string;
  updateTime: string;
}

export type AssetCategory = 
  | 'all'
  | 'scene'
  | 'character'
  | 'prop'
  | 'copy'
  | 'effect'
  | 'expression'
  | 'action';

export type WorkStatus = 'completed' | 'editing' | 'draft';

export type ViewMode = 'card' | 'list';

export interface AssetCategoryInfo {
  id: AssetCategory;
  name: string;
}
