import { describe, expect, it } from "vitest";
import { createChatInbox, type Viewer } from "./index";
import { createMemoryStore } from "./memory-store";

const alice: Viewer = { userId: "user_alice", role: "user" };
const bob: Viewer = { userId: "user_bob", role: "user" };
const owner: Viewer = { userId: "user_owner", role: "admin" };
const anonymous: Viewer = { userId: null, role: "user" };

function setup() {
  return createChatInbox(createMemoryStore());
}

describe("list", () => {
  it("requires authentication", async () => {
    const inbox = setup();
    const result = await inbox.list(anonymous);
    expect(result).toEqual({ ok: false, reason: "unauthenticated" });
  });

  it("returns a user's own conversation, newest first", async () => {
    const inbox = setup();
    await inbox.send(alice, "first");
    await inbox.send(alice, "second");
    await inbox.send(bob, "not yours");

    const result = await inbox.list(alice);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.view.kind).toBe("own");
    if (result.view.kind !== "own") return;
    expect(result.view.chats.map((c) => c.message)).toEqual([
      "second",
      "first",
    ]);
  });

  it("returns all conversations grouped by user for an admin", async () => {
    const inbox = setup();
    await inbox.send(alice, "hi from alice");
    await inbox.send(bob, "hi from bob");

    const result = await inbox.list(owner);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.view.kind).toBe("grouped");
    if (result.view.kind !== "grouped") return;
    const byUser = Object.fromEntries(
      result.view.conversations.map((c) => [c.userId, c.chats.length]),
    );
    expect(byUser).toEqual({ user_alice: 1, user_bob: 1 });
  });
});

describe("send", () => {
  it("requires authentication", async () => {
    const inbox = setup();
    const result = await inbox.send(anonymous, "hello");
    expect(result).toEqual({ ok: false, reason: "unauthenticated" });
  });

  it("rejects empty and oversized messages", async () => {
    const inbox = setup();
    expect(await inbox.send(alice, "   ")).toEqual({
      ok: false,
      reason: "invalid",
    });
    expect(await inbox.send(alice, "x".repeat(1025))).toEqual({
      ok: false,
      reason: "invalid",
    });
  });

  it("stores the message and returns it, marked as non-admin", async () => {
    const inbox = setup();
    const result = await inbox.send(alice, "hello there");
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.chat.message).toBe("hello there");
    expect(result.chat.userId).toBe("user_alice");
    expect(result.chat.isAdmin).toBe(false);
  });

  it("rejects replyingTo from non-admins", async () => {
    const inbox = setup();
    const result = await inbox.send(alice, "sneaky", "user_bob");
    expect(result).toEqual({ ok: false, reason: "unauthorized" });
  });

  it("lets an admin reply into a user's conversation", async () => {
    const inbox = setup();
    await inbox.send(alice, "question?");
    const reply = await inbox.send(owner, "answer!", "user_alice");
    expect(reply.ok).toBe(true);
    if (!reply.ok) return;
    expect(reply.chat.isAdmin).toBe(true);

    const aliceView = await inbox.list(alice);
    expect(aliceView.ok).toBe(true);
    if (!aliceView.ok) return;
    if (aliceView.view.kind !== "own") return;
    expect(aliceView.view.chats.map((c) => c.message)).toEqual([
      "answer!",
      "question?",
    ]);
  });

  it("rate limits a user after 10 messages in a minute", async () => {
    const inbox = setup();
    for (let i = 0; i < 10; i++) {
      const result = await inbox.send(alice, `msg ${i}`);
      expect(result.ok).toBe(true);
    }
    const eleventh = await inbox.send(alice, "one too many");
    expect(eleventh).toEqual({ ok: false, reason: "rate_limited" });
  });

  it("exempts admins from rate limiting", async () => {
    const inbox = setup();
    for (let i = 0; i < 15; i++) {
      const result = await inbox.send(owner, `reply ${i}`, "user_alice");
      expect(result.ok).toBe(true);
    }
  });
});
