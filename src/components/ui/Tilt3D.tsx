"use client";

import { useRef, useSyncExternalStore, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

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

export function Tilt3D({ children, options = {}, className }: Tilt3DProps) {
  const { glare = true, scale = 1.02, speed = 15, maxAngle = 15 } = options;
  const isTouch = useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => !window.matchMedia("(hover: hover) and (pointer: fine)").matches,
    () => true,
  );
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [maxAngle, -maxAngle]), {
    damping: speed,
    stiffness: 200,
  });
  const rotateY = useSpring(useTransform(x, [0, 1], [-maxAngle, maxAngle]), {
    damping: speed,
    stiffness: 200,
  });

  const glareX = useTransform(x, [0, 1], [0, 100]);
  const glareY = useTransform(y, [0, 1], [0, 100]);

  const handleMouse = !isTouch
    ? (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left) / rect.width);
        y.set((e.clientY - rect.top) / rect.height);
      }
    : undefined;

  const handleLeave = !isTouch
    ? () => {
        x.set(0.5);
        y.set(0.5);
      }
    : undefined;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={!isTouch ? { scale } : undefined}
      className={`relative ${className ?? ""}`}
    >
      {children}
      {glare && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-xl"
          style={{
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, color-mix(in srgb, var(--primary) 8%, transparent) 0%, transparent 60%)`,
          }}
        />
      )}
    </motion.div>
  );
}
