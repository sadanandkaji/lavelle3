"use client";
import React from "react";
import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  // Brand Helvetica stack
  const helvetica = "font-['Helvetica_Neue',Helvetica,Arial,sans-serif]";

  return (
    <footer className={`bg-white border-t border-stone-100 pt-24 pb-12 px-6 md:px-20 ${helvetica}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          
          {/* Brand Section - Text Only */}
          <div className="md:col-span-5 space-y-8">
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-[0.15em] uppercase text-stone-900">
                Lavelle
              </span>
              <span className="text-sm tracking-[0.4em] uppercase text-stone-400 mt-1 font-medium">
                Venture
              </span>
            </div>
            
            <p className="text-stone-500 text-sm leading-relaxed max-w-sm font-normal">
              Introducing a unique and transformative development— 227 acres of pristine farmland surrounding the sacred abode of Devi Sri Tripuraeshwari.
            </p>

            <div className="flex gap-6">
               <div className="w-8 h-[1px] bg-[#B38728] self-center" />
               <p className="text-[#B38728] text-[10px] tracking-[0.4em] uppercase font-bold">
                 Legacy in Living
               </p>
            </div>
          </div>

          {/* Navigation Section */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="text-[11px] tracking-[0.3em] uppercase font-bold text-stone-900">Explore</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-stone-500 hover:text-black text-sm transition-all duration-300 font-normal">Home</Link></li>
              <li><Link href="/about" className="text-stone-500 hover:text-black text-sm transition-all duration-300 font-normal">About</Link></li>
              <li><Link href="/contact" className="text-stone-500 hover:text-black text-sm transition-all duration-300 font-normal">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="text-[11px] tracking-[0.3em] uppercase font-bold text-stone-900">Contact</h4>
            <div className="space-y-6 text-sm text-stone-500 font-normal leading-relaxed">
              
              <div className="flex gap-4">
                <MapPin className="w-5 h-5 text-[#B38728] shrink-0" strokeWidth={1.5} />
                <div className="flex flex-col">
                  <p>Number 125, Raj Tower, 3rd Floor,</p>
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-black transition-colors underline underline-offset-4 decoration-stone-200"
                  >
                    MM Road, Frazer Town,
                  </a>
                  <p>Bangalore 560005.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-[#B38728] shrink-0" strokeWidth={1.5} />
                  <a href="mailto:lavelleventure@gmail.com" className="hover:text-black transition-colors">
                    lavelleventure@gmail.com
                  </a>
                </div>

                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-[#B38728] shrink-0" strokeWidth={1.5} />
                  <a href="tel:+919187569958" className="hover:text-black transition-colors">
                    +91 91875 69958
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-stone-400 text-[10px] tracking-widest uppercase font-medium">
            © 2026 Lavelle Venture. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-stone-400 hover:text-[#B38728] text-[10px] tracking-widest uppercase transition-colors font-medium">Privacy</Link>
            <Link href="#" className="text-stone-400 hover:text-[#B38728] text-[10px] tracking-widest uppercase transition-colors font-medium">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}