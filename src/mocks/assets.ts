import type { Asset, Work } from '@/types';

export const mockAssets: Asset[] = [
  { id: '1', name: '古代寺庙大门', category: 'scene', tags: ['古风', '建筑'], updateTime: '2024-03-01 14:30', preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ancient%20chinese%20temple%20gate%20ruined&image_size=square' },
  { id: '2', name: '暴风雨天空', category: 'scene', tags: ['天气', '自然'], updateTime: '2024-03-01 13:20', preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dramatic%20stormy%20sky%20swirling%20clouds&image_size=square' },
  { id: '3', name: '古装侠客角色', category: 'character', tags: ['角色', '武侠'], updateTime: '2024-03-01 12:15', preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ancient%20chinese%20warrior%20standing&image_size=square' },
  { id: '4', name: '神秘宝剑', category: 'prop', tags: ['武器', '道具'], updateTime: '2024-03-01 11:00', preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mystical%20sword%20glowing&image_size=square' },
];

export const mockWorks: Work[] = [
  { id: '1', name: '修仙短剧第一集', status: 'completed', cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ancient%20chinese%20temple%20gate%20ruined&image_size=square', updateTime: '2024-03-01 18:00' },
  { id: '2', name: '武侠故事宣传片', status: 'editing', cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dramatic%20stormy%20sky%20swirling%20clouds&image_size=square', updateTime: '2024-03-01 17:30' },
  { id: '3', name: '仙侠 MV 视频', status: 'completed', cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bamboo%20forest%20misty&image_size=square', updateTime: '2024-02-28 20:15' },
  { id: '4', name: '古风剧情短片', status: 'draft', cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mystical%20sword%20glowing&image_size=square', updateTime: '2024-02-28 19:00' },
];
