import { motion } from "framer-motion";
import type { SectionNavigation } from "../sections/sections";

type Props = SectionNavigation;

const ChipTabs = ({ sections, activeId, scrollTo }: Props) => {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto py-2">
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
      aria-current={selected ? "location" : undefined}
      className={`${
        selected
          ? "text-white"
          : "text-darkBg hover:bg-slate-700 hover:text-slate-200"
      } relative shrink-0 rounded-md px-2.5 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600`}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.span
          data-active-chip
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 rounded-md bg-gradient-to-r from-violet-600 to-indigo-600"
        ></motion.span>
      )}
    </button>
  );
};

export default ChipTabs;
