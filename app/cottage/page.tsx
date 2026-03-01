"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image"; // Recommended for Next.js

export default function CottagePage() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const features = [
    {
      title: "The Serene Lake",
      description: "Wake up to the gentle ripples of our private lake. A sanctuary of peace where the water reflects the shifting hues of the sky, offering a perfect backdrop for morning meditation or evening reflection.",
    },
    {
      title: "Bespoke Sitting Area",
      description: "Designed for comfort and conversation, our spacious sitting areas blend indoor luxury with the raw beauty of nature. Large glass facades ensure you never feel disconnected from the landscape.",
    },
    {
      title: "Your Private Kitchen Garden",
      description: "Experience true farm-to-table living. Each cottage features its own dedicated farm space where Coconut and Areca trees flourish, allowing guests to connect deeply with the soil of Eshwari Farms.",
    },
  ];

  return (
    <main className="bg-[#F6F5F2] min-h-screen">
      {/* --- HERO SECTION: VIDEO --- */}
      <section className="relative h-screen w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/videos/1cottage01.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[10px] md:text-[12px] tracking-[0.5em] uppercase font-bold mb-4"
          >
            Luxury Living
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif italic"
          >
            The Cottage
          </motion.h1>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[8px] uppercase tracking-widest text-white/60">Scroll to explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

      {/* --- DESCRIPTION SECTION --- */}
      <section className="max-w-[1400px] mx-auto px-6 py-24 md:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[10px] tracking-[0.4em] text-[#B38728] font-bold uppercase mb-6">
              Estate Living
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif leading-tight text-neutral-900">
              Where the soul finds <br /> 
              <span className="italic text-neutral-500">its natural rhythm.</span>
            </h3>
            
            {/* --- CLICKABLE IMAGE --- */}
            <div className="mt-12 group cursor-pointer overflow-hidden rounded-sm" onClick={() => setIsFullScreen(true)}>
                <img 
                    src="/images/cottageimage.jpg" 
                    alt="The Cottage View" 
                    className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <p className="mt-3 text-[10px] uppercase tracking-widest text-neutral-400">Click to expand view</p>
            </div>

            <p className="mt-8 text-neutral-600 leading-relaxed max-w-md">
              The Cottages at Eshwari Farms are more than just accommodations; they are integrated ecosystems designed to bring you back to nature without compromising on modern elegance.
            </p>
          </motion.div>

          <div className="flex flex-col gap-12">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="border-l border-neutral-200 pl-8 relative"
              >
                <div className="absolute left-[-1px] top-0 w-[1px] h-6 bg-[#B38728]" />
                <h4 className="text-lg font-serif italic text-neutral-900 mb-3">{feature.title}</h4>
                <p className="text-sm text-neutral-500 leading-relaxed font-light">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FULL SCREEN OVERLAY --- */}
      <AnimatePresence>
        {isFullScreen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4 md:p-10"
          >
            {/* Close Button */}
            <button 
                onClick={() => setIsFullScreen(false)}
                className="absolute top-8 right-8 text-white z-[110] group flex items-center gap-2"
            >
                <span className="text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Close</span>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                </svg>
            </button>

            {/* Large Image */}
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              src="/images/cottageimage.jpg" 
              className="max-w-full max-h-full object-contain shadow-2xl"
              alt="Cottage Full Screen"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}