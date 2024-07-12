"use client";
import { useEffect, useState } from "react";
import LoremBackground from "./_components/common/LoremIpsumBackground";
import Sidebar from "./_components/sidebar/Sidebar";
import Summary from "./_components/summary/Summary";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";

export default function HomePage() {
  // Use Motion Values for better performance.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  return (
    <>
      <main className="min-w-screen flex h-[100vh] min-h-screen flex-row items-center justify-end overflow-hidden bg-[#15162c] text-white">
        <Sidebar key="sidebar-_components" />
        <LoremBackground />
        <div className="w-[60%] items-center justify-end overflow-auto font-mono">
          <Summary />
        </div>
        <motion.div
          className="cursor-anim pointer-events-none fixed inset-0 left-0 top-0 z-50"
          style={{
            background: useMotionTemplate`radial-gradient(600px at ${x}px ${y}px, rgba(21, 22, 150, 0.2), transparent 80%)`,
          }}
        />
      </main>
    </>
  );
}
