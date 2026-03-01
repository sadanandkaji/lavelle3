"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function AmenitiesPage() {
  const [fullScreenImg, setFullScreenImg] = useState<string | null>(null);

  const facilities = [
    { 
      title: "Śrī Vidyā Mandira", 
      label: "Knowledge", 
      desc: "A values-based school rooted in tradition, focusing on holistic child development. We blend cultural heritage, skill-based learning, and human values to nurture confident, compassionate, and capable individuals." 
    },
    { 
      title: "Prāṇa Athletics", 
      label: "Vitality", 
      desc: "State-of-the-art sports facilities including tennis courts and swimming zones, designed to enhance physical endurance and life-force." 
    },
    { 
      title: "Gurukulam Living", 
      label: "Tradition", 
      desc: "Residential spaces that foster a sense of community, discipline, and shared spiritual growth for students and seekers." 
    },
    { 
      title: "Zenith Courts", 
      label: "Focus", 
      desc: "Premium sports arenas where physical competition becomes a tool for developing mental concentration and agility." 
    },
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
          <source src="/videos/12amenities.mp4" type="video/mp4" />
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
            Evolution of Mind & Body
          </motion.span>
          <motion.h1 
            initial={{ y: 30, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-6xl md:text-9xl font-serif italic text-white drop-shadow-2xl"
          >
            Śrī Vidyā Mandira
          </motion.h1>
          <p className="mt-8 text-white/90 font-light tracking-widest uppercase text-[10px] md:text-xs">
            Where Wisdom Meets Vitality
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

      {/* --- INTEGRATED WELLNESS SECTION (VIDYA MANDIRA) --- */}
      <section className="max-w-7xl mx-auto px-6 py-32 md:py-48">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:sticky lg:top-32"
          >
            <h2 className="text-[10px] tracking-[0.5em] text-[#B38728] font-bold uppercase mb-8">The Dual Path</h2>
            <h3 className="text-4xl md:text-6xl font-serif text-neutral-900 mb-10 leading-tight">
              Nurturing the <br /><span className="italic text-neutral-400 font-light">Whole Being.</span>
            </h3>
            <div className="space-y-6 text-neutral-600 text-lg font-light leading-relaxed max-w-xl">
              <p>
                The amenities at Eshwari Siddha Peeta are designed to facilitate the "balanced life." While the Mandira serves as a sanctuary for intellectual inquiry and traditional values, our sports facilities provide the outlet for physical discipline.
              </p>
            </div>
          </motion.div>

          {/* VERTICAL IMAGE STACK (CLICKABLE) */}
          <div className="flex flex-col gap-8 md:gap-12">
            {[
              { src: "/images/vidyamadirimage.jpg", label: "The Sacred Entrance" },
              { src: "/images/vidyamandir2image.jpg", label: "Architectural Grandeur" }
            ].map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative group cursor-pointer overflow-hidden rounded-sm shadow-xl"
                onClick={() => setFullScreenImg(img.src)}
              >
                <img 
                  src={img.src} 
                  alt={`Vidya Mandira ${img.label}`} 
                  className="w-full h-[450px] md:h-[650px] object-cover transition-transform duration-[2.5s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute bottom-8 left-8">
                  <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-white drop-shadow-lg">{img.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ATHLETICS VISUAL SECTION (CLICKABLE) --- */}
      <section className="px-6 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="max-w-7xl mx-auto relative group cursor-pointer overflow-hidden rounded-sm shadow-2xl"
          onClick={() => setFullScreenImg("/images/sport.jpg")}
        >
          <img 
            src="/images/sport.jpg" 
            alt="Prāṇa Athletics Facilities" 
            className="w-full h-[50vh] md:h-[80vh] object-cover transition-transform duration-[3s] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="text-center">
                <p className="text-[10px] tracking-[0.8em] text-white uppercase font-bold mb-4">Prāṇa Athletics</p>
                <h3 className="text-4xl md:text-6xl font-serif italic text-white">Vitality in Motion</h3>
                <span className="mt-6 inline-block text-[9px] tracking-widest text-white/60 uppercase border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">Tap to expand</span>
             </div>
          </div>
        </motion.div>
      </section>

      {/* --- AMENITIES GRID --- */}
      <section className="bg-white py-32 border-y border-neutral-100 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {facilities.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-10 border border-neutral-100 hover:border-[#B38728] transition-all duration-500"
              >
                <div className="text-[9px] font-bold tracking-[0.4em] text-[#B38728] uppercase mb-6 block">{item.label}</div>
                <h4 className="text-2xl font-serif italic text-neutral-900 mb-4">{item.title}</h4>
                <p className="text-sm text-neutral-500 font-light leading-relaxed group-hover:text-neutral-700">
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
        <Link href="/theatre" className="inline-flex flex-col items-center group">
          <span className="text-[10px] tracking-[0.4em] text-neutral-400 uppercase mb-4 group-hover:text-[#B38728] transition-colors">Return to Culture</span>
          <span className="text-4xl md:text-5xl font-serif italic text-neutral-800 border-b border-transparent group-hover:border-[#B38728] pb-2 transition-all duration-500">
            Amphitheater
          </span>
        </Link>
      </section>
    </main>
  );
}