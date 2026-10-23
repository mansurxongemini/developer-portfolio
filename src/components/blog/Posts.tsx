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

export async function Posts({
  range,
  exclude = [],
  // Kept for call-site compatibility; rows ignore card layout props.
  columns: _columns,
  thumbnail: _thumbnail,
  direction: _direction,
}: PostsProps) {
  void _columns;
  void _thumbnail;
  void _direction;
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
    <>
      {displayedBlogs.map((post, i) => (
        <Post key={post.id} post={post} index={i} />
      ))}
    </>
  );
}
