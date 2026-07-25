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
            className="flex flex-row items-center justify-evenly border-b-2 border-gray-200"
          >
            <div className="py-10 pr-[6rem]">
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
          <DialogContent className="flex h-[70%] w-full flex-col overflow-y-scroll">
            {experience.gallery.map((image) => (
              <Image
                key={image}
                src={`/${image}`}
                layout="responsive"
                width={400}
                height={200}
                className="rounded-xl"
                alt={`${experience.title} Photo`}
              />
            ))}
          </DialogContent>
        </Dialog>
      ))}
    </>
  );
}
