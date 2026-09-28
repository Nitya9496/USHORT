'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  glow?: 'cyan' | 'purple' | 'pink' | 'none';
  variant?: 'subtle' | 'elevated' | 'ultra';
}

export default function GlassCard({
  children,
  className,
  glow = 'none',
  variant = 'elevated',
  ...props
}: GlassCardProps) {
  const variantStyles = {
    subtle: 'bg-white/[0.02] border-white/[0.05] backdrop-blur-md',
    elevated: 'bg-surface/[0.65] border-white/[0.08] backdrop-blur-xl shadow-glass',
    ultra: 'bg-[#0d0d16]/[0.85] border-white/[0.12] backdrop-blur-2xl shadow-2xl shadow-black/80',
  };

  const glowStyles = {
    none: '',
    cyan: 'shadow-[0_0_30px_-5px_rgba(0,240,255,0.25)] border-neon-cyan/30',
    purple: 'shadow-[0_0_30px_-5px_rgba(157,78,221,0.25)] border-neon-purple/30',
    pink: 'shadow-[0_0_30px_-5px_rgba(255,0,127,0.25)] border-neon-pink/30',
  };

  return (
    <motion.div
      className={cn(
        'relative rounded-2xl border transition-all duration-300 overflow-hidden',
        variantStyles[variant],
        glowStyles[glow],
        className
      )}
      {...props}
    >
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
}
