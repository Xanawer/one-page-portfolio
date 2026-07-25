//
import {
  sendChat,
  sendChatAsAdmin,
  getMyChats,
  getAdminChats,
  getUserChat,
} from "@simple/server/api/chat";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { db } from "@simple/server/db";
import { chats } from "@simple/server/db/schema";
import { and, eq, gt } from "drizzle-orm";

const chatRequestSchema = z.object({
  message: z.string().trim().min(1).max(1024),
  role: z.enum(["user", "admin"]).optional().default("user"),
  userId: z.string().optional(),
});

// Define a type for the chat response
type ChatResponse = string | { message: string };

function isAuthError(e: unknown) {
  return (
    e instanceof Error &&
    (e.message.includes("not found") ||
      e.message.includes("not authorized") ||
      e.message.includes("not authenticated"))
  );
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const params = url.searchParams;
  try {
    if (params.get("user") === "user") {
      const chats =
        params.get("userId") === "none"
          ? await getMyChats()
          : await getUserChat(params.get("userId")!);
      return Response.json({ message: "GET /api/chats", chats: chats });
    } else {
      const allUserChats = await getAdminChats();
      return Response.json({ message: "GET /api/chats", chats: allUserChats });
    }
  } catch (e) {
    if (isAuthError(e)) {
      return new Response("User not authenticated or registered", {
        status: 401,
      });
    }
    console.error(e);
    return new Response("Internal server error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const res = chatRequestSchema.parse(body);

    // Simple rate limit: max 10 messages per user per minute.
    const { userId } = auth();
    if (userId) {
      const recentChats = await db.query.chats.findMany({
        where: and(
          eq(chats.userId, userId),
          gt(chats.createdAt, new Date(Date.now() - 60_000)),
        ),
        columns: { id: true },
      });
      if (recentChats.length >= 10) {
        return new Response("Rate limit exceeded. Try again in a minute.", {
          status: 429,
        });
      }
    }

    let newChatResponse: ChatResponse;

    if (res.role === "admin") {
      newChatResponse = await sendChatAsAdmin(res.message, res.userId ?? "");
    } else {
      newChatResponse = await sendChat(res.message);
    }

    return Response.json({
      message:
        typeof newChatResponse === "string"
          ? newChatResponse
          : newChatResponse.message,
      sentMessage: res.message,
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return Response.json(
        { message: "Invalid request body", errors: e.errors },
        { status: 400 },
      );
    }
    if (e instanceof SyntaxError) {
      return Response.json({ message: "Invalid JSON body" }, { status: 400 });
    }
    if (isAuthError(e)) {
      return new Response("User not authenticated or registered", {
        status: 401,
      });
    }
    console.error(e);
    return new Response("Internal server error", { status: 500 });
  }
}
