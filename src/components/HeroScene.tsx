"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function NodeNetwork() {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const nodes = useMemo(() => {
    const count = 22;
    const positions: [number, number, number][] = [];
    for (let i = 0; i < count; i++) {
      const radius = 2.4 + Math.random() * 0.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions.push([
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi),
      ]);
    }
    return positions;
  }, []);

  const lines = useMemo(() => {
    const segments: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < nodes.length; i++) {
      const a = new THREE.Vector3(...nodes[i]);
      let closest = -1;
      let closestDist = Infinity;
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue;
        const b = new THREE.Vector3(...nodes[j]);
        const dist = a.distanceTo(b);
        if (dist < closestDist) {
          closestDist = dist;
          closest = j;
        }
      }
      if (closest !== -1) {
        segments.push([a, new THREE.Vector3(...nodes[closest])]);
      }
    }
    return segments;
  }, [nodes]);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y += 0.0018;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      pointer.current.y * 0.25,
      0.03
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      -pointer.current.x * 0.15,
      0.03
    );
    pointer.current.x = state.pointer.x;
    pointer.current.y = state.pointer.y;
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshBasicMaterial color="#ff4925" wireframe transparent opacity={0.45} />
      </mesh>
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshBasicMaterial
            color={i % 5 === 0 ? "#0099ff" : "#ff4925"}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
      {lines.map(([a, b], i) => (
        <line key={i}>
          <bufferGeometry
            onUpdate={(geo) => geo.setFromPoints([a, b])}
          />
          <lineBasicMaterial color="#ff4925" transparent opacity={0.16} />
        </line>
      ))}
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 42 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.6} />
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
        <NodeNetwork />
      </Float>
    </Canvas>
  );
}
