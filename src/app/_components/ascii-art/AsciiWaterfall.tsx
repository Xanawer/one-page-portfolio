import type { CSSProperties } from "react";

const ALPHANUMERIC_GLYPHS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const SYMBOL_GLYPHS = "<>[]{}\\/|$#@*+=:;._-";
const GLYPHS = `${ALPHANUMERIC_GLYPHS}${SYMBOL_GLYPHS}${SYMBOL_GLYPHS}`;

function pseudoRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function makeStream(
  column: number,
  rows: number,
  lineWidth: number,
  blankEvery: number,
) {
  const lines = Array.from({ length: rows }, (_, row) => {
    if ((row + column * 3) % blankEvery === 0) return "";
    return Array.from({ length: lineWidth }, (_, character) => {
      const seed = column * 997 + row * 37 + character * 101;
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
            className={`ascii-waterfall-column ${columnClassName(index)}`}
            style={style}
          >
            {makeStream(index, rows, lineWidth, blankEvery)}
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

export function AsciiWaterfall({ active }: { active: boolean }) {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <WaterfallColumns
        active={active}
        positions={evenlySpaced(26)}
        rows={72}
        lineWidth={1}
        duration={9}
        blankEvery={8}
        className="opacity-30 [mask-image:linear-gradient(to_bottom,black,black_70%,transparent)]"
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
        blankEvery={10}
        className="opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_12%,transparent_88%)]"
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
