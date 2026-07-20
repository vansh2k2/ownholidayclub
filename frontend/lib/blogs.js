const API_BASE_URL =
  process.env.NEXT_PUBLIC_OWNHOLIDAYCLUB_BACKEND_URL || "http://localhost:8081";

const slugifyValue = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const DEFAULT_AUTHOR = {
  name: "Own Holiday Club Editorial",
  role: "Travel Editorial Team",
  bio: "The Own Holiday Club editorial team curates destination stories, travel inspiration, and celebration-led content for modern luxury travelers.",
  image:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1600&q=80";

const normalizePost = (post) => ({
  ...post,
  id: post?.slug || slugifyValue(post?.id || post?.title),
  image: post?.image || post?.heroImage || DEFAULT_IMAGE,
  heroImage: post?.heroImage || post?.image || DEFAULT_IMAGE,
  excerpt: post?.excerpt || "",
  category: post?.category || "Destination Guides",
  readTime: post?.readTime || "5 min read",
  tags: Array.isArray(post?.tags) ? post.tags : [],
  content: post?.content || "",
  featured: Boolean(post?.featured),
  metaTitle: post?.metaTitle || post?.title,
  metaDescription: post?.metaDescription || post?.excerpt,
  canonicalTag: post?.canonicalTag || "",
  schemaMarkup: typeof post?.schemaMarkup === 'string' 
    ? post.schemaMarkup.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim() 
    : post?.schemaMarkup || "",
  ogTitle: post?.ogTitle || post?.title,
  ogDescription: post?.ogDescription || post?.excerpt,
  ogImage: post?.ogImage || post?.image || DEFAULT_IMAGE,
  author:
    post?.author && typeof post.author === "object"
      ? {
          name: post.author.name || DEFAULT_AUTHOR.name,
          role: post.author.role || DEFAULT_AUTHOR.role,
          bio: post.author.bio || DEFAULT_AUTHOR.bio,
          image: post.author.image || DEFAULT_AUTHOR.image,
        }
      : {
          ...DEFAULT_AUTHOR,
          name:
            typeof post?.author === "string" && post.author.trim()
              ? post.author
              : DEFAULT_AUTHOR.name,
        },
});

export async function fetchBlogPosts() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/blogs`,
      {
        cache: "no-store",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Failed to fetch blog posts.");
    }

    const posts = Array.isArray(data.data)
      ? data.data.map(normalizePost)
      : [];

    return posts;
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return [];
  }
}

export async function fetchBlogPostById(id) {
  try {
    // id could be the slug
    const response = await fetch(
      `${API_BASE_URL}/api/blogs/post/${id}`,
      {
        cache: "no-store",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      // Fallback to fetch all and find if slug matching fails (legacy or id-based)
      const posts = await fetchBlogPosts();
      return posts.find((post) => post.slug === id || post._id === id) || null;
    }

    return normalizePost(data.data);
  } catch (error) {
    console.error(`Failed to fetch blog post ${id}:`, error);
    return null;
  }
}
