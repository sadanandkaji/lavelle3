"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function FoodCourtPage() {
  const [fullScreenImg, setFullScreenImg] = useState<string | null>(null);

  const principles = [
    { title: "Sattvic Cuisine", label: "Purity", desc: "Fresh, seasonal, and vegetarian offerings prepared to enhance mental clarity and physical vitality." },
    { title: "Organic Sourcing", label: "Earth", desc: "Ingredients sourced directly from our farm and local sustainable growers, ensuring a farm-to-table experience." },
    { title: "Conscious Dining", label: "Awareness", desc: "A space designed for mindful eating, where the environment complements the digestive process." },
    { title: "Sacred Water", label: "Flow", desc: "Structured and purified water systems aligned with the energetic principles of the Peeta." },
  ];

  return (
    <main className="bg-[#FBFBFA] text-neutral-900 min-h-screen">
      {/* --- FULL SCREEN HERO SECTION --- */}
      <section className="relative h-screen w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/videos/7foodcourt.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div className="absolute inset-0 bg-white/10" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[10px] tracking-[0.6em] text-white uppercase font-bold mb-4 drop-shadow-md"
          >
            Nourishment for the Soul
          </motion.span>
          <motion.h1 
            initial={{ y: 30, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-6xl md:text-9xl font-serif italic text-white drop-shadow-2xl"
          >
            Annapūrṇā
          </motion.h1>
          <p className="mt-8 text-white/90 font-light tracking-widest uppercase text-[10px] md:text-xs">
            The Art of Mindful Dining
          </p>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-[1px] h-24 bg-gradient-to-b from-white to-transparent" 
          />
        </div>
      </section>

      {/* --- PHILOSOPHY SECTION --- */}
      <section className="max-w-5xl mx-auto px-6 py-32 md:py-48 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-[10px] tracking-[0.5em] text-[#B38728] font-bold uppercase mb-8">Alchemy of Taste</h2>
          <h3 className="text-5xl md:text-7xl font-serif text-neutral-900 mb-12 leading-tight">
            Nourishment as <span className="italic text-neutral-400 font-light">Service.</span>
          </h3>
          
          <div className="max-w-3xl mx-auto space-y-8 text-neutral-600 text-lg md:text-xl font-light leading-relaxed">
            <p>
              At the Annapūrṇā Food Court, we view the act of eating as a sacred ritual. Named after the Goddess of Nourishment, this space is dedicated to the principle that the quality of our food determines the quality of our thoughts.
            </p>
            <p>
              The architecture blends open-air connectivity with a refined, modern aesthetic, allowing guests to dine in harmony with nature.
            </p>
          </div>
        </motion.div>
      </section>

      {/* --- FEATURED IMAGE (CLICKABLE FULL SCREEN) --- */}
      <section className="px-6 pb-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="max-w-7xl mx-auto overflow-hidden rounded-sm shadow-2xl cursor-pointer group relative"
          onClick={() => setFullScreenImg("/images/foodcourt.jpg")}
        >
          <img 
            src="/images/foodcourt.jpg" 
            alt="Annapūrṇā Food Court Architecture" 
            className="w-full h-[50vh] md:h-[80vh] object-cover hover:scale-105 transition-transform duration-[3s] ease-out"
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-500" />
          
          {/* Visual Hint for Users */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <span className="text-[9px] tracking-widest text-white/80 uppercase bg-black/20 backdrop-blur-md px-4 py-2 rounded-full md:opacity-0 group-hover:opacity-100 transition-opacity">
              Click to Expand
            </span>
          </div>
        </motion.div>
      </section>

      {/* --- PRINCIPLES GRID --- */}
      <section className="bg-white py-32 border-y border-neutral-100 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {principles.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group border-t border-neutral-50 pt-8 hover:border-[#B38728]/30 transition-colors duration-500"
              >
                <div className="text-[9px] font-bold tracking-[0.4em] text-[#B38728] uppercase mb-4 block">{item.label}</div>
                <h4 className="text-2xl font-serif italic text-neutral-800 mb-4 group-hover:text-[#B38728] transition-colors duration-500">{item.title}</h4>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FULL SCREEN OVERLAY --- */}
      <AnimatePresence>
        {fullScreenImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullScreenImg(null)}
            className="fixed inset-0 z-[100] bg-neutral-950/98 flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <button className="absolute top-8 right-8 text-white z-[110] group">
                <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center group-hover:border-white transition-all duration-300">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </div>
            </button>

            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              src={fullScreenImg} 
              className="max-w-full max-h-full object-contain"
              alt="Full View"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- NAVIGATION FOOTER --- */}
      <section className="py-32 text-center border-t border-neutral-50 bg-[#FBFBFA]">
        <Link href="/wedding-hall" className="inline-flex flex-col items-center group">
          <span className="text-[10px] tracking-[0.4em] text-neutral-400 uppercase mb-4 group-hover:text-[#B38728] transition-colors">Return to Celebration</span>
          <span className="text-4xl md:text-5xl font-serif italic text-neutral-800 border-b border-transparent group-hover:border-[#B38728] pb-2 transition-all duration-500">
            Wedding Hall
          </span>
        </Link>
      </section>
    </main>
  );
}