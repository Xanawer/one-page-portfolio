import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import {
  createChatInbox,
  type ChatInboxError,
  type Viewer,
} from "@simple/server/chat";
import { createDrizzleStore } from "@simple/server/chat/drizzle-store";

const inbox = createChatInbox(createDrizzleStore());

const sendRequestSchema = z.object({
  message: z.string(),
  replyingTo: z.string().optional(),
});

const STATUS_BY_REASON: Record<ChatInboxError, number> = {
  unauthenticated: 401,
  unauthorized: 403,
  rate_limited: 429,
  invalid: 400,
};

async function currentViewer(): Promise<Viewer> {
  const { userId, sessionClaims } = await auth();
  return {
    userId,
    role: sessionClaims?.metadata.role === "admin" ? "admin" : "user",
  };
}

function errorResponse(reason: ChatInboxError) {
  return Response.json({ reason }, { status: STATUS_BY_REASON[reason] });
}

export async function GET() {
  const result = await inbox.list(await currentViewer());
  if (!result.ok) return errorResponse(result.reason);
  return Response.json(result.view);
}

export async function POST(request: Request) {
  let body: z.infer<typeof sendRequestSchema>;
  try {
    body = sendRequestSchema.parse(await request.json());
  } catch {
    return Response.json({ reason: "invalid" }, { status: 400 });
  }
  const result = await inbox.send(
    await currentViewer(),
    body.message,
    body.replyingTo,
  );
  if (!result.ok) return errorResponse(result.reason);
  return Response.json(result.chat);
}
