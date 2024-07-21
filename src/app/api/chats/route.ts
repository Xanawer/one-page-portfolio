import {
  sendChat,
  sendChatAsAdmin,
  getMyChats,
  getAdminChats,
  getUserChat,
} from "@simple/server/api/chat";
// import { io } from "socket.io-client";

// So the fucking pattern is to fetch the data from a custom API route here?
// I can just have another API endpoint, or just add a filter here.
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
  // const socket = io("http://localhost:3000"); // This is going to be problematic.
  const res = await request.json();
  if (res.role === "admin") {
    const newChatResponse = sendChatAsAdmin(res.message, res.userId);
    // socket.emit("chat message", res.message, res.userId);
    return Response.json({
      message: newChatResponse,
      sentMessage: res.message,
    });
  } else {
    const newChatResponse = sendChat(res.message);
    // socket.emit("chat message", res.message, res.userId || "none");
    return Response.json({
      message: newChatResponse,
      sentMessage: res.message,
    });
  }
}
