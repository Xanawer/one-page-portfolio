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
      content:
        "I love TypeScript for the type-safety it brings to JavaScript, and how it empowers the built in LSP to provide better results.",
    },
    {
      title: "React",
      content:
        "I love React as one of the fundemental frameworks used in building a responsive website, and the extensive library of tools and extensions available for it.",
    },
    {
      title: "Python",
      content:
        "Python is perhaps the most language-like of all programming languages. The way pseudocode flows into Python code is just beautiful.",
    },
    {
      title: "Java",
      content:
        "Java is the quintenssential OOP language and provides a solid foundation for building enterprise-level applications.",
    },
    {
      title: "Pandas",
      content:
        "I love Pandas as an extension of Python and the powerful and fast ways it allows me to manipulate data.",
    },
    {
      title: "SQL/SQL-ORMS",
      content:
        "SQL, and ORMS like Prisma, SQLAlchemy or Drizzle, allows for safe and efficient data storage and retrieval.",
    },
    {
      title: "Tailwind CSS",
      content:
        "I love Tailwind CSS. Quick and easy to use, and the utility-first approach is a game-changer.",
    },
    {
      title: "HTML",
      content:
        "HTML has a bunch of useful tags that we can use to really make our websites shine.",
    },
    {
      title: "CSS",
      content: "CSS is what makes everything beautiful.",
    },
  ];

  function accordionGenerator({ title, content }: Skill) {
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

  return (
    <motion.div
      initial={{ y: 200, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      className="my-[10rem] flex min-w-full flex-col overflow-y-scroll border-b-2 border-gray-200 py-10 pr-[6rem]"
    >
      <FlipLink text="Skills" href="#" />
      <br />
      <div className="row-auto mt-2 grid h-[50vh] grid-flow-row gap-4 overflow-y-scroll sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {skills.map((skill, index) => (
          <div key={index}>
            {accordionGenerator({ title: skill.title, content: skill.content })}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
