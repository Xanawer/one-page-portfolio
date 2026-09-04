import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../common/BrutalAccordion";
import { SKILLS, type SkillEntry } from "../content/content";

function SkillAccordion({
  title,
  content,
  index,
}: SkillEntry & { index: number }) {
  return (
    <Accordion className="w-full" type="single" collapsible>
      <AccordionItem className="w-full max-w-full" value="item-1">
        <AccordionTrigger className="gap-3 text-left text-black">
          <span className="flex min-w-0 items-center gap-3">
            <span className="shrink-0 font-mono text-[0.65rem] font-normal tabular-nums text-black/60">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="truncate">{title}</span>
          </span>
        </AccordionTrigger>
        <AccordionContent className="text-pretty text-black">
          {content}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default function Skills() {
  return (
    <div className="mt-2 grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2">
      {SKILLS.map((skill, index) => (
        <div key={skill.title}>
          <SkillAccordion
            title={skill.title}
            content={skill.content}
            index={index}
          />
        </div>
      ))}
    </div>
  );
}
