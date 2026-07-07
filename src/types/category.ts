export interface ChipCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  image?: string;
  parentId?: string;
  sortOrder: number;
  productCount: number;
  isActive: boolean;
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
}
