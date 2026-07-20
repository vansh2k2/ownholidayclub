import Blog from "@/components/pages/Blog/Blog";
import React from "react";
import { fetchBlogPosts } from "@/lib/blogs";
import { BLOG_OG_IMAGE, createDynamicPageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  const posts = await fetchBlogPosts();
  const featuredImage = posts[0]?.heroImage || posts[0]?.image || BLOG_OG_IMAGE;

  return createDynamicPageMetadata({
    title: "Travel Blog",
    description:
      "Read destination guides, travel inspiration, honeymoon ideas, and member-focused stories from Own Holiday Club.",
    path: "/blog",
    image: featuredImage,
  });
}

function Page() {
  return (
    <div>
      <Blog />
    </div>
  );
}

export default Page;
