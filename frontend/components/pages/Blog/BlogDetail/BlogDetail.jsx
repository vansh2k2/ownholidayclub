"use client";

import React, { useEffect, useState } from "react";
import Author from "./Author";
import Body from "./Body";
import Hero from "./Hero";
import Newsletter from "./Newsletter";
import Related from "./Related";
import { createImageFallback } from "@/lib/createImageFallback";
import { fetchBlogPostById, fetchBlogPosts } from "@/lib/blogs";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1200&q=80";
const handleImageError = createImageFallback(FALLBACK_IMAGE);

export default function BlogDetailPage({ postId, initialData }) {
  const [articleData, setArticleData] = useState(initialData || null);
  const [isLoading, setIsLoading] = useState(!initialData);

  useEffect(() => {
    const loadPost = async () => {
      if (!initialData) {
        setIsLoading(true);
      }
      const [post, posts] = await Promise.all([
        initialData ? Promise.resolve(initialData) : fetchBlogPostById(postId),
        fetchBlogPosts(),
      ]);

      if (!post) {
        setArticleData(null);
        setIsLoading(false);
        return;
      }

      const relatedPosts = posts
        .filter(
          (item) => item.id !== post.id && item.category === post.category,
        )
        .slice(0, 2);

      setArticleData({
        ...post,
        relatedPosts,
      });
      setIsLoading(false);
    };

    loadPost();
  }, [postId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold font-serif text-slate-900 mb-3">
            Loading article
          </h1>
          <p className="text-slate-500">
            Fetching the latest blog content from the API.
          </p>
        </div>
      </div>
    );
  }

  if (!articleData) {
    return (
      <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold font-serif text-slate-900 mb-3">
            Article not found
          </h1>
          <p className="text-slate-500">
            This blog post is not available from the API right now.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFDFD] min-h-screen font-sans text-slate-900 selection:bg-amber-100 selection:text-amber-900 overflow-hidden luxury-blog-detail">
      <Hero articleData={articleData} onImageError={handleImageError} />
      <Body articleData={articleData} onImageError={handleImageError} />
      <Author articleData={articleData} />
      <Related articleData={articleData} onImageError={handleImageError} />
      <Newsletter />
    </div>
  );
}
