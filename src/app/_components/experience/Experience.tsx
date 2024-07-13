import Image from "next/image";
import FlipLink from "../common/FlippingText";
import { motion } from "framer-motion";

export default function Experience() {
  return (
    <motion.div
      initial={{ y: 200, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      className="flex flex-row items-center justify-evenly"
    >
      <div className="py-10 pr-[6rem]">
        <FlipLink text="Experience" href="#" />
        <br></br>
        <div className="experience-card">
          <h3> Generative AI Application </h3>
          <h6> Full-Stack Software Developer, Intern.</h6>
          <header className="italic text-gray-200"> Jan 2024 - Present </header>
          <p className="text-balance py-2 text-xs">
            Design and implement an impactful generative AI application while
            working at Hutchinson Research and Innovation. Application designed
            and tested for use with multiple cross-functional teams from HR to
            Sales. Fully completed a SDLC cycle. Made using FastAPI (Python),
            React and Microsoft Azure.
          </p>
        </div>
      </div>
      <Image
        src="/hutchinson.jpg"
        alt="Generative AI Application"
        width={400}
        height={200}
        className="z-100 z-[51] mr-20 rounded-2xl"
      />
    </motion.div>
  );
}
