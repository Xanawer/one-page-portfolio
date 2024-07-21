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

function areEqual(
  { message: prevMessage }: { message: string },
  { message }: { message: string },
) {
  return message == prevMessage;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  sender,
  createdAt,
  isAdmin,
}) => {
  const messageClass = isAdmin
    ? "bg-blue-500 rounded-l-3xl rounded-tr-xl px-3 py-1 mr-1 text-end w-fit text-black"
    : "mr-6 rounded-r-3xl rounded-tl-xl bg-white px-2 py-1 ml-1 w-fit text-black";

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
          className={`sender px-2 text-sm italic text-gray-400 ${isAdmin ? "text-right" : "text-left"}`}
        >
          {sender} {date}
        </div>
      </div>
    </motion.div>
  );
};

export default memo(ChatBubble, areEqual);
