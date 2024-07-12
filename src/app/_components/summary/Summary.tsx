"use client";
import { motion } from "framer-motion";
import FlipLink from "../common/FlippingText";

export default function Summary() {
  return (
    <div className="flex flex-col">
      <div className="flex h-[100%] flex-row">
        <FlipLink text="About" href="#" />
        &nbsp;
        <FlipLink text="Me" href="#" />
      </div>
      <div className="mt-2">
        <p className="">
          Tinkering with computers since I was a child. My first program was a
          script for botting on MapleStory, written using Lua. Currently
          obsessed with learning more about frontend development. Proficient in
          Javascript, Python and Java. Favorite new tool is Framer Motion.
        </p>
      </div>
    </div>
  );
}
