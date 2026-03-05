export type ProjectStatus = 'draft' | 'in_progress' | 'completed' | 'archived';

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  cover?: string;
  createdAt: string;
  updatedAt: string;
  currentStep?: number;
  settings?: ProjectSettings;
}

export interface ProjectSettings {
  aspectRatio?: string;
  creationMode?: string;
  storyboardMode?: string;
  styleId?: string;
}

export interface CreateProjectPayload {
  name: string;
  description?: string;
  cover?: string;
}

export interface UpdateProjectPayload extends Partial<CreateProjectPayload> {
  id: string;
  status?: ProjectStatus;
  currentStep?: number;
  settings?: ProjectSettings;
}
