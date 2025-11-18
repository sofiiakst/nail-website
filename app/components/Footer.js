import Image from "next/image";
import Reveal from "./Words";
export default function Footer() {
  return (
    <footer className="relative w-full h-64 bg-white">
      <div className="absolute top-0 left-0 w-full h-full "></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center space-y-4">
        <h1 className="text-2xl font-bold text-primary-950">Hours:</h1>
        <p className=" text-primary-950">
          Tuesday - Friday 10am–8pm , Saturday 10am-6pm
        </p>

        <div className="flex flex-row space-x-3 ">
          <a
            href="https://www.instagram.com/nailtopia_m?igsh=b3NwdTNqbzEyZ2tm"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Image
              src="/insta.svg"
              alt="Instagram"
              width={28}
              height={28}
              className="hover:opacity-50"
            />
          </a>

          <a href="mailto:mariath0411@gmail.com" aria-label="Send Email">
            <Image
              src="/email.svg"
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
