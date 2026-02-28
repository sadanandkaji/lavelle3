"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<any | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const isSolidPage = pathname === "/about" || pathname === "/contact";

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCloseSequence = (callback?: () => void) => {
    setHoveredItem(null);
    setExpandedMobileItem(null);
    setTimeout(() => {
      setMenuOpen(false);
      if (callback) callback();
    }, 250); 
  };

  const handleNavigation = (href: string) => {
    handleCloseSequence(() => {
      router.push(href);
    });
  };

  const navigationData = [
    { title: "Cottage", href: "/cottage" },
    { title: "Kitchen Garden", subItems: ["Coconut & Areca Trees", "Fruit Orchards"] },
    { title: "Statues", href: "/statues" },
    { title: "Temple", subItems: ["64 Yogini Temple", "8 Mathruka", "Tripura Eshwari Peetam", "Sri Maha Meru Yantra"] },
    { title: "Farm", subItems: ["Gokula Gau Shala"] },
    { title: "Wedding Hall", href: "/wedding-hall" },
    { title: "Food Court", href: "/food-court" },
    { title: "Watch Tower", href: "/watch-tower" },
    { title: "Lake", href: "/lake" },
    { title: "Holistic Center", href: "/holistic-center" },
    { title: "Theatre", href: "/theatre" },
    { title: "Amenities", href: "/amenities" },
    { title: "Birds Aviary", href: "/birds-aviary" },
    { title: "Landscape Garden", href: "/landscape" },
  ];

  if (!mounted) return <div className="h-24 w-full fixed top-0 bg-white md:bg-transparent z-[100]" />;

  return (
    <>
      <motion.header
        initial={{ y: 0, opacity: 1 }}
        className={`fixed top-0 left-0 w-full z-[100] flex items-center px-6 md:px-16 transition-all duration-500 border-b
          ${(isScrolled || isSolidPage)
            ? "h-24 bg-white shadow-md border-black/5" 
            : "h-24 bg-white md:bg-transparent border-black/5 md:border-white/20" 
          }
        `}
      >
        <div className="max-w-[1800px] mx-auto w-full flex items-center justify-between">
          <Link href="/" className="relative h-40 w-48 md:h-42 md:w-60 transition-all duration-500 -ml-10 md:-ml-10">
            <Image
              src="/images/lavelleventurelogo.png"
              alt="Lavelle Venture"
              fill
              sizes="(max-width: 768px) 200px, 320px"
              className="object-contain transition-all duration-500"
              priority
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-14">
            {["Home", "About", "Contact"].map((item) => {
              const href = item === "Home" ? "/" : `/${item.toLowerCase()}`;
              const isActive = pathname === href;
              return (
                <Link key={item} href={href} className="group relative py-2">
                  <span className={`text-[11px] tracking-[0.35em] uppercase font-bold transition-all duration-500 ${
                    isActive ? "text-[#B38728]" : ((isScrolled || isSolidPage) ? "text-neutral-500 hover:text-black" : "text-white/70 hover:text-white")
                  }`}>
                    {item}
                  </span>
                  <motion.span initial={false} animate={{ width: isActive ? "100%" : "0%" }} className="absolute bottom-0 left-0 h-[1.5px] bg-[#B38728]" />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-8">
            <button onClick={() => setMenuOpen(true)} className="flex items-center gap-4 group">
              <span className={`text-[10px] tracking-[0.4em] uppercase font-black hidden lg:block transition-all duration-500 
                ${(isScrolled || isSolidPage) ? "text-neutral-800" : "text-white opacity-80"}`}>
                Explore
              </span>
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex flex-col items-center justify-center gap-1.5 transition-all duration-500 bg-[#B38728] shadow-lg hover:scale-105 active:scale-95">
                <div className="w-5 md:w-6 h-[2px] bg-white rounded-full" />
                <div className="w-5 md:w-6 h-[2px] bg-white rounded-full" />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => handleCloseSequence()}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150]"
            />

            {/* MAIN SIDEBAR */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-[#FAF9F6] z-[160] shadow-2xl flex flex-col border-l border-[#B38728]/20"
            >
              <div className="p-10 flex justify-between items-center border-b border-[#B38728]/10">
                <div className="flex flex-col">
                  <span className="text-[10px] tracking-[0.5em] uppercase font-black text-[#B38728]">Navigator</span>
                  <span className="text-xl font-serif text-neutral-800">Lavelle Estate</span>
                </div>
                <button onClick={() => handleCloseSequence()} className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-800 hover:bg-neutral-100">✕</button>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar px-8 py-6">
                
                {/* --- MOBILE ONLY SECTION: HOME, ABOUT, CONTACT --- */}
                <div className="md:hidden flex flex-col mb-4 border-b border-[#B38728]/10 pb-4">
                  {["Home", "About", "Contact"].map((item) => {
                    const href = item === "Home" ? "/" : `/${item.toLowerCase()}`;
                    return (
                      <button
                        key={item}
                        onClick={() => handleNavigation(href)}
                        className="py-4 flex items-center gap-6 group cursor-pointer"
                      >
                        <span className="text-[9px] font-mono text-[#B38728] opacity-50">★</span>
                        <span className="text-[12px] tracking-[0.25em] uppercase font-bold text-neutral-800 group-active:text-[#B38728]">
                          {item}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Main Navigation Data */}
                {navigationData.map((item, idx) => (
                  <div key={item.title} onMouseEnter={() => setHoveredItem(item)} className="flex flex-col">
                    <div 
                      onClick={() => {
                        if (item.subItems) {
                          setExpandedMobileItem(expandedMobileItem === item.title ? null : item.title);
                        } else if (item.href) {
                          handleNavigation(item.href);
                        }
                      }}
                      className="py-4 flex items-center justify-between group cursor-pointer border-b border-[#B38728]/5"
                    >
                      <div className="flex items-center gap-6">
                        <span className="text-[9px] font-mono text-[#B38728] opacity-50">{String(idx + 1).padStart(2, '0')}</span>
                        <span className={`text-[12px] tracking-[0.25em] uppercase font-bold transition-all duration-300 ${hoveredItem?.title === item.title ? "text-[#B38728] translate-x-2" : "text-neutral-500"}`}>
                          {item.title}
                        </span>
                      </div>
                      {item.subItems && <span className="text-[#B38728] text-xs lg:hidden">{expandedMobileItem === item.title ? "−" : "+"}</span>}
                    </div>

                    <AnimatePresence>
                      {expandedMobileItem === item.title && item.subItems && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }} 
                          animate={{ height: "auto", opacity: 1 }} 
                          exit={{ height: 0, opacity: 0 }} 
                          className="overflow-hidden bg-[#B38728]/5 lg:hidden"
                        >
                          {item.subItems.map(sub => (
                            <button 
                              key={sub} 
                              onClick={() => handleNavigation(`/${sub.toLowerCase().replace(/ /g, '-')}`)}
                              className="w-full text-left pl-14 py-4 text-[10px] tracking-widest text-neutral-600 uppercase font-bold hover:text-[#B38728]"
                            >
                              {sub}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

            
            </motion.div>

            {/* SECONDARY PANEL (DESKTOP) */}
            <AnimatePresence>
              {hoveredItem?.subItems && (
                <motion.div
                  key={hoveredItem.title}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 100, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="fixed top-0 right-[450px] h-full w-[350px] bg-[#F2EFE9] z-[155] border-r border-[#B38728]/10 hidden lg:flex flex-col justify-center p-16 shadow-xl"
                >
                  <p className="text-[10px] tracking-[0.4em] uppercase text-[#B38728] font-black mb-12 absolute top-16 left-16">Specifications</p>
                  <div className="flex flex-col gap-8">
                    {hoveredItem.subItems.map((sub: string) => (
                      <button
                        key={sub}
                        onClick={() => handleNavigation(`/${sub.toLowerCase().replace(/ /g, '-')}`)}
                        className="text-[11px] tracking-widest uppercase text-neutral-500 hover:text-neutral-900 transition-all flex items-center gap-4 group/item text-left font-bold"
                      >
                        <span className="w-0 h-[1px] bg-[#B38728] group-hover/item:w-8 transition-all" />
                        {sub}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
    </>
  );
}