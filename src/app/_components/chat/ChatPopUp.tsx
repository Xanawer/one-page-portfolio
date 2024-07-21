"use client";

import type { chats } from "@simple/server/db/schema";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChatBubble from "./ChatBubble";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { BrutalButton } from "../common/BrutalButton";

type Chat = typeof chats.$inferInsert;

export default function ChatButton() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatText, setChatText] = useState("");

  async function sendChat(message: string) {
    console.log(message);
    try {
      const res = await fetch("/api/chats", {
        method: "POST",
        body: JSON.stringify({ message: message }),
      });
      const data: { message: string } = (await res.json()) as {
        message: string;
      };
      console.log(data);
      setChats((prevChats) => [
        {
          message: message,
          createdAt: new Date(),
          userId: "me",
          isAdmin: false,
        },
        ...prevChats,
      ]);
    } catch (e) {
      console.error(e);
    }
  }

  async function getChats() {
    try {
      const res = await fetch("/api/chats?user=user&userId=none", {
        method: "GET",
      });
      if (res.status !== 200) {
        console.log("Error fetching chats.");
      } else {
        const data: { chats: Chat[] } = (await res.json()) as { chats: Chat[] };
        setChats(data.chats);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    void getChats();
  }, []);

  return (
    <AnimatePresence>
      {isChatOpen ? (
        <motion.div
          key={"chatbox"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          drag={true}
          dragConstraints={{ top: -200, right: 0, bottom: 0, left: -100 }}
          dragElastic={0.1}
          className="fixed bottom-0 left-1 z-[999] overflow-auto p-4"
        >
          <div
            className={`flex h-[16rem] w-[32rem] min-w-[32rem] flex-col justify-between overflow-clip rounded-2xl bg-white shadow-2xl transition duration-300`}
          >
            <div className="flex h-1/5 flex-row justify-between bg-gradient-to-br from-gray-800 to-gray-600 px-6 py-3">
              <div className="w-full">
                <SignedIn>
                  <UserButton
                    showName
                    appearance={{
                      elements: {
                        userButtonOuterIdentifier: "text-white font-mono",
                      },
                    }}
                  ></UserButton>
                </SignedIn>
                <SignedOut>
                  <h2> Chat with Me: </h2>
                </SignedOut>
              </div>
              <p
                className="font-button cursor-pointer text-white"
                onClick={() => {
                  setIsChatOpen(false);
                }}
              >
                Close
              </p>
            </div>
            <div className="flex h-3/5 flex-col-reverse overflow-y-auto bg-gray-200">
              <SignedIn>
                <AnimatePresence>
                  {chats.map((chat) => {
                    return (
                      <ChatBubble
                        key={`chatbubble-${chat.createdAt?.toISOString() ?? "unknown"}`}
                        message={chat.message ?? ""}
                        sender={chat.isAdmin ? "Admin" : "Me"}
                        createdAt={chat.createdAt ?? new Date()}
                        isAdmin={chat.isAdmin ?? false}
                      />
                    );
                  })}
                </AnimatePresence>
              </SignedIn>
              <SignedOut>
                <br />
                <SignInButton>
                  <BrutalButton className="w-[50%] self-center font-mono">
                    Sign In
                  </BrutalButton>
                </SignInButton>
                <p className="text-center font-mono text-black">
                  Please sign in to chat.
                </p>
              </SignedOut>
            </div>
            <div className="flex h-1/5 flex-row items-center justify-between bg-gray-800 px-3 py-3">
              <div>
                <input
                  placeholder="Chat..."
                  title="Chat box."
                  type="text"
                  className="w-[26rem] rounded-full px-2 text-black"
                  onChange={(e) => {
                    setChatText(e.target.value);
                  }}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      void sendChat(chatText);
                      e.currentTarget.value = "";
                    }
                  }}
                ></input>
                <button
                  className="ml-5 h-full self-center rounded-full"
                  title="Send Chat"
                  onClick={() => {
                    void sendChat(chatText);
                  }}
                >
                  <p className="font-button text-white">Send</p>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key={"chatbutton"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.25 } }}
          exit={{ opacity: 0 }}
          className="fixed bottom-0 left-0 z-[40] p-4"
        >
          <div
            className="absolute bottom-0 left-0"
            onClick={() => setIsChatOpen(true)}
          >
            <pre className="text-xs transition-all duration-100 hover:-translate-y-1 hover:cursor-pointer hover:text-gray-400">
              {`
⠀ ／l、   
（ﾟ､ ｡ ７
⠀ l、ﾞ ~ヽ 
   じしf_, )ノ  Chat with me!
               `}
            </pre>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
