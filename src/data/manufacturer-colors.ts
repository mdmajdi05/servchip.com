export const MANUFACTURER_COLORS: Record<string, string> = {
  NVIDIA: "#76B900",
  AMD: "#ED1C24",
  Intel: "#0071C5",
  Google: "#4285F4",
  "Google Cloud": "#4285F4",
  Amazon: "#FF9900",
  "Amazon Web Services": "#FF9900",
  Qualcomm: "#32529F",
  Ampere: "#0055A5",
  "Dell Technologies": "#007DB8",
  Dell: "#007DB8",
  "Hewlett Packard Enterprise": "#00A94B",
  HPE: "#00A94B",
  Supermicro: "#B22222",
  Lenovo: "#E2231A",
  "GIGABYTE Technology": "#333333",
  GIGABYTE: "#333333",
  ASUS: "#333333",
  Inspur: "#0066CC",
  "Quanta Computer": "#333333",
  Quanta: "#333333",
  Foxconn: "#0072C6",
  Wiwynn: "#0078C0",
  Broadcom: "#E31837",
  Marvell: "#00A1DE",
  Cisco: "#1BA0D7",
  "SK hynix": "#FF6600",
  Samsung: "#1428A0",
  Micron: "#00A3E0",
  Solidigm: "#FF1A1A",
  Kioxia: "#E31837",
  "Western Digital": "#FF6600",
  WD: "#FF6600",
  Seagate: "#6EB92B",
  JEDEC: "#333333",
  Nokia: "#005AFF",
};

const TEXT_DARKEN_MAP: Record<string, string> = {
  "#76B900": "#3D6E00",
  "#ED1C24": "#B91419",
  "#0071C5": "#004A88",
  "#4285F4": "#1A5DC8",
  "#FF9900": "#B36B00",
  "#32529F": "#1E3366",
  "#0055A5": "#003D77",
  "#007DB8": "#005A85",
  "#00A94B": "#007735",
  "#B22222": "#7A1717",
  "#E2231A": "#A01812",
  "#0066CC": "#004D99",
  "#0072C6": "#00528F",
  "#0078C0": "#005689",
  "#E31837": "#A01026",
  "#00A1DE": "#0074A6",
  "#1BA0D7": "#1373A0",
  "#FF6600": "#B34800",
  "#1428A0": "#0E1D70",
  "#00A3E0": "#0073A0",
  "#FF1A1A": "#B31212",
  "#6EB92B": "#4A801D",
  "#005AFF": "#0044CC",
  "#333333": "#1A1A1A",
};

export function getManufacturerTextColor(name: string): string {
  const color = MANUFACTURER_COLORS[name] || "#6B7280";
  return TEXT_DARKEN_MAP[color] || darkenColor(color, 0.35);
}

function darkenColor(hex: string, amount: number): string {
  const r = Math.max(
    0,
    parseInt(hex.slice(1, 3), 16) - Math.round(255 * amount),
  );
  const g = Math.max(
    0,
    parseInt(hex.slice(3, 5), 16) - Math.round(255 * amount),
  );
  const b = Math.max(
    0,
    parseInt(hex.slice(5, 7), 16) - Math.round(255 * amount),
  );
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

export function getManufacturerColor(name: string): string {
  return MANUFACTURER_COLORS[name] || "#6B7280";
}
