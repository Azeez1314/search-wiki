import db from "@/db";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json([]);
  }

  const results = await db.execute(sql`
        SELECT
          id,
          title,
          slug,
          summary,
          image_url,
          created_at,
          ts_rank(
            to_tsvector('english', title || ' ' || COALESCE(summary, '') || ' ' || content),
            plainto_tsquery('english', ${query})
          ) AS rank
        FROM articles
        WHERE published = true
          AND to_tsvector(
            'english',
            title || ' ' || COALESCE(summary, '') || ' ' || content
            )
            @@ plainto_tsquery('english', ${query})
        ORDER BY rank DESC
        LIMIT 20
        `);
  return NextResponse.json(results.rows);
}
