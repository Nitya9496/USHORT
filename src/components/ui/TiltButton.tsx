'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '../../lib/utils';

interface TiltButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'glass';
  glowColor?: 'cyan' | 'pink' | 'purple';
}

export default function TiltButton({
  children,
  className,
  variant = 'primary',
  glowColor = 'cyan',
  onClick,
  disabled,
  ...props
}: TiltButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 18, stiffness: 220, mass: 0.6 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [14, -14]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);

  const glareX = useTransform(smoothX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(smoothY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || disabled) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseEnter = () => {
    if (!disabled) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const glowClasses = {
    cyan: 'shadow-glow-cyan hover:border-neon-cyan/60 hover:shadow-[0_0_35px_-2px_rgba(0,240,255,0.7)]',
    pink: 'shadow-glow-pink hover:border-neon-pink/60 hover:shadow-[0_0_35px_-2px_rgba(255,0,127,0.7)]',
    purple: 'shadow-glow-purple hover:border-neon-purple/60 hover:shadow-[0_0_35px_-2px_rgba(157,78,221,0.7)]',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-neon-cyan via-cyan-400 to-neon-purple text-black font-semibold tracking-wide',
    secondary:
      'bg-surface-subtle text-white border border-white/10 hover:border-white/25',
    glass:
      'bg-white/[0.05] backdrop-blur-xl text-white border border-white/15 hover:bg-white/[0.1]',
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 800,
        rotateX,
        rotateY,
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(
        'relative group overflow-hidden rounded-xl px-6 py-3.5 flex items-center justify-center gap-2.5 transition-all duration-200 select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        variant === 'primary' && glowClasses[glowColor],
        className
      )}
      {...(props as any)}
    >
      <span
        style={{ transform: 'translateZ(20px)' }}
        className="relative z-10 flex items-center gap-2 font-medium"
      >
        {children}
      </span>

      {isHovered && !disabled && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-xl z-20 mix-blend-overlay opacity-70"
          style={{
            background: `radial-gradient(circle 90px at ${glareX} ${glareY}, rgba(255, 255, 255, 0.75), transparent)`,
          }}
        />
      )}

      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
    </motion.button>
  );
}
