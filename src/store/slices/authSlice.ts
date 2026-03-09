import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { authService } from '@/services/authService';
import { loadFromStorage, saveToStorage } from '@/utils/storage';
import type { AsyncState } from '@/types';

interface User {
  id: string;
  username: string;
  email?: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  loginStatus: AsyncState<User>;
  registerStatus: AsyncState<void>;
}

const initialAsyncState = <T>(): AsyncState<T> => ({
  data: null,
  loading: false,
  error: null
});

// 使用统一的存储工具
const loadAuthState = (): { isLoggedIn: boolean; user: User | null; token: string | null } => {
  return loadFromStorage('auth_state', {
    isLoggedIn: false,
    user: null,
    token: null
  });
};

const saveAuthState = (state: { isLoggedIn: boolean; user: User | null; token: string | null }): void => {
  saveToStorage('auth_state', state);
};

const savedState = loadAuthState();

const initialState: AuthState = {
  isLoggedIn: savedState.isLoggedIn,
  user: savedState.user,
  token: savedState.token,
  loginStatus: initialAsyncState(),
  registerStatus: initialAsyncState()
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authService.login(username, password);
      return response.user;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '登录失败');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ username, password, email }: { username: string; password: string; email: string }, { rejectWithValue }) => {
    try {
      await authService.register(username, password, email);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '注册失败');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '登出失败');
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ userId: string | number; username: string; token?: string }>) => {
      state.isLoggedIn = true;
      state.user = {
        id: String(action.payload.userId),
        username: action.payload.username
      };
      if (action.payload.token) {
        state.token = action.payload.token;
      }
      saveAuthState({ isLoggedIn: true, user: state.user, token: state.token });
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      state.loginStatus = initialAsyncState();
      state.registerStatus = initialAsyncState();
      localStorage.removeItem('auth_state');
      localStorage.removeItem('token');
      localStorage.removeItem('projects');
      localStorage.removeItem('currentProject');
      localStorage.removeItem('creation_data');
    },
    updateUsername: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.username = action.payload;
        saveAuthState({ isLoggedIn: state.isLoggedIn, user: state.user, token: state.token });
      }
    },
    clearAuthError: (state) => {
      state.loginStatus.error = null;
      state.registerStatus.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginStatus.loading = true;
        state.loginStatus.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginStatus.loading = false;
        state.loginStatus.data = action.payload;
        state.isLoggedIn = true;
        state.user = action.payload;
        saveAuthState({ isLoggedIn: true, user: state.user, token: state.token });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginStatus.loading = false;
        state.loginStatus.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.registerStatus.loading = true;
        state.registerStatus.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.registerStatus.loading = false;
        state.registerStatus.data = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerStatus.loading = false;
        state.registerStatus.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
        state.token = null;
        localStorage.removeItem('auth_state');
        localStorage.removeItem('token');
        localStorage.removeItem('projects');
        localStorage.removeItem('currentProject');
        localStorage.removeItem('creation_data');
      });
  }
});

export const { login, logout, updateUsername, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
