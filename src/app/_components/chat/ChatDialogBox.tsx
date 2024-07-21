"use client";
import { chats } from "@learn/server/db/schema";
import ChatBubble from "./ChatBubble";
import ChatTextBar from "./ChatTextBar";
import {
  Dialog,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect, useRef } from "react";

type Chat = typeof chats.$inferInsert;

type Props = {
  allUserChats: Chat[];
  children: React.ReactNode;
};

export default function ChatDialogBox({ allUserChats, children }: Props) {
  const [chatText, setChatText] = useState("");
  const [chats, setChats] = useState<Chat[]>(allUserChats);
  const chatRef = useRef<HTMLDivElement>(null);
  const userId = allUserChats[0]!.userId;

  function sendChat(message: string, userId: string = "none") {
    console.log(message);
    try {
      fetch("/api/chats", {
        method: "POST",
        body: JSON.stringify({
          message: message,
          role: "admin",
          userId: userId,
        }),
      }).then((res) => {
        res.json().then((data) => {
          console.log(data);
        });
        getChats(userId);
      });
      setChats([
        {
          message: message,
          createdAt: new Date(),
          userId: "me",
          isAdmin: true,
        },
        ...chats,
      ]);
    } catch (e) {
      console.error(e);
    }
  }

  function getChats(userId: string = "none") {
    try {
      fetch(`/api/chats?user=user&userId=${userId}`, {
        method: "GET",
      }).then((res) => {
        if (res.status !== 200) {
          console.log("Error fetching chats.");
        } else {
          res.json().then((data) => {
            setChats(data.chats);
          });
        }
      });
    } catch (e) {
      console.error(e);
    }
  }

  function scrollToBottom() {
    chatRef.current?.scrollIntoView(false);
  }

  // React Hooks.
  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="z-[98]  h-[30rem] bg-neutral-300">
        <ScrollArea
          id={"scroll-area"}
          className="mt-4 flex h-[19.5rem] flex-col-reverse border border-neutral-400"
        >
          <div className="flex flex-col-reverse">
            {chats.map((chat) => (
              <ChatBubble
                key={chat.id}
                message={chat.message!}
                createdAt={chat.createdAt!}
                sender={chat.isAdmin ? "Admin" : "User"}
                isAdmin={chat.isAdmin!}
              />
            ))}
          </div>
          <div ref={chatRef} className="h-[1px] w-[1px]"></div>
        </ScrollArea>
        <div className="self-end px-[-2]">
          <div className="mb-4 border-t border-neutral-400"></div>
          <ChatTextBar
            chatText={chatText}
            setChatText={setChatText}
            sendChat={sendChat}
            userIdOfChat={userId}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
