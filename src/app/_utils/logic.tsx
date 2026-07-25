import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function prettyDate(date: string | Date) {
  return typeof date === "string"
    ? new Date(date).toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }) +
        " " +
        new Date(date).toLocaleTimeString("en-us", {
          hour: "2-digit",
          minute: "2-digit",
        })
    : date.toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }) +
        " " +
        date.toLocaleTimeString("en-us", {
          hour: "2-digit",
          minute: "2-digit",
        });
}
