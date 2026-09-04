import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { BrutalBadge } from "../common/BrutalBadge";
import { PROJECTS, type ProjectEntry } from "../content/content";

function Project({ project, index }: { project: ProjectEntry; index: number }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: Math.min(index, 3) * 0.06 }}
      className="group relative pl-6 sm:pl-8"
    >
      {/* timeline marker */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-2 h-3 w-3 -translate-x-1/2 rounded-sm border-2 border-white bg-shell transition-colors group-hover:bg-cyan-300"
      />

      <div className="rounded-base border-2 border-white/80 bg-white/[0.03] p-4 backdrop-blur-[2px] transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:border-white group-hover:bg-white/[0.06] group-hover:shadow-[4px_4px_0px_rgba(103,232,249,0.9)] sm:p-5">
        <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 className="text-balance text-lg font-bold leading-tight sm:text-xl">
            {project.title}
          </h2>
          <span className="shrink-0 font-mono text-xs italic text-gray-400">
            {project.period}
          </span>
        </header>

        <p className="mt-3 text-pretty text-xs leading-relaxed text-gray-300">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link rounded-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              <BrutalBadge className="gap-1 transition-transform group-hover/link:-translate-y-0.5">
                {link.label}
                <ArrowUpRight
                  size={12}
                  className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                />
              </BrutalBadge>
            </Link>
          ))}
        </div>

        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.tags.map((tag) => (
            <li key={tag}>
              <BrutalBadge variant="neutral">{tag}</BrutalBadge>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export default function ProjectCard() {
  return (
    <div className="relative min-w-0">
      <motion.div
        className="mb-8 h-1 w-full origin-left bg-white"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.2 }}
      />
      <div className="relative">
        {/* timeline rail */}
        <span
          aria-hidden="true"
          className="absolute inset-y-2 left-0 w-0.5 bg-gradient-to-b from-white/70 via-white/30 to-transparent"
        />
        <div className="flex flex-col gap-6">
          {PROJECTS.map((project, index) => (
            <Project key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
