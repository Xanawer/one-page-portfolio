import { motion } from "framer-motion";
import type { Section, SectionId } from "../sections/sections";

type Props = {
  sections: Section[];
  activeId: SectionId | null;
  scrollTo: (id: SectionId) => void;
};

const ChipTabs = ({ sections, activeId, scrollTo }: Props) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {sections.map((section) => (
        <Chip
          text={section.label.replace(/\.$/, "")}
          selected={activeId === section.id}
          onSelect={() => scrollTo(section.id)}
          key={section.id}
        />
      ))}
    </div>
  );
};

type ChipProps = {
  text: string;
  selected: boolean;
  onSelect: () => void;
};

const Chip = ({ text, selected, onSelect }: ChipProps) => {
  return (
    <button
      onClick={onSelect}
      className={`${
        selected
          ? "text-white"
          : "text-darkBg hover:bg-slate-700 hover:text-slate-200"
      } relative rounded-md px-2.5 py-0.5 text-sm transition-colors`}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 rounded-md bg-gradient-to-r from-violet-600 to-indigo-600"
        ></motion.span>
      )}
    </button>
  );
};

export default ChipTabs;
