interface ProgressiveBlurProps {
  direction?: "top" | "bottom";
  blurLayers?: number;
  maxBlur?: number;
  className?: string;
}

export function ProgressiveBlur({
  direction = "bottom",
  blurLayers = 6,
  maxBlur = 18,
  className = "",
}: ProgressiveBlurProps) {
  const angle = direction === "bottom" ? 180 : 0;
  const segmentSize = 1 / (blurLayers + 1);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: blurLayers }, (_, i) => {
        const index = i + 1;
        const blur = (index / blurLayers) * maxBlur;
        const start = (index - 1) * segmentSize * 100;
        const p1 = index * segmentSize * 100;
        const p2 = (index + 1) * segmentSize * 100;
        const end = (index + 2) * segmentSize * 100;

        const maskImage = `linear-gradient(${angle}deg, rgba(0,0,0,0) ${start}%, rgba(0,0,0,1) ${p1}%, rgba(0,0,0,1) ${p2}%, rgba(0,0,0,0) ${end}%)`;

        return (
          <div
            key={index}
            className="absolute inset-0"
            style={{
              maskImage,
              WebkitMaskImage: maskImage,
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
            }}
          />
        );
      })}
    </div>
  );
}
