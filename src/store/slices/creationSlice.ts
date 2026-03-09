import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { loadFromStorage as loadStorage, saveToStorage as saveStorage } from '@/utils/storage';
import type { GlobalSettings, StoryPlot, Scene, Character, Prop, Storyboard, StoryboardVideo, Dubbing, CreationData } from '@/types';

interface CreationState extends CreationData {
  isDirty: boolean;
  lastSavedAt: string | null;
}

const STORAGE_KEY = 'creation_data';

const getInitialState = (): CreationState => ({
  globalSettings: {
    aspectRatio: '16:9',
    creationMode: '图生视频模式',
    storyboardMode: '自动生成单张分镜图'
  },
  storyPlot: {
    title: '',
    content: ''
  },
  scenes: [],
  characters: [],
  props: [],
  storyboards: [],
  storyboardVideos: [],
  dubbings: [],
  isDirty: false,
  lastSavedAt: null
});

// 使用统一的存储工具
const loadFromStorage = (): CreationState => {
  const stored = loadStorage<Partial<CreationState>>(STORAGE_KEY, {});
  return {
    ...getInitialState(),
    ...stored,
    isDirty: false,
    lastSavedAt: stored.lastSavedAt || null
  };
};

const saveToStorage = (state: CreationState): void => {
  const toSave = {
    globalSettings: state.globalSettings,
    storyPlot: state.storyPlot,
    scenes: state.scenes,
    characters: state.characters,
    props: state.props,
    storyboards: state.storyboards,
    storyboardVideos: state.storyboardVideos,
    dubbings: state.dubbings,
    lastSavedAt: new Date().toISOString()
  };
  saveStorage(STORAGE_KEY, toSave);
  state.lastSavedAt = toSave.lastSavedAt;
  state.isDirty = false;
};

const initialState: CreationState = loadFromStorage();

export const creationSlice = createSlice({
  name: 'creation',
  initialState,
  reducers: {
    updateGlobalSettings: (state, action: PayloadAction<Partial<GlobalSettings>>) => {
      state.globalSettings = { ...state.globalSettings, ...action.payload };
      state.isDirty = true;
      saveToStorage(state);
    },
    updateStoryPlot: (state, action: PayloadAction<Partial<StoryPlot>>) => {
      state.storyPlot = { ...state.storyPlot, ...action.payload };
      state.isDirty = true;
      saveToStorage(state);
    },
    setScenes: (state, action: PayloadAction<Scene[]>) => {
      state.scenes = action.payload;
      state.isDirty = true;
      saveToStorage(state);
    },
    addScene: (state, action: PayloadAction<Scene>) => {
      state.scenes.push(action.payload);
      state.isDirty = true;
      saveToStorage(state);
    },
    updateScene: (state, action: PayloadAction<{ id: string; data: Partial<Scene> }>) => {
      const index = state.scenes.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.scenes[index] = { ...state.scenes[index], ...action.payload.data };
        state.isDirty = true;
        saveToStorage(state);
      }
    },
    removeScene: (state, action: PayloadAction<string>) => {
      state.scenes = state.scenes.filter(s => s.id !== action.payload);
      state.isDirty = true;
      saveToStorage(state);
    },
    setCharacters: (state, action: PayloadAction<Character[]>) => {
      state.characters = action.payload;
      state.isDirty = true;
      saveToStorage(state);
    },
    addCharacter: (state, action: PayloadAction<Character>) => {
      state.characters.push(action.payload);
      state.isDirty = true;
      saveToStorage(state);
    },
    updateCharacter: (state, action: PayloadAction<{ id: string; data: Partial<Character> }>) => {
      const index = state.characters.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.characters[index] = { ...state.characters[index], ...action.payload.data };
        state.isDirty = true;
        saveToStorage(state);
      }
    },
    removeCharacter: (state, action: PayloadAction<string>) => {
      state.characters = state.characters.filter(c => c.id !== action.payload);
      state.isDirty = true;
      saveToStorage(state);
    },
    setProps: (state, action: PayloadAction<Prop[]>) => {
      state.props = action.payload;
      state.isDirty = true;
      saveToStorage(state);
    },
    addProp: (state, action: PayloadAction<Prop>) => {
      state.props.push(action.payload);
      state.isDirty = true;
      saveToStorage(state);
    },
    updateProp: (state, action: PayloadAction<{ id: string; data: Partial<Prop> }>) => {
      const index = state.props.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.props[index] = { ...state.props[index], ...action.payload.data };
        state.isDirty = true;
        saveToStorage(state);
      }
    },
    removeProp: (state, action: PayloadAction<string>) => {
      state.props = state.props.filter(p => p.id !== action.payload);
      state.isDirty = true;
      saveToStorage(state);
    },
    setStoryboards: (state, action: PayloadAction<Storyboard[]>) => {
      state.storyboards = action.payload;
      state.isDirty = true;
      saveToStorage(state);
    },
    addStoryboard: (state, action: PayloadAction<Storyboard>) => {
      state.storyboards.push(action.payload);
      state.isDirty = true;
      saveToStorage(state);
    },
    updateStoryboard: (state, action: PayloadAction<{ id: string; data: Partial<Storyboard> }>) => {
      const index = state.storyboards.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.storyboards[index] = { ...state.storyboards[index], ...action.payload.data };
        state.isDirty = true;
        saveToStorage(state);
      }
    },
    removeStoryboard: (state, action: PayloadAction<string>) => {
      state.storyboards = state.storyboards.filter(s => s.id !== action.payload);
      state.isDirty = true;
      saveToStorage(state);
    },
    setStoryboardVideos: (state, action: PayloadAction<StoryboardVideo[]>) => {
      state.storyboardVideos = action.payload;
      state.isDirty = true;
      saveToStorage(state);
    },
    updateStoryboardVideo: (state, action: PayloadAction<{ id: string; data: Partial<StoryboardVideo> }>) => {
      const index = state.storyboardVideos.findIndex(v => v.id === action.payload.id);
      if (index !== -1) {
        state.storyboardVideos[index] = { ...state.storyboardVideos[index], ...action.payload.data };
        state.isDirty = true;
        saveToStorage(state);
      }
    },
    setDubbings: (state, action: PayloadAction<Dubbing[]>) => {
      state.dubbings = action.payload;
      state.isDirty = true;
      saveToStorage(state);
    },
    addDubbing: (state, action: PayloadAction<Dubbing>) => {
      state.dubbings.push(action.payload);
      state.isDirty = true;
      saveToStorage(state);
    },
    updateDubbing: (state, action: PayloadAction<{ id: string; data: Partial<Dubbing> }>) => {
      const index = state.dubbings.findIndex(d => d.id === action.payload.id);
      if (index !== -1) {
        state.dubbings[index] = { ...state.dubbings[index], ...action.payload.data };
        state.isDirty = true;
        saveToStorage(state);
      }
    },
    removeDubbing: (state, action: PayloadAction<string>) => {
      state.dubbings = state.dubbings.filter(d => d.id !== action.payload);
      state.isDirty = true;
      saveToStorage(state);
    },
    clearCreationData: (state) => {
      const fresh = getInitialState();
      Object.assign(state, fresh);
      localStorage.removeItem(STORAGE_KEY);
    },
    reloadCreationData: (state) => {
      const loaded = loadFromStorage();
      Object.assign(state, loaded);
    }
  }
});

export const {
  updateGlobalSettings,
  updateStoryPlot,
  setScenes,
  addScene,
  updateScene,
  removeScene,
  setCharacters,
  addCharacter,
  updateCharacter,
  removeCharacter,
  setProps,
  addProp,
  updateProp,
  removeProp,
  setStoryboards,
  addStoryboard,
  updateStoryboard,
  removeStoryboard,
  setStoryboardVideos,
  updateStoryboardVideo,
  setDubbings,
  addDubbing,
  updateDubbing,
  removeDubbing,
  clearCreationData,
  reloadCreationData
} = creationSlice.actions;

export default creationSlice.reducer;
