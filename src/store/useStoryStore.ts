import { create } from "zustand";
import { StoryNode, getFirstNode, getStoryNode } from "@/data/story-data";

interface StoryState {
  currentNode: StoryNode | null;
  history: string[]; // Array of video IDs yang sudah diputar
  showChoices: boolean;
  isEnded: boolean;
  
  // Actions
  startStory: () => void;
  goToNode: (nodeId: string) => void;
  setShowChoices: (show: boolean) => void;
  setEnded: (ended: boolean) => void;
  resetStory: () => void;
}

export const useStoryStore = create<StoryState>((set, get) => ({
  currentNode: null,
  history: [],
  showChoices: false,
  isEnded: false,

  startStory: () => {
    const firstNode = getFirstNode();
    set({
      currentNode: firstNode,
      history: [firstNode.id],
      showChoices: false,
      isEnded: false,
    });
  },

  goToNode: (nodeId: string) => {
    const node = getStoryNode(nodeId);
    if (!node) {
      console.error(`Story node with id "${nodeId}" not found`);
      return;
    }

    const currentHistory = get().history;
    set({
      currentNode: node,
      history: [...currentHistory, node.id],
      showChoices: false,
      // isEnded: !!node.isEnding, // REMOVED: Trigger manually on video end
      isEnded: false, // Ensure it resets if moving from one ending to another (unlikely but safe)
    });
  },

  setShowChoices: (show: boolean) => {
    set({ showChoices: show });
  },

  setEnded: (ended: boolean) => {
    set({ isEnded: ended });
  },

  resetStory: () => {
    set({
      currentNode: null,
      history: [],
      showChoices: false,
      isEnded: false,
    });
  },
}));
