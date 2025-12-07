"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { articles } from "@/db/schema";
import Link from "next/link";
import { useState } from "react";

type Article = {
  id: number;
  title: string;
  slug: string;
  summary: string | null;
  created_at: string;
};

export default function ArticleSearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (!query.trim()) return;

    setLoading(true);
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data);
    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* Page Header */}
      <div className="mb-8 space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Search Articles</h1>
        <p className="text-muted-foreground">
          Find articles by titles, summary, or content
        </p>
      </div>

      {/* Search Input */}
      <div className="flex gap-2">
        <Input
          value={query}
          onChange={async (e) => {
            const value = e.target.value;
            setQuery(value);

            if (!value.trim()) {
              setResults([]);
              return;
            }

            setLoading(true);
            const res = await fetch(
              `/api/search?q=${encodeURIComponent(value)}`,
            );
            const data = await res.json();
            setResults(data);
            setLoading(false);
          }}
          placeholder="Search articles..."
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </div>

      <Separator className="my-8" />

      {/* Results */}
      <div className="space-y-4">
        {results.length === 0 && !loading && query && (
          <p className="text-center text-sm text-muted-foreground">
            No articles found.
          </p>
        )}

        {results.map((article) => (
          <Card key={article.id} className="hover:shadow-md transition">
            <CardContent className="p-6 space-y-2">
              <Link href={`/articles/${article.slug}`}>
                <h3 className="text-lg font-semibold hover:underline">
                  {article.title}
                </h3>
              </Link>

              {article.summary && (
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {article.summary}
                </p>
              )}

              <p className="text-xs text-muted-foreground">
                {new Date(article.created_at).toDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
