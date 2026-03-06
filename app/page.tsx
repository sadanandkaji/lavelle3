"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/Hero/HeroSection";
import StatsSection from "./components/StatsSection";
import CTASection from "./components/CTASection";
import FloatingContact from "./components/FloatingContact";
import ChatModal from "./components/chatapp/chat"; // Import the chat component

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <main className="bg-white selection:bg-[#B38728] selection:text-white pb-20 md:pb-0 relative min-h-screen">
      <HeroSection />
      <StatsSection />
      <CTASection />
      
      {/* Floating Contact (Email/Phone usually) */}
      <FloatingContact />

      {/* Robot Trigger Button */}
      <button 
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 z-[90] bg-[#1b4332] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95 group"
        aria-label="Open Chat"
      >
        {/* Simple Robot SVG Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="10" rx="2"></rect>
          <circle cx="12" cy="5" r="2"></circle>
          <path d="M12 7v4"></path>
          <line x1="8" y1="16" x2="8" y2="16"></line>
          <line x1="16" y1="16" x2="16" y2="16"></line>
        </svg>
        {/* Tooltip */}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Ask Lavelle AI
        </span>
      </button>

      {/* The Chat Modal */}
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </main>
  );
}