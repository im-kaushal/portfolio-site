import { impact } from "../content/site";
import { CardSpotlight } from "../components/ui/CardSpotlight";
import { SlidingNumber } from "../components/ui/SlidingNumber";

export function Impact() {
  return (
    <section id="impact" className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-16 md:py-24">
      {/* Header */}
      <div className="flex flex-col max-w-2xl">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber">
          Performance & Reliability
        </span>
        <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-paper">
          Measurable Engineering Impact
        </h2>
        <p className="mt-3 text-sm sm:text-base text-steel leading-relaxed">
          Concrete performance gains, Core Web Vitals optimizations, test coverage improvements, and defect resolution across enterprise production deployments.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {impact.map((item) => (
          <CardSpotlight
            key={item.id}
            className="p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-medium uppercase tracking-wider text-steel">
                  {item.label}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-phosphor/60" />
              </div>

              <div className="mt-4 text-3xl sm:text-4xl font-extrabold text-paper">
                <SlidingNumber value={item.readout} className="text-phosphor" />
              </div>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-steel leading-relaxed border-t border-line/60 pt-3">
              {item.note}
            </p>
          </CardSpotlight>
        ))}
      </div>
    </section>
  );
}
