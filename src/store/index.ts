import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import assetReducer from './slices/assetSlice';
import projectReducer from './slices/projectSlice';
import uiReducer from './slices/uiSlice';
import creationReducer from './slices/creationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    asset: assetReducer,
    project: projectReducer,
    ui: uiReducer,
    creation: creationReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
