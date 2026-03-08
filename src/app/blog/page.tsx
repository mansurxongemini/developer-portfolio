import { Meta, Schema } from "@once-ui-system/core";
import { baseURL, blog, person } from "@/resources";
import { BlogContent } from "@/components/BlogContent";
import { Posts } from "@/components/blog/Posts";

export async function generateMetadata() {
  return Meta.generate({
    title: blog.title,
    description: blog.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(blog.title)}`,
    path: blog.path,
  });
}

export default function Blog() {
  return (
    <>
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={blog.title}
        description={blog.description}
        path={blog.path}
        image={`/api/og/generate?title=${encodeURIComponent(blog.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/blog`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <BlogContent
        postsFirst={<Posts range={[1, 1]} thumbnail />}
        postsMiddle={<Posts range={[2, 3]} columns="2" thumbnail direction="column" />}
        postsLater={<Posts range={[4]} columns="2" />}
      />
    </>
  );
}
