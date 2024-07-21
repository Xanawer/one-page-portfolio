import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "rounded-base text-text dark:text-darkText font-base selection:bg-main border-border dark:border-darkBorder dark:bg-darkBg flex min-h-[80px] w-full border-2 bg-white px-3 py-2 text-sm ring-offset-white selection:text-black placeholder:text-black/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus-visible:ring-white",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
