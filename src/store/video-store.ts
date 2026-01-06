import { create } from 'zustand';

interface VideoStore {
  currentVideoId: string;
  history: string[];
  setCurrentVideo: (videoId: string) => void;
  resetStory: () => void;
}

export const useVideoStore = create<VideoStore>((set) => ({
  currentVideoId: 'video-1',
  history: ['video-1'],
  setCurrentVideo: (videoId) =>
    set((state) => ({
      currentVideoId: videoId,
      history: [...state.history, videoId],
    })),
  resetStory: () =>
    set({
      currentVideoId: 'video-1',
      history: ['video-1'],
    }),
}));
