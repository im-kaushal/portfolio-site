import { HudFrame } from "../components/HudFrame";
import { personalProjects } from "../content/site";

export function Builds() {
  return (
    <section id="builds" className="mx-auto max-w-6xl px-4 py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-amber">Public builds</p>
      <h2 className="mt-2 font-serif text-4xl text-paper">Live projects</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {personalProjects.map((project) => (
          <HudFrame key={project.id} label={project.code} className="flex flex-col p-5">
            <p className="font-mono text-[11px] uppercase tracking-widest text-phosphor">
              {project.name}
            </p>
            <h3 className="mt-2 font-serif text-2xl text-paper">{project.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-steel">{project.blurb}</p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-steel">
              {project.stack.join(" · ")}
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href={project.liveHref}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs uppercase tracking-widest text-amber hover:underline"
              >
                Open live →
              </a>
              <a
                href={project.repoHref}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs uppercase tracking-widest text-phosphor hover:underline"
              >
                Source →
              </a>
            </div>
          </HudFrame>
        ))}
      </div>
    </section>
  );
}
