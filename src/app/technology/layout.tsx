import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NVIDIA Technology — Blackwell, Hopper, Ada & Ampere",
  description:
    "Deep dive into the NVIDIA architectures powering Servchip's catalog — Blackwell FP4, Hopper Transformer Engine, Ada Lovelace RT Cores, and the Grace CPU superchip. NVLink, Tensor Cores, MIG, and more.",
  alternates: { canonical: "https://servchip.com/technology" },
};

export default function TechnologyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
