'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Zap,
  ShieldCheck,
  Cpu,
  Layers,
  BarChart,
  ArrowDown,
} from 'lucide-react';
import FluidShortener from '../components/ui/FluidShortener';
import AnalyticsDashboard from '../components/analytics/AnalyticsDashboard';
import GlassCard from '../components/ui/GlassCard';
import TiltButton from '../components/ui/TiltButton';
import { ShortenUrlResponse } from '../types';

const Scene3D = dynamic(() => import('../components/3d/Scene3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[380px] sm:h-[480px] md:h-[580px] lg:h-[640px] flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-2 border-neon-cyan border-t-transparent animate-spin" />
    </div>
  ),
});

export default function HomePage() {
  const [activeShortCode, setActiveShortCode] = useState<string>('demo');

  const handleUrlShortened = (data: ShortenUrlResponse['data']) => {
    setActiveShortCode(data.shortCode);
  };

  const handleViewAnalytics = (code: string) => {
    setActiveShortCode(code);
    const element = document.getElementById('analytics');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 bg-cyber-grid bg-[size:48px_48px] pointer-events-none opacity-40" />

      <section id="shortener" className="relative w-full max-w-7xl mx-auto pt-8 pb-20 px-4 sm:px-6 flex flex-col items-center justify-center">
        <div className="w-full relative">
          <Scene3D />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-xl text-xs sm:text-sm font-medium text-white/90 mb-4 shadow-glass pointer-events-auto"
            >
              <Sparkles className="w-4 h-4 text-neon-cyan" />
              <span>Next-Generation Spatial URL Engine</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white max-w-4xl leading-[1.08]"
            >
              Transform Links into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-purple-400 to-neon-pink">
                Dimensional Portals
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-4 text-white/60 text-sm sm:text-lg max-w-xl text-center"
            >
              Sub-50ms Redis edge resolution, collision-free Base62 NanoID keys, and fluid physics-driven interactions.
            </motion.p>
          </div>
        </div>

        <div className="w-full -mt-8 sm:-mt-12 relative z-30">
          <FluidShortener
            onUrlShortened={handleUrlShortened}
            onViewAnalytics={handleViewAnalytics}
          />
        </div>

        <div className="mt-14 flex items-center justify-center">
          <a
            href="#analytics"
            className="flex flex-col items-center gap-2 text-white/40 hover:text-neon-cyan text-xs font-mono transition-colors"
          >
            <span>DISCOVER TELEMETRY</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </section>

      <div className="w-full border-t border-white/[0.06] bg-gradient-to-b from-transparent via-[#090913]/60 to-transparent">
        <AnalyticsDashboard initialCode={activeShortCode} />
      </div>

      <section id="architecture" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-24 relative z-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-xs font-semibold uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5" />
            Engineering Philosophy
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            High-Performance System Architecture
          </h2>
          <p className="text-white/50 text-sm sm:text-base mt-3">
            Engineered from ground up without AI boilerplate templates. Precision 3D shaders, physics spring engines, and sub-50ms edge caching.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard variant="elevated" className="p-8 group hover:border-neon-cyan/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Three.js & R3F Shaders</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Parametric Torus Knot ribbon coupled with critically-damped cursor tracking and dynamic vertex morphing. DPR clamped to ensure steady 60 FPS across all viewports.
            </p>
          </GlassCard>

          <GlassCard variant="elevated" className="p-8 group hover:border-neon-pink/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-neon-pink/10 border border-neon-pink/30 text-neon-pink flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Sub-50ms Redis Caching</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              L1 memory-first resolution pipeline. Incoming redirects hit Redis cache for immediate 302 handoff, while telemetry logs are recorded asynchronously without blocking.
            </p>
          </GlassCard>

          <GlassCard variant="elevated" className="p-8 group hover:border-neon-purple/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-neon-purple/10 border border-neon-purple/30 text-neon-purple flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Framer Motion Springs</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Liquid layout morphing transforms the active input capsule into the shortened URL display card using mass, damping, and stiffness spring physics.
            </p>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
