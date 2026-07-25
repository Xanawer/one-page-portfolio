import { describe, expect, it } from "vitest";
import {
  DEFAULT_FPS,
  parseAsciiJson,
  parseAsciiText,
} from "./ascii-animation";

describe("ASCII animation parsing", () => {
  it("normalizes the legacy string array format and infers its grid", () => {
    const animation = parseAsciiJson(["XX\r\nX", "XXXX\nXX\nX"]);
    expect(animation).toMatchObject({
      width: 4,
      height: 3,
      fps: DEFAULT_FPS,
      loop: true,
      posterFrame: 0,
    });
    expect(animation.frames[0]?.text).toBe("XX\nX");
  });

  it("accepts structured frames and per-frame durations", () => {
    const animation = parseAsciiJson({
      width: 4,
      height: 2,
      fps: 20,
      loop: false,
      posterFrame: 1,
      frames: [{ text: "one", durationMs: 250 }, { text: "two" }],
    });
    expect(animation.frames[0]?.durationMs).toBe(250);
    expect(animation.posterFrame).toBe(1);
  });

  it("parses delimiter-separated text frames", () => {
    const animation = parseAsciiText("one\n---FRAME---\ntwo");
    expect(animation.frames.map(({ text }) => text)).toEqual(["one", "two"]);
  });

  it.each([
    [[], "at least one frame"],
    [{ frames: ["wide"], width: 2, height: 1 }, "exceeds"],
    [{ frames: ["x"], fps: 0 }, "fps"],
    [{ frames: ["x"], posterFrame: 2 }, "posterFrame"],
    [{ frames: [{ text: "x", durationMs: -1 }] }, "durationMs"],
  ])("rejects malformed input", (input, message) => {
    expect(() => parseAsciiJson(input)).toThrow(message);
  });
});
