import { NextRequest, NextResponse } from "next/server";
import { products } from "@/lib/utils";

export function GET(request: NextRequest) {
  const query = (request.nextUrl.searchParams.get("q") ?? "").trim().slice(0, 100);
  if (!query) return NextResponse.json([]);

  const normalized = query.toLocaleLowerCase();
  const matches = products
    .filter((product) =>
      [product.name, product.description, ...product.categories]
        .some((value) => value.toLocaleLowerCase().includes(normalized)),
    )
    .slice(0, 10)
    .map((product) => [
      query,
      product.name,
      product.description,
      new URL(`/en/projects/${encodeURIComponent(product.id)}`, request.nextUrl.origin).toString(),
    ]);

  return NextResponse.json(matches, {
    headers: { "Cache-Control": "public, max-age=60, s-maxage=300" },
  });
}
