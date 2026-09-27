import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { blogPosts, blogCategories } from "../content/blogs";
import { CardSpotlight } from "../components/ui/CardSpotlight";
import { BorderBeam } from "../components/ui/BorderBeam";

export function BlogListPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = blogPosts.find((p) => p.featured) ?? blogPosts[0];

  return (
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-12 md:py-20 w-full min-w-0">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber">
            Engineering Insights
          </span>
          <span className="rounded-full bg-phosphor/10 border border-phosphor/30 px-2 py-0.5 font-mono text-[10px] text-phosphor">
            Technical Blog
          </span>
        </div>
        <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight text-paper leading-[1.1]">
          Architecture, Performance & Systems Engineering
        </h1>
        <p className="mt-4 text-base sm:text-lg text-steel leading-relaxed">
          In-depth technical writeups on web performance optimization, virtualized data grids, offline-first mobile architecture, and JavaScript runtime internals from production deployments at Deloitte, Citi, and Marriott.
        </p>
      </div>

      {/* Featured Article Card with BorderBeam */}
      {selectedCategory === "All" && !searchQuery && (
        <div className="mt-10">
          <span className="text-xs font-mono uppercase tracking-wider text-steel block mb-3">
            Featured Deep Dive
          </span>
          <Link to={`/blog/${featuredPost.slug}`} className="block group">
            <CardSpotlight className="relative p-6 sm:p-9 border border-line/80 bg-ink-2/90 overflow-hidden hover:border-amber/50 transition-all">
              <BorderBeam size={220} duration={9} colorFrom="#f08a72" colorTo="#34d399" />

              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-steel">
                <div className="flex items-center gap-2.5">
                  <span className="rounded-md bg-amber/10 border border-amber/30 px-2.5 py-0.5 text-amber font-medium">
                    {featuredPost.category}
                  </span>
                  <span>•</span>
                  <span>{featuredPost.readTime}</span>
                  <span>•</span>
                  <span>{featuredPost.publishedAt}</span>
                </div>
                {featuredPost.views && (
                  <span className="text-phosphor font-medium">
                    👁 {featuredPost.views} reads
                  </span>
                )}
              </div>

              <h2 className="mt-4 text-xl sm:text-3xl font-bold text-paper group-hover:text-amber transition-colors leading-tight">
                {featuredPost.title}
              </h2>

              <p className="mt-3 text-sm sm:text-base text-steel leading-relaxed max-w-4xl">
                {featuredPost.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-line/60">
                <div className="flex flex-wrap gap-1.5">
                  {featuredPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-line/70 bg-ink-3/70 px-2.5 py-0.5 text-[11px] font-mono text-steel"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-amber group-hover:underline">
                  <span>Read Deep Dive</span>
                  <span>→</span>
                </span>
              </div>
            </CardSpotlight>
          </Link>
        </div>
      )}

      {/* Filter Tabs & Search Bar */}
      <div className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line/60 pb-5">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5">
          {blogCategories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  isActive ? "text-paper font-semibold" : "text-steel hover:text-paper"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeBlogCat"
                    className="absolute inset-0 rounded-full bg-ink-3 border border-line/80 shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search articles, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-line/80 bg-ink-2/80 px-3.5 py-2 pl-9 text-xs text-paper placeholder-steel/60 outline-none focus:border-amber transition-colors"
          />
          <svg
            className="absolute left-3 top-2.5 h-3.5 w-3.5 text-steel"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-2 text-xs text-steel hover:text-paper"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <AnimatePresence>
          {filteredPosts.map((post) => (
            <motion.div
              key={post.slug}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="h-full"
            >
              <Link to={`/blog/${post.slug}`} className="block h-full group">
                <CardSpotlight className="h-full p-6 sm:p-7 flex flex-col justify-between border border-line/70 bg-ink-2/80 hover:-translate-y-1 hover:border-amber/40 transition-all">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-steel">
                      <span className="rounded bg-amber/10 border border-amber/20 px-2 py-0.5 text-amber text-[11px] font-medium">
                        {post.category}
                      </span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="mt-3.5 text-lg sm:text-xl font-bold text-paper group-hover:text-amber transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="mt-2.5 text-xs sm:text-sm text-steel leading-relaxed line-clamp-3">
                      {post.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] text-steel">
                      {post.publishedAt}
                    </span>

                    <span className="font-mono text-xs font-semibold text-amber group-hover:underline flex items-center gap-1">
                      <span>Read Article</span>
                      <span>→</span>
                    </span>
                  </div>
                </CardSpotlight>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredPosts.length === 0 && (
        <div className="mt-12 rounded-2xl border border-line/60 bg-ink-2/50 p-12 text-center">
          <p className="text-paper font-semibold">No articles found matching &quot;{searchQuery}&quot;</p>
          <p className="mt-1 text-xs text-steel">Try searching for other keywords like performance, React, or SQLite.</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="mt-4 rounded-xl bg-ink-3 border border-line px-4 py-2 text-xs font-mono text-amber hover:border-amber transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
