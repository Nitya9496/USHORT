'use client';

import React from 'react';
import { Sparkles, Terminal, Github } from 'lucide-react';
import TiltButton from '../ui/TiltButton';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#07070b]/60 border-b border-white/[0.08] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-neon-cyan via-indigo-600 to-neon-pink p-[1.5px] shadow-glow-cyan transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#07070b] rounded-[10px] flex items-center justify-center">
              <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-white text-xl">
                µ
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold text-white tracking-tight flex items-center gap-1">
              uShort<span className="text-neon-cyan">.</span>
            </span>
            <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
              Next-Gen 3D Shortener
            </span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <a href="#shortener" className="hover:text-neon-cyan transition-colors">
            Shorten
          </a>
          <a href="#analytics" className="hover:text-neon-cyan transition-colors">
            Analytics
          </a>
          <a href="#architecture" className="hover:text-neon-cyan transition-colors">
            Architecture
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-white/70">
            <span className="w-2 h-2 rounded-full bg-neon-lime animate-ping" />
            <span>&lt; 50ms Edge Caching</span>
          </div>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white hover:text-neon-cyan hover:bg-white/[0.1] transition-all"
            title="View Source on GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
