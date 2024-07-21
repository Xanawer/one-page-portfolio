"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { chats } from "@simple/server/db/schema";
import ChatBubble from "./ChatBubble";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { BrutalButton } from "../common/BrutalButton";
import CatChat from "../common/CatText";

type Chat = typeof chats.$inferInsert;

export default function ChatButton() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatText, setChatText] = useState("");

  function sendChat(message: string) {
    console.log(message);
    try {
      fetch("/api/chats", {
        method: "POST",
        body: JSON.stringify({ message: message }),
      }).then((res) => {
        res.json().then((data) => {
          console.log(data);
        });
        setChats((_) => [
          {
            message: message,
            createdAt: new Date(),
            userId: "me",
            isAdmin: false,
          },
          ...chats,
        ]);
      });
    } catch (e) {
      console.error(e);
    }
  }

  function getChats() {
    try {
      fetch("/api/chats?user=user&userId=none", {
        method: "GET",
      }).then((res) => {
        if (res.status !== 200) {
          console.log("Error fetching chats.");
        } else {
          res.json().then((data) => {
            setChats((_) => data.chats);
          });
        }
      });
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getChats();
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
                  {chats.map((chat, _) => {
                    return (
                      <ChatBubble
                        key={`chatbubble-${chat.createdAt}`}
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
                      sendChat(chatText);
                      e.currentTarget.value = "";
                    }
                  }}
                ></input>
                <button
                  className="ml-5 h-full self-center rounded-full"
                  title="Send Chat"
                  onClick={(e) => {
                    sendChat(chatText);
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
