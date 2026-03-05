import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Project, ProjectStatus, CreateProjectPayload, UpdateProjectPayload } from '@/types';

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  isLoading: boolean;
  error: string | null;
}

const loadProjectsFromStorage = (): Project[] => {
  try {
    const stored = localStorage.getItem('projects');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load projects from localStorage:', e);
  }
  return [];
};

const saveProjectsToStorage = (projects: Project[]): void => {
  try {
    localStorage.setItem('projects', JSON.stringify(projects));
  } catch (e) {
    console.error('Failed to save projects to localStorage:', e);
  }
};

const loadCurrentProjectFromStorage = (): Project | null => {
  try {
    const stored = localStorage.getItem('currentProject');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load current project from localStorage:', e);
  }
  return null;
};

const saveCurrentProjectToStorage = (project: Project | null): void => {
  try {
    if (project) {
      localStorage.setItem('currentProject', JSON.stringify(project));
    } else {
      localStorage.removeItem('currentProject');
    }
  } catch (e) {
    console.error('Failed to save current project to localStorage:', e);
  }
};

const generateId = (): string => {
  return `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const initialState: ProjectState = {
  projects: loadProjectsFromStorage(),
  currentProject: loadCurrentProjectFromStorage(),
  isLoading: false,
  error: null
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    createProject: (state, action: PayloadAction<CreateProjectPayload>) => {
      const newProject: Project = {
        id: generateId(),
        name: action.payload.name,
        description: action.payload.description,
        status: 'draft',
        cover: action.payload.cover,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        currentStep: 0,
        settings: {
          aspectRatio: '16:9',
          creationMode: '图生视频模式',
          storyboardMode: '自动生成单张分镜图'
        }
      };
      state.projects.push(newProject);
      state.currentProject = newProject;
      saveProjectsToStorage(state.projects);
      saveCurrentProjectToStorage(newProject);
    },
    updateProject: (state, action: PayloadAction<UpdateProjectPayload>) => {
      const index = state.projects.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = {
          ...state.projects[index],
          ...action.payload,
          updatedAt: new Date().toISOString()
        };
        if (state.currentProject?.id === action.payload.id) {
          state.currentProject = state.projects[index];
          saveCurrentProjectToStorage(state.currentProject);
        }
        saveProjectsToStorage(state.projects);
      }
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(p => p.id !== action.payload);
      if (state.currentProject?.id === action.payload) {
        state.currentProject = null;
        saveCurrentProjectToStorage(null);
      }
      saveProjectsToStorage(state.projects);
    },
    setCurrentProject: (state, action: PayloadAction<string>) => {
      const project = state.projects.find(p => p.id === action.payload);
      if (project) {
        state.currentProject = project;
        saveCurrentProjectToStorage(project);
      }
    },
    clearCurrentProject: (state) => {
      state.currentProject = null;
      saveCurrentProjectToStorage(null);
    },
    updateProjectStatus: (state, action: PayloadAction<{ id: string; status: ProjectStatus }>) => {
      const index = state.projects.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.projects[index].status = action.payload.status;
        state.projects[index].updatedAt = new Date().toISOString();
        if (state.currentProject?.id === action.payload.id) {
          state.currentProject = state.projects[index];
          saveCurrentProjectToStorage(state.currentProject);
        }
        saveProjectsToStorage(state.projects);
      }
    },
    updateProjectStep: (state, action: PayloadAction<{ id: string; step: number }>) => {
      const index = state.projects.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.projects[index].currentStep = action.payload.step;
        state.projects[index].updatedAt = new Date().toISOString();
        if (state.currentProject?.id === action.payload.id) {
          state.currentProject = state.projects[index];
          saveCurrentProjectToStorage(state.currentProject);
        }
        saveProjectsToStorage(state.projects);
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const {
  createProject,
  updateProject,
  deleteProject,
  setCurrentProject,
  clearCurrentProject,
  updateProjectStatus,
  updateProjectStep,
  setLoading,
  setError
} = projectSlice.actions;

export default projectSlice.reducer;
