"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Instagram, Github, Linkedin } from "lucide-react";
import type { SectionNavigation, SectionId } from "../sections/sections";

type Props = SectionNavigation;

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

  function hoveredLinks(name: string, link: SectionId) {
    return (
      <motion.div whileHover="hoverLine" className="relative w-full py-1">
        <motion.div
          data-sidebar-line={link}
          initial={{ width: 10 }}
          variants={motionVariants}
          className="absolute bottom-[7px] left-0 h-0 border-2 border-white"
          animate={activeId === link ? "hoverLine" : "normal"}
        />
        <motion.div
          variants={linkVariants}
          animate={activeId === link ? "hoverLine" : "normal"}
          className="ml-[18px] mt-6 w-fit"
        >
          <Link
            href={`#${link}`}
            className="font-mono text-sm"
            onClick={(event) => {
              event.preventDefault();
              scrollTo(link);
            }}
          >
            {name}
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ x: "-40rem" }}
      animate={{ x: 0 }}
      exit={{ x: "-40rem" }}
      transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
      className="fixed inset-y-0 left-0 z-[99] hidden w-72 overflow-y-auto shadow-lg md:flex lg:w-80"
    >
      <div className="flex min-h-full w-full flex-col items-center justify-center py-8">
        <div className="flex flex-col items-start justify-start px-10 *:py-2">
          <h1 className="font-mono text-sm font-semibold">
            <i> James </i> Lim Zhong Zhi
          </h1>
          <p className="relative font-mono text-xs">
            <u className="before:absolute before:-inset-1 before:bottom-0 before:z-0 before:block before:-skew-y-3 before:bg-gray-800 hover:before:bg-transparent hover:before:transition-all">
              Full-Stack Developer
            </u>
          </p>
          <p className="font-mono text-xs text-gray-400">
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
            className="rounded-2xl border-2 border-dashed border-white px-4 py-2 font-mono text-xs uppercase transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_white]"
          >
            View Resume
          </Link>
          <div className="flex items-center justify-start">
            <motion.div whileHover={{ y: -10 }}>
              <Link
                href="https://www.github.com/Xanawer"
                className="flex h-8 w-8 items-center justify-center rounded-full"
              >
                <Github className="opacity-70" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -10 }}>
              <Link
                href="https://www.linkedin.com/in/Xanawer"
                className="ml-2 flex h-8 w-8 items-center justify-center rounded-full"
              >
                <Linkedin className="opacity-70" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -10 }} className="h-full w-full">
              <Link
                href="https://www.instagram.com/LaZZyBird"
                className="ml-2 flex h-8 w-8 items-center justify-center rounded-full"
              >
                <Instagram className="opacity-70" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
        <div className="portfolio-links flex w-full flex-col items-start justify-start px-10 py-8 lg:py-12">
          {sections.map((section) => (
            <React.Fragment key={section.id}>
              {hoveredLinks(section.label, section.id)}
            </React.Fragment>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
