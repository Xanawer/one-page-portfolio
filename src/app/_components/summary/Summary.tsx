"use client";
import { motion } from "framer-motion";
import { MapPin, Sparkles, Terminal } from "lucide-react";

const FACTS = [
  { icon: MapPin, label: "Based in", value: "Singapore" },
  { icon: Terminal, label: "Focus", value: "Full-stack · TypeScript" },
  { icon: Sparkles, label: "Currently into", value: "Framer Motion & AI" },
] as const;

export default function Summary() {
  return (
    <div className="mt-2 grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-start">
      <p className="text-pretty text-sm leading-relaxed text-gray-200 sm:text-base">
        Tinkering with computers since I was a child. My first program was a
        script for botting on{" "}
        <motion.span
          className="pointer-events-auto rounded-sm bg-fuchsia-500/20 px-1 text-fuchsia-200 underline decoration-fuchsia-300/60 decoration-dotted underline-offset-4"
          style={{
            cursor: "url('/mushroom_small.png'), auto",
          }}
        >
          MapleStory
        </motion.span>
        , written using Lua. Currently obsessed with learning more about
        frontend development. Proficient in JavaScript, Python and Java.
        Favorite new tool is Framer Motion.
      </p>

      <dl className="grid gap-2 font-mono text-xs">
        {FACTS.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-base border-2 border-white/60 bg-white/[0.03] px-3 py-2 transition-colors hover:border-cyan-300 hover:bg-white/[0.06]"
          >
            <Icon size={14} className="shrink-0 text-cyan-300" aria-hidden />
            <dt className="uppercase tracking-widest text-gray-400">{label}</dt>
            <dd className="ml-auto text-right text-white">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
