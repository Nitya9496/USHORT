'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import TwistedRibbon from './TwistedRibbon';
import ParticleField from './ParticleField';

export default function Scene3D() {
  return (
    <div className="relative w-full h-[380px] sm:h-[480px] md:h-[580px] lg:h-[640px] select-none pointer-events-auto">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] rounded-full bg-neon-cyan/15 blur-[120px] animate-pulse-glow" />
        <div className="w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] rounded-full bg-neon-pink/10 blur-[100px] translate-x-12 translate-y-8" />
      </div>

      <Canvas
        camera={{ position: [0, 0, 7], fov: 46 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[6, 5, 5]} intensity={14} color="#00f0ff" distance={20} />
          <pointLight position={[-6, -4, -3]} intensity={12} color="#ff007f" distance={20} />
          <directionalLight position={[0, -5, 4]} intensity={2.5} color="#9d4edd" />

          <Float
            speed={1.8}
            rotationIntensity={0.6}
            floatIntensity={0.8}
            floatingRange={[-0.15, 0.15]}
          >
            <TwistedRibbon />
          </Float>

          <ParticleField count={400} />
        </Suspense>
      </Canvas>
    </div>
  );
}
