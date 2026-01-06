"use client";
import { useEffect, useMemo } from "react";
import { useStoryStore } from "@/store/useStoryStore";
import CustomVideoPlayer from "./CustomVideoPlayer";
import ChoiceOverlay from "./ChoiceOverlay";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";

export default function InteractiveFilm() {
  const {
    currentNode,
    showChoices,
    isEnded,
    goToNode,
    setShowChoices,
    setEnded,
    resetStory,
  } = useStoryStore();

  // Get video base URL from environment variable
  const videoBaseUrl = process.env.NEXT_PUBLIC_VIDEO_HOST || "/videos";

  // Construct full video URL
  const videoSrc = useMemo(() => {
    if (!currentNode) return "";
    return `${videoBaseUrl}/${currentNode.videoSrc}`;
  }, [currentNode, videoBaseUrl]);

  // Handle video ended
  const handleVideoEnded = () => {
    if (!currentNode) return;

    // Jika ending scene, trigger ending screen
    if (currentNode.isEnding) {
      setEnded(true);
      return;
    }

    // Jika ada auto-transition (nextDefault), langsung pindah
    if (currentNode.nextDefault) {
      goToNode(currentNode.nextDefault);
    }
    // Jika ada choices, tampilkan overlay
    else if (currentNode.choices && currentNode.choices.length > 0) {
      setShowChoices(true);
    }
  };

  // Handle user choice
  const handleChoice = (nextId: string) => {
    setShowChoices(false);
    goToNode(nextId);
  };

  // Handle restart
  const handleRestart = () => {
    resetStory();
  };

  if (!currentNode) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <p className="text-white text-xl">Loading story...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Video Player */}
      <CustomVideoPlayer
        src={videoSrc}
        onEnded={handleVideoEnded}
        autoPlay={true}
      />

      {/* Choice Overlay */}
      <AnimatePresence>
        {showChoices && currentNode.choices && (
          <ChoiceOverlay
            choices={currentNode.choices}
            onChoice={handleChoice}
          />
        )}
      </AnimatePresence>

      {/* Ending Screen */}
      <AnimatePresence>
        {isEnded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-black/70 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center px-6"
            >
              <h1 className="text-white text-5xl md:text-6xl font-bold mb-4">
                The End
              </h1>
              <p className="text-white/60 text-lg md:text-xl mb-8">
                You&apos;ve reached an ending
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRestart}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-semibold text-lg hover:bg-white/90 transition-all duration-200 shadow-2xl shadow-white/20"
              >
                <RotateCcw className="w-5 h-5" />
                Watch Again
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
