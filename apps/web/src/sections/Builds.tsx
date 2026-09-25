import { personalProjects } from "../content/site";
import { CardSpotlight } from "../components/ui/CardSpotlight";

export function Builds() {
  return (
    <section id="builds" className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-16 md:py-24">
      {/* Header */}
      <div className="flex flex-col max-w-2xl">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber">
          Open Source & Experimental
        </span>
        <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-paper">
          Independent Projects & Builds
        </h2>
        <p className="mt-3 text-sm sm:text-base text-steel leading-relaxed">
          Open-source developer tools, AI-assisted agents, and web applications exploring emerging patterns in modern frontend engineering.
        </p>
      </div>

      {/* Grid */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {personalProjects.map((project) => (
          <CardSpotlight
            key={project.id}
            className="p-6 sm:p-8 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-lg bg-amber/10 border border-amber/30 px-2.5 py-0.5 text-xs font-semibold text-amber">
                  {project.name}
                </span>
                <span className="text-xs font-mono text-steel">{project.code}</span>
              </div>

              <h3 className="mt-4 text-xl font-bold text-paper transition-colors group-hover:text-amber">
                {project.title}
              </h3>

              <p className="mt-3 text-xs sm:text-sm text-steel leading-relaxed">
                {project.blurb}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-line/70 bg-ink/60 px-2 py-0.5 text-[11px] font-mono text-steel"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-line/60 flex flex-wrap items-center gap-4 text-xs font-medium">
              {project.liveHref && project.liveHref !== project.repoHref ? (
                <>
                  <a
                    href={project.liveHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-amber hover:underline"
                  >
                    <span>Live Preview</span>
                    <span>↗</span>
                  </a>
                  <a
                    href={project.repoHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-steel hover:text-paper"
                  >
                    <span>Source Code</span>
                    <span>↗</span>
                  </a>
                </>
              ) : (
                <a
                  href={project.repoHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-amber hover:underline"
                >
                  <span>View Repository</span>
                  <span>↗</span>
                </a>
              )}
            </div>
          </CardSpotlight>
        ))}
      </div>
    </section>
  );
}
