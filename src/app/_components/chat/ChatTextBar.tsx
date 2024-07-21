import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";

type Props = {
  chatText: string;
  setChatText: Function;
  sendChat: Function;
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
        onClick={(e) => {
          sendChat(chatText, userIdOfChat);
          setChatText("");
        }}
      >
        Send
      </Button>
    </div>
  );
}
