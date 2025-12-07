import { WikiCard } from "@/components/ui/wiki-card";

import { getArticles } from "@/lib/data/articles";

export default async function Home() {
  const articles = await getArticles();
  return (
    <div>
      <main className="max-w-2xl mx-auto mt-10 flex flex-col gap-6">
        {articles.map(({ title, id, createdAt, author, summary }) => (
          <WikiCard
            title={title}
            author={author ? author : "Unknown"}
            date={createdAt}
            summary={summary ?? ""}
            href={`/wiki/${id}`}
            key={id}
          />
        ))}
      </main>
    </div>
  );
}
