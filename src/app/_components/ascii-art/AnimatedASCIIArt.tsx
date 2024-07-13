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

import output0 from "./mushroom/output0";
import output1 from "./mushroom/output1";
import output2 from "./mushroom/output2";
import output3 from "./mushroom/output3";
import output4 from "./mushroom/output4";
import output5 from "./mushroom/output5";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedASCIIArt() {
  const [frame, setFrame] = useState(output0); // Provide a default value for the frame state variable
  const frames = [output0, output1, output2, output3, output4, output5];
  const opacity = useMotionValue(0.75);

  useEffect(() => {
    const id = setInterval(() => {
      const currentIndex = frames.indexOf(frame);
      const nextIndex = (currentIndex + 1) % frames.length;
      setFrame(frames[nextIndex]);
      if (nextIndex === 0) {
        opacity.set(0.75);
      } else {
        opacity.set(opacity.get() + 0.05);
      }
    }, 150);

    return () => clearInterval(id);
  }, [frame]);
  return (
    <motion.div
      style={{ opacity: opacity }}
      className="ml-[-5rem] mt-[-30rem] flex h-[140vh] w-full items-start justify-start"
    >
      <pre className="text-xs tracking-wider">{`
         ${frame}
        `}</pre>
    </motion.div>
  );
}
