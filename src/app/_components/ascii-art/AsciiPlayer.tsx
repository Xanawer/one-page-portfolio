"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  loadAsciiAnimation,
  type AsciiAnimation,
} from "./ascii-animation";
import { PlaybackClock } from "./playback-clock";

type Props = {
  source: string;
  active: boolean;
  className?: string;
};

const LINE_HEIGHT = 0.9;
const CHARACTER_WIDTH = 0.61;

export default function AsciiPlayer({ source, active, className }: Props) {
  const [animation, setAnimation] = useState<AsciiAnimation>();
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLPreElement>(null);
  const clockRef = useRef(new PlaybackClock());

  useEffect(() => {
    const controller = new AbortController();
    loadAsciiAnimation(source, controller.signal)
      .then(setAnimation)
      .catch(() => undefined);
    return () => controller.abort();
  }, [source]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useLayoutEffect(() => {
    if (!animation || !containerRef.current) return;
    const container = containerRef.current;
    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      const fontSize = Math.max(
        1,
        Math.min(
          width / (animation.width * CHARACTER_WIDTH),
          height / (animation.height * LINE_HEIGHT),
        ),
      );
      container.style.setProperty("--ascii-font-size", `${fontSize}px`);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();
    return () => observer.disconnect();
  }, [animation]);

  useEffect(() => {
    if (!animation || !outputRef.current) return;
    const output = outputRef.current;
    const clock = clockRef.current;
    const posterFrame = animation.posterFrame ?? 0;
    let requestId = 0;
    let lastFrame = -1;

    const renderFrame = (index: number) => {
      if (index === lastFrame) return;
      output.textContent = animation.frames[index]?.text ?? "";
      lastFrame = index;
    };

    if (reducedMotion) {
      clock.pause(performance.now());
      renderFrame(posterFrame);
      return;
    }

    const tick = (now: number) => {
      renderFrame(clock.frameIndex(animation, now));
      requestId = requestAnimationFrame(tick);
    };
    const syncPlayback = () => {
      const shouldPlay = active && !document.hidden;
      if (shouldPlay) {
        clock.play(performance.now());
        cancelAnimationFrame(requestId);
        requestId = requestAnimationFrame(tick);
      } else {
        clock.pause(performance.now());
        cancelAnimationFrame(requestId);
        renderFrame(clock.frameIndex(animation, performance.now()));
      }
    };

    syncPlayback();
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      clock.pause(performance.now());
      cancelAnimationFrame(requestId);
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, [active, animation, reducedMotion]);

  const style = animation
    ? ({
        "--ascii-columns": animation.width,
        "--ascii-rows": animation.height,
      } as CSSProperties)
    : undefined;

  return (
    <div
      ref={containerRef}
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${className ?? ""}`}
      style={style}
      aria-hidden="true"
    >
      <pre
        ref={outputRef}
        className="pointer-events-none m-0 overflow-hidden whitespace-pre font-mono font-extralight leading-[0.9] tracking-[0] text-white opacity-30"
        style={{
          width: "calc(var(--ascii-columns, 1) * 1ch)",
          height:
            "calc(var(--ascii-rows, 1) * var(--ascii-font-size, 1px) * 0.9)",
          fontSize: "var(--ascii-font-size, 1px)",
        }}
      />
    </div>
  );
}
