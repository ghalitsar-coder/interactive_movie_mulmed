// Story Data Structure - Interactive Film
export type StoryNode = {
  id: string;
  videoSrc: string;
  nextDefault?: string; // Auto transition to this video
  choices?: {
    label: string;
    nextId: string;
  }[];
};

export const storyMap: Record<string, StoryNode> = {
  "video-1": {
    id: "video-1",
    videoSrc: "video-ke-1.mov",
    choices: [
      { label: "Ke Kelas", nextId: "video-kelas" },
      { label: "Nongkrong", nextId: "video-nongkrong" },
    ],
  },
  "video-kelas": {
    id: "video-kelas",
    videoSrc: "1.a alur cerita kelas.MOV",
    nextDefault: "ending",
  },
  "video-nongkrong": {
    id: "video-nongkrong",
    videoSrc: "1.b alur cerita nongkrong.MOV",
    nextDefault: "ending",
  },
  "ending": {
    id: "ending",
    videoSrc: "2.pergi.MOV",
  },
};

export const INITIAL_VIDEO_ID = "video-1";
