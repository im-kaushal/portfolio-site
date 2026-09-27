import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { blogPosts } from "../content/blogs";
import { CardSpotlight } from "../components/ui/CardSpotlight";
import { copyToClipboard } from "../lib/clipboard";
import { site } from "../content/site";

export function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [activeSectionId, setActiveSectionId] = useState<string>("");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Track active section for table of contents
  useEffect(() => {
    if (!post) return;
    const handleScroll = () => {
      const headings = post.content.sections.map((_, i) =>
        document.getElementById(`section-${i}`)
      );
      const scrollPos = window.scrollY + 160;

      for (let i = headings.length - 1; i >= 0; i--) {
        const el = headings[i];
        if (el && el.offsetTop <= scrollPos) {
          setActiveSectionId(`section-${i}`);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [post]);

  const handleCopyCode = async (code: string, index: number) => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopiedCodeIndex(index);
      setTimeout(() => setCopiedCodeIndex(null), 2500);
    }
  };

  const handleCopyPostLink = async () => {
    const success = await copyToClipboard(window.location.href);
    if (success) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  if (!post) {
    return (
      <main className="mx-auto max-w-4xl px-4 sm:px-6 py-24 text-center">
        <h1 className="text-3xl font-bold text-paper">Article Not Found</h1>
        <p className="mt-2 text-sm text-steel">The requested technical deep dive could not be found.</p>
        <Link
          to="/blog"
          className="mt-6 inline-flex items-center gap-1.5 rounded-xl bg-amber px-5 py-2.5 text-xs font-semibold text-white hover:bg-amber-dim transition-colors"
        >
          ← Back to Tech Blogs
        </Link>
      </main>
    );
  }

  // Related posts
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <>
      {/* Top Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber to-phosphor z-50 origin-left"
        style={{ scaleX }}
      />

      <article className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-10 md:py-16 w-full min-w-0">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between border-b border-line/60 pb-4 mb-8 text-xs font-mono">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-steel hover:text-amber transition-colors font-medium"
          >
            <span>← Back to All Articles</span>
          </Link>

          <div className="flex items-center gap-3 text-steel">
            <span>{post.category}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Main Content Layout with Sticky TOC Sidebar on Desktop */}
        <div className="grid gap-12 lg:grid-cols-[1fr_260px] items-start">
          <div className="min-w-0 max-w-3xl">
            {/* Post Header */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-amber/10 border border-amber/30 px-2.5 py-0.5 text-xs font-semibold text-amber font-mono">
                {post.category}
              </span>
              <span className="text-xs font-mono text-steel">Published {post.publishedAt}</span>
              {post.views && (
                <span className="text-xs font-mono text-phosphor ml-auto">
                  👁 {post.views} views
                </span>
              )}
            </div>

            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-paper leading-[1.12]">
              {post.title}
            </h1>

            {/* Author Profile Strip */}
            <div className="mt-6 flex items-center justify-between border-y border-line/60 py-4">
              <div className="flex items-center gap-3">
                <img
                  src={site.headshotSrc}
                  alt={site.name}
                  className="h-10 w-10 rounded-full border border-line object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-paper">{site.name}</div>
                  <div className="text-[11px] text-steel font-mono">Software Engineer @ HashedIn by Deloitte</div>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyPostLink}
                  className="rounded-lg border border-line bg-ink-2 px-2.5 py-1 text-xs font-mono text-steel hover:border-amber hover:text-paper transition-colors"
                  title="Copy Article Link"
                >
                  {copiedLink ? "✓ Link Copied" : "🔗 Share"}
                </button>
              </div>
            </div>

            {/* Lead Narrative */}
            <div className="mt-8 rounded-2xl border border-line/70 bg-ink-2/70 p-5 sm:p-6 text-sm sm:text-base text-paper leading-relaxed italic border-l-4 border-l-amber">
              {post.content.lead}
            </div>

            {/* Post Sections */}
            <div className="mt-10 space-y-12">
              {post.content.sections.map((section, idx) => (
                <section
                  key={idx}
                  id={`section-${idx}`}
                  className="scroll-mt-24 space-y-4"
                >
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-paper">
                    {section.heading}
                  </h2>

                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-sm sm:text-base text-steel leading-relaxed">
                      {p}
                    </p>
                  ))}

                  {/* Code Snippet Box with Copy Button */}
                  {section.codeSnippet && (
                    <div className="mt-5 overflow-hidden rounded-xl border border-line/80 bg-ink-2/95 shadow-xl font-mono text-xs">
                      <div className="flex items-center justify-between border-b border-line/60 bg-ink-3/90 px-4 py-2 text-steel">
                        <div className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                          <span className="ml-1.5 text-[11px] text-paper">
                            {section.codeSnippet.filename || `${section.codeSnippet.language}.ts`}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleCopyCode(section.codeSnippet!.code, idx)}
                          className="rounded border border-line/60 bg-ink px-2 py-0.5 text-[11px] text-steel hover:text-amber transition-colors"
                        >
                          {copiedCodeIndex === idx ? "✓ Copied" : "Copy Code"}
                        </button>
                      </div>

                      <pre className="overflow-x-auto p-4 text-[12px] leading-relaxed text-paper">
                        <code>{section.codeSnippet.code}</code>
                      </pre>
                    </div>
                  )}

                  {/* Callout Box */}
                  {section.callout && (
                    <div
                      className={`mt-4 rounded-xl border p-4 text-xs sm:text-sm leading-relaxed ${
                        section.callout.type === "important"
                          ? "border-amber/40 bg-amber/10 text-amber"
                          : section.callout.type === "tip"
                          ? "border-phosphor/40 bg-phosphor/10 text-phosphor"
                          : "border-line bg-ink-2 text-steel"
                      }`}
                    >
                      <strong className="uppercase font-mono text-[10px] tracking-wider block mb-1">
                        {section.callout.type === "important"
                          ? "⚠ Important Note"
                          : section.callout.type === "tip"
                          ? "💡 Architecture Pro-Tip"
                          : "📌 Context"}
                      </strong>
                      <p className="font-sans text-paper/90">{section.callout.text}</p>
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Tags Cloud */}
            <div className="mt-12 pt-6 border-t border-line/60 flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-steel uppercase tracking-wider">Tags:</span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-line bg-ink-2 px-2.5 py-1 text-xs font-mono text-paper"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Sticky Desktop Table of Contents Sidebar */}
          <aside className="hidden lg:block sticky top-28 space-y-6">
            <CardSpotlight className="p-5 border border-line/70 bg-ink-2/80">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-paper">
                Table of Contents
              </h3>
              <nav className="mt-3 space-y-2">
                {post.content.sections.map((sec, i) => {
                  const isActive = activeSectionId === `section-${i}`;
                  return (
                    <a
                      key={i}
                      href={`#section-${i}`}
                      className={`block text-xs leading-snug transition-colors ${
                        isActive
                          ? "text-amber font-semibold pl-2 border-l-2 border-amber"
                          : "text-steel hover:text-paper"
                      }`}
                    >
                      {sec.heading}
                    </a>
                  );
                })}
              </nav>

              <div className="mt-6 pt-4 border-t border-line/60">
                <button
                  type="button"
                  onClick={handleCopyPostLink}
                  className="w-full rounded-lg bg-amber px-3 py-2 text-xs font-semibold text-white hover:bg-amber-dim transition-colors text-center shadow-glow"
                >
                  {copiedLink ? "✓ Link Copied" : "Share This Article"}
                </button>
              </div>
            </CardSpotlight>
          </aside>
        </div>

        {/* Next Articles Navigation */}
        <div className="mt-16 pt-12 border-t border-line/60">
          <h2 className="text-xl font-bold text-paper">More Technical Articles</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {relatedPosts.map((related) => (
              <Link key={related.slug} to={`/blog/${related.slug}`} className="group block">
                <CardSpotlight className="h-full p-6 border border-line/70 bg-ink-2/80 hover:border-amber/50 transition-all">
                  <div className="text-[11px] font-mono text-amber">{related.category}</div>
                  <h3 className="mt-2 text-base font-bold text-paper group-hover:text-amber transition-colors">
                    {related.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-steel line-clamp-2">{related.description}</p>
                  <div className="mt-4 text-[11px] font-mono text-steel group-hover:underline">
                    Read Article →
                  </div>
                </CardSpotlight>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
