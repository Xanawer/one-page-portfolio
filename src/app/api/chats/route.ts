import {
  sendChat,
  sendChatAsAdmin,
  getMyChats,
  getAdminChats,
  getUserChat,
} from "@simple/server/api/chat";

// Define an interface for the expected request body
interface ChatRequestBody {
  role: "admin" | "user";
  message: string;
  userId?: string;
}

// Define a type for the chat response
type ChatResponse = string | { message: string };

export async function GET(request: Request) {
  const url = new URL(request.url);
  const params = url.searchParams;
  if (params.get("user") === "user") {
    try {
      const chats =
        params.get("userId") === "none"
          ? await getMyChats()
          : await getUserChat(params.get("userId")!);
      return Response.json({ message: "GET /api/chats", chats: chats });
    } catch (e) {
      console.log(e);
      return new Response("User not authenticated or registered", {
        status: 401,
      });
    }
  } else {
    try {
      const allUserChats = await getAdminChats();
      return Response.json({ message: "GET /api/chats", chats: allUserChats });
    } catch (e) {
      console.log(e);
      return new Response("User not authenticated or registered", {
        status: 401,
      });
    }
  }
}

export async function POST(request: Request) {
  const res: ChatRequestBody = (await request.json()) as ChatRequestBody;
  let newChatResponse: ChatResponse;

  if (res.role === "admin") {
    newChatResponse = sendChatAsAdmin(
      res.message,
      res.userId ?? "",
    ) as unknown as ChatResponse;
  } else {
    newChatResponse = sendChat(res.message) as unknown as ChatResponse;
  }

  return Response.json({
    message:
      typeof newChatResponse === "string"
        ? newChatResponse
        : newChatResponse.message,
    sentMessage: res.message,
  });
}
