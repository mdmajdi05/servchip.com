"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

interface SceneWrapperProps {
  children: React.ReactNode;
  cameraPosition?: [number, number, number];
  className?: string;
  enableBloom?: boolean;
}

export function SceneWrapper({
  children,
  cameraPosition = [0, 0, 5],
  className,
  enableBloom = true,
}: SceneWrapperProps) {
  return (
    <div className={className}>
      <Canvas gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={cameraPosition} fov={45} />
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <directionalLight position={[-5, -5, -5]} intensity={0.3} />
          <pointLight position={[0, 2, 2]} intensity={0.5} color="#76FF03" />
          {children}
          <Environment preset="city" />
          {enableBloom && (
            <EffectComposer>
              <Bloom
                luminanceThreshold={0.2}
                luminanceSmoothing={0.9}
                intensity={0.6}
              />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
