import type { CSSProperties } from "react";
import type { SectionId } from "../sections/sections";

const ALPHANUMERIC_GLYPHS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const SYMBOL_GLYPHS = "<>[]{}\\/|$#@*+=:;._-";
const GLYPHS = `${ALPHANUMERIC_GLYPHS}${SYMBOL_GLYPHS}${SYMBOL_GLYPHS}`;

function pseudoRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

export const WATERFALL_VARIANTS: Record<
  SectionId,
  {
    seed: number;
    narrowBlankEvery: number;
    wideBlankEvery: number;
    colorOffset: number;
  }
> = {
  ascii: { seed: 0, narrowBlankEvery: 8, wideBlankEvery: 10, colorOffset: 0 },
  about: { seed: 131, narrowBlankEvery: 9, wideBlankEvery: 11, colorOffset: 1 },
  experience: {
    seed: 263,
    narrowBlankEvery: 7,
    wideBlankEvery: 10,
    colorOffset: 2,
  },
  projects: {
    seed: 397,
    narrowBlankEvery: 8,
    wideBlankEvery: 9,
    colorOffset: 3,
  },
  skills: {
    seed: 521,
    narrowBlankEvery: 10,
    wideBlankEvery: 12,
    colorOffset: 4,
  },
  contact: {
    seed: 653,
    narrowBlankEvery: 9,
    wideBlankEvery: 10,
    colorOffset: 5,
  },
};

export function makeWaterfallStream(
  column: number,
  rows: number,
  lineWidth: number,
  blankEvery: number,
  variantSeed = 0,
) {
  const lines = Array.from({ length: rows }, (_, row) => {
    if ((row + column * 3) % blankEvery === 0) return "";
    return Array.from({ length: lineWidth }, (_, character) => {
      const seed = variantSeed + column * 997 + row * 37 + character * 101;
      return GLYPHS[Math.floor(pseudoRandom(seed) * GLYPHS.length)];
    }).join("");
  });
  const stream = lines.join("\n");
  return `${stream}\n${stream}`;
}

type ColumnsProps = {
  active: boolean;
  positions: number[];
  rows: number;
  lineWidth: number;
  duration: number;
  blankEvery: number;
  variantSeed: number;
  colorOffset: number;
  className: string;
  columnClassName: (index: number) => string;
};

function WaterfallColumns({
  active,
  positions,
  rows,
  lineWidth,
  duration,
  blankEvery,
  variantSeed,
  colorOffset,
  className,
  columnClassName,
}: ColumnsProps) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {positions.map((left, index) => {
        const speedOffset = pseudoRandom(index + lineWidth * 17);
        const style: CSSProperties = {
          left: `${left.toFixed(4)}%`,
          animationDuration: `${(duration + speedOffset * duration * 0.65).toFixed(3)}s`,
          animationDelay: `-${(speedOffset * duration).toFixed(3)}s`,
          animationPlayState: active ? "running" : "paused",
        };
        return (
          <pre
            key={`${left}-${index}`}
            className={`ascii-waterfall-column ${columnClassName(index + colorOffset)}`}
            style={style}
          >
            {makeWaterfallStream(
              index,
              rows,
              lineWidth,
              blankEvery,
              variantSeed,
            )}
          </pre>
        );
      })}
    </div>
  );
}

const evenlySpaced = (count: number, start = 0, end = 100) =>
  Array.from(
    { length: count },
    (_, index) => start + (index / Math.max(1, count - 1)) * (end - start),
  );

export function AsciiWaterfall({
  active,
  variant,
}: {
  active: boolean;
  variant: SectionId;
}) {
  const profile = WATERFALL_VARIANTS[variant];

  return (
    <div
      className="absolute inset-0"
      data-waterfall-variant={variant}
      aria-hidden="true"
    >
      <WaterfallColumns
        active={active}
        positions={evenlySpaced(26)}
        rows={72}
        lineWidth={1}
        duration={9}
        blankEvery={profile.narrowBlankEvery}
        variantSeed={profile.seed}
        colorOffset={profile.colorOffset}
        className="opacity-30 transition-opacity duration-500 [mask-image:linear-gradient(to_bottom,black,black_70%,transparent)]"
        columnClassName={(index) =>
          index % 6 === 0 ? "text-cyan-200/75" : "text-fuchsia-200/50"
        }
      />
      <WaterfallColumns
        active={active}
        positions={evenlySpaced(10, 4, 92)}
        rows={64}
        lineWidth={3}
        duration={6.8}
        blankEvery={profile.wideBlankEvery}
        variantSeed={profile.seed + 79}
        colorOffset={profile.colorOffset}
        className="opacity-30 transition-opacity duration-500 [mask-image:radial-gradient(ellipse_at_center,black_12%,transparent_88%)]"
        columnClassName={(index) =>
          index % 3 === 0
            ? "text-white/60"
            : index % 3 === 1
              ? "text-cyan-200/55"
              : "text-fuchsia-200/55"
        }
      />
    </div>
  );
}
