import "server-only";
import { and, desc, eq, gt } from "drizzle-orm";
import { db } from "../db";
import { chats } from "../db/schema";
import type { ChatStore } from "./types";

export function createDrizzleStore(): ChatStore {
  return {
    async insert(input) {
      const [chat] = await db
        .insert(chats)
        .values({
          userId: input.userId,
          message: input.message,
          isAdmin: input.isAdmin,
        })
        .returning();
      if (!chat) throw new Error("Insert failed to return a chat row");
      return chat;
    },

    async listByUser(userId) {
      return db.query.chats.findMany({
        where: eq(chats.userId, userId),
        orderBy: desc(chats.createdAt),
      });
    },

    async listAllGrouped() {
      const allUsers = await db
        .selectDistinct({ userId: chats.userId })
        .from(chats);
      return Promise.all(
        allUsers.map(async (user) => ({
          userId: user.userId,
          chats: await db.query.chats.findMany({
            where: eq(chats.userId, user.userId),
            orderBy: desc(chats.createdAt),
          }),
        })),
      );
    },

    async countRecent(userId, since) {
      const recent = await db.query.chats.findMany({
        where: and(eq(chats.userId, userId), gt(chats.createdAt, since)),
        columns: { id: true },
      });
      return recent.length;
    },
  };
}
