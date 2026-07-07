"use client";

const TRACES: string[] = [];
for (let i = 0; i < 36; i++) {
  const a = (Math.PI * 2 * i) / 36;
  const r1 = 5 + Math.random() * 3;
  const r2 = 20 + Math.random() * 20;
  const midR = r1 + (r2 - r1) * (0.3 + Math.random() * 0.4);
  const wiggle1 = (Math.random() - 0.5) * 0.1;
  const wiggle2 = (Math.random() - 0.5) * 0.08;
  const a1 = a + wiggle1;
  const a2 = a + wiggle2;
  const aMid = a + (Math.random() - 0.5) * 0.06;
  const x1 = 50 + Math.cos(a1) * r1;
  const y1 = 50 + Math.sin(a1) * r1;
  const xm = 50 + Math.cos(aMid) * midR;
  const ym = 50 + Math.sin(aMid) * midR;
  const x2 = 50 + Math.cos(a2) * r2;
  const y2 = 50 + Math.sin(a2) * r2;
  TRACES.push(`M ${x1} ${y1} L ${xm} ${ym} L ${x2} ${y2}`);
}

const DOTS: { path: string; delay: number; dur: number; color: string }[] = [];
for (let i = 0; i < 20; i++) {
  const a = Math.random() * Math.PI * 2;
  const r1 = 6 + Math.random() * 3;
  const r2 = 18 + Math.random() * 25;
  const x1 = 50 + Math.cos(a) * r1;
  const y1 = 50 + Math.sin(a) * r1;
  const x2 = 50 + Math.cos(a) * r2;
  const y2 = 50 + Math.sin(a) * r2;
  DOTS.push({
    path: `M ${x1} ${y1} L ${x2} ${y2}`,
    delay: Math.random() * 4,
    dur: 1 + Math.random() * 2,
    color: i % 2 === 0 ? "#76FF03" : "#00E5FF",
  });
}

const LIGHTNING_ARCS: { cx: number; cy: number; rx: number; ry: number; delay: number; dur: number }[] = [];
for (let i = 0; i < 4; i++) {
  LIGHTNING_ARCS.push({
    cx: 30 + Math.random() * 40,
    cy: 30 + Math.random() * 40,
    rx: 5 + Math.random() * 12,
    ry: 5 + Math.random() * 12,
    delay: i * 1.8 + Math.random() * 2,
    dur: 0.08 + Math.random() * 0.04,
  });
}

export function LightningScene() {

  return (
    <div className="w-full h-full relative overflow-hidden font-mono">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(118,255,3,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(118,255,3,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px, 24px 24px",
        }}
      />

      {/* SVG layer */}
      <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Circuit traces */}
        {TRACES.map((d, i) => (
          <path
            key={`t${i}`}
            d={d}
            fill="none"
            stroke={i % 3 === 1 ? "#00E5FF" : "#76FF03"}
            strokeWidth="0.3"
            opacity={0.12 + (i % 5) * 0.025}
            style={{
              strokeDasharray: "100",
              strokeDashoffset: "100",
              animation: `circuit-draw 3s ${i * 0.15}s ease-in-out infinite alternate`,
            }}
          />
        ))}

        {/* Data dots */}
        {DOTS.map((dot, i) => (
          <circle
            key={`d${i}`}
            r="0.8"
            fill={dot.color}
            filter="url(#glow)"
            opacity="0.7"
          >
            <animateMotion
              path={dot.path}
              dur={`${dot.dur}s`}
              begin={`${dot.delay}s`}
              repeatCount="indefinite"
              calcMode="linear"
            />
          </circle>
        ))}

        {/* Corner nodes */}
        {[
          [92, 92], [8, 92], [92, 8], [8, 8],
        ].map(([cx, cy], i) => (
          <g key={`cn${i}`}>
            <circle cx={cx} cy={cy} r="1.8" fill="none" stroke="#00E5FF" strokeWidth="0.4" opacity="0.5">
              <animate attributeName="r" values="1.8;2.5;1.8" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;1;0.5" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
            <circle cx={cx} cy={cy} r="0.6" fill="#00E5FF" opacity="0.8">
              <animate attributeName="opacity" values="0.8;0.3;0.8" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        {/* Lightning arcs */}
        {LIGHTNING_ARCS.map((arc, i) => (
          <ellipse
            key={`la${i}`}
            cx={arc.cx}
            cy={arc.cy}
            rx={arc.rx}
            ry={arc.ry}
            fill="none"
            stroke="#76FF03"
            strokeWidth="0.3"
            opacity="0"
          >
            <animate
              attributeName="opacity"
              values="0;0.6;0"
              dur={`${arc.dur}s`}
              begin={`${arc.delay}s`}
              repeatCount="indefinite"
            />
          </ellipse>
        ))}
      </svg>

      {/* Processor die */}
      <div
        className="absolute z-20"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: 56,
          height: 56,
        }}
      >
        {/* Die surface */}
        <div
          className="absolute inset-[3px] rounded"
          style={{
            background: `
              linear-gradient(rgba(118,255,3,0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(118,255,3,0.07) 1px, transparent 1px)
            `,
            backgroundSize: "5px 5px, 5px 5px",
            border: "1px solid rgba(118,255,3,0.15)",
            boxShadow: "inset 0 0 15px rgba(118,255,3,0.04), 0 0 20px rgba(118,255,3,0.05)",
          }}
        />

        {/* Processing labels */}
        <div
          className="absolute text-[5px] tracking-widest text-primary opacity-40 animate-pulse"
          style={{ left: 3, top: 2, animationDuration: "4s" }}
        >
          SERV
        </div>
        <div
          className="absolute text-[5px] tracking-widest text-secondary opacity-40 animate-pulse"
          style={{ right: 3, bottom: 2, animationDuration: "3s", animationDelay: "1s" }}
        >
          CHIP
        </div>

        {/* Core glow */}
        <div
          className="absolute animate-ping"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "#76FF03",
            boxShadow: "0 0 6px #76FF03, 0 0 20px rgba(118,255,3,0.2)",
            animationDuration: "2.5s",
          }}
        />
        <div
          className="absolute"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(118,255,3,0.15) 0%, transparent 70%)",
          }}
        />
      </div>
    </div>
  );
}
