import { NextResponse } from "next/server";
import { CHIPS } from "@/data/chips";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase();
  const category = searchParams.get("category");
  const architecture = searchParams.get("architecture");
  const featured = searchParams.get("featured");
  const limit = parseInt(searchParams.get("limit") || "0");

  let results = [...CHIPS];

  if (search) {
    results = results.filter(
      (c) =>
        c.name.toLowerCase().includes(search) ||
        c.series.toLowerCase().includes(search) ||
        c.architecture.toLowerCase().includes(search) ||
        c.description.toLowerCase().includes(search)
    );
  }

  if (category) {
    results = results.filter(
      (c) => c.categoryId === category || c.categoryName.toLowerCase().includes(category.toLowerCase())
    );
  }

  if (architecture) {
    results = results.filter((c) => c.architecture.toLowerCase() === architecture.toLowerCase());
  }

  if (featured === "true") {
    results = results.filter((c) => c.isFeatured);
  }

  if (limit > 0) {
    results = results.slice(0, limit);
  }

  return NextResponse.json({
    success: true,
    data: results,
    pagination: {
      total: results.length,
      page: 1,
      limit: limit || results.length,
      pages: 1,
    },
  });
}
