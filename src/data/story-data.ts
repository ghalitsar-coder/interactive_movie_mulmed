// Story Graph Structure
export type StoryNode = {
  id: string;
  videoSrc: string; // Nama file atau URL
  title: string; // Judul scene untuk debugging
  nextDefault?: string; // Jika tidak ada pilihan, lanjut ke sini
  choices?: {
    label: string;
    nextId: string;
  }[];
  isEnding?: boolean; // Apakah ini ending scene
};

export const storyMap: Record<string, StoryNode> = {
  // 1. Intro loop (matches Landing Page)
  "intro": {
    id: "intro",
    videoSrc: "small/Intro.m4v",
    title: "Introduction",
    nextDefault: "scene-1",
  },
  
  // 2. Main Scene (Scene 1)
  "scene-1": {
    id: "scene-1",
    videoSrc: "small/Scene-1.m4v",
    title: "Scene 1: Dosen Datang",
    choices: [
      { label: "AMBIL PULPEN (Cek kaki dosen)", nextId: "scene-2a" },
      { label: "DIAM SAJA (Pura-pura tidak tahu)", nextId: "scene-3" },
    ],
  },

  // 3. Branch A (Ambil Pulpen) -> Ends at 3A
  "scene-2a": {
    id: "scene-2a",
    videoSrc: "small/Scene-2A.m4v",
    title: "Scene 2A: Cek Kaki",
    nextDefault: "scene-3a",
  },
  "scene-3a": {
    id: "scene-3a",
    videoSrc: "small/Scene-3A.m4v",
    title: "Ending A (Good/Bad?)",
    isEnding: true,
  },

  // 4. Branch B (Diam Saja) -> Scene 3 -> Panic/Calm
  "scene-3": {
    id: "scene-3",
    videoSrc: "small/Scene-3.m4v",
    title: "Scene 3: Situasi Genting",
    choices: [
      { label: "LARI SEMUA SEKALIGUS (Panik)", nextId: "scene-3a2" },
      { label: "KELUAR TERTIB & SOPAN (Ikuti aturan)", nextId: "scene-3b" },
    ],
  },
  "scene-3a2": {
    id: "scene-3a2",
    videoSrc: "small/Scene-3A2.m4v",
    title: "Ending Panic",
    isEnding: true,
  },
  "scene-3b": {
    id: "scene-3b",
    videoSrc: "small/Scene-3B.m4v",
    title: "Ending Tertib",
    isEnding: true,
  },
};

// Helper function untuk mendapatkan node berdasarkan ID
export const getStoryNode = (id: string): StoryNode | undefined => {
  return storyMap[id];
};

// Helper function untuk mendapatkan video pertama
export const getFirstNode = (): StoryNode => {
  return storyMap["intro"];
};
