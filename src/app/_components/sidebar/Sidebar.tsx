"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";

const Sidebar = () => {
  const motionVariants = {
    normal: { scale: 1 },
    hovered: { scale: 1.05 },
    hoverLine: { width: 100 },
  };

  function hoveredLinks(name: string, link: string) {
    return (
      <motion.div whileHover={"hoverLine"} className={"flex flex-row py-3"}>
        <motion.div
          initial={{ width: 10 }}
          variants={motionVariants}
          className="mr-2 mt-8 h-0 border-2 border-white"
        ></motion.div>
        <Link href={`#${link}`} className="text-md mt-6 font-mono">
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
      className="sticky bottom-0 left-0 top-0 h-screen w-[40%] items-center justify-center shadow-lg file:hidden md:flex lg:flex"
    >
      <div className="mt-10 flex h-full w-full flex-col items-center justify-center">
        <div className="flex flex-col items-start justify-start px-10 *:py-2">
          <h1 className="font-mono text-xl font-semibold">
            <i> James </i> Lim Zhong Zhi
          </h1>
          <p className="font-mono text-sm">
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
              href="#"
              className="flex h-8 w-8 items-center justify-center rounded-full"
            >
              <Facebook className="opacity-70" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ y: -10 }}>
            <Link
              href="#"
              className="ml-2 flex h-8 w-8 items-center justify-center rounded-full"
            >
              <Twitter className="opacity-70" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ y: -10 }} className="h-full w-full">
            <Link
              href="#"
              className="ml-2 flex h-8 w-8 items-center justify-center rounded-full"
            >
              <Instagram className="opacity-70" />
            </Link>
          </motion.div>
        </motion.div>
        <div className="portfolio-links *py-5 flex w-full flex-col items-start justify-start px-10 py-20">
          {hoveredLinks("Projects", "projects")}
          {hoveredLinks("About", "about")}
          {hoveredLinks("Skills", "skills")}
          {hoveredLinks("Contact", "contact")}
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
