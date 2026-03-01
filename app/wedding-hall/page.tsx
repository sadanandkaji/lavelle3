"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function WeddingHallPage() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const gallery = [
    { src: "/images/weedinghallimage.jpg", alt: "Main Wedding Hall", label: "The Grand Mandapam" },
    { src: "/images/wedding1image.jpg", alt: "Ceremony Detail", label: "Sacred Rites" },
    { src: "/images/wedding2image.jpg", alt: "Hall Perspective", label: "Vedic Architecture" },
    { src: "/images/wedding3image.jpg", alt: "Atmosphere", label: "Celestial Union" },
  ];

  const amenities = [
    { title: "Vedic Sanctity", label: "Ritual", desc: "A space designed to align with Vastu Shastra, ensuring that every ceremony is blessed by cosmic harmony." },
    { title: "Grand Capacity", label: "Scale", desc: "An expansive hall capable of hosting large gatherings without compromising on the intimacy of the moment." },
    { title: "Natural Light", label: "Atmosphere", desc: "Thoughtfully designed apertures allow soft, natural light to bathe the mandapam throughout the day." },
    { title: "Sacred Backdrop", label: "Vista", desc: "Situated with a direct view of the temple complex, providing a spiritual anchor for new beginnings." },
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
          <source src="/videos/6weddinghall.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[10px] tracking-[0.6em] text-white uppercase font-bold mb-4 drop-shadow-md"
          >
            Sacred Unions
          </motion.span>
          <motion.h1 
            initial={{ y: 30, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-6xl md:text-9xl font-serif italic text-white drop-shadow-2xl"
          >
            Wedding Hall
          </motion.h1>
          <p className="mt-8 text-white/90 font-light tracking-widest uppercase text-[10px] md:text-xs">
            Where Eternity Begins
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

      {/* --- THE CONCEPT & GALLERY SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 py-32 md:py-48">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 lg:sticky lg:top-32"
          >
            <h2 className="text-[10px] tracking-[0.5em] text-[#B38728] font-bold uppercase mb-8">The Kalyana Mantapa</h2>
            <h3 className="text-5xl md:text-7xl font-serif text-neutral-900 mb-12 leading-tight">
              Architecture <span className="italic text-neutral-400 font-light">for Devotion.</span>
            </h3>
            <div className="space-y-8 text-neutral-600 text-lg font-light leading-relaxed">
              <p>
                The Wedding Hall at Eshwari Siddha Peeta is more than a venue; it is a consecrated space. Inspired by Dravidian temple halls, it provides a serene stage for the sacred union of souls.
              </p>
              <p>
                Every pillar is crafted to resonate with the chanting of Vedic hymns, ensuring that the vibrational quality of the space remains pure and uplifting.
              </p>
            </div>
          </motion.div>

          {/* Interactive Image Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            {gallery.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedImg(img.src)}
                className={`relative group cursor-pointer overflow-hidden rounded-sm bg-neutral-100 ${
                  idx === 0 ? "col-span-2 aspect-[16/9]" : "aspect-[4/5]"
                }`}
              >
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-[8px] tracking-[0.3em] text-white uppercase font-bold drop-shadow-md">{img.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- AMENITIES GRID --- */}
      <section className="bg-white py-32 border-y border-neutral-100 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {amenities.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group border-l border-neutral-100 pl-8 py-2 hover:border-[#B38728]/30 transition-colors duration-500"
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

      {/* --- PHILOSOPHICAL BANNER --- */}
      <section className="py-48 text-center relative overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03]">
           <span className="text-[20vw] font-serif italic">Kalyana</span>
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-12">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-serif italic text-neutral-900 leading-tight"
          >
            "A union witnessed by the Divine is a union that transcends time."
          </motion.h2>
          <div className="h-px w-24 bg-[#B38728]/30 mx-auto" />
        </div>
      </section>

      {/* --- NAVIGATION FOOTER --- */}
      <section className="py-32 text-center border-t border-neutral-50 bg-[#FBFBFA]">
        <Link 
          href="/gokula-gau-shala"
          className="inline-flex flex-col items-center group"
        >
          <span className="text-[10px] tracking-[0.4em] text-neutral-400 uppercase mb-4 group-hover:text-[#B38728] transition-colors">Discover the Grounds</span>
          <span className="text-4xl md:text-5xl font-serif italic text-neutral-800 border-b border-transparent group-hover:border-[#B38728] pb-2 transition-all duration-500">
            Gokula Gau Shāla
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
            className="fixed inset-0 z-[100] bg-neutral-950/98 flex items-center justify-center p-4 md:p-12"
          >
            <button 
                onClick={() => setSelectedImg(null)}
                className="absolute top-8 right-8 text-white z-[110] flex items-center gap-4 group"
            >
                <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center group-hover:border-white group-hover:rotate-90 transition-all duration-500">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </div>
            </button>

            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              src={selectedImg} 
              className="max-w-full max-h-full object-contain"
              alt="Gallery Preview"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}