"use client";

import { useState, useEffect, useRef } from "react";

type Message = { type: "user" | "bot"; text: string };
type Template = { id: number; label: string; query: string };

export default function ChatModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { type: "bot", text: "Welcome to **Lavelle Venture**. How can I help you explore our spiritual farmland today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [availableTemplates, setAvailableTemplates] = useState<Template[]>([
    { id: 1, label: "🏢 About Us", query: "What is Lavelle Venture and their contact details?" },
    { id: 2, label: "📐 Plot Sizes", query: "Give me an overview of plot size and farmhouse details." },
    { id: 3, label: "📅 How to Book", query: "How can I book a plot?" },
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom whenever messages or loading state changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (templateId?: number, queryText?: string) => {
    const messageToSend = queryText || input;
    if (!messageToSend.trim()) return;

    if (templateId) {
      setAvailableTemplates((prev) => prev.filter((t) => t.id !== templateId));
    }

    setMessages((prev) => [...prev, { type: "user", text: messageToSend }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: messageToSend }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { type: "bot", text: data.answer || "I'm sorry, I couldn't find an answer to that." }]);
    } catch {
      setMessages((prev) => [...prev, { type: "bot", text: "❌ Connection error. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  // Logic to determine the label of the action button
  const getLinkLabel = (url: string) => {
    if (url.includes("lavelleventure.com/contact") || url.includes("/contact")) {
      return "📅 Contact Us";
    }
    if (url.includes("wa.me") || url.includes("whatsapp")) {
      return "💬 Message on WhatsApp";
    }
    if (url.startsWith("tel:")) {
      return "📞 Call Support";
    }
    if (url.startsWith("mailto:")) {
      return "✉️ Send Email";
    }
    return "🌐 Visit Website";
  };

  const formatMessage = (content: string) => {
    // Splits text to identify Bold markers and URLs
    const parts = content.split(/(\*\*.*?\*\*|https?:\/\/[^\s]+|tel:[^\s]+|mailto:[^\s]+)/g);
    
    return parts.map((part, i) => {
      if (!part) return null;

      // Render Bold Text
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="font-bold text-[#1b4332]">{part.slice(2, -2)}</strong>;
      }

      // Render Links as Interactive Buttons
      if (part.startsWith("http") || part.startsWith("tel:") || part.startsWith("mailto:")) {
        const isContact = part.includes("/contact");
        
        return (
          <div key={i} className="my-3 flex justify-start">
            <a 
              href={part} 
              target="_blank" 
              rel="noreferrer" 
              className={`
                inline-flex items-center justify-center gap-2 
                px-6 py-3 rounded-xl text-xs font-bold shadow-md 
                transition-all active:scale-95 no-underline
                ${isContact 
                  ? "bg-[#B38728] text-white hover:bg-[#967020]" // Gold for Contact
                  : "bg-[#1b4332] text-white hover:bg-[#2d6a4f]" // Green for others
                }
              `}
            >
              {getLinkLabel(part)}
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        );
      }

      return part;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-[70px] left-0 right-0 bottom-0 z-[100] flex items-end justify-end p-3 sm:p-4 md:p-6 transition-all pointer-events-none">
      
      <div className="
        flex flex-col 
        w-full h-full 
        sm:max-w-[400px] sm:h-[600px] sm:max-h-[80vh] 
        bg-white 
        rounded-[2.5rem] 
        shadow-2xl 
        overflow-hidden 
        relative 
        border border-stone-200
        animate-in slide-in-from-bottom-5 duration-300 
        pointer-events-auto
      ">
        
        {/* Header */}
        <header className="bg-[#1b4332] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center font-bold border border-white/10">LV</div>
            <div>
              <h1 className="font-bold text-sm tracking-wide">Lavelle Assistant</h1>
              <p className="text-[10px] opacity-90 flex items-center gap-1.5 uppercase tracking-widest font-medium">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span> 
                Online
              </p>
            </div>
          </div>
          <button onClick={onClose} className="hover:bg-white/10 p-2 rounded-full transition-colors active:scale-90">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </header>

        {/* Chat Body */}
        <main 
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#fcfcf9] relative no-scrollbar"
          style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }}
        >
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`p-4 rounded-[1.5rem] max-w-[88%] sm:max-w-[85%] text-[14px] leading-relaxed shadow-sm border ${
                msg.type === "user" 
                  ? "bg-[#2d6a4f] text-white rounded-tr-none border-transparent" 
                  : "bg-white text-gray-800 rounded-tl-none border-stone-200"
              }`}>
                {msg.text.split("\n").map((line, j) => (
                  <div key={j} className="mb-1 last:mb-0">{formatMessage(line)}</div>
                ))}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white px-5 py-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1.5 border border-stone-200">
                <div className="w-2 h-2 bg-[#2d6a4f]/40 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#2d6a4f]/60 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-[#2d6a4f] rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
          <div ref={bottomRef} className="h-2" />
        </main>

        {/* Templates Area */}
        {availableTemplates.length > 0 && (
          <div className="px-4 py-3 bg-white border-t border-stone-100 flex overflow-x-auto no-scrollbar gap-2 shrink-0">
            {availableTemplates.map((t) => (
              <button 
                key={t.id} 
                onClick={() => sendMessage(t.id, t.query)} 
                className="whitespace-nowrap text-[12px] font-semibold text-stone-700 bg-stone-50 hover:bg-[#2d6a4f] hover:text-white px-5 py-2 rounded-full border border-stone-200 transition-all active:scale-95 shadow-sm"
              >
                {t.label}
              </button>
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="p-4 sm:p-5 bg-white flex gap-2 border-t border-stone-200 shrink-0 pb-6 sm:pb-5">
          <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyDown={(e) => e.key === "Enter" && sendMessage()} 
            placeholder="Ask about your plot..." 
            className="flex-1 bg-stone-100 rounded-2xl px-5 py-3 text-[16px] text-black outline-none focus:ring-1 focus:ring-[#2d6a4f]/30" 
          />
          <button 
            onClick={() => sendMessage()} 
            disabled={loading || !input.trim()} 
            className="bg-[#1b4332] text-white p-3 rounded-2xl disabled:opacity-40 flex items-center justify-center transition-transform active:scale-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </footer>
      </div>
    </div>
  );
}