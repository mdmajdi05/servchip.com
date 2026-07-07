import { NextResponse } from "next/server";
import { CATEGORIES } from "@/data/categories";
import { CHIPS } from "@/data/chips";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (slug) {
    const category = CATEGORIES.find((c) => c.slug === slug);
    if (!category) {
      return NextResponse.json(
        { success: false, error: { code: "NOT_FOUND", message: "Category not found" } },
        { status: 404 }
      );
    }
    const products = CHIPS.filter((c) => c.categoryId === category.id);
    return NextResponse.json({ success: true, data: category, products });
  }

  return NextResponse.json({ success: true, data: CATEGORIES });
}
