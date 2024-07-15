import React from "react";

// This component should replace the Sidebar component in src/app/_components/sidebar/Sidebar.tsx when in mobile mode.
export default function TopBar() {
  return (
    <nav className="border-border dark:border-darkBorder dark:bg-darkBg m500:h-16 fixed left-0 top-0 z-20 mx-auto flex h-[88px] w-full items-center border-b-4 bg-white px-5 sm:flex md:hidden lg:hidden xl:hidden 2xl:hidden">
      <div className="dark:text-darkText text-text mx-auto flex w-[1300px] max-w-full items-center justify-between">
        TopBar
      </div>
    </nav>
  );
}
