"use client";
import Sidebar from "./_components/sidebar/Sidebar";
import BottomBar from "./_components/sidebar/BottomBar";
import { MotionConfig, motion, useReducedMotion } from "framer-motion";
import { SectionStack, useSections } from "./_components/sections/sections";
import ChatButton from "./_components/chat/ChatPopUp";
import { AsciiBackground } from "./_components/ascii-art/AsciiLanding";
import { AsciiWaterfall } from "./_components/ascii-art/AsciiWaterfall";

export default function HomePage() {
  const { sections, activeId, sectionRefs, scrollTo, isInView } = useSections();
  const shouldReduceMotion = useReducedMotion();
  const asciiActive = isInView("ascii");
  const navigation = { sections, activeId, scrollTo };

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
          <AsciiWaterfall active variant={activeId ?? "ascii"} />
        </AsciiBackground>
        <Sidebar {...navigation} />
        <BottomBar {...navigation} />
        <motion.div
          initial={shouldReduceMotion ? false : { y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative z-10 mx-auto min-w-0 max-w-5xl px-4 pb-32 font-mono text-white sm:px-6 md:ml-72 md:pb-12 md:pr-8 lg:ml-80 lg:px-10 xl:mr-auto"
        >
          <SectionStack sections={sections} sectionRefs={sectionRefs} />
        </motion.div>
        <div className="noise-overlay" />
        <ChatButton />
      </motion.main>
    </MotionConfig>
  );
}
