import Link from "next/link";
import { BrutalBadge } from "../common/BrutalBadge";
import { motion } from "framer-motion";
import { PROJECTS, type ProjectEntry } from "../content/content";

function Project({ project }: { project: ProjectEntry }) {
  return (
    <div className="mt-4">
      <header className="italic">{project.period}</header>
      <h2>{project.title}</h2>
      {project.links.map((link) => (
        <Link key={link.label} href={link.href}>
          <BrutalBadge>{link.label}</BrutalBadge>
        </Link>
      ))}
      <p className="text-balance py-2 text-xs">{project.description}</p>
      {project.tags.map((tag) => (
        <BrutalBadge key={tag}>{tag}</BrutalBadge>
      ))}
    </div>
  );
}

export default function ProjectCard() {
  return (
    <div className="relative min-w-0">
      <motion.div
        className="mb-6 h-1 w-full origin-left bg-white"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.2 }}
      />
      {PROJECTS.map((project) => (
        <Project key={project.title} project={project} />
      ))}
    </div>
  );
}
