import type {
  AnyProduct,
  ChipProduct,
  ServerProduct,
  NetworkingProduct,
  MemoryProduct,
  StorageProduct,
} from "./chip";

export function isChipProduct(p: AnyProduct): p is ChipProduct {
  return "specifications" in p;
}

export function isServerProduct(p: AnyProduct): p is ServerProduct {
  return "formFactor" in p && !("specifications" in p);
}

export function isNetworkingProduct(p: AnyProduct): p is NetworkingProduct {
  return "specs" in p && "management" in p.specs;
}

export function isMemoryProduct(p: AnyProduct): p is MemoryProduct {
  return "specs" in p && "voltage" in p.specs;
}

export function isStorageProduct(p: AnyProduct): p is StorageProduct {
  return "specs" in p && "interface" in p.specs;
}

export function getProductTypeLabel(p: AnyProduct): string {
  if (isChipProduct(p)) return "Chip";
  if (isServerProduct(p)) return "Server";
  if (isNetworkingProduct(p)) return "Networking";
  if (isMemoryProduct(p)) return "Memory";
  if (isStorageProduct(p)) return "Storage";
  return "Product";
}
