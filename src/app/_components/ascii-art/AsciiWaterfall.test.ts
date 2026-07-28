import { describe, expect, it } from "vitest";
import { makeWaterfallStream, WATERFALL_VARIANTS } from "./AsciiWaterfall";

describe("ASCII waterfall variations", () => {
  it("keeps each section variation stable", () => {
    const streams = Object.values(WATERFALL_VARIANTS).map((variant) =>
      makeWaterfallStream(3, 24, 2, variant.narrowBlankEvery, variant.seed),
    );

    expect(new Set(streams).size).toBe(streams.length);
    expect(
      makeWaterfallStream(
        3,
        24,
        2,
        WATERFALL_VARIANTS.projects.narrowBlankEvery,
        WATERFALL_VARIANTS.projects.seed,
      ),
    ).toBe(streams[3]);
  });
});
