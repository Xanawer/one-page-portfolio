"use client";
import FlipLink from "../common/FlippingText";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";

export default function Projects() {
  return (
    <motion.div
      initial={{ y: 200, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ amount: 0.15 }}
      className="portfolio-panel min-w-0"
    >
      <FlipLink text="Projects" href="#" />
      <br />
      <ProjectCard />
    </motion.div>
  );
}
