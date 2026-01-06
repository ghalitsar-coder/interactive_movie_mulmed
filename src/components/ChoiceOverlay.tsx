"use client";
import { motion } from "framer-motion";
import { StoryNode } from "@/data/story-data";

interface Props {
  choices: StoryNode["choices"];
  onChoice: (nextId: string) => void;
}

export default function ChoiceOverlay({ choices, onChoice }: Props) {
  if (!choices || choices.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 flex items-center justify-center z-20 bg-black/30 backdrop-blur-sm"
    >
      <div className="max-w-4xl w-full px-6">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white text-3xl md:text-4xl font-bold text-center mb-8 tracking-tight"
        >
          What will you do?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {choices.map((choice, index) => (
            <motion.button
              key={choice.nextId}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onChoice(choice.nextId)}
              className="relative group overflow-hidden rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-md p-6 md:p-8 transition-all duration-300 hover:border-white/40 hover:shadow-2xl hover:shadow-white/20"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300" />

              <div className="relative z-10">
                <div className="text-white/60 text-xs md:text-sm font-medium uppercase tracking-wider mb-2">
                  Choice {index + 1}
                </div>
                <div className="text-white text-lg md:text-xl font-semibold">
                  {choice.label}
                </div>
              </div>

              {/* Arrow icon */}
              <motion.div
                className="absolute right-4 bottom-4 text-white/40 group-hover:text-white/80"
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </motion.div>
            </motion.button>
          ))}
        </div>

        {/* Helper text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-white/50 text-sm text-center mt-6"
        >
          Your choice will determine the story&apos;s path
        </motion.p>
      </div>
    </motion.div>
  );
}
