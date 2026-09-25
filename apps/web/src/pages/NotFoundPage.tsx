import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main id="main" className="mx-auto max-w-xl px-4 py-32 text-center">
      <span className="rounded-full bg-amber/10 border border-amber/30 px-3 py-1 text-xs font-mono font-semibold text-amber">
        404 · Not Found
      </span>
      <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-paper">Page Not Found</h1>
      <p className="mt-3 text-sm text-steel">
        The link you followed may be broken or the page may have been moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-1.5 rounded-xl bg-amber px-5 py-2.5 text-xs font-semibold text-white hover:bg-amber-dim transition-colors"
      >
        ← Return to Homepage
      </Link>
    </main>
  );
}
