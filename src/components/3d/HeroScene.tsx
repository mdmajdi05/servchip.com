"use client";

import { SceneWrapper } from "./SceneWrapper";
import { ChipModel } from "./ChipModel";
import { Float } from "@react-three/drei";

export function HeroScene() {
  return (
    <SceneWrapper
      cameraPosition={[0, 0.6, 3.2]}
      className="w-full h-full"
      enableBloom={true}
    >
      <Float speed={1.5} rotationIntensity={0.08} floatIntensity={0.3}>
        <ChipModel autoRotate scale={1.6} />
      </Float>
    </SceneWrapper>
  );
}
