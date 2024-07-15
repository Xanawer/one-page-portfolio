"use client";
import { use, useEffect, useRef, useState } from "react";
import LoremBackground from "./_components/common/LoremIpsumBackground";
import Sidebar from "./_components/sidebar/Sidebar";
import Summary from "./_components/summary/Summary";
import Projects from "./_components/project/Projects";
import Experience from "./_components/experience/Experience";
import {
  useInView,
  motion,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import AnimatedASCIIArt from "./_components/ascii-art/AnimatedASCIIArt";
import Scene from "./_components/3d/Scene";
import useMouse from "./_utils/useMouse";

export default function HomePage() {
  const [toggleLinks, setToggleLinks] = useState("");
  // Use Motion Values for better performance.
  const { x, y } = useMouse();
  const contentRef = useRef(null);
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const contactRef = useRef(null);
  const asciiRef = useRef(null);
  const aboutInView = useInView(aboutRef, {
    margin: "-50% 0px", // top rigtht bottom left
  });
  const experienceInView = useInView(experienceRef, {
    margin: "-50% 0px",
  });
  const projectsInView = useInView(projectsRef, {
    margin: "-50% 0px",
  });
  const asciiInView = useInView(asciiRef, {
    margin: "-50% 0px",
  });

  useEffect(() => {
    if (aboutInView) {
      setToggleLinks("about");
    } else {
      setToggleLinks("");
    }
  }, [aboutInView]);

  useEffect(() => {
    if (experienceInView) {
      setToggleLinks("experience");
    }
  }, [experienceInView]);

  useEffect(() => {
    if (projectsInView) {
      setToggleLinks("projects");
    }
  }, [projectsInView]);

  useEffect(() => {
    if (asciiInView) {
      setToggleLinks("ascii");
    }
  }, [asciiInView]);

  return (
    <>
      <main className="min-w-screen flex h-[100vh] min-h-screen flex-row items-center justify-end bg-[#15162c] text-white">
        <Sidebar
          key="sidebar-_components"
          toggleLinks={toggleLinks}
          refLinks={{
            ascii: asciiRef,
            about: aboutRef,
            experience: experienceRef,
            projects: projectsRef,
            skills: skillsRef,
            contact: contactRef,
          }}
        />
        <LoremBackground />
        <motion.div
          ref={contentRef}
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="h-[100vh] w-[60%] items-start justify-center overflow-x-hidden overflow-y-hidden scroll-smooth font-mono"
        >
          <motion.div
            className={`${aboutInView ? "opacity-0" : "opacity-100"} mb-52 grid h-[110%] -translate-y-[18rem] place-items-start`}
            ref={asciiRef}
          >
            <AnimatedASCIIArt shouldAnimate={asciiInView} />
          </motion.div>
          <motion.div
            ref={aboutRef}
            initial={{ opacity: 0 }}
            animate={aboutInView ? { opacity: 1 } : null}
            className={`py-52 transition-all duration-75`}
          >
            <Summary />
          </motion.div>
          <div
            ref={experienceRef}
            className={`${experienceInView ? "" : ""} py-52`}
          >
            <Experience />
          </div>
          <div
            ref={projectsRef}
            className={`${projectsInView ? "" : ""} py-52`}
          >
            <Projects />
          </div>
        </motion.div>
        <motion.div
          className="cursor-anim z-1 pointer-events-none fixed inset-0 left-0 top-0"
          style={{
            background: useMotionTemplate`radial-gradient(600px at ${x}px ${y}px, rgba(21, 22, 150, 0.2), transparent 80%)`,
          }}
        />
      </main>
    </>
  );
}
