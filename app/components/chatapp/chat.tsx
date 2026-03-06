"use client";

import { useState, useEffect, useRef } from "react";

type Message = {
  type: "user" | "bot";
  text: string;
};

type Template = {
  id: number;
  label: string;
  query: string;
};

export default function ChatModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { type: "bot", text: "Welcome to **Lavelle Venture**. How can I help you explore our spiritual farmland today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [availableTemplates, setAvailableTemplates] = useState<Template[]>([
    { id: 1, label: "🏢 About Lavelle Venture", query: "What is Lavelle Venture and their contact details?" },
    { id: 2, label: "📐 Plot Overview", query: "Give me an overview of an individual plot size, dimensions, and farmhouse details." },
    { id: 3, label: "🌳 Full Farm Information", query: "Tell me about the full farm project: total acres, total plots, and the plantation model." },
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (templateId?: number, queryText?: string) => {
    const messageToSend = queryText || input;
    if (!messageToSend.trim()) return;

    // Remove the template button once clicked
    if (templateId) {
      setAvailableTemplates((prev) => prev.filter((t) => t.id !== templateId));
    }

    const userMessage: Message = { type: "user", text: messageToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Updated to point to your Next.js API route
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: messageToSend }),
      });

      const data = await response.json();

      if (data.answer) {
        setMessages((prev) => [...prev, { type: "bot", text: data.answer }]);
      } else {
        throw new Error("No answer received");
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "❌ I'm having trouble connecting to the server. Please try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatBold = (content: string) => {
    return content.split(/(\*\*.*?\*\*)/g).map((part, i) => (
      part.startsWith("**") && part.endsWith("**") 
        ? <strong key={i} className="font-bold text-[#1b4332]">{part.slice(2, -2)}</strong> 
        : part
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-end p-4 md:p-6 bg-black/40 backdrop-blur-sm transition-all">
      <div className="flex flex-col w-full max-w-[400px] h-[80vh] max-h-[600px] bg-white shadow-2xl rounded-3xl overflow-hidden relative border border-stone-300 animate-in slide-in-from-bottom-5 duration-300">
        
        {/* Header */}
        <header className="bg-[#1b4332] text-white p-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center font-bold border border-white/10 text-white">LV</div>
            <div>
              <h1 className="font-bold text-sm tracking-wide">Lavelle Assistant</h1>
              <p className="text-[10px] opacity-90 flex items-center gap-1.5 uppercase tracking-widest font-medium">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span> 
                Ready to Help
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="hover:bg-white/10 p-2 rounded-full transition-colors active:scale-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </header>

        {/* Chat Body */}
        <main 
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#fcfcf9] relative scrollbar-thin scrollbar-thumb-stone-300"
          style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }}
        >
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`p-3.5 rounded-2xl max-w-[85%] text-[13.5px] leading-relaxed shadow-sm transition-all ${
                msg.type === "user" 
                  ? "bg-[#2d6a4f] text-white rounded-tr-none" 
                  : "bg-white text-gray-800 rounded-tl-none border border-stone-200"
              }`}>
                {msg.type === "bot" 
                  ? msg.text.split("\n").map((line, j) => <p key={j} className="mb-1.5 last:mb-0">{formatBold(line)}</p>) 
                  : msg.text
                }
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1.5 border border-stone-200">
                <div className="w-2 h-2 bg-[#2d6a4f]/40 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#2d6a4f]/60 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-[#2d6a4f] rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </main>

        {/* Templates Area */}
        {availableTemplates.length > 0 && (
          <div className="p-3 bg-white border-t border-stone-100 flex flex-wrap gap-2">
            {availableTemplates.map((t) => (
              <button 
                key={t.id} 
                onClick={() => sendMessage(t.id, t.query)} 
                className="text-[11px] font-medium text-stone-700 bg-stone-50 hover:bg-[#2d6a4f] hover:text-white px-3.5 py-1.5 rounded-full border border-stone-200 transition-all active:scale-95"
              >
                {t.label}
              </button>
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="p-4 bg-white flex gap-2 border-t border-stone-200 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
          <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyDown={(e) => e.key === "Enter" && sendMessage()} 
            placeholder="Type your message..." 
            className="flex-1 bg-stone-100 rounded-xl px-4 py-2.5 text-sm text-black outline-none focus:ring-2 focus:ring-[#2d6a4f]/20 transition-all placeholder:text-stone-400" 
          />
          <button 
            onClick={() => sendMessage()} 
            disabled={loading || !input.trim()} 
            className="bg-[#1b4332] text-white p-2.5 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#2d6a4f] transition-colors shadow-md active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </footer>
      </div>
    </div>
  );
}