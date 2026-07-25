"use client";
import dynamic from "next/dynamic";
import Sidebar from "./_components/sidebar/Sidebar";
import BottomBar from "./_components/sidebar/BottomBar";
import Summary from "./_components/summary/Summary";
import Projects from "./_components/project/Projects";
import Experience from "./_components/experience/Experience";
import Skills from "./_components/skills/Skills";
import Contact from "./_components/contact/Contact";
import { motion, useMotionTemplate } from "framer-motion";
import useMouse from "../app/_utils/useMouse";
import { useSections } from "./_components/sections/sections";

const AnimatedASCIIArt = dynamic(
  () => import("./_components/ascii-art/AnimatedASCIIArt"),
  { ssr: false },
);

export default function HomePage() {
  const { x, y } = useMouse();
  const { sections, activeId, refFor, scrollTo, isInView } = useSections();

  const motionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      <motion.main
        variants={motionVariants}
        className="min-w-screen flex h-[100vh] min-h-screen flex-row items-center justify-end bg-shell text-white"
      >
        <Sidebar sections={sections} activeId={activeId} scrollTo={scrollTo} />
        <BottomBar sections={sections} activeId={activeId} scrollTo={scrollTo} />
        <motion.div
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="h-[100vh] w-[95%] items-start justify-center overflow-x-hidden overflow-y-hidden scroll-smooth bg-shell font-mono text-white *:overflow-x-scroll sm:px-5 md:w-[60%] lg:w-[60%] xl:w-[60%] 2xl:w-[60%]"
        >
          <motion.div
            className={`${isInView("about") ? "opacity-0" : "opacity-100"} grid`}
            ref={refFor("ascii")}
            aria-hidden="true"
          >
            <AnimatedASCIIArt shouldAnimate={isInView("ascii")} />
          </motion.div>
          <motion.div
            ref={refFor("about")}
            className={`mt-16 py-52 ${isInView("experience") ? "opacity-0" : "opacity-100"}`}
          >
            <Summary />
          </motion.div>
          <div ref={refFor("experience")} className="mt-32 w-full py-52">
            <Experience />
          </div>
          <div ref={refFor("projects")} className="py-52">
            <Projects />
          </div>
          <div ref={refFor("skills")} className="py-52">
            <Skills />
          </div>
          <div ref={refFor("contact")} id="contact" className="py-52">
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
      </motion.main>
    </>
  );
}
