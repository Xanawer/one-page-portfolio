"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  GitHub,
  LinkedIn,
} from "@mui/icons-material";
import CatChat from "../common/CatText";

type RefLinks = Record<string, React.RefObject<HTMLDivElement>>;

type Props = {
  toggleLinks: string;
  refLinks: RefLinks;
};

const Sidebar = ({ toggleLinks, refLinks }: Props) => {
  const motionVariants = {
    normal: { scale: 1 },
    hovered: { scale: 1.05 },
    hoverLine: { width: 100 },
  };

  function hoveredLinks(name: string, link: string) {
    return (
      <motion.div whileHover={"hoverLine"} className={"flex flex-row py-1"}>
        <motion.div
          initial={{ width: 10 }}
          variants={motionVariants}
          className="mr-2 mt-[2.2rem] h-0 border-2 border-white"
          animate={toggleLinks === link ? "hoverLine" : "normal"}
        ></motion.div>
        <Link
          href={`#${link}`}
          className="mt-6 font-mono text-sm"
          onClick={() =>
            refLinks[link]?.current?.scrollIntoView({
              behavior: "auto",
              block: "center",
              inline: "center",
            })
          }
        >
          {name}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ x: "-40rem" }}
      animate={{ x: 0 }}
      exit={{ x: "-40rem" }}
      transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
      className="sticky bottom-0 left-0 top-0 h-screen w-[40%] items-center justify-center shadow-lg sm:flex md:flex lg:flex"
    >
      <div className="mt-10 flex h-full w-full flex-col items-center justify-center">
        <div className="flex flex-col items-start justify-start px-10 *:py-2">
          <h1 className="font-mono text-sm font-semibold">
            <i> James </i> Lim Zhong Zhi
          </h1>
          <p className="font-mono text-xs">
            <u> Full-Stack Developer </u>
          </p>
          <p className="font-mono text-xs text-gray-400">
            I am a full-stack developer with a passion for web development.
            Intensely passionate about new Javascript technologies. Dreams of
            being an open-source developer.
          </p>
        </div>
        <motion.div
          variants={motionVariants}
          className="mt-6 flex w-full items-center justify-start px-10"
        >
          <motion.div whileHover={{ y: -10 }}>
            <Link
              href="https://www.github.com/Xanawer"
              className="flex h-8 w-8 items-center justify-center rounded-full"
            >
              <GitHub className="opacity-70" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ y: -10 }}>
            <Link
              href="https://www.linkedin.com/in/Xanawer"
              className="ml-2 flex h-8 w-8 items-center justify-center rounded-full"
            >
              <LinkedIn className="opacity-70" />
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
        </motion.div>
        <div className="portfolio-links flex w-full flex-col items-start justify-start px-10 py-20">
          {hoveredLinks("ASCII.", "ascii")}
          {hoveredLinks("About.", "about")}
          {hoveredLinks("Experience.", "experience")}
          {hoveredLinks("Projects.", "projects")}
          {hoveredLinks("Skills.", "skills")}
          {hoveredLinks("Contact.", "contact")}
        </div>
      </div>
      <CatChat />
    </motion.div>
  );
};

export default Sidebar;
