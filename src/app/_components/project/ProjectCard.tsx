import Link from "next/link";
import { BrutalBadge } from "../common/BrutalBadge";

export default function ProjectCard() {
  return (
    <div className="w-inherit h-[70vh] scroll-m-0 overflow-x-scroll overflow-y-scroll">
      <div className="mt-4">
        <header className="italic">Jun 2023 - Dec 2023</header>
        <h2>PropertyGo: iOS Property Purchase App</h2>
        <Link
          href={
            "https://drive.google.com/file/d/1jG86wExxTdeWN-foGjXxwOvvQcOXXYkj/view?usp=sharing"
          }
        >
          <BrutalBadge>View Report</BrutalBadge>
        </Link>
        <Link href={"https://github.com/Xanawer/PropertyGo-Fork"}>
          <BrutalBadge>View Code</BrutalBadge>
        </Link>
        <Link href={"https://www.youtube.com/watch?v=J2X5mJ3vJZ8"}>
          <BrutalBadge> View Video</BrutalBadge>
        </Link>
        <p className="text-balance py-2 text-xs">
          PropertyGo is a mobile application designed to help users find and
          purchase properties. The app is built using React Native and
          ExpressJS. It is designed to be user-friendly and easy to navigate.
          Users can search for properties based on location, price, and other
          criteria. They can also view images and details of each property, as
          well as contact the seller directly through the app. ProperyGo
          automates the process of buying a property in Singapore, making it
          easier and more convenient for users.
        </p>
        <BrutalBadge>React Native</BrutalBadge>
        <BrutalBadge>ExpressJS</BrutalBadge>
        <BrutalBadge>iOS Development</BrutalBadge>
        <BrutalBadge>Mobile App</BrutalBadge>
        <BrutalBadge>UI/UX Design</BrutalBadge>
      </div>
      <div className="mt-4">
        <header className="italic">Jan 2023 - Jun 2023</header>
        <h2>Defi Social Media</h2>
        <Link href={"https://youtu.be/AROkKZ43D4E/"}>
          <BrutalBadge>View Demo</BrutalBadge>
        </Link>
        <Link href={"https://github.com/mayvechua/IS4302_GRP6"}>
          <BrutalBadge>View Code</BrutalBadge>
        </Link>
        <p className="text-balance py-2 text-xs">
          Pilot project using Solidity to create a decentralised social media
          that allows users to post and tip posts in cryptocurrency. The project
          aims to create a social Media platform that is censorship-resistant
          and allows users to earn cryptocurrency for their contributions.
          Tested using Truffle, Ganache and Mocha.
        </p>
        <BrutalBadge>Solidity</BrutalBadge>
        <BrutalBadge>Truffle</BrutalBadge>
        <BrutalBadge>Ganache</BrutalBadge>
        <BrutalBadge>Blockchain</BrutalBadge>
        <BrutalBadge>Mocha</BrutalBadge>
      </div>
      <div className="mt-4">
        <header className="italic">Jun 2023 - Dec 2023</header>
        <h2> AI - Empowered Customer Service Application</h2>
        <Link
          href={
            "https://www.figma.com/file/cKqFXqYfMVBcby8BlIaOgG/Untitled?type=design&node-id=0%3A1&mode=design&t=qejz46k6cfhvh6CJ-1"
          }
        >
          <BrutalBadge>View Figma</BrutalBadge>
        </Link>
        <Link
          href={"https://huggingface.co/spaces/LimKopi/Whisper-Audio-Analysis"}
        >
          <BrutalBadge>View HuggingFace</BrutalBadge>
        </Link>
        <p className="text-balance py-2 text-xs">
          Pilot AI application for customer service representatives, designed to
          provide instantaneous feedback to their performance. The application
          is built using Gradio, Flask and Firebase. It is designed to be
          user-friendly and easy to navigate. Users can view their performance
          metrics, receive feedback on their responses, and improve their
          customer service skills. The application uses AI to analyse customer
          interactions and provide real-time feedback to the user, gamifying the
          process of improving customer service skills.
        </p>
        <BrutalBadge>Gradio</BrutalBadge>
        <BrutalBadge>Flask</BrutalBadge>
        <BrutalBadge>Firebase</BrutalBadge>
        <BrutalBadge>AI</BrutalBadge>
        <BrutalBadge>HuggingFace</BrutalBadge>
        <BrutalBadge>Data Analysis</BrutalBadge>
      </div>
      <div className="mt-4">
        <header className="italic">Jan 2023 - Jun 2023</header>
        <h2>Property Rental Analysis Pipeline</h2>
        <Link
          href={
            "https://drive.google.com/file/d/1EaVoRBKLIS7gaKXn69fYQHhffoBFeIL-/view?usp=sharing"
          }
        >
          <BrutalBadge>View Report</BrutalBadge>
        </Link>
        <Link
          href={
            "https://github.com/cocoy02/IS4242_Group11_Rental_Price_Prediction"
          }
        >
          <BrutalBadge>View Code</BrutalBadge>
        </Link>
        <p className="text-balance py-2 text-xs">
          Scraping data from property rental websites to create a pipeline that
          analyses rental prices in Singapore. The project aims to provide users
          with insights into rental prices in different areas of Singapore. The
          pipeline is built using Python, Pandas and Gradio. It scrapes data
          from property rental websites, cleans and analyses the data, and
          visualises the results in a user-friendly format. Users can view
          rental prices by area, property type, and other criteria, helping them
          make informed decisions about renting property in Singapore. They can
          input in their criteria and allows them to view the rental price they
          should be getting.
        </p>
        <BrutalBadge>Gradio</BrutalBadge>
        <BrutalBadge>Python</BrutalBadge>
        <BrutalBadge>Pandas</BrutalBadge>
        <BrutalBadge>Scikit</BrutalBadge>
        <BrutalBadge>Data Analysis</BrutalBadge>
        <BrutalBadge>Web Scraping</BrutalBadge>
        <BrutalBadge>Visualisation</BrutalBadge>
        <BrutalBadge>Machine Learning</BrutalBadge>
        <BrutalBadge>Beautiful Soup 4</BrutalBadge>
      </div>
      <div className="mt-4">
        <header className="italic">Jun 2023 - Dec 2023</header>
        <h2>SlumberWatch - IoT-enabled Baby Monitoring Solution</h2>
        <Link href={"https://github.com/lxin42140/slumber-watch"}>
          <BrutalBadge>View Code</BrutalBadge>
        </Link>
        <p className="text-balance py-2 text-xs">
          IoT-enabled baby monitoring solution that uses Raspberry Pi and
          sensors to monitor a baby&apos;s sleep. The solution is designed to
          help parents monitor their baby&apos;s sleep patterns and receive
          alerts if there are any issues, including serious issues such as SIDS
          (Sudden Infant Death Syndrome). It is built using Python, Flask and
          SQLite. The solution collects data from sensors placed in the
          baby&apos;s room, analyses the data, and sends alerts to the
          parent&apos;s phone if there are any issues. Parents can view their
          baby&apos;s sleep patterns, receive alerts, and track their
          baby&apos;s sleep over time, helping them ensure their baby is getting
          the rest they need.
        </p>
        <BrutalBadge>Python</BrutalBadge>
        <BrutalBadge>Flask</BrutalBadge>
        <BrutalBadge>SQLite</BrutalBadge>
        <BrutalBadge>IoT</BrutalBadge>
        <BrutalBadge>Raspberry Pi</BrutalBadge>
        <BrutalBadge>Linux</BrutalBadge>
        <BrutalBadge>Web Development</BrutalBadge>
        <BrutalBadge>Svelte</BrutalBadge>
      </div>
    </div>
  );
}
