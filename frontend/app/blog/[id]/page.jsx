import React from "react";
import BlogDetail from "@/components/pages/Blog/BlogDetail/BlogDetail";
import { fetchBlogPostById } from "@/lib/blogs";
import {
  BLOG_OG_IMAGE,
  createDynamicPageMetadata,
  getTextExcerpt,
} from "@/lib/metadata";

export async function generateMetadata({ params }) {
  const slug = params?.id || "";
  const post = await fetchBlogPostById(slug);

  if (!post) {
    return createDynamicPageMetadata({
      title: "Article Not Found",
      description: "This blog post is not available right now.",
      path: `/blog/${slug}`,
      image: BLOG_OG_IMAGE,
    });
  }

  return createDynamicPageMetadata({
    title: post.metaTitle || post.title || "Travel Article",
    description: post.metaDescription || post.excerpt || getTextExcerpt(post.content),
    path: `/blog/${slug}`,
    image: post.ogImage || post.heroImage || post.image || BLOG_OG_IMAGE,
    type: "article",
    publishedTime: post.publishedAt || post.date,
    modifiedTime: post.updatedAt || post.date,
    canonical: post.canonicalTag || undefined,
  });
}

async function Page({ params }) {
  const post = await fetchBlogPostById(params?.id);

  return (
    <div>
      {post?.schemaMarkup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: post.schemaMarkup }}
        />
      )}
      {post?.openGraphTags && (
        <div dangerouslySetInnerHTML={{ __html: post.openGraphTags }} />
      )}
      <BlogDetail postId={params?.id} initialData={post} />
    </div>
  );
}

export default Page;
