"use client";
import FlipLink from "../common/FlippingText";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";

export default function Projects() {
  return (
    <motion.div
      initial={{ y: 200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="py-10 pr-[8rem]"
    >
      <FlipLink text="Projects" href="#" />
      <ProjectCard />
    </motion.div>
  );
}
