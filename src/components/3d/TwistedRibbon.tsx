'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function TwistedRibbon() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireframeRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (!meshRef.current || !groupRef.current) return;

    meshRef.current.rotation.x += delta * 0.22;
    meshRef.current.rotation.y += delta * 0.35;

    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = meshRef.current.rotation.x;
      wireframeRef.current.rotation.y = meshRef.current.rotation.y;
    }

    const targetX = state.pointer.x * 1.2;
    const targetY = state.pointer.y * 1.2;

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetX,
      3,
      delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      -targetY * 0.8,
      3,
      delta
    );

    const distFromCenter = Math.sqrt(state.pointer.x ** 2 + state.pointer.y ** 2);
    const targetScale = 1 + distFromCenter * 0.15;
    groupRef.current.scale.set(
      THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 4, delta),
      THREE.MathUtils.damp(groupRef.current.scale.y, targetScale, 4, delta),
      THREE.MathUtils.damp(groupRef.current.scale.z, targetScale, 4, delta)
    );
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.5, 0.42, 160, 32, 2, 3]} />
        <meshPhysicalMaterial
          color="#050510"
          emissive="#00f0ff"
          emissiveIntensity={0.35}
          roughness={0.15}
          metalness={0.9}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
          wireframe={false}
        />
      </mesh>

      <mesh ref={wireframeRef}>
        <torusKnotGeometry args={[1.505, 0.425, 120, 24, 2, 3]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={1.2}
          wireframe={true}
          transparent={true}
          opacity={0.38}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
