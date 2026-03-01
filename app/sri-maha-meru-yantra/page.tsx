"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function MahaMeruPage() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const geometryFeatures = [
    { title: "Bindu", desc: "The point of singularity where the individual soul and the cosmic source become one." },
    { title: "Trikona", desc: "The primary triangle representing the root of all creative energy and manifestation." },
    { title: "Avaraṇas", desc: "The nine circuits of the Meru, each representing a deeper layer of human consciousness." },
    { title: "Bhupura", desc: "The square base that anchors the cosmic energy into the physical earth plane." },
  ];

  const galleryImages = [
    { src: "/images/templeinsideimage.jpg", alt: "Temple Interior View", label: "Inner Sanctum" },
    { src: "/images/templeinsideuperviewimage.jpg", alt: "Temple Top View", label: "Celestial Perspective" }
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
          <source src="/videos/4dtemple.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div className="absolute inset-0 bg-white/5" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.span 
            transition={{ duration: 1 }}
            className="text-[10px] text-white uppercase font-bold mb-4 drop-shadow-md"
          >
            Sacred Geometry in 3D
          </motion.span>
          <motion.h1 
            initial={{ y: 30, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-5xl md:text-8xl lg:text-9xl font-serif italic text-white drop-shadow-2xl"
          >
            Śrī Mahā Meru
          </motion.h1>
          <p className="mt-8 text-white/90 font-light tracking-widest uppercase text-[10px] md:text-xs italic">
            The Pinnacle of Spiritual Architecture
          </p>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-px h-24 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* --- THE CONCEPT SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[10px] tracking-[0.5em] text-[#B38728] font-bold uppercase mb-8">Structure as Mantra</h2>
            <h3 className="text-4xl md:text-6xl font-serif text-neutral-900 mb-10 leading-tight">
              A 3D Projection <br />
              <span className="italic text-neutral-400 font-light">of the Cosmos.</span>
            </h3>
            
            {/* --- IMAGE GALLERY GRID --- */}
            <div className="grid grid-cols-2 gap-4 my-12">
              {galleryImages.map((img, idx) => (
                <div 
                  key={idx}
                  className="group cursor-pointer relative overflow-hidden rounded-sm aspect-[4/5] shadow-lg"
                  onClick={() => setSelectedImg(img.src)}
                >
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500" />
                  <div className="absolute bottom-3 left-3">
                    <p className="text-[8px] text-white uppercase tracking-widest font-bold">{img.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-neutral-600 text-lg font-light leading-relaxed mb-8">
              The Śrī Mahā Meru is the three-dimensional form of the Śrīcakra. While the Yantra is a flat map, the Meru is a mountain of energy.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-16 border border-neutral-100 bg-white shadow-sm relative"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#FBFBFA] flex items-center justify-center border border-neutral-100 rotate-45">
               <div className="w-2 h-2 bg-[#B38728] -rotate-45" />
            </div>
            <h4 className="text-2xl font-serif italic text-neutral-800 text-center mb-10">The Nine Circuits</h4>
            <div className="space-y-6">
              {geometryFeatures.map((f, i) => (
                <div key={i} className="flex gap-6 items-start pb-6 border-b border-neutral-50 last:border-0">
                  <span className="text-[#B38728] font-serif italic text-lg">{f.title}</span>
                  <p className="text-sm text-neutral-500 font-light leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- ENERGETIC IMPACT --- */}
      <section className="bg-neutral-900 py-32 px-6 overflow-hidden relative">
         <div className="absolute top-0 right-0 opacity-10">
            <svg width="400" height="400" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="0.1">
                <circle cx="50" cy="50" r="40" />
                <circle cx="50" cy="50" r="30" />
                <circle cx="50" cy="50" r="20" />
                <path d="M50 10 L90 90 L10 90 Z" />
            </svg>
         </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-white text-3xl md:text-5xl font-serif italic mb-10 leading-snug"
          >
            "The Mahā Meru is the bridge between the finite and the infinite."
          </motion.h2>
          <p className="text-neutral-400 font-light text-lg mb-12">
            By aligning with the vibrations of the Mahā Meru, one can dissolve malefic planetary influences and activate the dormant Śakti within the body.
          </p>
          <div className="h-px w-24 bg-[#B38728] mx-auto" />
        </div>
      </section>

      {/* --- NAVIGATION FOOTER --- */}
      <section className="py-32 text-center border-t border-neutral-100">
        <Link 
          href="/tripura-eshwari-peetam"
          className="inline-flex flex-col items-center group"
        >
          <span className="text-[10px] tracking-[0.4em] text-neutral-400 uppercase mb-4 group-hover:text-[#B38728] transition-colors">Toward the Center</span>
          <span className="text-4xl md:text-5xl font-serif italic text-neutral-800 border-b border-transparent group-hover:border-[#B38728] pb-2 transition-all duration-500">
            Tripura Eshwari Peetam
          </span>
        </Link>
      </section>

      {/* --- FULL SCREEN OVERLAY --- */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          >
            {/* Elegant Close Button */}
            <button 
                onClick={() => setSelectedImg(null)}
                className="absolute top-8 right-8 text-white z-[110] flex items-center gap-3 group"
            >
                <span className="text-[10px] tracking-[0.4em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-300">Close</span>
                <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center group-hover:border-white transition-all duration-500">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </div>
            </button>

            {/* Enlarged Image */}
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 150 }}
              src={selectedImg} 
              className="max-w-full max-h-full object-contain"
              alt="Maha Meru Detail"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}