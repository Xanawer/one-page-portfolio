"use client";
import { motion } from "framer-motion";
import FlipLink from "../common/FlippingText";

export default function Summary() {
  return (
    <motion.div
      initial={{ y: 200, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      className="flex flex-col py-10 pr-[6rem]"
    >
      <FlipLink text="About" href="#" />
      <br />
      <div className="mt-2">
        <p className="text-balance text-sm">
          Tinkering with computers since I was a child. My first program was a
          script for botting on{" "}
          <motion.span
            className="pointer-events-auto"
            style={{
              cursor: "url('/mushroom_small.png'), auto",
            }}
          >
            MapleStory
          </motion.span>
          , written using Lua. Currently obsessed with learning more about
          frontend development. Proficient in Javascript, Python and Java.
          Favorite new tool is Framer Motion.
        </p>
      </div>
    </motion.div>
  );
}
