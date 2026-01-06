"use client";
import { useRef, useState, useEffect } from "react";
import { Loader2, Volume2, VolumeX } from "lucide-react";

interface Props {
  src: string;
  onEnded: () => void; // Trigger saat video habis
  autoPlay?: boolean;
}

export default function CustomVideoPlayer({
  src,
  onEnded,
  autoPlay = true,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); 
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Demo Mode State
  const [demoMode, setDemoMode] = useState(false);

  // Toggle Play/Pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Detect video source change and reset
  useEffect(() => {
    setIsLoading(true);
    setIsPlaying(false);
    setError(null);

    // Force reload video element when src changes
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [src]);

  return (
    <div
      className="relative w-full h-screen bg-black overflow-hidden group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* 1. Video Native */}
      <video
        ref={videoRef}
        key={src} // FORCE REMOUNT ON SRC CHANGE (Critical fix for "stuck" video)
        className="w-full h-full object-cover"
        src={src} // Use direct src attribute
        controls={demoMode} // Show native controls in demo mode
        onEnded={onEnded}
        onPlaying={() => {
          setIsLoading(false);
          setIsPlaying(true);
          setError(null);
        }}
        onPause={() => setIsPlaying(false)}
        onCanPlay={() => {
             setIsLoading(false);
             // Try autoplay if needed
             if (autoPlay && videoRef.current && videoRef.current.paused) {
                 videoRef.current.play().catch(e => console.log("Autoplay caught", e));
             }
        }}
        onError={(e) => {
          const target = e.target as HTMLVideoElement;
          const error = target.error;
          console.error("Video error object:", error);
          
          let errorMessage = "Unknown video error";
          if (error) {
             errorMessage = `Error Code ${error.code}: ${error.message}`;
          }
          setError(errorMessage);
          setIsLoading(false);
        }}
        autoPlay={autoPlay}
        muted={isMuted}
        playsInline
        preload="auto"
      />

      {/* 2. Loading Spinner */}
      {isLoading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10 pointer-events-none">
          <Loader2 className="w-12 h-12 text-white animate-spin" />
        </div>
      )}

      {/* 2b. Error Message */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20">
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-6 max-w-md mx-4">
             <h3 className="text-red-500 font-bold mb-2">Video Playback Error</h3>
             <p className="text-white text-center mb-4">{error}</p>
             <p className="text-white/50 text-xs mb-4 break-all">Source: {src}</p>
             <button onClick={() => window.location.reload()} className="bg-white text-black px-4 py-2 rounded">Refresh Page</button>
          </div>
        </div>
      )}

      {/* 3. Invisible Click Area (Only if NOT in Demo Mode) */}
      {!demoMode && (
        <div
          onClick={togglePlay}
          className="absolute inset-0 z-0 cursor-pointer"
        />
      )}

      {/* 4. Custom Controls Overlay (Hidden in Demo Mode to avoid blocking native controls) */}
      {!demoMode && (
        <div
          className={`absolute bottom-0 left-0 w-full p-6 transition-opacity duration-300 z-10 flex justify-between items-end ${
            isPlaying && !showControls ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* Left Side: Status */}
          <div className="text-white/80 text-sm font-medium tracking-widest uppercase shadow-black drop-shadow-md">
            {isPlaying ? "Now Playing" : "Paused"}
          </div>

          {/* Right Side: Demo Toggle & Mute */}
          <div className="flex items-center gap-4">
             <button
               onClick={(e) => {
                 e.stopPropagation();
                 setDemoMode(true);
               }}
               className="px-3 py-1 rounded-full text-xs font-bold transition-colors bg-white/10 text-white hover:bg-white/20"
             >
               Demo Mode
             </button>

             <button
              onClick={(e) => {
                e.stopPropagation();
                if (videoRef.current) {
                  videoRef.current.muted = !isMuted;
                  setIsMuted(!isMuted);
                }
              }}
              className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all hover:scale-110"
             >
               {isMuted ? <VolumeX className="text-white w-5 h-5" /> : <Volume2 className="text-white w-5 h-5" />}
             </button>
          </div>
        </div>
      )}

      {/* 4b. Demo Mode Active UI (Top Right Button Only) */}
      {demoMode && (
        <div className="absolute top-4 right-4 z-20">
           <button
             onClick={(e) => {
               e.stopPropagation();
               setDemoMode(false);
             }}
             className="px-4 py-2 rounded-full text-sm font-bold bg-yellow-500 text-black shadow-lg hover:bg-yellow-400 transition"
           >
             EXIT DEMO MODE
           </button>
        </div>
      )}

      {/* 5. Play Icon Overlay */}
      {!isPlaying && !isLoading && !demoMode && (
        <div className="absolute inset-0 flex items-center justify-center z-5 pointer-events-none">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
             <PlayIcon />
          </div>
        </div>
      )}
    </div>
  );
}

function PlayIcon() {
  return (
    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
