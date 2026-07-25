import Image from "next/image";
import FlipLink from "../common/FlippingText";
import { motion } from "framer-motion";
import { BrutalBadge } from "@simple/app/_components/common/BrutalBadge";
import { Dialog, DialogContent, DialogTrigger } from "../common/BrutalDialog";
import { EXPERIENCES } from "../content/content";

export default function Experience() {
  return (
    <>
      {EXPERIENCES.map((experience) => (
        <Dialog key={experience.title}>
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ amount: 0.25, once: true }}
            className="portfolio-panel flex min-w-0 items-center"
          >
            <div className="min-w-0">
              <FlipLink text="Experience" href="#" />
              <br></br>
              <div className="experience-card">
                <h3>{experience.title}</h3>
                <h6>{experience.role}</h6>
                <header className="italic text-gray-200">
                  {experience.period}
                </header>
                <DialogTrigger asChild>
                  <BrutalBadge className="text-black hover:cursor-pointer">
                    View Gallery
                  </BrutalBadge>
                </DialogTrigger>
                <p className="text-balance py-2 text-xs">
                  {experience.description}
                </p>
                {experience.tags.map((tag) => (
                  <BrutalBadge key={tag}>{tag}</BrutalBadge>
                ))}
              </div>
            </div>
          </motion.div>
          <DialogContent className="flex max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-3xl flex-col overflow-y-auto p-4 sm:p-6">
            {experience.gallery.map((image) => (
              <Image
                key={image}
                src={`/${image}`}
                width={400}
                height={200}
                sizes="(max-width: 768px) calc(100vw - 4rem), 720px"
                className="h-auto w-full rounded-md"
                alt={`${experience.title} Photo`}
              />
            ))}
          </DialogContent>
        </Dialog>
      ))}
    </>
  );
}
