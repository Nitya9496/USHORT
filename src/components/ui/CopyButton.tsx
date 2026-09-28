'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '../../lib/utils';

interface CopyButtonProps {
  textToCopy: string;
  className?: string;
  triggerConfetti?: boolean;
}

export default function CopyButton({
  textToCopy,
  className,
  triggerConfetti = true,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);

      if (triggerConfetti) {
        confetti({
          particleCount: 28,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#00f0ff', '#ff007f', '#ffffff', '#9d4edd'],
          disableForReducedMotion: true,
        });
      }

      setTimeout(() => {
        setCopied(false);
      }, 2400);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.85 }}
            animate={{ opacity: 1, y: -38, scale: 1 }}
            exit={{ opacity: 0, y: -48, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 450, damping: 25 }}
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-50 whitespace-nowrap"
          >
            <div className="px-3 py-1 rounded-full bg-neon-cyan/20 border border-neon-cyan/50 text-neon-cyan text-xs font-semibold backdrop-blur-md shadow-glow-cyan flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-ping" />
              Copied to clipboard!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={handleCopy}
        whileTap={{ scale: 0.88 }}
        whileHover={{ scale: 1.05 }}
        className={cn(
          'relative p-2.5 rounded-xl transition-all duration-300 flex items-center justify-center overflow-hidden border',
          copied
            ? 'bg-neon-cyan/15 border-neon-cyan/60 text-neon-cyan shadow-glow-cyan'
            : 'bg-white/[0.05] border-white/10 text-white/80 hover:text-white hover:bg-white/[0.1] hover:border-white/20',
          className
        )}
        title="Copy to clipboard"
      >
        {copied && (
          <motion.span
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute inset-0 rounded-xl bg-neon-cyan/30 pointer-events-none"
          />
        )}

        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="check"
              initial={{ rotate: -90, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ rotate: 90, scale: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              className="flex items-center justify-center"
            >
              <Check className="w-4 h-4 text-neon-cyan stroke-[2.5]" />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ rotate: 90, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ rotate: -90, scale: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              className="flex items-center justify-center"
            >
              <Copy className="w-4 h-4 stroke-[2]" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
