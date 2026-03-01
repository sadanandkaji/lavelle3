"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function TripuraEshwariPage() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const qualities = [
    { title: "Sṛṣṭi", label: "Creation", desc: "The primordial source from which all matter and consciousness emerge." },
    { title: "Sthiti", label: "Sustenance", desc: "The nurturing force that maintains the harmony of the universe." },
    { title: "Saṁhāra", label: "Transformation", desc: "The grace that dissolves the old to make way for spiritual rebirth." },
    { title: "Ātma Tattva", label: "The Self", desc: "The realization of the inner divinity within every seeker." },
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
          <source src="/videos/4ctemple.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div className="absolute inset-0 bg-white/10" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.span 
            transition={{ duration: 1 }}
            className="text-[10px] text-white uppercase font-bold mb-4 drop-shadow-md"
          >
            The Central Bindu
          </motion.span>
          <motion.h1 
            initial={{ y: 30, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-5xl md:text-8xl lg:text-9xl font-serif italic text-white drop-shadow-2xl"
          >
            Tripura Eshwari
          </motion.h1>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="w-32 h-px bg-white mt-8"
          />
        </div>

        {/* Vertical Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-[1px] h-24 bg-gradient-to-b from-white to-transparent" 
          />
        </div>
      </section>

      {/* --- THE SUPREME CENTER NARRATIVE --- */}
      <section className="max-w-6xl mx-auto px-6 py-32">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] tracking-[0.5em] text-[#B38728] font-bold uppercase mb-6"
          >
            The Heart of the Peeta
          </motion.h2>
          <h3 className="text-4xl md:text-6xl font-serif text-neutral-900 leading-tight">
            The Living Presence of <br />
            <span className="italic text-neutral-400 font-light">Paraśakti.</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 text-lg text-neutral-600 font-light leading-relaxed"
          >
            <p>
              Tripura Eshwari Peetam is the innermost sanctum of the estate—the <strong>Bindu</strong> from which the entire energy of Eshwari Siddha Peeta radiates. 
            </p>
            
            {/* CLICKABLE IMAGE BOX */}
            <div 
              className="relative group cursor-pointer overflow-hidden rounded-sm border border-neutral-200"
              onClick={() => setIsFullScreen(true)}
            >
              <img 
                src="/images/peethaimage.jpg" 
                alt="The Sacred Peeta" 
                className="w-full h-[400px] object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-500" />
              <div className="absolute bottom-6 left-6">
                 <span className="text-[9px] tracking-[0.3em] text-white uppercase font-bold drop-shadow-lg bg-black/20 px-3 py-1 backdrop-blur-sm">Expand Sacred View</span>
              </div>
            </div>

            <p>
              She is worshipped not merely as a deity in stone, but as the <strong>Living Consciousness</strong> that governs the Śrīcakra.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-12 border border-neutral-100 shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#B38728]/5 -mr-16 -mt-16 rounded-full" />
            <h4 className="text-[#B38728] font-serif italic text-2xl mb-6">Manifestation of Beauty</h4>
            <p className="text-sm text-neutral-500 leading-loose">
              "Tripura Sundarī" translates to the Beauty of the Three Worlds. This beauty is not physical, but the spiritual radiance of wisdom and compassion that dissolves fear and bestows liberation (Mukti).
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- FOUR QUALITIES GRID --- */}
      <section className="bg-white py-32 border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {qualities.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div className="text-[#B38728] font-serif italic text-3xl mb-2">{item.title}</div>
                <div className="text-[10px] tracking-widest text-neutral-400 font-bold uppercase mb-6">{item.label}</div>
                <p className="text-sm text-neutral-500 font-light leading-relaxed group-hover:text-neutral-900 transition-colors">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PHILOSOPHICAL QUOTE --- */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <p className="text-2xl md:text-4xl font-serif italic text-neutral-800 leading-snug">
              "The Peeta is her living body in architectural form—a manifested Śrīcakra for the evolution of the soul."
            </p>
            <div className="flex justify-center gap-2">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#B38728]" />
                ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- NAVIGATION FOOTER --- */}
      <section className="py-32 text-center border-t border-neutral-100">
        <Link 
          href="/8-mathruka"
          className="inline-flex flex-col items-center group"
        >
          <span className="text-[10px] tracking-[0.4em] text-neutral-400 uppercase mb-4 group-hover:text-[#B38728] transition-colors">Return to Outer Circles</span>
          <span className="text-4xl md:text-5xl font-serif italic text-neutral-800 border-b border-transparent group-hover:border-[#B38728] pb-2 transition-all duration-500">
            8 Māthṛkās
          </span>
        </Link>
      </section>

      {/* --- FULL SCREEN OVERLAY --- */}
      <AnimatePresence>
        {isFullScreen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-neutral-950 flex items-center justify-center p-4 md:p-12"
          >
            {/* Elegant Close Button */}
            <button 
                onClick={() => setIsFullScreen(false)}
                className="absolute top-8 right-8 text-white z-[110] flex items-center gap-3 group"
            >
                <span className="text-[10px] tracking-[0.4em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-300">Close</span>
                <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center group-hover:border-white group-hover:rotate-90 transition-all duration-500">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </div>
            </button>

            {/* Sacred Image */}
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              src="/images/peethaimage.jpg" 
              className="max-w-full max-h-full object-contain shadow-2xl shadow-[#B38728]/10"
              alt="Tripura Eshwari Peeta Full View"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}