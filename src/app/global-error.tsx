"use client";

import { useEffect } from "react";

// global-error replaces the root layout when the layout itself throws, so it
// must render its own <html>/<body> and cannot rely on globals.css being
// loaded. Styles are inlined to stay self-contained.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.5rem",
          padding: "1rem",
          textAlign: "center",
          backgroundColor: "#0e0b1e",
          color: "#ffffff",
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", margin: 0 }}>
          Something went badly wrong.
        </h1>
        <p style={{ maxWidth: "28rem", color: "rgba(255,255,255,0.6)" }}>
          The application failed to load. Please try again.
        </p>
        <button
          onClick={reset}
          style={{
            cursor: "pointer",
            border: "2px solid #000",
            borderRadius: "5px",
            backgroundColor: "#88aaee",
            color: "#000",
            padding: "0.5rem 1.5rem",
            fontFamily: "inherit",
            fontWeight: 700,
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
