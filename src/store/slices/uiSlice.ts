import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface UiState {
  isLoading: boolean;
  loadingText: string;
  toasts: Toast[];
  sidebarCollapsed: boolean;
}

const loadSidebarState = (): boolean => {
  try {
    const stored = localStorage.getItem('sidebar_collapsed');
    if (stored !== null) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load sidebar state:', e);
  }
  return false;
};

const saveSidebarState = (collapsed: boolean): void => {
  try {
    localStorage.setItem('sidebar_collapsed', JSON.stringify(collapsed));
  } catch (e) {
    console.error('Failed to save sidebar state:', e);
  }
};

const initialState: UiState = {
  isLoading: false,
  loadingText: '加载中...',
  toasts: [],
  sidebarCollapsed: loadSidebarState()
};

const generateToastId = (): string => {
  return `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showLoading: (state, action: PayloadAction<string | undefined>) => {
      state.isLoading = true;
      state.loadingText = action.payload || '加载中...';
    },
    hideLoading: (state) => {
      state.isLoading = false;
      state.loadingText = '加载中...';
    },
    showToast: (state, action: PayloadAction<Omit<Toast, 'id'>>) => {
      const toast: Toast = {
        id: generateToastId(),
        ...action.payload,
        duration: action.payload.duration ?? 3000
      };
      state.toasts.push(toast);
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(t => t.id !== action.payload);
    },
    clearToasts: (state) => {
      state.toasts = [];
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
      saveSidebarState(state.sidebarCollapsed);
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
      saveSidebarState(action.payload);
    }
  }
});

export const {
  showLoading,
  hideLoading,
  showToast,
  removeToast,
  clearToasts,
  toggleSidebar,
  setSidebarCollapsed
} = uiSlice.actions;

export default uiSlice.reducer;
