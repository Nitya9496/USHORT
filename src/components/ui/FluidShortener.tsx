'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Sparkles, ArrowRight, ExternalLink, QrCode, RotateCcw, BarChart3, CheckCircle2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import TiltButton from './TiltButton';
import CopyButton from './CopyButton';
import GlassCard from './GlassCard';
import { shortenUrl } from '../../lib/api';
import { ShortenUrlResponse } from '../../types';
import { truncateUrl } from '../../lib/utils';

interface FluidShortenerProps {
  onUrlShortened?: (data: ShortenUrlResponse['data']) => void;
  onViewAnalytics?: (code: string) => void;
}

export default function FluidShortener({ onUrlShortened, onViewAnalytics }: FluidShortenerProps) {
  const [url, setUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [showAliasInput, setShowAliasInput] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ShortenUrlResponse['data'] | null>(null);
  const [showQR, setShowQR] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setError('Please paste or type a destination link');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const res = await shortenUrl({
        url: url.trim(),
        customAlias: customAlias.trim() || undefined,
      });

      if (res.success && res.data) {
        setResult(res.data);
        if (onUrlShortened) onUrlShortened(res.data);
      } else {
        setError(res.error || 'Failed to shorten URL');
      }
    } catch (err: any) {
      setError(err.message || 'Network error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setUrl('');
    setCustomAlias('');
    setError(null);
    setShowQR(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 relative z-30">
      <motion.div
        layout
        layoutId="shortener-container"
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 24,
          mass: 0.9,
        }}
        className="w-full"
      >
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="input-form"
              initial={{ opacity: 0, y: 15, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard
                variant="ultra"
                className={`p-2 sm:p-3 transition-all duration-500 rounded-3xl ${
                  isFocused
                    ? 'ring-2 ring-neon-cyan/50 shadow-[0_0_50px_-8px_rgba(0,240,255,0.45)]'
                    : 'hover:border-white/20'
                }`}
              >
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                  <div className="relative flex flex-col sm:flex-row items-center gap-2">
                    <div className="hidden sm:flex items-center pl-4 text-neon-cyan">
                      <Link2 className={`w-5 h-5 transition-transform duration-300 ${isFocused ? 'scale-110 rotate-12' : ''}`} />
                    </div>

                    <input
                      type="url"
                      value={url}
                      onChange={(e) => {
                        setUrl(e.target.value);
                        if (error) setError(null);
                      }}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      placeholder="Paste your lengthy destination URL here..."
                      className="w-full bg-transparent px-4 py-4 text-white text-base sm:text-lg placeholder-white/35 focus:outline-none font-normal"
                      required
                    />

                    <TiltButton
                      type="submit"
                      disabled={isLoading}
                      className="w-full sm:w-auto min-w-[150px] shrink-0"
                      glowColor="cyan"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>Generating...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 font-bold">
                          <span>Shorten URL</span>
                          <Sparkles className="w-4 h-4" />
                        </div>
                      )}
                    </TiltButton>
                  </div>

                  <div className="flex items-center justify-between px-3 pt-1 pb-1 text-xs text-white/50 border-t border-white/[0.04]">
                    <button
                      type="button"
                      onClick={() => setShowAliasInput(!showAliasInput)}
                      className="hover:text-neon-cyan transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span className="text-neon-cyan">+</span>
                      {showAliasInput ? 'Hide custom alias' : 'Add custom alias (optional)'}
                    </button>
                    <span className="hidden sm:inline-block text-white/40">
                      Sub-50ms Global Edge Redirect
                    </span>
                  </div>

                  <AnimatePresence>
                    {showAliasInput && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden px-3 pb-2"
                      >
                        <div className="flex items-center bg-white/[0.04] rounded-xl px-3 py-2 border border-white/10">
                          <span className="text-white/40 text-sm select-none mr-1">ushort.link/</span>
                          <input
                            type="text"
                            value={customAlias}
                            onChange={(e) => setCustomAlias(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                            placeholder="my-custom-slug"
                            maxLength={24}
                            className="bg-transparent text-neon-cyan focus:outline-none text-sm w-full font-mono placeholder-white/20"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </GlassCard>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="mt-3 text-center text-sm font-medium text-rose-400 bg-rose-500/10 border border-rose-500/20 py-2 px-4 rounded-xl backdrop-blur-md"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="result-display"
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 22,
              }}
            >
              <GlassCard
                variant="ultra"
                glow="cyan"
                className="p-6 sm:p-7 rounded-3xl relative overflow-hidden"
              >
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-neon-cyan/20 border border-neon-cyan/40 flex items-center justify-center text-neon-cyan">
                      <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                    </span>
                    <div>
                      <h4 className="text-white font-semibold text-sm">URL Successfully Shortened</h4>
                      <p className="text-white/40 text-xs truncate max-w-[280px] sm:max-w-md">
                        {truncateUrl(result.originalUrl, 42)}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs px-2.5 py-1 rounded-full bg-neon-lime/10 text-neon-lime border border-neon-lime/30 font-mono">
                    Active & Cached
                  </span>
                </div>

                <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-black/40 p-3.5 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-3 overflow-hidden px-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-neon-cyan/80 bg-neon-cyan/10 px-2 py-0.5 rounded">
                      Short Link
                    </span>
                    <a
                      href={result.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-neon-cyan font-mono text-base sm:text-lg font-bold tracking-tight truncate flex items-center gap-1.5 transition-colors group"
                    >
                      <span>{result.shortUrl}</span>
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </a>
                  </div>

                  <div className="flex items-center justify-end gap-2 shrink-0">
                    <CopyButton textToCopy={result.shortUrl} />

                    <button
                      type="button"
                      onClick={() => setShowQR(!showQR)}
                      className={`p-2.5 rounded-xl border transition-all ${
                        showQR
                          ? 'bg-neon-purple/20 border-neon-purple text-neon-purple'
                          : 'bg-white/[0.05] border-white/10 text-white/80 hover:text-white hover:bg-white/[0.1]'
                      }`}
                      title="Toggle QR Code"
                    >
                      <QrCode className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {showQR && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className="overflow-hidden mt-4 pt-4 border-t border-white/[0.06] flex flex-col items-center justify-center gap-3"
                    >
                      <div className="p-3 bg-white rounded-2xl shadow-xl">
                        <QRCodeSVG
                          value={result.shortUrl}
                          size={150}
                          level="H"
                          includeMargin={true}
                        />
                      </div>
                      <span className="text-xs text-white/50 font-mono">Scan to open on mobile devices</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/[0.06]">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex items-center gap-2 text-xs sm:text-sm text-white/60 hover:text-white transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Shorten another URL</span>
                  </button>

                  {onViewAnalytics && (
                    <button
                      type="button"
                      onClick={() => onViewAnalytics(result.shortCode)}
                      className="flex items-center gap-2 text-xs sm:text-sm text-neon-cyan hover:text-cyan-300 font-medium transition-colors cursor-pointer group"
                    >
                      <BarChart3 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>Inspect Live Analytics</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
