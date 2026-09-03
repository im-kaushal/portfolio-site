import { HudFrame } from "../components/HudFrame";
import { personalProjects } from "../content/site";

export function Builds() {
  return (
    <section id="builds" className="mx-auto max-w-6xl px-4 py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-amber">Public Builds</p>
      <h2 className="mt-2 font-serif text-4xl text-paper">Live Projects</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {personalProjects.map((project) => (
          <HudFrame
            key={project.id}
            label={project.code}
            className="h-full"
            contentClassName="flex flex-col justify-between p-6 h-full"
          >
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-phosphor">
                {project.name}
              </p>
              <h3 className="mt-2 font-serif text-2xl text-paper">{project.title}</h3>
              <p className="mt-3 text-justify text-sm leading-relaxed text-steel">{project.blurb}</p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-steel">
                {project.stack.join(" · ")}
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-line/50 pt-4">
              {project.liveHref && project.liveHref !== project.repoHref ? (
                <>
                  <a
                    href={project.liveHref}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs uppercase tracking-widest text-amber hover:underline"
                  >
                    Open Live ↗
                  </a>
                  <a
                    href={project.repoHref}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs uppercase tracking-widest text-phosphor hover:underline"
                  >
                    Source Code ↗
                  </a>
                </>
              ) : (
                <a
                  href={project.repoHref}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs uppercase tracking-widest text-amber hover:underline"
                >
                  View Repository ↗
                </a>
              )}
            </div>
          </HudFrame>
        ))}
      </div>
    </section>
  );
}
