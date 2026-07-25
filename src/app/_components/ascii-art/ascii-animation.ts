export const DEFAULT_FPS = 10;
export const TEXT_FRAME_DELIMITER = "\n---FRAME---\n";

export type AsciiFrame = {
  text: string;
  durationMs?: number;
};

export type AsciiAnimation = {
  width: number;
  height: number;
  fps?: number;
  loop?: boolean;
  posterFrame?: number;
  frames: AsciiFrame[];
};

type AnimationInput = Partial<Omit<AsciiAnimation, "frames">> & {
  frames?: unknown;
};

function normalizeText(text: string) {
  return text.replace(/\r\n?/g, "\n");
}

function frameDimensions(text: string) {
  const lines = text.split("\n");
  return {
    width: Math.max(0, ...lines.map((line) => Array.from(line).length)),
    height: lines.length,
  };
}

function positiveNumber(value: unknown, name: string) {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    throw new Error(`${name} must be a positive number`);
  }
  return value;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function normalizeFrames(value: unknown): AsciiFrame[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error("ASCII animation must contain at least one frame");
  }

  const frameInputs: unknown[] = value;
  return frameInputs.map((frame, index) => {
    if (typeof frame === "string") {
      return { text: normalizeText(frame) };
    }
    if (!isRecord(frame)) {
      throw new Error(`Frame ${index} must be a string or an ASCII frame`);
    }
    if (typeof frame.text !== "string") {
      throw new Error(`Frame ${index} must be a string or an ASCII frame`);
    }

    const durationMs =
      frame.durationMs !== undefined
        ? positiveNumber(frame.durationMs, `Frame ${index} durationMs`)
        : undefined;

    return { text: normalizeText(frame.text), durationMs };
  });
}

export function parseAsciiJson(value: unknown): AsciiAnimation {
  const input: AnimationInput = Array.isArray(value)
    ? { frames: value }
    : typeof value === "object" && value !== null
      ? value
      : {};
  const frames = normalizeFrames(input.frames);
  const dimensions = frames.map((frame) => frameDimensions(frame.text));
  const inferredWidth = Math.max(...dimensions.map(({ width }) => width));
  const inferredHeight = Math.max(...dimensions.map(({ height }) => height));
  const width =
    input.width === undefined
      ? inferredWidth
      : positiveNumber(input.width, "width");
  const height =
    input.height === undefined
      ? inferredHeight
      : positiveNumber(input.height, "height");

  if (
    dimensions.some(
      (dimensions) =>
        dimensions.width > width || dimensions.height > height,
    )
  ) {
    throw new Error("A frame exceeds the declared ASCII animation dimensions");
  }

  const fps =
    input.fps === undefined ? DEFAULT_FPS : positiveNumber(input.fps, "fps");
  const posterFrame = input.posterFrame ?? 0;
  if (
    !Number.isInteger(posterFrame) ||
    posterFrame < 0 ||
    posterFrame >= frames.length
  ) {
    throw new Error("posterFrame must reference an existing frame");
  }

  return {
    width,
    height,
    fps,
    loop: input.loop ?? true,
    posterFrame,
    frames,
  };
}

export function parseAsciiText(value: string): AsciiAnimation {
  const normalized = normalizeText(value).trimEnd();
  if (normalized.length === 0) {
    throw new Error("ASCII animation text cannot be empty");
  }
  return parseAsciiJson(
    normalized.split(TEXT_FRAME_DELIMITER).map((text) => ({ text })),
  );
}

const animationCache = new Map<string, Promise<AsciiAnimation>>();

export function loadAsciiAnimation(
  source: string,
  signal?: AbortSignal,
): Promise<AsciiAnimation> {
  let request = animationCache.get(source);
  if (!request) {
    request = fetch(source)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Failed to load ASCII animation: ${response.status}`);
        }
        const text = await response.text();
        const isText =
          source.toLowerCase().endsWith(".txt") ||
          response.headers.get("content-type")?.includes("text/plain");
        return isText ? parseAsciiText(text) : parseAsciiJson(JSON.parse(text));
      })
      .catch((error: unknown) => {
        animationCache.delete(source);
        throw error;
      });
    animationCache.set(source, request);
  }

  if (!signal) return request;
  return new Promise((resolve, reject) => {
    const abort = () =>
      reject(new DOMException("ASCII animation load aborted", "AbortError"));
    if (signal.aborted) {
      abort();
      return;
    }
    signal.addEventListener("abort", abort, { once: true });
    request.then(resolve, reject).finally(() => {
      signal.removeEventListener("abort", abort);
    });
  });
}
