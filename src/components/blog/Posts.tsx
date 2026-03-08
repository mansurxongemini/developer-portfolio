import { getPublishedArticles, type Article } from "@/lib/firestore-server";
import Post from "./Post";

interface PostsProps {
  range?: [number] | [number, number];
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
  direction?: "row" | "column";
  exclude?: string[];
}

function toPostShape(article: Article) {
  return {
    id: article.id,
    slug: article.slug,
    content: article.content,
    metadata: {
      title: article.title,
      publishedAt: (article.publishedAt instanceof Date
        ? article.publishedAt
        : article.createdAt instanceof Date
          ? article.createdAt
          : new Date()
      ).toISOString(),
      summary: article.summary,
      image: article.image || article.imageUrl || "",
      tag: article.category || "",
    },
  };
}

const gridClasses: Record<string, string> = {
  "1": "grid-cols-1",
  "2": "grid-cols-1 md:grid-cols-2",
  "3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
};

export async function Posts({
  range,
  columns = "1",
  thumbnail = false,
  exclude = [],
  direction,
}: PostsProps) {
  let allArticlesRaw: Article[] = [];
  try {
    allArticlesRaw = await getPublishedArticles();
  } catch {
    return null;
  }

  let allBlogs = allArticlesRaw.map(toPostShape);

  if (exclude.length) {
    allBlogs = allBlogs.filter((post) => !exclude.includes(post.slug));
  }

  const sortedBlogs = allBlogs.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedBlogs = range
    ? sortedBlogs.slice(range[0] - 1, range.length === 2 ? range[1] : sortedBlogs.length)
    : sortedBlogs;

  if (displayedBlogs.length === 0) return null;

  return (
    <div className={`grid w-full gap-5 ${gridClasses[columns] ?? gridClasses["1"]}`}>
      {displayedBlogs.map((post) => (
        <Post key={post.id} post={post} thumbnail={thumbnail} direction={direction} />
      ))}
    </div>
  );
}
