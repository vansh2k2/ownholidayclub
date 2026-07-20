"use client";

import React, { useEffect, useMemo, useState } from "react";
import Featured from "./Featured";
import Hero from "./Hero";
import Newsletter from "./Newsletter";
import Posts from "./Posts";
import { createImageFallback } from "@/lib/createImageFallback";
import { fetchBlogPosts } from "@/lib/blogs";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1200&q=80";
const handleImageError = createImageFallback(FALLBACK_IMAGE);

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      const posts = await fetchBlogPosts();
      setBlogPosts(posts);
    };

    loadPosts();
  }, []);

  const featuredPost = useMemo(
    () => blogPosts.find((post) => post.featured) || blogPosts[0] || null,
    [blogPosts],
  );

  const standardPosts = useMemo(
    () =>
      blogPosts.filter((post) =>
        featuredPost ? post.id !== featuredPost.id : true,
      ),
    [blogPosts, featuredPost],
  );

  const categories = useMemo(
    () => ["All", ...new Set(standardPosts.map((post) => post.category))],
    [standardPosts],
  );

  const filteredPosts =
    activeCategory === "All"
      ? standardPosts
      : standardPosts.filter((post) => post.category === activeCategory);

  return (
    <div className="bg-[#FDFDFD] min-h-screen font-sans text-slate-900 selection:bg-amber-100 selection:text-amber-900 overflow-hidden luxury-blog-container">
      <Hero onImageError={handleImageError} />
      {featuredPost && (
        <Featured
          featuredPost={featuredPost}
          onImageError={handleImageError}
        />
      )}
      <Posts
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        filteredPosts={filteredPosts}
        onImageError={handleImageError}
      />
      <Newsletter />
    </div>
  );
}
