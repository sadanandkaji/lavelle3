"use client";

import { useRef, useState, useEffect } from "react";
import { Maximize, X, Play } from "lucide-react"; 
import HeroCards from "./HeroCards";
import HeroIntro from "./HeroIntro";

export default function HeroSection() {
  const gardenCardRef = useRef<HTMLDivElement | null>(null);
  const sportsCardRef = useRef<HTMLDivElement | null>(null);
  const poolRef = useRef<HTMLDivElement | null>(null);
  
  const watchVideoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null); 
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Sync state with browser fullscreen events (handles Esc key too)
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    document.addEventListener("webkitfullscreenchange", handleFsChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFsChange);
      document.removeEventListener("webkitfullscreenchange", handleFsChange);
    };
  }, []);

  const handleEnterFullScreen = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const container = containerRef.current;
    const video = watchVideoRef.current;
    if (!container || !video) return;

    if (container.requestFullscreen) {
      container.requestFullscreen();
    } else if ((container as any).webkitRequestFullscreen) {
      (container as any).webkitRequestFullscreen();
    }
    
    video.play();
    video.muted = false;
  };

  const handleExitFullScreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    }
  };

  return (
    <section className="w-full bg-white">
      
      {/* HERO VIDEO SECTION */}
      <div className="relative h-screen w-full overflow-hidden">
        <video autoPlay muted loop playsInline preload="metadata" className="w-full h-full object-cover">
          <source src={typeof window !== "undefined" && window.innerWidth < 768 ? "/videos/lavelle-mobile.mp4" : "/videos/lavellefirstscene.mp4"} type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex items-center justify-center text-white text-center px-6 bg-black/10">
          <HeroIntro />
        </div>
      </div>

      {/* --- SPACES HEADER --- */}
      <div className="bg-[#F6F5F2] pt-20 flex flex-col items-center">
        <div className="w-[1.5px] h-20 bg-gradient-to-b from-transparent via-[#B38728] to-[#B38728] mb-8" />
        <div className="text-center space-y-2">
          <h2 className="text-[#B38728] text-xs md:text-sm tracking-[1em] uppercase font-bold pl-[1em]">Spaces</h2>
          <p className="text-neutral-400 font-serif italic text-lg md:text-xl">A Curation of Environments</p>
        </div>
      </div>

      <HeroCards gardenRef={gardenCardRef} sportsRef={sportsCardRef} poolRef={poolRef} />

      {/* --- MUST WATCH VIDEO SECTION --- */}
      <div className="bg-[#F6F5F2] py-20 flex flex-col items-center">
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-[#B38728] text-xs md:text-sm tracking-[1em] uppercase font-bold pl-[1em]">Must Watch</h2>
          <p className="text-neutral-400 font-serif italic text-lg md:text-xl px-6">A Journey Through the Sacred</p>
        </div>

        <div className="w-full max-w-5xl px-4 md:px-6">
          {/* CONTAINER FOR FULLSCREEN */}
          <div 
            ref={containerRef}
            className={`relative w-full overflow-hidden bg-black transition-all duration-500 
              ${isFullScreen ? "h-screen flex items-center justify-center" : "h-auto rounded-xl shadow-2xl"}`}
          >
            
            {/* 1. CROSS BUTTON - Visible ONLY in Fullscreen */}
            {isFullScreen && (
              <button 
                onClick={handleExitFullScreen}
                className="absolute top-6 right-6 z-[100] p-3 bg-black/40 backdrop-blur-xl border border-white/20 rounded-full hover:bg-white/10 transition-all"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            )}

            {/* 2. ENLARGE BUTTON - Visible ONLY when NOT in Fullscreen */}
            {!isFullScreen && (
              <button 
                onClick={handleEnterFullScreen}
                className="absolute bottom-4 right-4 z-20 p-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full hover:bg-[#B38728] transition-colors"
              >
                <Maximize className="w-5 h-5 text-white" />
              </button>
            )}

            {/* 3. CENTER PLAY OVERLAY - Visible ONLY when NOT in Fullscreen */}
            {!isFullScreen && (
              <div 
                className="absolute inset-0 flex items-center justify-center z-10 bg-black/10 cursor-pointer group hover:bg-black/30 transition-all"
                onClick={handleEnterFullScreen}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 border border-white/40 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
                   <Play className="w-8 h-8 text-white fill-white ml-1" />
                </div>
              </div>
            )}

            <video
              ref={watchVideoRef}
              playsInline
              className={`block object-contain transition-all ${isFullScreen ? "w-full h-full" : "w-full h-auto"}`}
              controls={isFullScreen} // Native seekbar only in fullscreen
            >
              <source src="/videos/Yagnaeshwari full video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}