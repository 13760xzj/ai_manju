export const ASSET_CATEGORIES = [
  { id: 'all', name: '全部素材' },
  { id: 'scene', name: '场景库' },
  { id: 'character', name: '角色库' },
  { id: 'prop', name: '道具库' },
  { id: 'copy', name: '文案库' },
  { id: 'effect', name: '特效库' },
  { id: 'expression', name: '表情库' },
  { id: 'action', name: '动作库' }
] as const;

export const WORK_STATUS_MAP = {
  completed: '已完成',
  editing: '编辑中',
  draft: '草稿'
} as const;

export const NAVIGATION_ITEMS = [
  { key: 'case', label: '案例广场' },
  { key: 'works', label: '我的作品' },
  { key: 'personal', label: '个人资产库' }
] as const;

export const WORKFLOW_STEPS = [
  { step: 1, label: '全局设定' },
  { step: 2, label: '故事情节' },
  { step: 3, label: '场景角色道具' },
  { step: 4, label: '分镜脚本' },
  { step: 5, label: '分镜视频' },
  { step: 6, label: '配音对口型' },
  { step: 7, label: '视频预览' }
] as const;

export const ASPECT_RATIOS = ['16:9', '9:16', '4:3', '3:4', '1:1', '21:9'] as const;

export const DEFAULT_PAGE_SIZE = 20;
