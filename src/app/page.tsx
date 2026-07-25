"use client";
import dynamic from "next/dynamic";
import Sidebar from "./_components/sidebar/Sidebar";
import BottomBar from "./_components/sidebar/BottomBar";
import Summary from "./_components/summary/Summary";
import Projects from "./_components/project/Projects";
import Experience from "./_components/experience/Experience";
import Skills from "./_components/skills/Skills";
import Contact from "./_components/contact/Contact";
import {
  MotionConfig,
  motion,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import useMouse from "../app/_utils/useMouse";
import { useSections } from "./_components/sections/sections";
import ChatButton from "./_components/chat/ChatPopUp";

const AnimatedASCIIArt = dynamic(
  () => import("./_components/ascii-art/AnimatedASCIIArt"),
  { ssr: false },
);

export default function HomePage() {
  const { x, y } = useMouse();
  const { sections, activeId, refFor, scrollTo, isInView } = useSections();
  const shouldReduceMotion = useReducedMotion();

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
        <Sidebar sections={sections} activeId={activeId} scrollTo={scrollTo} />
        <BottomBar sections={sections} activeId={activeId} scrollTo={scrollTo} />
        <motion.div
          initial={shouldReduceMotion ? false : { y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mx-auto min-w-0 max-w-5xl px-4 pb-32 font-mono text-white sm:px-6 md:ml-72 md:pb-12 md:pr-8 lg:ml-80 lg:px-10 xl:mr-auto"
        >
          <motion.div
            id="ascii"
            className="grid scroll-mt-6 md:scroll-mt-10"
            ref={refFor("ascii")}
            aria-hidden="true"
          >
            <AnimatedASCIIArt shouldAnimate={isInView("ascii")} />
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
          <div
            id="skills"
            ref={refFor("skills")}
            className="portfolio-section"
          >
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
        <div className="pointer-events-none fixed inset-0 z-[1] bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:44px_44px]" />
        <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(900px_at_15%_85%,rgba(255,42,109,0.09),transparent_70%)]" />
        <motion.div
          className="cursor-anim z-1 pointer-events-none fixed inset-0 left-0 top-0"
          style={{
            background: useMotionTemplate`radial-gradient(600px at ${x}px ${y}px, rgba(0, 240, 255, 0.12), transparent 80%)`,
          }}
        />
        <div className="pointer-events-none fixed inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.45)_100%)]" />
        <div className="noise-overlay" />
        <ChatButton />
      </motion.main>
    </MotionConfig>
  );
}
