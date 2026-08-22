import { site } from "../content/site";

export function ProfilePortrait() {
  return (
    <div className="relative h-full w-full bg-ink-2">
      <img
        src={site.headshotSrc}
        alt={`${site.name} — professional headshot`}
        className="profile-portrait h-full w-full object-cover object-[center_18%]"
        decoding="async"
        fetchPriority="high"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/20 via-transparent to-ink/85"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(11,13,12,0.55)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-ink to-transparent"
        aria-hidden
      />
      <p
        className="pointer-events-none absolute bottom-2 left-3 font-mono text-[10px] uppercase tracking-[0.2em] text-phosphor/80"
        aria-hidden
      >
        ID.VERIFIED
      </p>
    </div>
  );
}
