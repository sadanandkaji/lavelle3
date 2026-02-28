"use client";
import { motion } from "framer-motion";

export default function StatsSection() {
  // Brand Helvetica stack
  const helvetica = "font-['Helvetica_Neue',Helvetica,Arial,sans-serif]";

  return (
    <section className={`relative h-[70vh] flex items-center justify-center overflow-hidden ${helvetica}`}>
      {/* Background with Parallax Effect */}
      <div
        className="absolute inset-0 bg-cover bg-fixed bg-center"
        style={{ backgroundImage: `url("/images/backgroundimage.jpg")` }}
      >
        {/* Adjusted overlay to ensure white text pops */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 w-full max-w-6xl px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-0">
          
          {/* Stat 1 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex-1 text-center md:text-right md:pr-16"
          >
            <h2 className="text-white text-6xl md:text-8xl font-thin tracking-tighter">
              10
            </h2>
            <p className="text-white uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mt-4">
              Masterpieces Completed
            </p>
          </motion.div>

          {/* Elegant Vertical Line - Now Pure White Gradient */}
          <motion.div 
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="hidden md:block h-32 w-[1px] bg-gradient-to-b from-transparent via-white/70 to-transparent"
          />

          {/* Simple Mobile Horizontal Line - Now White */}
          <div className="md:hidden w-12 h-[1px] bg-white/30" />

          {/* Stat 2 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex-1 text-center md:text-left md:pl-16"
          >
            <h2 className="text-white text-6xl md:text-8xl font-thin tracking-tighter">
              1K<span className="text-4xl md:text-6xl">+</span>
            </h2>
            <p className="text-white uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mt-4">
              Distinguished Residents
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}