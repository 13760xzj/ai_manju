import { apiClient } from './api';
import type { Asset, Work } from '@/types';
import { mockAssets, mockWorks } from '@/mocks';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

const simulateDelay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const assetService = {
  async getAssets(category?: string): Promise<Asset[]> {
    if (USE_MOCK) {
      await simulateDelay();
      if (category && category !== 'all') {
        return mockAssets.filter(asset => asset.category === category);
      }
      return mockAssets;
    }
    return apiClient.get('/assets', {
      params: { category }
    });
  },

  async getAssetById(id: string): Promise<Asset> {
    if (USE_MOCK) {
      await simulateDelay();
      const asset = mockAssets.find(a => a.id === id);
      if (!asset) throw new Error('Asset not found');
      return asset;
    }
    return apiClient.get(`/assets/${id}`);
  },

  async createAsset(asset: Omit<Asset, 'id' | 'updateTime'>): Promise<Asset> {
    if (USE_MOCK) {
      await simulateDelay();
      const newAsset: Asset = {
        ...asset,
        id: Date.now().toString(),
        updateTime: new Date().toLocaleString('zh-CN')
      };
      return newAsset;
    }
    return apiClient.post('/assets', asset);
  },

  async updateAsset(id: string, asset: Partial<Asset>): Promise<Asset> {
    if (USE_MOCK) {
      await simulateDelay();
      const existingAsset = mockAssets.find(a => a.id === id);
      if (!existingAsset) throw new Error('Asset not found');
      return { ...existingAsset, ...asset, updateTime: new Date().toLocaleString('zh-CN') };
    }
    return apiClient.put(`/assets/${id}`, asset);
  },

  async deleteAsset(id: string): Promise<void> {
    if (USE_MOCK) {
      await simulateDelay();
      return;
    }
    await apiClient.delete(`/assets/${id}`);
  },

  async getWorks(): Promise<Work[]> {
    if (USE_MOCK) {
      await simulateDelay();
      return mockWorks;
    }
    return apiClient.get('/works');
  },

  async getWorkById(id: string): Promise<Work> {
    if (USE_MOCK) {
      await simulateDelay();
      const work = mockWorks.find(w => w.id === id);
      if (!work) throw new Error('Work not found');
      return work;
    }
    return apiClient.get(`/works/${id}`);
  },

  async createWork(work: Omit<Work, 'id' | 'updateTime'>): Promise<Work> {
    if (USE_MOCK) {
      await simulateDelay();
      const newWork: Work = {
        ...work,
        id: Date.now().toString(),
        updateTime: new Date().toLocaleString('zh-CN')
      };
      return newWork;
    }
    return apiClient.post('/works', work);
  },

  async updateWork(id: string, work: Partial<Work>): Promise<Work> {
    if (USE_MOCK) {
      await simulateDelay();
      const existingWork = mockWorks.find(w => w.id === id);
      if (!existingWork) throw new Error('Work not found');
      return { ...existingWork, ...work, updateTime: new Date().toLocaleString('zh-CN') };
    }
    return apiClient.put(`/works/${id}`, work);
  },

  async deleteWork(id: string): Promise<void> {
    if (USE_MOCK) {
      await simulateDelay();
      return;
    }
    await apiClient.delete(`/works/${id}`);
  }
};
