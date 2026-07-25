import type { ChatMessage, ChatStore, Conversation } from "./types";

export function createMemoryStore(): ChatStore {
  let nextId = 1;
  let lastTimestamp = 0;
  const rows: ChatMessage[] = [];

  return {
    async insert(input) {
      const now = Date.now();
      lastTimestamp = now > lastTimestamp ? now : lastTimestamp + 1;
      const chat: ChatMessage = {
        id: `mem_${nextId++}`,
        userId: input.userId,
        message: input.message,
        isAdmin: input.isAdmin,
        createdAt: new Date(lastTimestamp),
      };
      rows.push(chat);
      return chat;
    },

    async listByUser(userId) {
      return rows
        .filter((row) => row.userId === userId)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    },

    async listAllGrouped() {
      const conversations: Conversation[] = [];
      for (const row of rows) {
        let conversation = conversations.find((c) => c.userId === row.userId);
        if (!conversation) {
          conversation = { userId: row.userId, chats: [] };
          conversations.push(conversation);
        }
        conversation.chats.push(row);
      }
      for (const conversation of conversations) {
        conversation.chats.sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
        );
      }
      return conversations;
    },

    async countRecent(userId, since) {
      return rows.filter(
        (row) => row.userId === userId && row.createdAt >= since,
      ).length;
    },
  };
}
