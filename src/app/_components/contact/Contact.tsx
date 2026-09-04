"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Copy, Github, Linkedin, Mail } from "lucide-react";
import DottedButton from "../common/DottedButton";

const EMAIL = "hello@jameslimzz.me";

const LINKS = [
  {
    icon: Linkedin,
    label: "linkedin.com/in/Xanawer",
    href: "https://www.linkedin.com/in/Xanawer",
  },
  {
    icon: Github,
    label: "github.com/Xanawer",
    href: "https://www.github.com/Xanawer",
  },
] as const;

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1_800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
    } catch {
      // Clipboard unavailable — the mailto link next to this still works.
    }
  }

  return (
    <div className="flex min-w-0 items-center gap-2">
      <Link
        href={`mailto:${EMAIL}`}
        className="flex min-w-0 items-center gap-2 break-all opacity-80 transition-opacity hover:opacity-100"
      >
        <Mail size={20} aria-hidden="true" />
        {EMAIL}
      </Link>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Email copied" : "Copy email address"}
        className="rounded-base border-2 border-white/40 p-1 text-white/70 transition-all hover:border-cyan-300 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
      >
        {copied ? (
          <Check size={14} aria-hidden="true" />
        ) : (
          <Copy size={14} aria-hidden="true" />
        )}
      </button>
      <span role="status" className="sr-only">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </div>
  );
}

export default function Contact() {
  return (
    <div className="mt-2 space-y-6">
      <p className="max-w-prose text-pretty text-sm leading-relaxed text-gray-200 sm:text-base">
        Interested in working together or just want to say hi? Reach out —
        I&apos;d love to hear from you.
      </p>

      <div className="flex flex-wrap gap-3">
        <Link href={`mailto:${EMAIL}`}>
          <DottedButton>Get in touch</DottedButton>
        </Link>
        <Link
          href="https://www.linkedin.com/in/Xanawer"
          target="_blank"
          rel="noopener noreferrer"
        >
          <DottedButton>View Resume</DottedButton>
        </Link>
      </div>

      <div className="flex flex-col gap-2 pt-2 font-mono text-sm">
        <CopyEmail />
        {LINKS.map(({ icon: Icon, label, href }) => (
          <Link
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-w-0 items-center gap-2 break-all opacity-80 transition-opacity hover:opacity-100"
          >
            <Icon size={20} aria-hidden="true" />
            {label}
          </Link>
        ))}
      </div>

      <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-white/15 pt-6 font-mono text-[0.65rem] uppercase tracking-widest text-gray-500">
        <span>© {new Date().getFullYear()} James Lim Zhong Zhi</span>
        <span className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400"
          />
          Open to opportunities
        </span>
      </footer>
    </div>
  );
}
