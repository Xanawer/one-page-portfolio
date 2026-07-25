"use client";

import type { ChatMessage, ListView } from "@simple/server/chat";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChatBubble from "./ChatBubble";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import { BrutalButton } from "../common/BrutalButton";

type ChatDto = Omit<ChatMessage, "createdAt"> & { createdAt: string };

const ERROR_TEXT: Record<string, string> = {
  rate_limited: "Slow down — try again in a minute.",
  unauthenticated: "Please sign in to chat.",
  unauthorized: "You are not allowed to do that.",
  invalid: "That message cannot be sent.",
};

export default function ChatButton() {
  const [chats, setChats] = useState<ChatDto[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatText, setChatText] = useState("");
  const [error, setError] = useState("");
  const [isCompact, setIsCompact] = useState(true);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px), (pointer: coarse)");
    const update = () => setIsCompact(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  async function sendChat(message: string) {
    setError("");
    try {
      const res = await fetch("/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (!res.ok) {
        const data = (await res.json()) as { reason?: string };
        setError(ERROR_TEXT[data.reason ?? ""] ?? "Something went wrong.");
        return;
      }
      const chat = (await res.json()) as ChatDto;
      setChats((prevChats) => [chat, ...prevChats]);
    } catch (e) {
      console.error(e);
      setError("Something went wrong.");
    }
  }

  async function getChats() {
    try {
      const res = await fetch("/api/chats", { method: "GET" });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          reason?: string;
        };
        setError(ERROR_TEXT[data.reason ?? ""] ?? "Couldn't load messages.");
        return;
      }
      const view = (await res.json()) as ListView;
      if (view.kind === "own") {
        setChats(view.chats as unknown as ChatDto[]);
      }
    } catch (e) {
      console.error(e);
      setError("Couldn't load messages.");
    }
  }

  return (
    <AnimatePresence>
      {isChatOpen ? (
        <motion.div
          key={"chatbox"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          drag={!isCompact}
          dragConstraints={{ top: -160, right: 16, bottom: 0, left: 0 }}
          dragElastic={0.1}
          className="fixed bottom-[calc(4rem+env(safe-area-inset-bottom))] left-0 z-[999] max-w-full p-3 md:bottom-0 md:p-4"
        >
          <div
            data-testid="chat-panel"
            className="dark flex h-[min(28rem,calc(100dvh-6rem-env(safe-area-inset-bottom)))] min-h-[16rem] w-[calc(100vw-1.5rem)] max-w-lg flex-col justify-between overflow-hidden rounded-base border-2 border-border bg-white font-mono shadow-light transition duration-300 dark:border-darkBorder dark:bg-darkBg dark:shadow-dark md:h-80 md:w-[32rem] md:resize-y"
          >
            <div className="flex min-h-16 shrink-0 flex-row items-center justify-between gap-2 border-b-2 border-border bg-main px-3 py-2 dark:border-darkBorder sm:px-6 sm:py-3">
              <div className="min-w-0 flex-1">
                {isSignedIn ? (
                  <UserButton
                    showName
                    appearance={{
                      elements: {
                        userButtonOuterIdentifier:
                          "text-text font-heading font-mono",
                      },
                    }}
                  />
                ) : (
                  <h2 className="font-heading text-text">Chat with Me:</h2>
                )}
              </div>
              <BrutalButton
                variant="neutral"
                size="sm"
                onClick={() => {
                  setIsChatOpen(false);
                }}
              >
                Close
              </BrutalButton>
            </div>
            <div className="flex min-h-0 flex-1 flex-col-reverse overflow-y-auto bg-bg dark:bg-darkBg">
              {isSignedIn ? (
                <>
                  {chats.length === 0 && (
                    <div className="flex h-full items-center justify-center">
                      <p className="text-center font-mono text-xs italic text-text/60 dark:text-darkText/60">
                        No messages yet — say hi!
                      </p>
                    </div>
                  )}
                  <AnimatePresence>
                    {chats.map((chat) => (
                      <ChatBubble
                        key={`chatbubble-${chat.id}`}
                        message={chat.message}
                        sender={chat.isAdmin ? "Admin" : "Me"}
                        createdAt={chat.createdAt}
                        isAdmin={chat.isAdmin}
                      />
                    ))}
                  </AnimatePresence>
                </>
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-4">
                  <p className="text-center font-mono text-text dark:text-darkText">
                    Please sign in to chat.
                  </p>
                  <SignInButton>
                    <BrutalButton className="font-mono">Sign In</BrutalButton>
                  </SignInButton>
                </div>
              )}
            </div>
            <div className="flex shrink-0 flex-row items-center justify-between border-t-2 border-border bg-white px-3 py-3 dark:border-darkBorder dark:bg-darkBg">
              <div className="flex w-full flex-col">
                {error !== "" && (
                  <p className="pb-1 font-mono text-xs text-red-500">{error}</p>
                )}
                <div className="flex min-w-0 flex-row items-center">
                  <input
                    placeholder={isSignedIn ? "Chat..." : "Sign in to chat..."}
                    title="Chat box."
                    type="text"
                    disabled={!isSignedIn}
                    className="w-full flex-1 rounded-base border-2 border-border bg-white px-2 py-1 font-mono font-base text-text placeholder:text-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-darkBorder dark:bg-darkBg dark:text-darkText dark:placeholder:text-darkText/50"
                    value={chatText}
                    onChange={(e) => {
                      setChatText(e.target.value);
                    }}
                    onKeyUp={(e) => {
                      if (e.key === "Enter" && chatText.trim() !== "") {
                        void sendChat(chatText);
                        setChatText("");
                      }
                    }}
                  ></input>
                  <BrutalButton
                    className="ml-2 shrink-0 font-mono sm:ml-3"
                    size="sm"
                    title="Send Chat"
                    disabled={!isSignedIn}
                    onClick={() => {
                      if (chatText.trim() === "") return;
                      void sendChat(chatText);
                      setChatText("");
                    }}
                  >
                    Send
                  </BrutalButton>
                </div>
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
          className="fixed bottom-[calc(4rem+env(safe-area-inset-bottom))] left-0 z-[90] p-3 md:bottom-0 md:p-4"
        >
          <div
            className="absolute bottom-0 left-0"
            onClick={() => {
              setIsChatOpen(true);
              if (isSignedIn) void getChats();
            }}
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
