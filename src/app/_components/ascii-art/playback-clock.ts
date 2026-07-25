import {
  DEFAULT_FPS,
  type AsciiAnimation,
} from "./ascii-animation";

export function frameDurations(animation: AsciiAnimation) {
  const fallback = 1000 / (animation.fps ?? DEFAULT_FPS);
  return animation.frames.map((frame) => frame.durationMs ?? fallback);
}

export function frameIndexAtElapsed(
  animation: AsciiAnimation,
  elapsedMs: number,
) {
  const durations = frameDurations(animation);
  const totalDuration = durations.reduce((sum, duration) => sum + duration, 0);
  const boundedElapsed = animation.loop
    ? ((elapsedMs % totalDuration) + totalDuration) % totalDuration
    : Math.min(Math.max(elapsedMs, 0), totalDuration);

  let cursor = 0;
  for (let index = 0; index < durations.length; index += 1) {
    cursor += durations[index]!;
    if (boundedElapsed < cursor) return index;
  }
  return durations.length - 1;
}

export class PlaybackClock {
  private elapsedMs = 0;
  private startedAt: number | null = null;

  play(now: number) {
    this.startedAt ??= now;
  }

  pause(now: number) {
    if (this.startedAt === null) return;
    this.elapsedMs += Math.max(0, now - this.startedAt);
    this.startedAt = null;
  }

  frameIndex(animation: AsciiAnimation, now: number) {
    const elapsed =
      this.elapsedMs +
      (this.startedAt === null ? 0 : Math.max(0, now - this.startedAt));
    return frameIndexAtElapsed(animation, elapsed);
  }
}
