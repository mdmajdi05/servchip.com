"use client";

import { useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { SceneWrapper } from "./SceneWrapper";
import { ChipModel } from "./ChipModel";

interface ChipViewerSceneProps {
  autoRotate?: boolean;
}

export function ChipViewerScene({ autoRotate = true }: ChipViewerSceneProps) {
  const controlsRef = useRef(null);

  return (
    <SceneWrapper
      cameraPosition={[0, 0.5, 4]}
      className="w-full h-[500px]"
    >
      <ChipModel autoRotate={autoRotate} scale={1.4} />
      <OrbitControls
        ref={controlsRef}
        enableZoom
        enablePan={false}
        minDistance={2}
        maxDistance={8}
        autoRotate={autoRotate}
        autoRotateSpeed={2}
      />
    </SceneWrapper>
  );
}
