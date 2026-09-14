import Image from "next/image";
import { BRAND_COLORS, getBrandTextColor } from "@/data/brand-colors";

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

const LOGO_ALT: Record<string, string> = {
  NVIDIA: "Servchip NVIDIA Authorized AI Chip Partner Logo",
  AMD: "Servchip AMD Enterprise Instinct & EPYC Partner Logo",
  Intel: "Servchip Intel Enterprise AI Accelerators Partner Logo",
  Broadcom: "Servchip Broadcom Networking & PCIe Switches Partner Logo",
  Marvell: "Servchip Marvell Semiconductor Infrastructure Partner Logo",
  Cisco: "Cisco Enterprise Networking Partner Logo",
  Qualcomm: "Servchip Qualcomm Enterprise AI & Compute Partner Logo",
  Samsung: "Servchip Samsung Enterprise Memory & HBM Partner Logo",
  "SK hynix": "Servchip SK hynix HBM3e AI Memory Partner Logo",
  Micron: "Servchip Micron Enterprise HBM3e Memory Partner Logo",
  Seagate: "Servchip Seagate Enterprise Data Storage Partner Logo",
  Dell: "Servchip Dell Technologies Enterprise Servers Partner Logo",
  "Dell Technologies":
    "Servchip Dell Technologies Enterprise Servers Partner Logo",
  HPE: "Servchip HPE ProLiant & Cray Supercomputing Partner Logo",
  "Hewlett Packard Enterprise":
    "Servchip HPE ProLiant & Cray Supercomputing Partner Logo",
  Supermicro: "Servchip Supermicro GPU Server Solutions Partner Logo",
  Lenovo: "Servchip Lenovo ThinkSystem AI Infrastructure Partner Logo",
  Gigabyte: "Gigabyte Enterprise Server Hardware Partner Logo",
  GIGABYTE: "Gigabyte Enterprise Server Hardware Partner Logo",
  "GIGABYTE Technology": "Gigabyte Enterprise Server Hardware Partner Logo",
  ASUS: "ASUS Enterprise Servers & Workstations Partner Logo",
  Inspur: "Inspur Information Enterprise Server Partner Logo",
  Quanta: "Quanta Cloud Technology QCT Partner Logo",
  "Quanta Computer": "Quanta Cloud Technology QCT Partner Logo",
  Foxconn: "Foxconn Industrial Internet Hardware Partner Logo",
  Wiwynn: "Wiwynn Hyperscale Data Center Infrastructure Partner Logo",
  Solidigm: "Solidigm Enterprise Data Center SSD Partner Logo",
  Kioxia: "Servchip Kioxia Enterprise Data Center Storage Partner Logo",
  "Western Digital": "Servchip Western Digital Enterprise Storage Partner Logo",
  WD: "Servchip Western Digital Enterprise Storage Partner Logo",
  Google: "Google Cloud TPU Hardware Solutions Logo",
  Amazon: "Amazon Web Services AWS Hardware Partner Logo",
  Ampere: "Ampere Computing ARM Cloud Native Processors Logo",
  Nokia: "Nokia Data Center Interconnect Partner Logo",
};

const LOGO_TITLE: Record<string, string> = {
  NVIDIA: "NVIDIA Data Center GPUs & AI Hardware Distributor - Servchip",
  AMD: "AMD Instinct Accelerators & EPYC Processors - Servchip",
  Intel: "Intel Gaudi AI Hardware & Xeon Processors - Servchip",
  Broadcom: "Broadcom Enterprise Connectivity Hardware - Servchip",
  Marvell: "Marvell Data Center Infrastructure Solutions - Servchip",
  Cisco: "Cisco AI Data Center Networking - Servchip UAE",
  Qualcomm: "Qualcomm Enterprise AI Accelerators - Servchip",
  Samsung: "Samsung High Bandwidth Memory & Enterprise SSDs - Servchip",
  "SK hynix": "SK hynix Advanced AI Memory Hardware - Servchip",
  Micron: "Micron High Performance Memory Solutions - Servchip",
  Seagate: "Seagate High Capacity Enterprise Storage - Servchip",
  Dell: "Dell PowerEdge GPU Server Hardware - Servchip",
  "Dell Technologies": "Dell PowerEdge GPU Server Hardware - Servchip",
  HPE: "HPE Enterprise AI Server Infrastructure - Servchip",
  "Hewlett Packard Enterprise":
    "HPE Enterprise AI Server Infrastructure - Servchip",
  Supermicro: "Supermicro Enterprise AI & Rackmount Servers - Servchip",
  Lenovo: "Lenovo Enterprise AI Servers & Workstations - Servchip",
  Gigabyte: "Gigabyte High-Density GPU Servers - Servchip UAE",
  GIGABYTE: "Gigabyte High-Density GPU Servers - Servchip UAE",
  "GIGABYTE Technology": "Gigabyte High-Density GPU Servers - Servchip UAE",
  ASUS: "ASUS ESC GPU Server Infrastructure - Servchip UAE",
  Inspur: "Inspur AI Server Hardware Supplier - Servchip UAE",
  Quanta: "Quanta AI Server Racks - Servchip UAE",
  "Quanta Computer": "Quanta AI Server Racks - Servchip UAE",
  Foxconn: "Foxconn Enterprise AI Server Manufacturing - Servchip UAE",
  Wiwynn: "Wiwynn Cloud & AI Rack Systems - Servchip UAE",
  Solidigm: "Solidigm High Capacity Flash Storage - Servchip UAE",
  Kioxia: "Kioxia Enterprise Data Center SSDs - Servchip UAE",
  "Western Digital": "Western Digital Data Center Drives - Servchip",
  WD: "Western Digital Data Center Drives - Servchip",
  Google: "Google Cloud AI Hardware - Servchip UAE",
  Amazon: "AWS Silicon & AI Accelerators - Servchip UAE",
  Ampere: "AmpereOne Cloud Native Processors - Servchip UAE",
  Nokia: "Nokia Enterprise Network Hardware - Servchip UAE",
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
        alt={LOGO_ALT[name] || `${name} logo`}
        title={LOGO_TITLE[name] || `${name} logo`}
        width={32}
        height={32}
        className={`${className} object-contain`}
        unoptimized={isPng}
        loading="lazy"
      />
    );
  }

  const color = BRAND_COLORS[name] || "#6B7280";
  const textColor = getBrandTextColor(name);
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
