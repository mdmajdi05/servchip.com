import type { ReactNode } from "react";

interface Tilt3DProps {
  children: ReactNode;
  options?: {
    glare?: boolean;
    scale?: number;
    speed?: number;
    maxAngle?: number;
  };
  className?: string;
}

export function Tilt3D({ children, className }: Tilt3DProps) {
  return <div className={`relative ${className ?? ""}`}>{children}</div>;
}
