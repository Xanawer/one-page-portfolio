import React from "react";
import ChipTabs from "../common/BottomBarChips";
import type { SectionNavigation } from "../sections/sections";

type Props = SectionNavigation;

// This component should replace the Sidebar component in src/app/_components/sidebar/Sidebar.tsx when in mobile mode.
export default function BottomBar({ sections, activeId, scrollTo }: Props) {
  return (
    <nav
      aria-label="Portfolio sections"
      className="shadow-t fixed inset-x-0 bottom-0 z-[100] flex min-h-16 items-center border-t-2 border-border bg-slate-200 px-3 pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <div className="flex min-w-0 flex-1 items-center gap-3 text-text">
        <header className="shrink-0 border-r-2 border-r-black font-mono">
          J.LZZ&nbsp;
        </header>
        <ChipTabs sections={sections} activeId={activeId} scrollTo={scrollTo} />
      </div>
    </nav>
  );
}
