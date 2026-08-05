import type { ChipProduct } from "@/types";
import { ALL_CHIP_PRODUCTS } from "@/data/products";

export const CHIPS: ChipProduct[] = ALL_CHIP_PRODUCTS;

export const FEATURED_CHIP_IDS: string[] = CHIPS.filter(
  (c) => c.isFeatured,
).map((c) => c.id);
export const POPULAR_CHIP_IDS: string[] = CHIPS.filter((c) => c.isPopular).map(
  (c) => c.id,
);

export function getChipsByBrand(brandId: string): ChipProduct[] {
  return CHIPS.filter((c) => c.manufacturerId === brandId);
}

export function getChipById(id: string): ChipProduct | undefined {
  return CHIPS.find((c) => c.id === id);
}

export function getChipBySlug(slug: string): ChipProduct | undefined {
  return CHIPS.find((c) => c.slug === slug);
}

export function getBrandChipCount(brandId: string): number {
  return CHIPS.filter((c) => c.manufacturerId === brandId).length;
}

export const BRAND_CHIP_MAP: Record<string, string[]> = CHIPS.reduce(
  (acc, chip) => {
    if (!acc[chip.manufacturerId]) acc[chip.manufacturerId] = [];
    acc[chip.manufacturerId].push(chip.id);
    return acc;
  },
  {} as Record<string, string[]>,
);

/** @deprecated Use {@link getChipsByBrand} instead. */
export const getChipsByManufacturer = getChipsByBrand;
/** @deprecated Use {@link getBrandChipCount} instead. */
export const getManufacturerChipCount = getBrandChipCount;
/** @deprecated Use {@link BRAND_CHIP_MAP} instead. */
export const MANUFACTURER_CHIP_MAP = BRAND_CHIP_MAP;
