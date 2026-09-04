import Image from "next/image";
import { Images } from "lucide-react";
import { BrutalBadge } from "@simple/app/_components/common/BrutalBadge";
import { BrutalButton } from "../common/BrutalButton";
import { Dialog, DialogContent, DialogTrigger } from "../common/BrutalDialog";
import { EXPERIENCES } from "../content/content";

export default function Experience() {
  return (
    <div className="flex flex-col gap-6">
      {EXPERIENCES.map((experience) => (
        <Dialog key={experience.title}>
          <article className="experience-card rounded-base border-2 border-white/80 bg-white/[0.03] p-4 backdrop-blur-[2px] transition-colors hover:border-white hover:bg-white/[0.06] sm:p-5">
            <header className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
              <div className="min-w-0">
                <h3 className="text-balance text-lg font-bold leading-tight sm:text-xl">
                  {experience.title}
                </h3>
                <p className="mt-1 text-sm text-gray-200">{experience.role}</p>
                <p className="mt-0.5 font-mono text-xs italic text-gray-400">
                  {experience.period}
                </p>
              </div>
              <DialogTrigger asChild>
                <BrutalButton size="sm" className="gap-2 text-xs">
                  <Images size={14} aria-hidden="true" />
                  View Gallery
                </BrutalButton>
              </DialogTrigger>
            </header>

            <p className="mt-3 text-pretty text-xs leading-relaxed text-gray-300">
              {experience.description}
            </p>

            <ul
              className="mt-4 flex flex-wrap gap-1.5"
              aria-label="Technologies"
            >
              {experience.tags.map((tag) => (
                <li key={tag}>
                  <BrutalBadge variant="neutral">{tag}</BrutalBadge>
                </li>
              ))}
            </ul>
          </article>

          <DialogContent className="flex max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-3xl flex-col gap-4 overflow-y-auto p-4 sm:p-6">
            {experience.gallery.map((image) => (
              <Image
                key={image}
                src={`/${image}`}
                width={400}
                height={200}
                sizes="(max-width: 768px) calc(100vw - 4rem), 720px"
                className="h-auto w-full rounded-md border-2 border-black"
                alt={`${experience.title} Photo`}
              />
            ))}
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
