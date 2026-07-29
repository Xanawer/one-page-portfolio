"use client";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import DottedButton from "../common/DottedButton";

export default function Contact() {
  return (
    <div className="mt-2 space-y-4">
      <p className="text-balance text-sm">
        Interested in working together or just want to say hi? Reach out —
        I&apos;d love to hear from you.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="mailto:hello@jameslimzz.me">
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
        <Link
          href="mailto:hello@jameslimzz.me"
          className="flex min-w-0 items-center gap-2 break-all opacity-80 transition-opacity hover:opacity-100"
        >
          <Mail size={20} />
          hello@jameslimzz.me
        </Link>
        <Link
          href="https://www.linkedin.com/in/Xanawer"
          className="flex min-w-0 items-center gap-2 break-all opacity-80 transition-opacity hover:opacity-100"
        >
          <Linkedin size={20} />
          linkedin.com/in/Xanawer
        </Link>
        <Link
          href="https://www.github.com/Xanawer"
          className="flex min-w-0 items-center gap-2 break-all opacity-80 transition-opacity hover:opacity-100"
        >
          <Github size={20} />
          github.com/Xanawer
        </Link>
      </div>
    </div>
  );
}
