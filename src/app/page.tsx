"use client";
import Sidebar from "./_components/sidebar/Sidebar";
import BottomBar from "./_components/sidebar/BottomBar";
import Summary from "./_components/summary/Summary";
import Projects from "./_components/project/Projects";
import Experience from "./_components/experience/Experience";
import Skills from "./_components/skills/Skills";
import Contact from "./_components/contact/Contact";
import { MotionConfig, motion, useReducedMotion } from "framer-motion";
import { useSections } from "./_components/sections/sections";
import ChatButton from "./_components/chat/ChatPopUp";
import {
  AsciiBackground,
  AsciiHero,
} from "./_components/ascii-art/AsciiLanding";
import { AsciiWaterfall } from "./_components/ascii-art/AsciiWaterfall";

export default function HomePage() {
  const { sections, activeId, refFor, scrollTo, isInView } = useSections();
  const shouldReduceMotion = useReducedMotion();
  const asciiActive = isInView("ascii");

  const motionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <MotionConfig reducedMotion="user">
      <motion.main
        variants={motionVariants}
        className="relative min-h-dvh overflow-x-clip bg-shell text-white"
      >
        <AsciiBackground active={asciiActive}>
          <AsciiWaterfall active={asciiActive} />
        </AsciiBackground>
        <Sidebar sections={sections} activeId={activeId} scrollTo={scrollTo} />
        <BottomBar
          sections={sections}
          activeId={activeId}
          scrollTo={scrollTo}
        />
        <motion.div
          initial={shouldReduceMotion ? false : { y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative z-10 mx-auto min-w-0 max-w-5xl px-4 pb-32 font-mono text-white sm:px-6 md:ml-72 md:pb-12 md:pr-8 lg:ml-80 lg:px-10 xl:mr-auto"
        >
          <motion.div
            id="ascii"
            className="grid scroll-mt-6 md:scroll-mt-10"
            ref={refFor("ascii")}
            aria-hidden="true"
          >
            <AsciiHero />
          </motion.div>
          <motion.div
            id="about"
            ref={refFor("about")}
            className="portfolio-section"
          >
            <Summary />
          </motion.div>
          <div
            id="experience"
            ref={refFor("experience")}
            className="portfolio-section"
          >
            <Experience />
          </div>
          <div
            id="projects"
            ref={refFor("projects")}
            className="portfolio-section"
          >
            <Projects />
          </div>
          <div id="skills" ref={refFor("skills")} className="portfolio-section">
            <Skills />
          </div>
          <div
            ref={refFor("contact")}
            id="contact"
            className="portfolio-section"
          >
            <Contact />
          </div>
        </motion.div>
        <div className="noise-overlay" />
        <ChatButton />
      </motion.main>
    </MotionConfig>
  );
}
