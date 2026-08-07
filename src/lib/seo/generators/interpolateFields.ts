import { interpolate } from "../helpers/interpolate";
import type { SeoFields } from "../templates/types";

export type InterpolateVars = Record<string, string | string[]>;

export function interpolateFields(
  fields: Partial<SeoFields>,
  vars: InterpolateVars,
): Partial<SeoFields> {
  return {
    ...(fields.title
      ? { title: interpolate(fields.title, vars) as string }
      : {}),
    ...(fields.description
      ? { description: interpolate(fields.description, vars) as string }
      : {}),
    ...(fields.keywords
      ? { keywords: interpolate(fields.keywords, vars) as string[] }
      : {}),
    ...(fields.openGraphTitle
      ? {
          openGraphTitle: interpolate(fields.openGraphTitle, vars) as string,
        }
      : {}),
    ...(fields.openGraphDescription
      ? {
          openGraphDescription: interpolate(
            fields.openGraphDescription,
            vars,
          ) as string,
        }
      : {}),
    ...(fields.twitterTitle
      ? { twitterTitle: interpolate(fields.twitterTitle, vars) as string }
      : {}),
    ...(fields.twitterDescription
      ? {
          twitterDescription: interpolate(
            fields.twitterDescription,
            vars,
          ) as string,
        }
      : {}),
    ...(fields.robots ? { robots: fields.robots } : {}),
    ...(fields.noindex ? { noindex: fields.noindex } : {}),
  };
}
