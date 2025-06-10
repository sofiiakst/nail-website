import Image from "next/image";
import Reveal from "./Words";
export default function Footer() {
  return (
    <footer className="relative w-full h-64 bg-white">
      {/* Overlay to darken video */}

      <div className="absolute top-0 left-0 w-full h-full "></div>

      {/* Footer content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center space-y-4">
        <h1 className="text-2xl font-bold text-primary-950">Hours:</h1>
        <p className=" text-primary-950">Monday - Friday 10am–8pm</p>
        <h2 className="text-2xl font-bold  text-primary-950">Email:</h2>
        <p className=" text-primary-950"> nail.topia.auto.com</p>
        <div className="flex flex-row space-x-3 ">
          <a
            href="https://www.instagram.com/nailtopia_m?igsh=b3NwdTNqbzEyZ2tm"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            {/* Use Next.js Image component to load the SVG */}
            <Image
              src="/insta.svg" // Path to your SVG file in the public folder
              alt="Instagram"
              width={28}
              height={28}
              className="hover:opacity-50" // Optional hover effect
            />
          </a>

          <a
            href="mailto:nail.topia.auto@gmail.com" // Replace with the desired email address
            aria-label="Send Email"
          >
            <Image
              src="/email.svg" // Path to your email SVG
              alt="Email"
              width={30}
              height={30}
              className="hover:opacity-50 "
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
