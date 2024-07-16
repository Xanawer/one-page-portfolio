import { motion } from "framer-motion";
import { useState } from "react";

type RefLinks = Record<string, React.RefObject<HTMLDivElement>>;

type Props = {
  toggleLinks: string;
  refLinks: RefLinks;
  tabs: string[];
};

const ChipTabs = ({ tabs, toggleLinks, refLinks }: Props) => {
  const [selected, setSelected] = useState(tabs[0]);

  const pressChips = (tab: string) => {
    setSelected(tab);
    refLinks[tab]?.current?.scrollIntoView({
      behavior: "auto",
      block: "center",
      inline: "center",
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {tabs.map((tab) => (
        <Chip
          text={tab}
          selected={selected === tab}
          setSelected={pressChips}
          key={tab}
        />
      ))}
    </div>
  );
};

type ChipProps = {
  text: string;
  selected: boolean;
  setSelected: (text: string) => void;
};

const Chip = ({ text, selected, setSelected }: ChipProps) => {
  return (
    <button
      onClick={() => setSelected(text)}
      className={`${
        selected
          ? "text-white"
          : "text-darkBg hover:bg-slate-700 hover:text-slate-200"
      } relative rounded-md px-2.5 py-0.5 text-sm transition-colors`}
    >
      <span className="relative z-10 capitalize">
        {text === "ascii" ? "ASCII" : text}
      </span>
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
