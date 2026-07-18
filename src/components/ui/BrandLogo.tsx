import Image from "next/image";
import {
  MANUFACTURER_COLORS,
  getManufacturerTextColor,
} from "@/data/manufacturer-colors";

interface BrandLogoProps {
  name: string;
  className?: string;
  compact?: boolean;
}

const LOGO_MAP: Record<string, string> = {
  NVIDIA: "nvidia.svg",
  AMD: "amd.svg",
  Intel: "intel.svg",
  Broadcom: "broadcom.svg",
  Marvell: "marvell.svg",
  Cisco: "cisco.svg",
  Qualcomm: "qualcomm.svg",
  Samsung: "samsung.svg",
  "SK hynix": "sk-hynix.svg",
  Micron: "micron.svg",
  Seagate: "seagate.svg",
  Dell: "dell.svg",
  "Dell Technologies": "dell.svg",
  HPE: "hpe.svg",
  "Hewlett Packard Enterprise": "hpe.svg",
  Supermicro: "supermicro.svg",
  Lenovo: "lenovo.svg",
  Gigabyte: "gigabyte.svg",
  GIGABYTE: "gigabyte.svg",
  "GIGABYTE Technology": "gigabyte.svg",
  ASUS: "asus.svg",
  Inspur: "inspur.svg",
  Quanta: "quanta.svg",
  "Quanta Computer": "quanta.svg",
  Foxconn: "foxconn.svg",
  Wiwynn: "wiwynn.png",
  Solidigm: "solidigm.png",
  Kioxia: "kioxia.svg",
  "Western Digital": "wdc.svg",
  WD: "wdc.svg",
  Google: "google.svg",
  Amazon: "amazon.svg",
  Ampere: "ampere.svg",
  Nokia: "nokia.svg",
};

export function BrandLogo({
  name,
  className = "w-8 h-8",
  compact,
}: BrandLogoProps) {
  const logoFile = LOGO_MAP[name];

  if (logoFile) {
    const isPng = logoFile.endsWith(".png");
    return (
      <Image
        src={`/images/logos/${logoFile}`}
        alt={`${name} logo`}
        width={32}
        height={32}
        className={`${className} object-contain`}
        unoptimized={isPng}
        loading="lazy"
      />
    );
  }

  const color = MANUFACTURER_COLORS[name] || "#6B7280";
  const textColor = getManufacturerTextColor(name);
  const initials = name
    .split(/[\s-]+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (compact) {
    return (
      <div
        className="flex items-center justify-center rounded-lg shrink-0"
        style={{ backgroundColor: `${color}22` }}
      >
        <span
          style={{ color: textColor }}
          className="text-[10px] font-black font-mono"
        >
          {initials}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`${className} flex items-center justify-center rounded-lg shrink-0`}
      style={{ backgroundColor: `${color}15` }}
    >
      <span
        style={{ color: textColor }}
        className="text-xs font-bold font-mono"
      >
        {initials}
      </span>
    </div>
  );
}
