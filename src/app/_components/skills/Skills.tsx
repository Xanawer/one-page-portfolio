import React from "react";
import FlipLink from "../common/FlippingText";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../common/BrutalAccordion";

type Skill = {
  title: string;
  content: string;
};

export default function Skills() {
  const skills: Skill[] = [
    {
      title: "JavaScript",
      content:
        "Javascript is a language I have a love-hate relationship with. I love it because it's so versatile and powerful, but I hate it because has horrible error-handling.",
    },
    {
      title: "TypeScript",
      content: "I love TypeScript.",
    },
    {
      title: "React",
      content: "I love React.",
    },
    {
      title: "Python",
      content: "I love Python.",
    },
    {
      title: "Java",
      content: "I love Java.",
    },
    {
      title: "Pandas",
      content: "I love Pandas.",
    },
    {
      title: "SQL",
      content: "I love SQL.",
    },
    {
      title: "Tailwind CSS",
      content: "I love Tailwind CSS.",
    },
    {
      title: "HTML",
      content: "I love HTML.",
    },
    {
      title: "CSS",
      content: "I love CSS.",
    },
  ];
  function accordionGenerator({ title, content }: Skill) {
    return (
      <Accordion
        className="col-span-2 w-full lg:w-[unset]"
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
  return (
    <motion.div
      initial={{ y: 200, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      className="my-[10rem] flex flex-col border-b-2 border-gray-200 py-10 pr-[6rem]"
    >
      <FlipLink text="Skills" href="#" />
      <br />
      <div className="mt-2 grid grid-flow-row grid-cols-4 gap-4">
        {skills.map((skill, index) => (
          <div key={index}>
            {accordionGenerator({ title: skill.title, content: skill.content })}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
