import { Link } from "react-router-dom";
import { blogPosts } from "../content/blogs";
import { CardSpotlight } from "../components/ui/CardSpotlight";
import { BorderBeam } from "../components/ui/BorderBeam";

export function FeaturedBlogs() {
  const posts = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-16 md:py-24">
      {/* Section Header & View All Link */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber">
              Engineering Knowledge Base
            </span>
            <span className="rounded-full bg-phosphor/10 border border-phosphor/30 px-2 py-0.5 font-mono text-[10px] text-phosphor">
              Technical Writing
            </span>
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-paper">
            Featured Tech Articles & Deep Dives
          </h2>
          <p className="mt-3 text-sm sm:text-base text-steel leading-relaxed">
            In-depth architectural breakdowns covering Core Web Vitals optimization, low-latency financial grids, offline-first mobile sync, and JavaScript runtime internals.
          </p>
        </div>

        <Link
          to="/blog"
          className="self-start sm:self-auto inline-flex items-center gap-1.5 rounded-xl border border-amber/40 bg-amber/10 px-4 py-2.5 font-mono text-xs font-semibold text-amber hover:bg-amber hover:text-white transition-all shadow-glow"
        >
          <span>View All Articles</span>
          <span>→</span>
        </Link>
      </div>

      {/* Articles Grid */}
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {posts.map((post, idx) => (
          <Link key={post.slug} to={`/blog/${post.slug}`} className="group block h-full">
            <CardSpotlight className="relative h-full p-6 sm:p-7 flex flex-col justify-between border border-line/70 bg-ink-2/80 hover:-translate-y-1 hover:border-amber/50 transition-all">
              {idx === 0 && (
                <BorderBeam size={180} duration={8} colorFrom="#f08a72" colorTo="#34d399" />
              )}

              <div>
                <div className="flex items-center justify-between text-xs font-mono text-steel">
                  <span className="rounded bg-amber/10 border border-amber/25 px-2 py-0.5 text-amber text-[10px] font-medium">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="mt-4 text-base sm:text-lg font-bold text-paper group-hover:text-amber transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="mt-2.5 text-xs text-steel leading-relaxed line-clamp-3">
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
        ))}
      </div>
    </section>
  );
}
