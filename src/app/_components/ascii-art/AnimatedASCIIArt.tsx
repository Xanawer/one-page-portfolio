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
  const opacity = useMotionValue(0.5);

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
      style={{ opacity: 100 }}
      className="flex h-[100vh] rotate-180 flex-col items-center justify-center overflow-hidden"
    >
      <pre className="pointer-events-none z-[60] inline-flex w-[600px] border-collapse translate-x-32 rotate-180 items-center text-xs font-extralight leading-[0.9rem] tracking-wider opacity-30">{`
         ${shouldAnimate ? frame : frames[55]} 
        `}</pre>

      <pre className="absolute rotate-180 text-xs leading-[0.9rem] text-gray-50 opacity-100">
        <code>
          {`
   $$$$$\\                                                   $$\\       $$\\               \r\n   \\__$$ |                                                  $$ |      \\__|              \r\n      $$ | $$$$$$\\  $$$$$$\\$$$$\\   $$$$$$\\   $$$$$$$\\       $$ |      $$\\ $$$$$$\\$$$$\\  \r\n      $$ | \\____$$\\ $$  _$$  _$$\\ $$  __$$\\ $$  _____|      $$ |      $$ |$$  _$$  _$$\\ \r\n$$\\   $$ | $$$$$$$ |$$ \/ $$ \/ $$ |$$$$$$$$ |\\$$$$$$\\        $$ |      $$ |$$ \/ $$ \/ $$ |\r\n$$ |  $$ |$$  __$$ |$$ | $$ | $$ |$$   ____| \\____$$\\       $$ |      $$ |$$ | $$ | $$ |\r\n\\$$$$$$  |\\$$$$$$$ |$$ | $$ | $$ |\\$$$$$$$\\ $$$$$$$  |      $$$$$$$$\\ $$ |$$ | $$ | $$ |\r\n \\______\/  \\_______|\\__| \\__| \\__| \\_______|\\_______\/       \\________|\\__|\\__| \\__| \\__|
 =======================================================================================
        `}
        </code>
      </pre>
    </motion.div>
  );
}
