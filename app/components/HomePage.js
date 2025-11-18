"use client";
import Link from "next/link";
import Image from "next/image";
import bgDesk from "@/public/mainBg.png";
import { useState, useEffect } from "react";
import bgMob5 from "@/public/bgMob5.png";
import bgMob2 from "@/public/bgMob2.png";
import bgMob4 from "@/public/bgMob4.png";

import MotionBtn from "@/app/components/MotionBtn";
import Reveal from "@/app/components/Words";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { TextGenerateEffectBlack } from "./ui/text-effect-black";

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const bg = isMobile ? bgMob5 : bgDesk;
  const words = "Treat yourself,";
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
          {isMobile ? (
            <h1 className="text-5xl sm:text-6xl text-primary-50 mb-24 tracking-tight sm:font-semibold notranslate  ">
              <TextGenerateEffect words={words} />
              <br />
              today
            </h1>
          ) : (
            <h1 className="text-6xl  text-primary-950 mb-20 tracking-tight font-bold notranslate  ">
              <TextGenerateEffectBlack words={words} />
              <br />
              today
            </h1>
          )}

          <Link className="mt-12" href="/policy" passHref>
            <MotionBtn>BOOK AN APPOINTMENT</MotionBtn>
          </Link>
        </div>
      </Reveal>
    </main>
  );
}
