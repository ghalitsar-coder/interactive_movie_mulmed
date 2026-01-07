"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Info, Volume2, VolumeX, Image } from "lucide-react";
import InteractiveFilm from "@/components/InteractiveFilm";
import { useStoryStore } from "@/store/useStoryStore";

export default function Home() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { startStory } = useStoryStore();

  useEffect(() => {
    // Try to autoplay the hero background video
    if (videoRef.current) {
      videoRef.current.play().catch((e) => console.log("Autoplay blocked", e));
    }
  }, []);

  const handleStart = () => {
    startStory();
    setHasStarted(true);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Jika film sudah dimulai, tampilkan InteractiveFilm
  if (hasStarted) {
    return <InteractiveFilm />;
  }

  // Netflix-style Landing Screen
  return (
    <div className="relative w-full h-screen bg-[#141414] text-white overflow-hidden font-sans">
      {/* Hero Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover opacity-60"
          src="/videos/small/Intro.m4v" // Preview video (using Intro)
          autoPlay
          loop
          muted={isMuted}
          playsInline
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-3/4 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent" />
      </div>

      {/* Navbar (Mockup) */}
      <nav className="absolute top-0 left-0 w-full p-6 z-20 flex items-center justify-between bg-gradient-to-b from-black/70 to-transparent">
        <div className="text-red-600 font-bold text-3xl tracking-tighter">
          VFLIX
        </div>
        <div className="text-sm text-gray-300 font-medium">
           UNLIMITED INTERACTIVE MOVIES
        </div>
      </nav>

      {/* Hero Content */}
      <main className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16 max-w-4xl pt-20">
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Title */}
          <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tighter drop-shadow-2xl">
            Dosen Ghaib
          </h1>

          {/* Metadata */}
          <div className="flex items-center gap-4 text-sm md:text-base font-semibold text-gray-200 mb-6">
            <span className="text-green-400">98% Match</span>
            <span className="text-gray-400">2024</span>
            <span className="border border-gray-500 px-1 text-xs text-gray-400 rounded-sm">HD</span>
            <span className="bg-red-600 text-white px-2 py-0.5 rounded text-xs">INTERACTIVE</span>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-200 max-w-xl mb-8 leading-relaxed drop-shadow-md">
            Dive into a gripping narrative where every decision counts.
            From high-stakes classroom drama to mysterious forest encounters,
            control the faith of the protagonist in this immersive interactive experience.
          </p>

          {/* Buttons */}
          <div className="flex flex-row items-center gap-4">
            <button
              onClick={handleStart}
              className="flex items-center gap-3 px-8 py-3 bg-white text-black rounded font-bold text-lg hover:bg-white/90 transition-colors"
            >
              <Play className="w-6 h-6 fill-black" />
              Play
            </button>
            <button
              className="flex items-center gap-3 px-8 py-3 bg-gray-500/40 text-white rounded font-bold text-lg hover:bg-gray-500/30 transition-colors backdrop-blur-sm"
            >
              <Info className="w-6 h-6" />
              More Info
            </button>
            <a
              href="/poster.png"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-3 bg-gray-500/40 text-white rounded font-bold text-lg hover:bg-gray-500/30 transition-colors backdrop-blur-sm"
            >
              <Image className="w-6 h-6" />
              Lihat Poster
            </a>
          </div>
        </motion.div>
      </main>

      {/* Mute Toggle (Bottom Right) */}
      <button
        onClick={toggleMute}
        className="absolute bottom-20 right-10 z-20 p-3 bg-transparent border border-white/50 rounded-full hover:bg-white/10 transition-colors"
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-white" />
        ) : (
          <Volume2 className="w-5 h-5 text-white" />
        )}
      </button>

      {/* Age Rating */}
      <div className="absolute bottom-40 right-0 h-10 bg-gray-500/20 backdrop-blur-md border-l-4 border-white flex items-center px-4">
        <span className="text-white font-bold">16+</span>
      </div>
    </div>
  );
}
