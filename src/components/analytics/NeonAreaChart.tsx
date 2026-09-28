'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { AnalyticsTimeSeries } from '../../types';

interface NeonAreaChartProps {
  data: AnalyticsTimeSeries[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0a0a14]/90 border border-neon-cyan/40 p-3 rounded-xl shadow-glow-cyan backdrop-blur-xl">
        <p className="text-white/60 text-xs font-mono mb-1">{label}</p>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-neon-cyan shadow-[0_0_8px_#00f0ff]" />
          <p className="text-white font-bold text-sm">
            {payload[0].value.toLocaleString()} <span className="text-white/50 text-xs font-normal">clicks</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default function NeonAreaChart({ data }: NeonAreaChartProps) {
  return (
    <div className="w-full h-[280px] sm:h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 15, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="neonAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.45} />
              <stop offset="60%" stopColor="#9d4edd" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#ff007f" stopOpacity={0.0} />
            </linearGradient>

            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255, 255, 255, 0.05)"
            vertical={false}
          />

          <XAxis
            dataKey="date"
            stroke="rgba(255, 255, 255, 0.35)"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
          />

          <YAxis
            stroke="rgba(255, 255, 255, 0.35)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: '#00f0ff',
              strokeWidth: 1,
              strokeDasharray: '4 4',
            }}
          />

          <Area
            type="monotone"
            dataKey="clicks"
            stroke="#00f0ff"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#neonAreaGradient)"
            filter="url(#neonGlow)"
            isAnimationActive={true}
            animationDuration={1500}
            animationEasing="ease-out"
            activeDot={{
              r: 6,
              fill: '#00f0ff',
              stroke: '#ffffff',
              strokeWidth: 2,
              className: 'shadow-glow-cyan',
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
