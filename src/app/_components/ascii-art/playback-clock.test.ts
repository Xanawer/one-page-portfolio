import { describe, expect, it } from "vitest";
import { parseAsciiJson } from "./ascii-animation";
import { frameIndexAtElapsed, PlaybackClock } from "./playback-clock";

const animation = parseAsciiJson({
  fps: 10,
  frames: [{ text: "0" }, { text: "1" }, { text: "2" }],
});

describe("ASCII playback clock", () => {
  it("selects frames from elapsed time and loops without drift", () => {
    expect(frameIndexAtElapsed(animation, 0)).toBe(0);
    expect(frameIndexAtElapsed(animation, 199)).toBe(1);
    expect(frameIndexAtElapsed(animation, 300)).toBe(0);
    expect(frameIndexAtElapsed(animation, 650)).toBe(0);
  });

  it("uses per-frame durations", () => {
    const variable = parseAsciiJson({
      frames: [
        { text: "0", durationMs: 50 },
        { text: "1", durationMs: 200 },
      ],
    });
    expect(frameIndexAtElapsed(variable, 49)).toBe(0);
    expect(frameIndexAtElapsed(variable, 50)).toBe(1);
    expect(frameIndexAtElapsed(variable, 249)).toBe(1);
  });

  it("clamps non-looping animations to their final frame", () => {
    const finite = { ...animation, loop: false };
    expect(frameIndexAtElapsed(finite, 10_000)).toBe(2);
  });

  it("preserves elapsed position across pause and resume", () => {
    const clock = new PlaybackClock();
    clock.play(1_000);
    expect(clock.frameIndex(animation, 1_150)).toBe(1);
    clock.pause(1_150);
    expect(clock.frameIndex(animation, 9_000)).toBe(1);
    clock.play(9_000);
    expect(clock.frameIndex(animation, 9_060)).toBe(2);
  });
});
