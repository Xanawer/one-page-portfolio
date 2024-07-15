import Image from "next/image";
import FlipLink from "../common/FlippingText";
import { motion } from "framer-motion";
import { BrutalBadge } from "@simple/app/_components/common/BrutalBadge";
import { Dialog, DialogContent, DialogTrigger } from "../common/BrutalDialog";

export default function Experience() {
  const imageData = ["hutchinson.jpg", "hutchinson2.jpg"];
  return (
    <Dialog>
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        className="flex flex-row items-center justify-evenly border-b-2 border-gray-200"
      >
        <div className="py-10 pr-[6rem]">
          <FlipLink text="Experience" href="#" />
          <br></br>
          <div className="experience-card">
            <h3> Generative AI Application </h3>
            <h6> Full-Stack Software Developer, Intern.</h6>
            <header className="italic text-gray-200">
              {" "}
              Jan 2024 - Present{" "}
            </header>
            <DialogTrigger asChild>
              <BrutalBadge className="text-black hover:cursor-pointer">
                View Gallery
              </BrutalBadge>
            </DialogTrigger>
            <p className="text-balance py-2 text-xs">
              Designed and implement an impactful generative AI application
              while working at Hutchinson Research and Innovation. Application
              designed and tested for use with multiple cross-functional teams
              from HR to Sales. Fully completed a SDLC cycle from starting to
              completion. Made using FastAPI (Python), React and Microsoft
              Azure.
            </p>
            <BrutalBadge>Python</BrutalBadge>
            <BrutalBadge>React</BrutalBadge>
            <BrutalBadge>FastAPI</BrutalBadge>
            <BrutalBadge>Microsoft Azure</BrutalBadge>
            <BrutalBadge>SDLC</BrutalBadge>
            <BrutalBadge>AI</BrutalBadge>
          </div>
        </div>
      </motion.div>
      <DialogContent className="flex h-[70%] w-full flex-col overflow-y-scroll">
        {imageData.map((image, index) => (
          <Image
            key={image}
            src={`/${image}`}
            layout="responsive"
            width={400}
            height={200}
            className="rounded-xl"
            alt="Generative AI Application Photo"
          />
        ))}
      </DialogContent>
    </Dialog>
  );
}
