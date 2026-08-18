export function PortraitPlaceholder() {
  return (
    <svg
      viewBox="0 0 240 280"
      role="img"
      aria-label="Abstract portrait placeholder for Kaushal Kumar"
      className="h-full w-full"
    >
      <rect width="240" height="280" fill="#121614" />
      <g stroke="#2c3830" strokeWidth="1">
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={i} x1="0" y1={20 * i} x2="240" y2={20 * i} />
        ))}
      </g>
      <circle cx="120" cy="108" r="42" fill="none" stroke="#e8b86d" strokeWidth="1.5" />
      <path d="M60 230 C80 170 160 170 180 230" fill="none" stroke="#8fe8b4" strokeWidth="1.5" />
      <text
        x="120"
        y="262"
        textAnchor="middle"
        fill="#8a9a8e"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="10"
      >
        HEADSHOT // PENDING
      </text>
    </svg>
  );
}
