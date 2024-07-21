import "server-only";
import { db } from "../db";
import { chats } from "../db/schema";
import { auth } from "@clerk/nextjs/server";
import { checkRole } from "@simple/app/_utils/logic";
// import { io } from "socket.io-client";
type Chat = typeof chats.$inferInsert;

export async function getMyChats() {
  const user = auth();
  if (!user.userId) throw new Error("User not found");
  const allChats = await db.query.chats.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.createdAt),
  });
  return allChats;
}

export async function getUserChat(userId: string) {
  if (!checkRole("admin"))
    throw new Error("User not authorized to view users chats.");
  const userChats = await db.query.chats.findMany({
    where: (model, { eq }) => eq(model.userId, userId),
    orderBy: (model, { desc }) => desc(model.createdAt),
  });
  return userChats;
}

// Commenting out the Admin chat functions now since I am still not sure about using Clerk.

// Get all the users and their chats, grouped by the user ID
export async function getAdminChats() {
  if (!checkRole("admin")) throw new Error("User not authorized");

  // I could just run multiple queries. Or pull it from Clerk.
  const allUsers = await db
    .selectDistinct({ userId: chats.userId })
    .from(chats);

  // Use Promise.all to ensure all Promises are executed for each user.
  return await Promise.all(
    allUsers.map(async (user) => {
      const userChats = await db.query.chats.findMany({
        where: (model, { eq }) => eq(model.userId, user.userId),
        orderBy: (model, { desc }) => desc(model.createdAt),
      });
      return { userId: user.userId, chats: userChats };
    }),
  );
}

export async function sendChat(message: string) {
  const user = auth();
  if (!user.userId) throw new Error("User not found");
  const newChat = await db.insert(chats).values({
    userId: user.userId,
    message: message,
    isAdmin: checkRole("admin"),
  });
  console.log(newChat);
  return { message: "Chat sent!" };
}

export async function sendChatAsAdmin(
  message: string,
  userIdReplyingTo: string,
) {
  if (!checkRole("admin"))
    throw new Error("User not authorized as admin to send admin chats.");
  const newChat = await db.insert(chats).values({
    userId: userIdReplyingTo,
    message: message,
    isAdmin: true,
  });
  return { message: `Chat sent as admin to ${userIdReplyingTo}!` };
}

// I could technically just use socket.io to replace the REST API.
