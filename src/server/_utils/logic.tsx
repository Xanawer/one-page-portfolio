import { Roles } from "@simple/app/types/global";
import { auth } from "@clerk/nextjs/server";
import "server-only";

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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

export const checkRole = (role: Roles) => {
  "use server";
  const { sessionClaims } = auth();

  return sessionClaims?.metadata.role === role;
};
