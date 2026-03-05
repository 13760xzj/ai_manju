export interface GlobalSettings {
  aspectRatio: string;
  creationMode: string;
  storyboardMode: string;
  styleId?: string;
  styleName?: string;
}

export interface StoryPlot {
  title: string;
  content: string;
}

export interface Scene {
  id: string;
  name: string;
  description?: string;
  characters: Character[];
  props: Prop[];
  background?: string;
}

export interface Character {
  id: string;
  name: string;
  description?: string;
  avatar?: string;
}

export interface Prop {
  id: string;
  name: string;
  description?: string;
  image?: string;
}

export interface Storyboard {
  id: string;
  sceneId: string;
  shotNumber: number;
  description: string;
  dialogue?: string;
  action?: string;
  duration?: number;
  imageUrl?: string;
}

export interface StoryboardVideo {
  id: string;
  storyboardId: string;
  videoUrl?: string;
  duration?: number;
  status: 'pending' | 'generating' | 'completed' | 'failed';
}

export interface Dubbing {
  id: string;
  characterId: string;
  text: string;
  audioUrl?: string;
  voiceId?: string;
  speed?: number;
  pitch?: number;
  status: 'pending' | 'generating' | 'completed' | 'failed';
}

export interface CreationData {
  globalSettings: GlobalSettings;
  storyPlot: StoryPlot;
  scenes: Scene[];
  characters: Character[];
  props: Prop[];
  storyboards: Storyboard[];
  storyboardVideos: StoryboardVideo[];
  dubbings: Dubbing[];
}
