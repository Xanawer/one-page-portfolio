import Link from "next/link";
import { BrutalButton } from "@simple/app/_components/common/BrutalButton";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-shell px-4 text-center font-mono">
      <pre className="text-main text-xs leading-tight sm:text-sm">
        {`
 ／l、
（ﾟ､ ｡ ７   404
 l、ﾞ ~ヽ   page not found
 じしf_, )ノ
`}
      </pre>
      <h1 className="font-heading text-xl text-white sm:text-2xl">
        This page doesn&apos;t exist.
      </h1>
      <p className="max-w-md text-sm text-white/60">
        The link may be broken or the page may have moved.
      </p>
      <Link href="/">
        <BrutalButton className="font-mono">Back home</BrutalButton>
      </Link>
    </main>
  );
}
