import type { SVGProps } from "react";

/** Small stroke icon set for the Obsidian Telemetry UI (24px grid, currentColor). */
const paths: Record<string, string> = {
  terminal: "M4 5h16v14H4zM7 9l3 3-3 3M12 15h5",
  chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  code: "M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14",
  download: "M12 4v11m0 0l-4-4m4 4l4-4M5 20h14",
  send: "M4 12l16-8-6 16-3-7-7-1z",
  copy: "M9 9h10v10H9zM5 15V5h10",
  check: "M5 12l4 4L19 6",
  external: "M14 4h6v6M20 4l-9 9M18 14v6H4V6h6",
  github: "M9 19c-4 1.5-4-2-6-2.5M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 00-1.3-3.2 4.2 4.2 0 00-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 00-6.2 0C6.6 2.8 5.6 3.1 5.6 3.1a4.2 4.2 0 00-.1 3.2A4.6 4.6 0 004.2 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21",
  linkedin: "M4 9h4v11H4zM6 4a2 2 0 110 4 2 2 0 010-4zM11 9h4v1.5c.6-1 1.8-1.8 3.5-1.8 3 0 3.5 2 3.5 4.6V20h-4v-5.8c0-1.4 0-3-1.8-3s-2.2 1.4-2.2 2.9V20h-4z",
  chat: "M4 5h16v11H9l-5 4z",
  search: "M11 4a7 7 0 110 14 7 7 0 010-14zM21 21l-5-5",
  spark: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6",
  atom: "M12 12m-1.5 0a1.5 1.5 0 103 0 1.5 1.5 0 10-3 0M12 4c4.4 0 8 3.6 8 8s-3.6 8-8 8-8-3.6-8-8M4.5 7.5c2.2-3.8 9.5-1 12.5 4.2s1.8 9.8-1 9.2",
  layers: "M12 3l9 5-9 5-9-5zM3 13l9 5 9-5",
  phone: "M8 3h8v18H8zM11 18h2",
  stack: "M4 6h16M4 12h16M4 18h16",
  sync: "M4 12a8 8 0 0114-5l2 2M20 12a8 8 0 01-14 5l-2-2M20 4v5h-5M4 20v-5h5",
  tree: "M5 4h5v5H5zM14 15h5v5h-5zM7.5 9v8.5H14",
  palette: "M12 3a9 9 0 100 18c1 0 1.5-.8 1.5-1.5 0-1.2-1-1.5-1-2.5s.8-1.5 2-1.5H17a4 4 0 004-4c0-4.7-4-8.5-9-8.5zM7.5 11h.01M10 7h.01M15 7.5h.01",
  orbit: "M12 4a8 8 0 108 8M20 4l-4 4",
  cloud: "M7 18a4 4 0 01-.5-8A6 6 0 0118 9a4.5 4.5 0 01-.5 9z",
  network: "M12 5m-2 0a2 2 0 104 0 2 2 0 10-4 0M5 19m-2 0a2 2 0 104 0 2 2 0 10-4 0M19 19m-2 0a2 2 0 104 0 2 2 0 10-4 0M12 7v5M12 12l-6 5M12 12l6 5",
  file: "M6 3h8l4 4v14H6zM14 3v4h4",
  braces: "M8 4c-2 0-2 2-2 4s-1 4-2 4c1 0 2 2 2 4s0 4 2 4M16 4c2 0 2 2 2 4s1 4 2 4c-1 0-2 2-2 4s0 4-2 4",
  mobile: "M7 3h10v18H7z",
  pin: "M12 21s-6-5.5-6-11a6 6 0 0112 0c0 5.5-6 11-6 11zM12 10m-2 0a2 2 0 104 0 2 2 0 10-4 0",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6L6 18",
  arrow: "M5 12h14M13 6l6 6-6 6",
  sun: "M12 8a4 4 0 110 8 4 4 0 010-8zM12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",
  moon: "M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z",
};

export type IconName = keyof typeof paths;

export function Icon({ name, className = "h-4 w-4", ...rest }: { name: IconName | string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      <path d={paths[name] ?? paths.code} />
    </svg>
  );
}

export function SectionHeader({
  index,
  label,
  title,
  description,
  id,
}: {
  index: string;
  label: string;
  title: string;
  description?: string;
  id?: string;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-border-subtle pb-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-2">
        <span className="section-label">
          {index}. {label}
        </span>
        <h2
          id={id}
          className="font-display text-headline-lg-mobile text-text-primary md:text-headline-lg"
        >
          {title}
        </h2>
      </div>
      {description && (
        <p className="max-w-xl text-sm leading-relaxed text-text-muted md:text-base">{description}</p>
      )}
    </div>
  );
}
