import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main id="main" className="mx-auto max-w-3xl px-4 py-24">
      <p className="font-mono text-[11px] uppercase tracking-widest text-amber">404</p>
      <h1 className="mt-2 font-serif text-4xl text-paper">Signal lost</h1>
      <Link to="/" className="mt-6 inline-block font-mono text-sm text-amber">
        ← Return to console
      </Link>
    </main>
  );
}
