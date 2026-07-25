import type { ChatStore, Viewer } from "./types";

const MAX_MESSAGE_LENGTH = 1024;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;

export function createChatInbox(store: ChatStore) {
  return {
    async list(viewer: Viewer) {
      if (!viewer.userId) {
        return { ok: false as const, reason: "unauthenticated" as const };
      }
      if (viewer.role === "admin") {
        const conversations = await store.listAllGrouped();
        return {
          ok: true as const,
          view: { kind: "grouped" as const, conversations },
        };
      }
      const chats = await store.listByUser(viewer.userId);
      return { ok: true as const, view: { kind: "own" as const, chats } };
    },

    async send(viewer: Viewer, text: string, replyingTo?: string) {
      if (!viewer.userId) {
        return { ok: false as const, reason: "unauthenticated" as const };
      }
      const message = text.trim();
      if (message.length === 0 || message.length > MAX_MESSAGE_LENGTH) {
        return { ok: false as const, reason: "invalid" as const };
      }
      if (replyingTo !== undefined && viewer.role !== "admin") {
        return { ok: false as const, reason: "unauthorized" as const };
      }
      if (viewer.role !== "admin") {
        const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS);
        const recent = await store.countRecent(viewer.userId, since);
        if (recent >= RATE_LIMIT_MAX) {
          return { ok: false as const, reason: "rate_limited" as const };
        }
      }
      const chat = await store.insert({
        userId: replyingTo ?? viewer.userId,
        message,
        isAdmin: viewer.role === "admin",
      });
      return { ok: true as const, chat };
    },
  };
}

export type ChatInbox = ReturnType<typeof createChatInbox>;
