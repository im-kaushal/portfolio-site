import { impact } from "../content/site";
import { HudFrame } from "../components/HudFrame";

export function Impact() {
  return (
    <section id="impact" className="mx-auto max-w-6xl px-4 py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-amber">Telemetry</p>
      <h2 className="mt-2 font-serif text-4xl text-paper">Impact Strip</h2>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {impact.map((item) => (
          <HudFrame key={item.id} className="p-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-steel">{item.label}</p>
            <p className="mt-2 font-mono text-3xl tabular-nums text-phosphor">{item.readout}</p>
            <p className="mt-2 text-sm text-paper/70">{item.note}</p>
          </HudFrame>
        ))}
      </div>
    </section>
  );
}
