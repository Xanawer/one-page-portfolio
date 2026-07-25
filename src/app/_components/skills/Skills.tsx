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
      className="col-span-1 w-full lg:w-[unset]"
      type="single"
      collapsible
    >
      <AccordionItem className="max-w-full lg:w-[500px]" value="item-1">
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
      className="my-[10rem] flex min-w-full flex-col overflow-y-scroll border-b-2 border-gray-200 py-10 pr-[6rem]"
    >
      <FlipLink text="Skills" href="#" />
      <br />
      <div className="row-auto mt-2 grid h-[50vh] grid-flow-row gap-4 overflow-y-scroll sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {SKILLS.map((skill) => (
          <div key={skill.title}>
            <SkillAccordion title={skill.title} content={skill.content} />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
