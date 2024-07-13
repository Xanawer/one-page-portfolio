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

export default function HomePage() {
  const [toggleLinks, setToggleLinks] = useState("");
  // Use Motion Values for better performance.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const contentRef = useRef(null);
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const contactRef = useRef(null);
  const aboutInView = useInView(aboutRef, {
    margin: "-50% 0px", // top rigtht bottom left
  });
  const experienceInView = useInView(experienceRef, {
    margin: "-50% 0px",
  });
  const projectsInView = useInView(projectsRef, {
    margin: "-50% 0px",
  });

  // useEffect Hooks
  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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

  return (
    <>
      <main className="min-w-screen flex h-[100vh] min-h-screen flex-row items-center justify-end bg-[#15162c] text-white">
        <Sidebar
          key="sidebar-_components"
          toggleLinks={toggleLinks}
          refLinks={{
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
          className="h-[100%] w-[60%] snap-both items-center justify-center overflow-x-hidden overflow-y-scroll scroll-smooth font-mono *:py-56"
        >
          <div className={`${aboutInView ? "opacity-0" : "opacity-100"}`}>
            <AnimatedASCIIArt />
          </div>
          <div ref={aboutRef} className={`${aboutInView ? "" : ""}`}>
            <Summary />
          </div>
          <div ref={experienceRef} className={`${experienceInView ? "" : ""}`}>
            <Experience />
          </div>
          <div ref={projectsRef} className={`${projectsInView ? "" : ""}`}>
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
