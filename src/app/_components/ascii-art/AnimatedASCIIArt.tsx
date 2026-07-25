"use client";

import { useEffect, useState } from "react";

const FRAMES_URL = "/ascii/frames.json";
const FRAME_INTERVAL_MS = 95;
const POSTER_FRAME_INDEX = 55;

type Props = {
  shouldAnimate: boolean;
};

export default function AnimatedASCIIArt({ shouldAnimate }: Props) {
  const [frames, setFrames] = useState<string[]>([]);
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    if (!shouldAnimate || frames.length > 0) return;

    const controller = new AbortController();

    fetch(FRAMES_URL, { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error(`Failed to load frames: ${res.status}`);
        setFrames((await res.json()) as string[]);
      })
      .catch(() => undefined);

    return () => controller.abort();
  }, [shouldAnimate, frames.length]);

  useEffect(() => {
    if (!shouldAnimate || frames.length === 0) return;

    const id = setInterval(() => {
      setFrameIndex((index) => (index + 1) % frames.length);
    }, FRAME_INTERVAL_MS);

    return () => clearInterval(id);
  }, [shouldAnimate, frames.length]);

  const frame = frames[shouldAnimate ? frameIndex : POSTER_FRAME_INDEX];

  return (
    <div className="flex h-[100vh] rotate-180 flex-col items-center justify-center overflow-hidden">
      {frame !== undefined && (
        <pre className="pointer-events-none z-[60] inline-flex w-[600px] translate-x-32 rotate-180 items-center text-xs font-extralight leading-[0.9rem] tracking-wider opacity-30">
          {frame}
        </pre>
      )}

      <pre className="absolute rotate-180 overflow-hidden text-[0.4rem] leading-[0.7rem] text-gray-50 opacity-100 md:text-[0.6rem] md:leading-[0.9rem] lg:text-xs xl:text-xs">
        <code>
          {`
   $$$$$\\                                                   $$\\       $$\\               \r\n   \\__$$ |                                                  $$ |      \\__|              \r\n      $$ | $$$$$$\\  $$$$$$\\$$$$\\   $$$$$$\\   $$$$$$$\\       $$ |      $$\\ $$$$$$\\$$$$\\  \r\n      $$ | \\____$$\\ $$  _$$  _$$\\ $$  __$$\\ $$  _____|      $$ |      $$ |$$  _$$  _$$\\ \r\n$$\\   $$ | $$$$$$$ |$$ \/ $$ \/ $$ |$$$$$$$$ |\\$$$$$$\\        $$ |      $$ |$$ \/ $$ \/ $$ |\r\n$$ |  $$ |$$  __$$ |$$ | $$ | $$ |$$   ____| \\____$$\\       $$ |      $$ |$$ | $$ | $$ |\r\n\\$$$$$$  |\\$$$$$$$ |$$ | $$ | $$ |\\$$$$$$$\\ $$$$$$$  |      $$$$$$$$\\ $$ |$$ | $$ | $$ |\r\n \\______\/  \\_______|\\__| \\__| \\__| \\_______|\\_______\/       \\________|\\__|\\__| \\__| \\__|
 =======================================================================================
 This is a small ASCII Art Demo, created by James Lim Zhong Zhi.
        `}
        </code>
      </pre>
    </div>
  );
}
