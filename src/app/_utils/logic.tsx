import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

export function randomBackgroundAnimationColourCycle(): string {
  const colors: string[] = [
    "bg-gradient-to-tr from-stone-400 via-gray-600 to-stone-900",
    "bg-gradient-to-br from-stone-400 via-gray-600 to-stone-900",
    "bg-gradient-to-tl from-stone-400 via-gray-600 to-stone-900",
    "bg-gradient-to-bl from-stone-400 via-gray-600 to-stone-900",
    "bg-gradient-to-tr from-gray-400 via-stone-600 to-gray-900",
    "bg-gradient-to-tl from-gray-400 via-stone-600 to-gray-900",
    "bg-gradient-to-br from-gray-400 via-stone-600 to-gray-900",
    "bg-gradient-to-bl from-gray-400 via-stone-600 to-gray-900",
  ];
  const randomColor: string =
    colors[Math.floor(Math.random() * colors.length)]!;
  return randomColor;
}
