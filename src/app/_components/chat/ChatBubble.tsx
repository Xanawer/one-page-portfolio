import React from "react";
import { prettyDate } from "@simple/app/_utils/logic";
import { motion } from "framer-motion";
import { memo } from "react";

interface ChatBubbleProps {
  message: string;
  sender: string;
  createdAt: string | Date;
  isAdmin: boolean;
}

function areEqual(prev: ChatBubbleProps, next: ChatBubbleProps) {
  return (
    prev.message === next.message &&
    prev.sender === next.sender &&
    prev.isAdmin === next.isAdmin &&
    prev.createdAt.toString() === next.createdAt.toString()
  );
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  sender,
  createdAt,
  isAdmin,
}) => {
  const messageClass = isAdmin
    ? "bg-main text-text border-2 border-border dark:border-darkBorder rounded-base shadow-light dark:shadow-dark px-3 py-2 mr-1 text-end w-fit"
    : "bg-white dark:bg-darkBg text-text dark:text-darkText border-2 border-border dark:border-darkBorder rounded-base shadow-light dark:shadow-dark px-3 py-2 mr-6 ml-1 w-fit";

  const date = prettyDate(createdAt);

  return (
    <motion.div
      key={`chatbubble-${typeof createdAt === "string" ? createdAt : createdAt.toString()}`}
      initial={{ translateX: isAdmin ? 500 : -500 }}
      animate={{
        translateX: 0,
        transition: { delay: 0.25 },
        animationTimingFunction: "ease-in-out",
      }}
      className={`chat-bubble flex w-full overflow-visible ${isAdmin ? "justify-end" : "justify-start"} p-2`}
    >
      <div
        className={`grid ${isAdmin ? "justify-items-end" : "justify-items-start"}`}
      >
        <div className={messageClass}>{message}</div>
        <div
          className={`sender px-2 text-xs italic text-text/60 dark:text-darkText/60 ${isAdmin ? "text-right" : "text-left"}`}
        >
          {sender} {date}
        </div>
      </div>
    </motion.div>
  );
};

export default memo(ChatBubble, areEqual);
