'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
}

export default function ParticleField({ count = 450 }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const color1 = new THREE.Color('#00f0ff');
    const color2 = new THREE.Color('#ff007f');
    const color3 = new THREE.Color('#9d4edd');

    for (let i = 0; i < count; i++) {
      const radius = 3.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const rand = Math.random();
      const mixedColor = rand < 0.4 ? color1 : rand < 0.75 ? color2 : color3;
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y -= delta * 0.08;
    pointsRef.current.rotation.x += delta * 0.03;

    pointsRef.current.position.x = THREE.MathUtils.damp(
      pointsRef.current.position.x,
      state.pointer.x * 0.5,
      2,
      delta
    );
    pointsRef.current.position.y = THREE.MathUtils.damp(
      pointsRef.current.position.y,
      state.pointer.y * 0.5,
      2,
      delta
    );
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors={true}
        transparent={true}
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
