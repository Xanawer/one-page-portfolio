import React from "react";
import FlipLink from "../common/FlippingText";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../common/BrutalAccordion";
import { SKILLS, type SkillEntry } from "../content/content";

function SkillAccordion({ title, content }: SkillEntry) {
  return (
    <Accordion
      className="w-full"
      type="single"
      collapsible
    >
      <AccordionItem className="w-full max-w-full" value="item-1">
        <AccordionTrigger className="text-black">{title}</AccordionTrigger>
        <AccordionContent className="text-black">{content}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default function Skills() {
  return (
    <motion.div
      initial={{ y: 200, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ amount: 0.15, once: true }}
      className="portfolio-panel flex min-w-0 flex-col"
    >
      <FlipLink text="Skills" href="#" />
      <br />
      <div className="mt-2 grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-2">
        {SKILLS.map((skill) => (
          <div key={skill.title}>
            <SkillAccordion title={skill.title} content={skill.content} />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
