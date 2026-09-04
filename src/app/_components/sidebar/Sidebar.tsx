"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Instagram, Github, Linkedin } from "lucide-react";
import type { SectionNavigation, SectionId } from "../sections/sections";

type Props = SectionNavigation;

const SOCIALS = [
  { icon: Github, label: "GitHub", href: "https://www.github.com/Xanawer" },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/Xanawer",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/LaZZyBird",
  },
] as const;

const Sidebar = ({ sections, activeId, scrollTo }: Props) => {
  const motionVariants = {
    normal: { scale: 1, width: 10 },
    hovered: { scale: 1.05 },
    hoverLine: { width: 100 },
  };
  const linkVariants = {
    normal: { x: 0 },
    hoverLine: { x: 90 },
  };

  function hoveredLinks(name: string, link: SectionId, index: number) {
    const isActive = activeId === link;
    return (
      <motion.div whileHover="hoverLine" className="relative w-full py-1">
        <motion.div
          data-sidebar-line={link}
          initial={{ width: 10 }}
          variants={motionVariants}
          className={`absolute bottom-[7px] left-0 h-0 border-2 transition-colors duration-300 ${
            isActive ? "border-cyan-300" : "border-white"
          }`}
          animate={isActive ? "hoverLine" : "normal"}
        />
        <motion.div
          variants={linkVariants}
          animate={isActive ? "hoverLine" : "normal"}
          className="ml-[18px] mt-6 w-fit"
        >
          <Link
            href={`#${link}`}
            aria-current={isActive ? "location" : undefined}
            className={`font-mono text-sm transition-colors ${
              isActive ? "text-white" : "text-gray-300 hover:text-white"
            }`}
            onClick={(event) => {
              event.preventDefault();
              scrollTo(link);
            }}
          >
            <span
              aria-hidden="true"
              className={`mr-2 text-[0.6rem] tabular-nums transition-colors ${
                isActive ? "text-cyan-300" : "text-gray-500"
              }`}
            >
              {String(index).padStart(2, "0")}
            </span>
            {name}
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.aside
      initial={{ x: "-40rem" }}
      animate={{ x: 0 }}
      exit={{ x: "-40rem" }}
      transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
      className="fixed inset-y-0 left-0 z-[99] hidden w-72 overflow-y-auto border-r border-white/10 bg-shell/40 shadow-lg backdrop-blur-sm md:flex lg:w-80"
    >
      <div className="flex min-h-full w-full flex-col items-center justify-center py-8">
        <div className="flex flex-col items-start justify-start px-10 *:py-2">
          <div className="flex items-center gap-2 !py-0 font-mono text-[0.65rem] uppercase tracking-widest text-gray-400">
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400"
            />
            Open to opportunities
          </div>
          <h1 className="font-mono text-sm font-semibold">
            <i> James </i> Lim Zhong Zhi
          </h1>
          <p className="relative font-mono text-xs">
            <u className="before:absolute before:-inset-1 before:bottom-0 before:z-0 before:block before:-skew-y-3 before:bg-gray-800 hover:before:bg-transparent hover:before:transition-all">
              Full-Stack Developer
            </u>
          </p>
          <p className="text-pretty font-mono text-xs leading-relaxed text-gray-400">
            I am a full-stack developer with a passion for web development.
            Intensely passionate about new Javascript technologies. Dreams of
            being an open-source developer and contributing to the community.
          </p>
        </div>
        <motion.div
          variants={motionVariants}
          className="mt-6 flex w-full flex-col items-start gap-4 px-10"
        >
          <Link
            href="https://www.linkedin.com/in/Xanawer"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border-2 border-dashed border-white px-4 py-2 font-mono text-xs uppercase transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_white] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            View Resume
          </Link>
          <ul className="flex items-center justify-start gap-2">
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <motion.li key={href} whileHover={{ y: -6 }}>
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  <Icon size={22} aria-hidden="true" />
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
        <nav
          aria-label="Section links"
          className="portfolio-links flex w-full flex-col items-start justify-start px-10 py-8 lg:py-12"
        >
          {sections.map((section, index) => (
            <React.Fragment key={section.id}>
              {hoveredLinks(section.label, section.id, index)}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
