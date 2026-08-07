export type InterpolateValue = string | string[];

export function interpolate(
  value: string | string[],
  vars: Record<string, InterpolateValue>,
): string | string[] {
  if (Array.isArray(value)) {
    const out: string[] = [];
    for (const item of value) {
      const match = /^\{\{\s*(\w+)\s*\}\}$/.exec(item.trim());
      const resolved = match && vars[match[1]];
      if (match && Array.isArray(resolved)) {
        out.push(...resolved);
      } else {
        out.push(interpolate(item, vars) as string);
      }
    }
    return out;
  }
  return value.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, key: string) => {
    const replacement = vars[key];
    if (replacement === undefined || replacement === null) return match;
    return Array.isArray(replacement) ? replacement.join(", ") : replacement;
  });
}
