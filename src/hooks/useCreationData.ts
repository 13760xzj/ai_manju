import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
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
} from '@/store/slices/creationSlice';
import type {
  GlobalSettings,
  StoryPlot,
  Scene,
  Character,
  Prop,
  Storyboard,
  StoryboardVideo,
  Dubbing
} from '@/types';

export function useCreationData() {
  const dispatch = useAppDispatch();
  const creation = useAppSelector((state) => state.creation);

  const updateSettings = useCallback(
    (settings: Partial<GlobalSettings>) => {
      dispatch(updateGlobalSettings(settings));
    },
    [dispatch]
  );

  const updatePlot = useCallback(
    (plot: Partial<StoryPlot>) => {
      dispatch(updateStoryPlot(plot));
    },
    [dispatch]
  );

  const handleSetScenes = useCallback(
    (scenes: Scene[]) => {
      dispatch(setScenes(scenes));
    },
    [dispatch]
  );

  const handleAddScene = useCallback(
    (scene: Scene) => {
      dispatch(addScene(scene));
    },
    [dispatch]
  );

  const handleUpdateScene = useCallback(
    (id: string, data: Partial<Scene>) => {
      dispatch(updateScene({ id, data }));
    },
    [dispatch]
  );

  const handleRemoveScene = useCallback(
    (id: string) => {
      dispatch(removeScene(id));
    },
    [dispatch]
  );

  const handleSetCharacters = useCallback(
    (characters: Character[]) => {
      dispatch(setCharacters(characters));
    },
    [dispatch]
  );

  const handleAddCharacter = useCallback(
    (character: Character) => {
      dispatch(addCharacter(character));
    },
    [dispatch]
  );

  const handleUpdateCharacter = useCallback(
    (id: string, data: Partial<Character>) => {
      dispatch(updateCharacter({ id, data }));
    },
    [dispatch]
  );

  const handleRemoveCharacter = useCallback(
    (id: string) => {
      dispatch(removeCharacter(id));
    },
    [dispatch]
  );

  const handleSetProps = useCallback(
    (props: Prop[]) => {
      dispatch(setProps(props));
    },
    [dispatch]
  );

  const handleAddProp = useCallback(
    (prop: Prop) => {
      dispatch(addProp(prop));
    },
    [dispatch]
  );

  const handleUpdateProp = useCallback(
    (id: string, data: Partial<Prop>) => {
      dispatch(updateProp({ id, data }));
    },
    [dispatch]
  );

  const handleRemoveProp = useCallback(
    (id: string) => {
      dispatch(removeProp(id));
    },
    [dispatch]
  );

  const handleSetStoryboards = useCallback(
    (storyboards: Storyboard[]) => {
      dispatch(setStoryboards(storyboards));
    },
    [dispatch]
  );

  const handleAddStoryboard = useCallback(
    (storyboard: Storyboard) => {
      dispatch(addStoryboard(storyboard));
    },
    [dispatch]
  );

  const handleUpdateStoryboard = useCallback(
    (id: string, data: Partial<Storyboard>) => {
      dispatch(updateStoryboard({ id, data }));
    },
    [dispatch]
  );

  const handleRemoveStoryboard = useCallback(
    (id: string) => {
      dispatch(removeStoryboard(id));
    },
    [dispatch]
  );

  const handleSetStoryboardVideos = useCallback(
    (videos: StoryboardVideo[]) => {
      dispatch(setStoryboardVideos(videos));
    },
    [dispatch]
  );

  const handleUpdateStoryboardVideo = useCallback(
    (id: string, data: Partial<StoryboardVideo>) => {
      dispatch(updateStoryboardVideo({ id, data }));
    },
    [dispatch]
  );

  const handleSetDubbings = useCallback(
    (dubbings: Dubbing[]) => {
      dispatch(setDubbings(dubbings));
    },
    [dispatch]
  );

  const handleAddDubbing = useCallback(
    (dubbing: Dubbing) => {
      dispatch(addDubbing(dubbing));
    },
    [dispatch]
  );

  const handleUpdateDubbing = useCallback(
    (id: string, data: Partial<Dubbing>) => {
      dispatch(updateDubbing({ id, data }));
    },
    [dispatch]
  );

  const handleRemoveDubbing = useCallback(
    (id: string) => {
      dispatch(removeDubbing(id));
    },
    [dispatch]
  );

  const handleClearData = useCallback(() => {
    dispatch(clearCreationData());
  }, [dispatch]);

  const handleReloadData = useCallback(() => {
    dispatch(reloadCreationData());
  }, [dispatch]);

  return {
    ...creation,
    updateSettings,
    updatePlot,
    setScenes: handleSetScenes,
    addScene: handleAddScene,
    updateScene: handleUpdateScene,
    removeScene: handleRemoveScene,
    setCharacters: handleSetCharacters,
    addCharacter: handleAddCharacter,
    updateCharacter: handleUpdateCharacter,
    removeCharacter: handleRemoveCharacter,
    setProps: handleSetProps,
    addProp: handleAddProp,
    updateProp: handleUpdateProp,
    removeProp: handleRemoveProp,
    setStoryboards: handleSetStoryboards,
    addStoryboard: handleAddStoryboard,
    updateStoryboard: handleUpdateStoryboard,
    removeStoryboard: handleRemoveStoryboard,
    setStoryboardVideos: handleSetStoryboardVideos,
    updateStoryboardVideo: handleUpdateStoryboardVideo,
    setDubbings: handleSetDubbings,
    addDubbing: handleAddDubbing,
    updateDubbing: handleUpdateDubbing,
    removeDubbing: handleRemoveDubbing,
    clearData: handleClearData,
    reloadData: handleReloadData
  };
}
