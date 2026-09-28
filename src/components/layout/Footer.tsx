'use client';

import React from 'react';
import { Heart, Terminal, Zap, Shield, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.08] bg-[#050509]/90 backdrop-blur-2xl relative z-20 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1.5">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white text-lg tracking-tight">uShort</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30 font-mono">
              v1.0 Production Ready
            </span>
          </div>
          <p className="text-white/40 text-xs max-w-sm text-center md:text-left">
            Crafted with React Three Fiber, Framer Motion springs, Redis caching, and Base62 NanoID.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-white/50 font-mono">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <Zap className="w-3.5 h-3.5 text-neon-cyan" /> Next.js 14 App Router
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <Sparkles className="w-3.5 h-3.5 text-neon-pink" /> Three.js / R3F
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <Shield className="w-3.5 h-3.5 text-neon-purple" /> Redis & MongoDB
          </span>
        </div>

        <div className="text-xs text-white/40 text-center md:text-right">
          © {new Date().getFullYear()} uShort. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
