"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { GitHub, LinkedIn, Email } from "@mui/icons-material";
import FlipLink from "../common/FlippingText";
import DottedButton from "../common/DottedButton";

export default function Contact() {
  return (
    <motion.div
      initial={{ y: 200, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      className="flex flex-col border-b-2 border-gray-200 py-10 pr-[6rem]"
    >
      <FlipLink text="Contact" href="#contact" />
      <br />
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
            className="flex items-center gap-2 opacity-80 transition-opacity hover:opacity-100"
          >
            <Email fontSize="small" />
            hello@jameslimzz.me
          </Link>
          <Link
            href="https://www.linkedin.com/in/Xanawer"
            className="flex items-center gap-2 opacity-80 transition-opacity hover:opacity-100"
          >
            <LinkedIn fontSize="small" />
            linkedin.com/in/Xanawer
          </Link>
          <Link
            href="https://www.github.com/Xanawer"
            className="flex items-center gap-2 opacity-80 transition-opacity hover:opacity-100"
          >
            <GitHub fontSize="small" />
            github.com/Xanawer
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
