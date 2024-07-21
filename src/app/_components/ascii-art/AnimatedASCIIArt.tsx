"use client";
// I want to make something that allows me to animate ASCII art.
// The frames should be stored, and then replayed sequentially.
// Recommendation is to use Canvas API.

/**
 * TODO LIST:
 * 1. Create a component that takes in a GIF file.
 * 2. The GIF file should be converted into ASCII art frame by frame.
 * 3. The ASCII art should be displayed on the screen.
 * 4. The ASCII art should be animated frame by frame.
 * 5. The ASCII art should be replayed sequentially.
 * 6. The ASCII art should be able to loop.
 * 7. The ASCII art should be able to pause.
 * 8. The ASCII art should be able to play.
 * 9. The ASCII art should be able to stop.
 */

import frames from "./ui2/frames";
import { motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  shouldAnimate: boolean;
};

export default function AnimatedASCIIArt({ shouldAnimate }: Props) {
  const [frame, setFrame] = useState(frames[0]); // Provide a default value for the frame state variable
  const opacity = useMotionValue(0.7);

  useEffect(() => {
    const id = setInterval(() => {
      const currentIndex = frames.indexOf(frame ?? "");
      const nextIndex = (currentIndex + 1) % frames.length;
      setFrame(frames[nextIndex] ? frames[nextIndex] : frames[0]);
    }, 95);

    return () => clearInterval(id);
  }, [frame]);
  return (
    <motion.div
      style={{ opacity: opacity }}
      className="flex rotate-180 items-center justify-center overflow-auto"
    >
      <pre className="pointer-events-none z-[60] inline-flex w-[600px] border-collapse translate-x-32 rotate-180 items-center text-xs font-extralight leading-[0.9rem] tracking-wider">{`
         ${shouldAnimate ? frame : frames[55]} 
        `}</pre>
    </motion.div>
  );
}
