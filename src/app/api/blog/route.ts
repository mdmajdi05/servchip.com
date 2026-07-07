import { NextResponse } from "next/server";
import { BLOG_POSTS } from "@/data/blog";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase();
  const category = searchParams.get("category");
  const tag = searchParams.get("tag")?.toLowerCase();
  const limit = parseInt(searchParams.get("limit") || "0");

  let results = [...BLOG_POSTS];

  if (search) {
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(search) ||
        p.excerpt.toLowerCase().includes(search) ||
        p.content.toLowerCase().includes(search)
    );
  }

  if (category && category !== "all") {
    results = results.filter((p) => {
      const catName = typeof p.category === "string" ? p.category : p.category.name;
      return catName.toLowerCase() === category.toLowerCase();
    });
  }

  if (tag) {
    results = results.filter((p) => {
      const tagNames = p.tags?.map((t) => {
        if (typeof t === "string") return t;
        return t.name;
      }) ?? [];
      return tagNames.some((name) => name.toLowerCase().includes(tag));
    });
  }

  if (limit > 0) {
    results = results.slice(0, limit);
  }

  return NextResponse.json({
    success: true,
    data: results,
    pagination: { total: results.length, page: 1, limit: limit || results.length, pages: 1 },
  });
}
