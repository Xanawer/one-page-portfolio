import type { ClassValue } from "clsx";
import { Textarea } from "@simple/app/_components/common/BrutalTextArea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  chatText: string;
  setChatText: (text: string) => void;
  sendChat: (text: string, userId: string) => void;
  className?: ClassValue;
  userIdOfChat: string;
};

export default function ChatTextBar({
  chatText,
  setChatText,
  sendChat,
  className,
  userIdOfChat,
}: Props) {
  return (
    <div className={cn("sticky flex items-center justify-between", className)}>
      <Textarea
        value={chatText}
        onChange={(e) => setChatText(e.target.value)}
        className="w-3/4 rounded-lg p-2"
        placeholder="Type your admin message reply here..."
      />
      <Button
        onClick={() => {
          sendChat(chatText, userIdOfChat);
          setChatText("");
        }}
      >
        Send
      </Button>
    </div>
  );
}
