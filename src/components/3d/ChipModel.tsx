"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ChipModelProps {
  autoRotate?: boolean;
  scale?: number;
  interactive?: boolean;
  mouseX?: number;
  mouseY?: number;
}

export function ChipModel({
  autoRotate = true,
  scale = 1,
  interactive = false,
  mouseX = 0,
  mouseY = 0,
}: ChipModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const dieGlowRef = useRef<THREE.Mesh>(null);
  const edgeGlowRef = useRef<THREE.Mesh>(null);
  const corePulseRef = useRef<THREE.Mesh>(null);

  const PCB_W = 2.0;
  const PCB_H = 0.1;
  const PCB_D = 1.2;

  const capacitors = useMemo(() => {
    const arr: { pos: [number, number, number]; r: number; h: number; color: string }[] = [];
    const positions: [number, number, number][] = [
      [-0.15, 0, 0.45], [0.15, 0, 0.45], [-0.15, 0, -0.45], [0.15, 0, -0.45],
      [-0.75, 0, 0.45], [0.75, 0, 0.45], [-0.75, 0, -0.45], [0.75, 0, -0.45],
      [-0.55, 0, 0], [0.55, 0, 0],
    ];
    positions.forEach(([x, , z]) => {
      arr.push({ pos: [x, PCB_H / 2 + 0.04, z], r: 0.04, h: 0.08, color: "#C8C8D0" });
    });
    return arr;
  }, []);

  const resistors = useMemo(() => {
    const arr: { pos: [number, number, number]; w: number; d: number }[] = [];
    const positions: [number, number][] = [
      [-0.3, 0.55], [0.3, 0.55], [-0.3, -0.55], [0.3, -0.55],
      [-0.9, 0.2], [0.9, 0.2], [-0.9, -0.2], [0.9, -0.2],
    ];
    positions.forEach(([x, z]) => {
      arr.push({ pos: [x, PCB_H / 2 + 0.015, z], w: 0.08, d: 0.04 });
    });
    return arr;
  }, []);

  const goldPins = useMemo(() => {
    const arr: [number, number, number][] = [];
    const count = 18;
    const span = PCB_W * 0.85;
    const spacing = span / (count - 1);
    const start = -span / 2;
    for (let i = 0; i < count; i++) {
      arr.push([start + i * spacing, -PCB_H / 2 - 0.02, PCB_D / 2 + 0.04]);
    }
    return arr;
  }, []);

  const traceGeometry = useMemo(() => {
    const pts: number[] = [];
    for (let i = -3; i <= 3; i++) {
      const y = PCB_H / 2 + 0.005;
      pts.push(-PCB_W / 2 + 0.1, y, i * 0.12);
      pts.push(-0.35, y, i * 0.12);
      pts.push(0.35, y, i * 0.12);
      pts.push(PCB_W / 2 - 0.1, y, i * 0.12);
    }
    for (let i = -2; i <= 2; i++) {
      if (i === 0) continue;
      const y = PCB_H / 2 + 0.005;
      pts.push(i * 0.3, y, -PCB_D / 2 + 0.1);
      pts.push(i * 0.3, y, -0.32);
      pts.push(i * 0.3, y, 0.32);
      pts.push(i * 0.3, y, PCB_D / 2 - 0.1);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return geo;
  }, []);

  const hbmPositions: [number, number][] = [
    [-0.42, -0.32], [-0.42, 0], [-0.42, 0.32],
    [0.42, -0.32], [0.42, 0], [0.42, 0.32],
  ];

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    if (autoRotate) {
      groupRef.current.rotation.y += delta * 0.3;
    }
    if (interactive) {
      const targetX = mouseY * 0.3;
      const targetY = mouseX * 0.5;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
      if (!autoRotate) {
        groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
      }
    }
    const t = state.clock.elapsedTime;
    if (dieGlowRef.current) {
      const mat = dieGlowRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.6 + Math.sin(t * 2.2) * 0.6;
    }
    if (edgeGlowRef.current) {
      const mat = edgeGlowRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.0 + Math.sin(t * 1.6) * 0.4;
    }
    if (corePulseRef.current) {
      const pulse = 1 + Math.sin(t * 3) * 0.04;
      corePulseRef.current.scale.set(pulse, 1, pulse);
    }
  });

  return (
    <group ref={groupRef} scale={scale} dispose={null}>
      {/* PCB SUBSTRATE */}
      <group>
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
          <boxGeometry args={[PCB_W, PCB_H, PCB_D]} />
          <meshStandardMaterial color="#0a1a0a" metalness={0.3} roughness={0.6} />
        </mesh>
        <mesh position={[0, PCB_H / 2 + 0.001, 0]}>
          <boxGeometry args={[PCB_W - 0.04, 0.004, PCB_D - 0.04]} />
          <meshStandardMaterial color="#102810" metalness={0.4} roughness={0.5} />
        </mesh>
        <mesh position={[0, -PCB_H / 2 - 0.001, 0]}>
          <boxGeometry args={[PCB_W - 0.02, 0.004, PCB_D - 0.02]} />
          <meshStandardMaterial color="#050a05" metalness={0.5} roughness={0.5} />
        </mesh>
      </group>

      {/* NEON EDGE GLOW STRIP */}
      <mesh ref={edgeGlowRef} position={[0, PCB_H / 2 + 0.003, 0]}>
        <boxGeometry args={[PCB_W + 0.01, 0.006, PCB_D + 0.01]} />
        <meshStandardMaterial color="#76FF03" emissive="#76FF03" emissiveIntensity={1.2} transparent opacity={0.75} />
      </mesh>

      {/* CIRCUIT TRACES */}
      <lineSegments geometry={traceGeometry}>
        <lineBasicMaterial color="#D4AF37" transparent opacity={0.55} />
      </lineSegments>

      {/* GPU DIE */}
      <group position={[0, PCB_H / 2, 0]}>
        <mesh ref={dieGlowRef} position={[0, 0.004, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.78, 0.78]} />
          <meshStandardMaterial color="#76FF03" emissive="#76FF03" emissiveIntensity={1.6} transparent opacity={0.55} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0.05, 0]} castShadow>
          <boxGeometry args={[0.56, 0.1, 0.56]} />
          <meshStandardMaterial color="#C0C0C8" metalness={0.95} roughness={0.15} />
        </mesh>
        <mesh ref={corePulseRef} position={[0, 0.105, 0]}>
          <boxGeometry args={[0.5, 0.005, 0.5]} />
          <meshStandardMaterial color="#808088" metalness={0.9} roughness={0.35} />
        </mesh>
        <mesh position={[-0.2, 0.11, -0.2]}>
          <boxGeometry args={[0.05, 0.003, 0.05]} />
          <meshStandardMaterial color="#3a3a3a" metalness={0.9} roughness={0.4} />
        </mesh>
      </group>

      {/* HBM MEMORY STACKS */}
      {hbmPositions.map(([x, z], i) => (
        <group key={`hbm-${i}`} position={[x, PCB_H / 2, z]}>
          <mesh position={[0, 0.05, 0]} castShadow>
            <boxGeometry args={[0.2, 0.1, 0.22]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.105, 0]}>
            <boxGeometry args={[0.205, 0.004, 0.225]} />
            <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={1.4} transparent opacity={0.7} />
          </mesh>
          <mesh position={[0.101, 0.05, 0]}>
            <boxGeometry args={[0.004, 0.08, 0.2]} />
            <meshStandardMaterial color="#76FF03" emissive="#76FF03" emissiveIntensity={0.8} transparent opacity={0.5} />
          </mesh>
        </group>
      ))}

      {/* CAPACITORS */}
      {capacitors.map((cap, i) => (
        <mesh key={`cap-${i}`} position={cap.pos} castShadow>
          <cylinderGeometry args={[cap.r, cap.r, cap.h, 12]} />
          <meshStandardMaterial color={cap.color} metalness={0.9} roughness={0.3} />
        </mesh>
      ))}

      {/* SMD RESISTORS */}
      {resistors.map((r, i) => (
        <mesh key={`res-${i}`} position={r.pos} castShadow>
          <boxGeometry args={[r.w, 0.025, r.d]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}

      {/* GOLD SXM CONTACT PINS */}
      <mesh position={[0, -PCB_H / 2 - 0.02, PCB_D / 2 + 0.04]} castShadow>
        <boxGeometry args={[PCB_W * 0.9, 0.04, 0.12]} />
        <meshStandardMaterial color="#1a1206" metalness={0.7} roughness={0.5} />
      </mesh>
      {goldPins.map((pos, i) => (
        <mesh key={`pin-${i}`} position={pos} castShadow>
          <boxGeometry args={[0.06, 0.04, 0.08]} />
          <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.2} emissive="#3a2c00" emissiveIntensity={0.2} />
        </mesh>
      ))}

      {/* HEATSINK MOUNT POSTS */}
      {([[-PCB_W / 2 + 0.08, -PCB_D / 2 + 0.08], [PCB_W / 2 - 0.08, -PCB_D / 2 + 0.08], [-PCB_W / 2 + 0.08, PCB_D / 2 - 0.08], [PCB_W / 2 - 0.08, PCB_D / 2 - 0.08]] as [number, number][]).map(([x, z], i) => (
        <mesh key={`post-${i}`} position={[x, PCB_H / 2 + 0.04, z]} castShadow>
          <cylinderGeometry args={[0.07, 0.07, 0.1, 16]} />
          <meshStandardMaterial color="#9a9aa0" metalness={1} roughness={0.2} />
        </mesh>
      ))}

      {/* ENGRAVED PLATE */}
      <mesh position={[0, PCB_H / 2 + 0.002, -PCB_D / 2 + 0.05]}>
        <boxGeometry args={[0.6, 0.003, 0.08]} />
        <meshStandardMaterial color="#76FF03" emissive="#76FF03" emissiveIntensity={0.4} metalness={0.6} roughness={0.3} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}
