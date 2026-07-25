import React from "react";
import ChipTabs from "../common/BottomBarChips";
import type { Section, SectionId } from "../sections/sections";

type Props = {
  sections: Section[];
  activeId: SectionId | null;
  scrollTo: (id: SectionId) => void;
};

// This component should replace the Sidebar component in src/app/_components/sidebar/Sidebar.tsx when in mobile mode.
export default function BottomBar({ sections, activeId, scrollTo }: Props) {
  return (
    <nav className="border-border dark:border-darkBorder dark:bg-darkBg m500:h-16 shadow-t fixed bottom-0 left-0 z-20 mx-auto flex h-[88px] w-full items-center overflow-scroll scroll-smooth rounded-t-lg border-b-4 bg-slate-200 px-5 sm:flex md:hidden lg:hidden xl:hidden 2xl:hidden">
      <div className="dark:text-darkText text-text mx-auto flex max-h-full w-[1300px] max-w-full items-center justify-center space-x-5">
        <header className="border-r-2 border-r-black font-mono">
          J.LZZ&nbsp;
        </header>
        <ChipTabs sections={sections} activeId={activeId} scrollTo={scrollTo} />
      </div>
    </nav>
  );
}
