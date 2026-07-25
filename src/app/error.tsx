"use client";

import { useEffect } from "react";
import { BrutalButton } from "@simple/app/_components/common/BrutalButton";

export default function Error({
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
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-shell px-4 text-center font-mono">
      <pre className="text-main text-xs leading-tight sm:text-sm">
        {`
 (╯°□°)╯︵ ┻━┻
`}
      </pre>
      <h1 className="font-heading text-xl text-white sm:text-2xl">
        Something broke on my end.
      </h1>
      <p className="max-w-md text-sm text-white/60">
        An unexpected error occurred while rendering this page. You can try
        again — if it keeps happening, it&apos;s on me to fix.
      </p>
      <BrutalButton onClick={reset} className="font-mono">
        Try again
      </BrutalButton>
    </main>
  );
}
