export function stripServchip(title: string): string {
  return title.replace(/\s*\|\s*Servchip\s*$/i, "").trim();
}
