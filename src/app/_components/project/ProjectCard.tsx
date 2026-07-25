import Link from "next/link";
import { BrutalBadge } from "../common/BrutalBadge";
import { useRef } from "react";
import { useScroll, motion, useSpring, useTransform } from "framer-motion";
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
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scrollY = useTransform(scrollYProgress, [0, 1], [0.01, 1]);
  const scaleX = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      className="w-inherit relative h-[70vh] overflow-x-scroll overflow-y-scroll"
      ref={containerRef}
    >
      <motion.div
        className={"sticky left-0 top-0 h-2 w-full origin-[0%] bg-white"}
        style={{ scaleX }}
      >
        {" "}
      </motion.div>
      {PROJECTS.map((project) => (
        <Project key={project.title} project={project} />
      ))}
    </div>
  );
}
