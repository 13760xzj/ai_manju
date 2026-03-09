import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { assetService } from '@/services/assetService';
import type { Asset, Work, AssetCategory, ViewMode, AsyncState } from '@/types';

interface AssetState {
  assets: Asset[];
  works: Work[];
  selectedCategory: AssetCategory;
  viewMode: ViewMode;
  searchQuery: string;
  selectedItem: Asset | Work | null;
  isDetailPanelOpen: boolean;
  assetsStatus: AsyncState<Asset[]>;
  worksStatus: AsyncState<Work[]>;
}

const initialAsyncState = <T>(): AsyncState<T> => ({
  data: null,
  loading: false,
  error: null
});

const initialState: AssetState = {
  assets: [],
  works: [],
  selectedCategory: 'all',
  viewMode: 'card',
  searchQuery: '',
  selectedItem: null,
  isDetailPanelOpen: false,
  assetsStatus: initialAsyncState(),
  worksStatus: initialAsyncState()
};

export const fetchAssets = createAsyncThunk(
  'asset/fetchAssets',
  async (category: string | undefined, { rejectWithValue }) => {
    try {
      return await assetService.getAssets(category);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '获取素材失败');
    }
  }
);

export const fetchWorks = createAsyncThunk(
  'asset/fetchWorks',
  async (_, { rejectWithValue }) => {
    try {
      return await assetService.getWorks();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '获取作品失败');
    }
  }
);

export const createAsset = createAsyncThunk(
  'asset/createAsset',
  async (asset: Omit<Asset, 'id' | 'updateTime'>, { rejectWithValue }) => {
    try {
      return await assetService.createAsset(asset);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '创建素材失败');
    }
  }
);

export const deleteAsset = createAsyncThunk(
  'asset/deleteAsset',
  async (id: string, { rejectWithValue }) => {
    try {
      await assetService.deleteAsset(id);
      return id;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '删除素材失败');
    }
  }
);

export const createWork = createAsyncThunk(
  'asset/createWork',
  async (work: Omit<Work, 'id' | 'updateTime'>, { rejectWithValue }) => {
    try {
      return await assetService.createWork(work);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '创建作品失败');
    }
  }
);

export const deleteWork = createAsyncThunk(
  'asset/deleteWork',
  async (id: string, { rejectWithValue }) => {
    try {
      await assetService.deleteWork(id);
      return id;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '删除作品失败');
    }
  }
);

export const assetSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<AssetCategory>) => {
      state.selectedCategory = action.payload;
    },
    setViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.viewMode = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedItem: (state, action: PayloadAction<Asset | Work | null>) => {
      state.selectedItem = action.payload;
    },
    setDetailPanelOpen: (state, action: PayloadAction<boolean>) => {
      state.isDetailPanelOpen = action.payload;
    },
    addAsset: (state, action: PayloadAction<Asset>) => {
      state.assets.push(action.payload);
    },
    addWork: (state, action: PayloadAction<Work>) => {
      state.works.push(action.payload);
    },
    clearAssetError: (state) => {
      state.assetsStatus.error = null;
      state.worksStatus.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssets.pending, (state) => {
        state.assetsStatus.loading = true;
        state.assetsStatus.error = null;
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.assetsStatus.loading = false;
        state.assetsStatus.data = action.payload;
        state.assets = action.payload;
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.assetsStatus.loading = false;
        state.assetsStatus.error = action.payload as string;
      })
      .addCase(fetchWorks.pending, (state) => {
        state.worksStatus.loading = true;
        state.worksStatus.error = null;
      })
      .addCase(fetchWorks.fulfilled, (state, action) => {
        state.worksStatus.loading = false;
        state.worksStatus.data = action.payload;
        state.works = action.payload;
      })
      .addCase(fetchWorks.rejected, (state, action) => {
        state.worksStatus.loading = false;
        state.worksStatus.error = action.payload as string;
      })
      .addCase(createAsset.fulfilled, (state, action) => {
        state.assets.push(action.payload);
      })
      .addCase(deleteAsset.fulfilled, (state, action) => {
        state.assets = state.assets.filter(asset => asset.id !== action.payload);
      })
      .addCase(createWork.fulfilled, (state, action) => {
        state.works.push(action.payload);
      })
      .addCase(deleteWork.fulfilled, (state, action) => {
        state.works = state.works.filter(work => work.id !== action.payload);
      });
  }
});

export const {
  setSelectedCategory,
  setViewMode,
  setSearchQuery,
  setSelectedItem,
  setDetailPanelOpen,
  addAsset,
  addWork,
  clearAssetError
} = assetSlice.actions;
export default assetSlice.reducer;
