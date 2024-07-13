import Image from "next/image";
import DottedButton from "../common/DottedButton";

export default function ProjectCard() {
  return (
    <>
      <div className="mt-4 flex flex-col">
        <header className="italic">Jun 2023 - Dec 2023</header>
        <h2>PropertyGo: iOS Property Purchase App</h2>
        <Image
          src="/PropertyGo.jpg"
          alt="PropertyGo: iOS Property Purchase App"
          width={400}
          height={200}
          className="rounded-2xl"
        />
        <p className="text-balance py-2 text-sm">
          PropertyGo is a mobile application designed to help users find and
          purchase properties. The app is built using React Native and
          ExpressJS. It is designed to be user-friendly and easy to navigate.
          Users can search for properties based on location, price, and other
          criteria. They can also view images and details of each property, as
          well as contact the seller directly through the app. ProperyGo
          automates the process of buying a property in Singapore, making it
          easier and more convenient for users.
        </p>
      </div>
      <div className="mt-4 flex flex-col">
        <header className="italic">Jan 2023 - Jun 2023</header>
        <h2>Defi Social Media</h2>
        <Image
          src="/PropertyGo.jpg"
          alt="PropertyGo: iOS Property Purchase App"
          width={400}
          height={200}
          className="rounded-2xl"
        />
        <p className="text-balance py-2 text-sm">
          PropertyGo is a mobile application designed to help users find and
          purchase properties. The app is built using React Native and
          ExpressJS. It is designed to be user-friendly and easy to navigate.
          Users can search for properties based on location, price, and other
          criteria. They can also view images and details of each property, as
          well as contact the seller directly through the app. ProperyGo
          automates the process of buying a property in Singapore, making it
          easier and more convenient for users.
        </p>
      </div>
      <div className="mt-4 flex flex-col">
        <header className="italic">Jun 2023 - Dec 2023</header>
        <h2> AI - Empowered Customer Service Application</h2>
        <Image
          src="/PropertyGo.jpg"
          alt="PropertyGo: iOS Property Purchase App"
          width={400}
          height={200}
          className="rounded-2xl"
        />
        <p className="text-balance py-2 text-sm">
          PropertyGo is a mobile application designed to help users find and
          purchase properties. The app is built using React Native and
          ExpressJS. It is designed to be user-friendly and easy to navigate.
          Users can search for properties based on location, price, and other
          criteria. They can also view images and details of each property, as
          well as contact the seller directly through the app. ProperyGo
          automates the process of buying a property in Singapore, making it
          easier and more convenient for users.
        </p>
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          <div className="row-span-2 items-center">
            <DottedButton>View Figma</DottedButton>
          </div>
          <div className="row-span-2 items-center">
            <DottedButton>View HuggingFace</DottedButton>
          </div>
        </div>
      </div>
    </>
  );
}
