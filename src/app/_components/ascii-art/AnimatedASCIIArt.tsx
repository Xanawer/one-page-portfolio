import AsciiPlayer from "./AsciiPlayer";

type Props = {
  shouldAnimate: boolean;
};

export default function AnimatedASCIIArt({ shouldAnimate }: Props) {
  return (
    <div className="relative grid h-[clamp(28rem,100dvh,60rem)] w-full place-items-center overflow-hidden">
      <AsciiPlayer
        source="/ascii/frames.json"
        active={shouldAnimate}
        className="absolute inset-0"
      />
      <div className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center px-2">
        <p className="m-0 max-w-full text-center font-mono text-xl font-black uppercase leading-tight text-gray-50 min-[375px]:hidden">
          James Lim
          <span className="mt-2 block text-xs font-normal normal-case text-gray-300">
            Full-Stack Developer
          </span>
        </p>
        <pre className="m-0 hidden max-w-full overflow-hidden whitespace-pre text-[0.4rem] leading-[0.7rem] tracking-[0] text-gray-50 min-[375px]:block md:text-[0.6rem] md:leading-[0.9rem] lg:text-xs">
          <code>
            {`
   $$$$$\\                                                   $$\\       $$\\               \r\n   \\__$$ |                                                  $$ |      \\__|              \r\n      $$ | $$$$$$\\  $$$$$$\\$$$$\\   $$$$$$\\   $$$$$$$\\       $$ |      $$\\ $$$$$$\\$$$$\\  \r\n      $$ | \\____$$\\ $$  _$$  _$$\\ $$  __$$\\ $$  _____|      $$ |      $$ |$$  _$$  _$$\\ \r\n$$\\   $$ | $$$$$$$ |$$ \/ $$ \/ $$ |$$$$$$$$ |\\$$$$$$\\        $$ |      $$ |$$ \/ $$ \/ $$ |\r\n$$ |  $$ |$$  __$$ |$$ | $$ | $$ |$$   ____| \\____$$\\       $$ |      $$ |$$ | $$ | $$ |\r\n\\$$$$$$  |\\$$$$$$$ |$$ | $$ | $$ |\\$$$$$$$\\ $$$$$$$  |      $$$$$$$$\\ $$ |$$ | $$ | $$ |\r\n \\______\/  \\_______|\\__| \\__| \\__| \\_______|\\_______\/       \\________|\\__|\\__| \\__| \\__|
 =======================================================================================
 This is a small ASCII Art Demo, created by James Lim Zhong Zhi.
        `}
          </code>
        </pre>
      </div>
    </div>
  );
}
