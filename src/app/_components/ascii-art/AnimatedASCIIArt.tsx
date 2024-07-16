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
import frames from "./ui2/frames";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  shouldAnimate: boolean;
  textArts: { filename: string; content: string }[];
};

export default function AnimatedASCIIArt({ shouldAnimate, textArts }: Props) {
  const [frame, setFrame] = useState(frames[0]); // Provide a default value for the frame state variable
  const opacity = useMotionValue(0.75);

  useEffect(() => {
    const id = setInterval(() => {
      const currentIndex = frames.indexOf(frame ?? "");
      const nextIndex = (currentIndex + 1) % frames.length;
      setFrame(frames[nextIndex] ? frames[nextIndex] : output0);
      if (nextIndex === 0) {
        opacity.set(0.75);
      } else {
        opacity.set(opacity.get() + 0.05);
      }
    }, 100);

    return () => clearInterval(id);
  }, [frame]);
  return (
    <motion.div
      style={{ opacity: opacity }}
      className="grid h-[75vh] w-full place-items-end items-end justify-start overflow-visible"
    >
      <pre className="h-full w-full text-xs tracking-wider">{`
         ${shouldAnimate ? frame : output0}
        `}</pre>
    </motion.div>
  );
}
