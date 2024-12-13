"use client";
import Link from "next/link";
import Image from "next/image";
import bgDesk from "@/public/mainBg.png";
import { useState, useEffect } from "react";
import bgMob from "@/public/bgMob.png";
import bgMob2 from "@/public/bgMob2.png";

import MotionBtn from "@/app/components/MotionBtn";
import Reveal from "@/app/components/Words";

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    // Check on mount
    handleResize();

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const bg = isMobile ? bgMob2 : bgDesk;

  return (
    <main className="mt-28 ">
      <Image
        fill
        className="object-cover "
        placeholder="blur"
        quality={100}
        src={bg}
        alt="Nails"
      />
      <Reveal>
        <div className="relative z-10 text-center ">
          <h1 className="text-5xl sm:text-6xl text-primary-950 mb-24 tracking-tight font-semibold notranslate ">
            Treat yourself,
            <br />
            today
          </h1>
          <Link href="/serv" passHref>
            <MotionBtn>BOOK AN APPOINTMENT</MotionBtn>
          </Link>
        </div>
      </Reveal>
    </main>
  );
}
