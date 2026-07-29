import { describe, expect, it } from "vitest";
import {
  getWaterfallProfile,
  makeWaterfallStream,
  WATERFALL_VARIANTS,
} from "./AsciiWaterfall";

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
        getWaterfallProfile("projects").narrowBlankEvery,
        getWaterfallProfile("projects").seed,
      ),
    ).toBe(streams[3]);
  });

  it("derives a stable profile for a new section id", () => {
    const first = getWaterfallProfile("blog");
    const second = getWaterfallProfile("blog");

    expect(second).toEqual(first);
    expect(getWaterfallProfile("blog")).not.toEqual(
      getWaterfallProfile("notes"),
    );
  });
});
