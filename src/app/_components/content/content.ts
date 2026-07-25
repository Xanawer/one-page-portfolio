export type ContentLink = {
  label: string;
  href: string;
};

export type ProjectEntry = {
  period: string;
  title: string;
  links: ContentLink[];
  description: string;
  tags: string[];
};

export type ExperienceEntry = {
  period: string;
  title: string;
  role: string;
  description: string;
  tags: string[];
  gallery: string[];
};

export type SkillEntry = {
  title: string;
  content: string;
};

export const PROJECTS: ProjectEntry[] = [
  {
    period: "Jun 2023 - Dec 2023",
    title: "PropertyGo: iOS Property Purchase App",
    links: [
      {
        label: "View Report",
        href: "https://drive.google.com/file/d/1jG86wExxTdeWN-foGjXxwOvvQcOXXYkj/view?usp=sharing",
      },
      { label: "View Code", href: "https://github.com/Xanawer/PropertyGo-Fork" },
      { label: "View Video", href: "https://www.youtube.com/watch?v=J2X5mJ3vJZ8" },
    ],
    description:
      "PropertyGo is a mobile application designed to help users find and purchase properties. The app is built using React Native and ExpressJS. It is designed to be user-friendly and easy to navigate. Users can search for properties based on location, price, and other criteria. They can also view images and details of each property, as well as contact the seller directly through the app. PropertyGo automates the process of buying a property in Singapore, making it easier and more convenient for users.",
    tags: [
      "React Native",
      "ExpressJS",
      "iOS Development",
      "Mobile App",
      "UI/UX Design",
    ],
  },
  {
    period: "Jan 2023 - Jun 2023",
    title: "Defi Social Media",
    links: [
      { label: "View Demo", href: "https://youtu.be/AROkKZ43D4E/" },
      { label: "View Code", href: "https://github.com/mayvechua/IS4302_GRP6" },
    ],
    description:
      "Pilot project using Solidity to create a decentralised social media that allows users to post and tip posts in cryptocurrency. The project aims to create a social Media platform that is censorship-resistant and allows users to earn cryptocurrency for their contributions. Tested using Truffle, Ganache and Mocha.",
    tags: ["Solidity", "Truffle", "Ganache", "Blockchain", "Mocha"],
  },
  {
    period: "Jun 2023 - Dec 2023",
    title: "AI - Empowered Customer Service Application",
    links: [
      {
        label: "View Figma",
        href: "https://www.figma.com/file/cKqFXqYfMVBcby8BlIaOgG/Untitled?type=design&node-id=0%3A1&mode=design&t=qejz46k6cfhvh6CJ-1",
      },
      {
        label: "View HuggingFace",
        href: "https://huggingface.co/spaces/LimKopi/Whisper-Audio-Analysis",
      },
    ],
    description:
      "Pilot AI application for customer service representatives, designed to provide instantaneous feedback to their performance. The application is built using Gradio, Flask and Firebase. It is designed to be user-friendly and easy to navigate. Users can view their performance metrics, receive feedback on their responses, and improve their customer service skills. The application uses AI to analyse customer interactions and provide real-time feedback to the user, gamifying the process of improving customer service skills.",
    tags: [
      "Gradio",
      "Flask",
      "Firebase",
      "AI",
      "HuggingFace",
      "Data Analysis",
    ],
  },
  {
    period: "Jan 2023 - Jun 2023",
    title: "Property Rental Analysis Pipeline",
    links: [
      {
        label: "View Report",
        href: "https://drive.google.com/file/d/1EaVoRBKLIS7gaKXn69fYQHhffoBFeIL-/view?usp=sharing",
      },
      {
        label: "View Code",
        href: "https://github.com/cocoy02/IS4242_Group11_Rental_Price_Prediction",
      },
    ],
    description:
      "Scraping data from property rental websites to create a pipeline that analyses rental prices in Singapore. The project aims to provide users with insights into rental prices in different areas of Singapore. The pipeline is built using Python, Pandas and Gradio. It scrapes data from property rental websites, cleans and analyses the data, and visualises the results in a user-friendly format. Users can view rental prices by area, property type, and other criteria, helping them make informed decisions about renting property in Singapore. They can input in their criteria and allows them to view the rental price they should be getting.",
    tags: [
      "Gradio",
      "Python",
      "Pandas",
      "Scikit",
      "Data Analysis",
      "Web Scraping",
      "Visualisation",
      "Machine Learning",
      "Beautiful Soup 4",
    ],
  },
  {
    period: "Jun 2023 - Dec 2023",
    title: "SlumberWatch - IoT-enabled Baby Monitoring Solution",
    links: [
      { label: "View Code", href: "https://github.com/lxin42140/slumber-watch" },
    ],
    description:
      "IoT-enabled baby monitoring solution that uses Raspberry Pi and sensors to monitor a baby's sleep. The solution is designed to help parents monitor their baby's sleep patterns and receive alerts if there are any issues, including serious issues such as SIDS (Sudden Infant Death Syndrome). It is built using Python, Flask and SQLite. The solution collects data from sensors placed in the baby's room, analyses the data, and sends alerts to the parent's phone if there are any issues. Parents can view their baby's sleep patterns, receive alerts, and track their baby's sleep over time, helping them ensure their baby is getting the rest they need.",
    tags: [
      "Python",
      "Flask",
      "SQLite",
      "IoT",
      "Raspberry Pi",
      "Linux",
      "Web Development",
      "Svelte",
    ],
  },
];

export const EXPERIENCES: ExperienceEntry[] = [
  {
    period: "Jan 2024 - Present",
    title: "Generative AI Application",
    role: "Full-Stack Software Developer, Intern.",
    description:
      "Designed and implemented an impactful generative AI application while working at Hutchinson Research and Innovation. Application designed and tested for use with multiple cross-functional teams from HR to Sales. Fully completed a SDLC cycle from starting to completion. Made using FastAPI (Python), React and Microsoft Azure.",
    tags: ["Python", "React", "FastAPI", "Microsoft Azure", "SDLC", "AI"],
    gallery: ["hutchinson.jpg", "hutchinson2.jpg"],
  },
];

export const SKILLS: SkillEntry[] = [
  {
    title: "JavaScript",
    content:
      "Javascript is a language I have a love-hate relationship with. I love it because it's so versatile and powerful, but I hate it because has horrible error-handling.",
  },
  {
    title: "TypeScript",
    content:
      "I love TypeScript for the type-safety it brings to JavaScript, and how it empowers the built in LSP to provide better results.",
  },
  {
    title: "React",
    content:
      "I love React as one of the fundamental frameworks used in building a responsive website, and the extensive library of tools and extensions available for it.",
  },
  {
    title: "Python",
    content:
      "Python is perhaps the most language-like of all programming languages. The way pseudocode flows into Python code is just beautiful.",
  },
  {
    title: "Java",
    content:
      "Java is the quintessential OOP language and provides a solid foundation for building enterprise-level applications.",
  },
  {
    title: "Pandas",
    content:
      "I love Pandas as an extension of Python and the powerful and fast ways it allows me to manipulate data.",
  },
  {
    title: "SQL/SQL-ORMS",
    content:
      "SQL, and ORMS like Prisma, SQLAlchemy or Drizzle, allows for safe and efficient data storage and retrieval.",
  },
  {
    title: "Tailwind CSS",
    content:
      "I love Tailwind CSS. Quick and easy to use, and the utility-first approach is a game-changer.",
  },
  {
    title: "HTML",
    content:
      "HTML has a bunch of useful tags that we can use to really make our websites shine.",
  },
  {
    title: "CSS",
    content: "CSS is what makes everything beautiful.",
  },
];
