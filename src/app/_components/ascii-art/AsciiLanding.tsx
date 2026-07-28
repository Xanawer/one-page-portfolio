import type { ReactNode } from "react";
import AsciiPlayer from "./AsciiPlayer";

type BackgroundProps = {
  active: boolean;
  children?: ReactNode;
};

export function AsciiBackground({ active, children }: BackgroundProps) {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#170b17]"
      aria-hidden="true"
    >
      {children}
      <div
        className={`absolute -inset-x-[38%] -inset-y-[22%] rotate-[-7deg] transition-opacity duration-700 sm:-inset-x-[18%] md:-inset-x-[5%] ${active ? "opacity-100" : "opacity-0"}`}
      >
        <AsciiPlayer
          source="/ascii/frames.json"
          active={active}
          className="[&_pre]:text-fuchsia-200 [&_pre]:opacity-[0.32]"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,11,23,0.08)_0%,rgba(14,11,30,0.2)_55%,#0e0b1e_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,64,154,0.09)_1px,transparent_1px)] bg-[size:7rem_100%]" />
    </div>
  );
}

export function AsciiHero() {
  return (
    <div className="relative flex h-[clamp(28rem,100dvh,60rem)] flex-col items-end justify-center text-right">
      <p className="font-mono text-xs uppercase text-gray-300">
        Full-Stack Developer
      </p>
      <h1 className="mt-3 font-mono text-5xl font-black leading-[0.9] text-white min-[375px]:sr-only">
        James Lim
      </h1>
      <pre className="m-0 mt-4 hidden max-w-full overflow-hidden whitespace-pre text-[0.35rem] font-bold leading-[1.1] tracking-[0] text-white drop-shadow-[0_2px_1px_#170b17] min-[375px]:block sm:text-[0.48rem] md:text-[0.58rem] lg:text-[0.72rem]">
        <code>{`   $$$$$\\                                                   $$\\       $$\\               
   \\__$$ |                                                  $$ |      \\__|              
      $$ | $$$$$$\\  $$$$$$\\$$$$\\   $$$$$$\\   $$$$$$$\\       $$ |      $$\\ $$$$$$\\$$$$\\  
      $$ | \\____$$\\ $$  _$$  _$$\\ $$  __$$\\ $$  _____|      $$ |      $$ |$$  _$$  _$$\\ 
$$\\   $$ | $$$$$$$ |$$ \/ $$ \/ $$ |$$$$$$$$ |\\$$$$$$\\        $$ |      $$ |$$ \/ $$ \/ $$ |
$$ |  $$ |$$  __$$ |$$ | $$ | $$ |$$   ____| \\____$$\\       $$ |      $$ |$$ | $$ | $$ |
\\$$$$$$  |\\$$$$$$$ |$$ | $$ | $$ |\\$$$$$$$\\ $$$$$$$  |      $$$$$$$$\\ $$ |$$ | $$ | $$ |
 \\______\/  \\_______|\\__| \\__| \\__| \\_______|\\_______\/       \\________|\\__|\\__| \\__| \\__|`}</code>
      </pre>
      <div className="mt-6 h-1 w-20 bg-cyan-300" aria-hidden="true" />
    </div>
  );
}
