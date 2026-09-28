'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Globe,
  Smartphone,
  Laptop,
  ArrowUpRight,
  Zap,
  RefreshCw,
} from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import NeonAreaChart from './NeonAreaChart';
import { fetchAnalytics } from '../../lib/api';
import { UrlAnalyticsResponse } from '../../types';
import { formatNumber } from '../../lib/utils';

interface AnalyticsDashboardProps {
  initialCode?: string;
}

export default function AnalyticsDashboard({ initialCode = 'demo' }: AnalyticsDashboardProps) {
  const [activeCode, setActiveCode] = useState(initialCode);
  const [analytics, setAnalytics] = useState<UrlAnalyticsResponse['data'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = async (code: string) => {
    try {
      setIsRefreshing(true);
      const res = await fetchAnalytics(code);
      if (res.success && res.data) {
        setAnalytics(res.data);
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData(activeCode);
  }, [activeCode]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 24,
      },
    },
  };

  if (isLoading || !analytics) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-16 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-neon-cyan border-t-transparent animate-spin" />
          <span className="text-white/50 text-sm font-mono">Aggregating telemetry nodes...</span>
        </div>
      </div>
    );
  }

  const totalDeviceCount = analytics.deviceBreakdown.reduce((acc, curr) => acc + curr.count, 0) || 1;

  return (
    <section id="analytics" className="w-full max-w-6xl mx-auto px-4 py-16 relative z-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/30 text-neon-purple text-xs font-semibold uppercase tracking-wider mb-2">
            <Activity className="w-3.5 h-3.5" />
            Real-Time Telemetry
          </div>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Performance & Insights
          </h3>
          <p className="text-white/50 text-sm mt-1">
            Analyzing telemetry for <span className="font-mono text-neon-cyan">ushort.link/{analytics.shortCode}</span>
          </p>
        </div>

        <button
          onClick={() => loadData(activeCode)}
          disabled={isRefreshing}
          className="self-start md:self-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white/80 hover:text-white hover:bg-white/[0.08] transition-all text-xs font-mono cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-neon-cyan' : ''}`} />
          <span>Sync Metrics</span>
        </button>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6"
      >
        <motion.div variants={itemVariants}>
          <GlassCard variant="elevated" className="p-5">
            <div className="flex items-center justify-between text-white/50 text-xs font-mono mb-3">
              <span>TOTAL ENGAGEMENTS</span>
              <Activity className="w-4 h-4 text-neon-cyan" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-white font-mono">
                {formatNumber(analytics.totalClicks)}
              </span>
              <span className="text-xs text-neon-lime font-medium flex items-center">
                <ArrowUpRight className="w-3 h-3" />
                +18.4%
              </span>
            </div>
            <div className="mt-3 text-xs text-white/40">Verified edge queries</div>
          </GlassCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <GlassCard variant="elevated" className="p-5">
            <div className="flex items-center justify-between text-white/50 text-xs font-mono mb-3">
              <span>REDIRECT VELOCITY</span>
              <Zap className="w-4 h-4 text-neon-pink" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-white font-mono">
                &lt; 34ms
              </span>
              <span className="text-xs text-neon-cyan font-medium">Redis L1</span>
            </div>
            <div className="mt-3 text-xs text-white/40">Sub-50ms cache SLA maintained</div>
          </GlassCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <GlassCard variant="elevated" className="p-5">
            <div className="flex items-center justify-between text-white/50 text-xs font-mono mb-3">
              <span>PRIMARY CHANNEL</span>
              <Globe className="w-4 h-4 text-neon-purple" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-bold text-white truncate max-w-[170px]">
                {analytics.topReferrers[0]?.source || 'Direct'}
              </span>
            </div>
            <div className="mt-3 text-xs text-white/40">
              {analytics.topReferrers[0]?.count || 0} visits recorded
            </div>
          </GlassCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <GlassCard variant="elevated" className="p-5">
            <div className="flex items-center justify-between text-white/50 text-xs font-mono mb-3">
              <span>DEVICE DOMINANCE</span>
              <Laptop className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-white font-mono">
                {Math.round(((analytics.deviceBreakdown[0]?.count || 0) / totalDeviceCount) * 100)}%
              </span>
              <span className="text-xs text-white/50">Desktop</span>
            </div>
            <div className="mt-3 text-xs text-white/40">Responsive edge routing</div>
          </GlassCard>
        </motion.div>

        <motion.div variants={itemVariants} className="md:col-span-4">
          <GlassCard variant="ultra" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-white font-bold text-lg">Traffic Dynamics</h4>
                <p className="text-white/40 text-xs">Dynamic click volume distribution over time</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-neon-cyan animate-pulse shadow-glow-cyan" />
                <span className="text-xs text-neon-cyan font-mono font-medium">Live Influx</span>
              </div>
            </div>

            <NeonAreaChart data={analytics.timeSeries} />
          </GlassCard>
        </motion.div>

        <motion.div variants={itemVariants} className="md:col-span-2">
          <GlassCard variant="elevated" className="p-6 h-full">
            <h4 className="text-white font-bold text-base mb-1">Hardware Ecosystem</h4>
            <p className="text-white/40 text-xs mb-5">Visitor client environment breakdown</p>

            <div className="space-y-4">
              {analytics.deviceBreakdown.map((device) => {
                const percentage = Math.round((device.count / totalDeviceCount) * 100);
                return (
                  <div key={device.name} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-white/80 flex items-center gap-2">
                        {device.name === 'Desktop' ? (
                          <Laptop className="w-3.5 h-3.5 text-neon-cyan" />
                        ) : (
                          <Smartphone className="w-3.5 h-3.5 text-neon-pink" />
                        )}
                        {device.name}
                      </span>
                      <span className="text-white/60 font-mono">
                        {device.count.toLocaleString()} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/[0.05] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple shadow-glow-cyan transition-all duration-1000"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>

        <motion.div variants={itemVariants} className="md:col-span-2">
          <GlassCard variant="elevated" className="p-6 h-full">
            <h4 className="text-white font-bold text-base mb-1">Inbound Traffic Origins</h4>
            <p className="text-white/40 text-xs mb-5">Top referrers driving link interaction</p>

            <div className="space-y-3.5">
              {analytics.topReferrers.map((referrer, idx) => (
                <div
                  key={referrer.source}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/15 transition-colors"
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <span className="w-5 h-5 rounded-md bg-white/[0.05] text-white/50 text-[10px] font-mono flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </span>
                    <span className="text-sm font-medium text-white/90 truncate">
                      {referrer.source}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-neon-cyan shrink-0">
                    {referrer.count.toLocaleString()} hits
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </section>
  );
}
