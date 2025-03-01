import Link from "next/link";
import Image from "next/image";
import Reveal from "./Words";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 z-10 sm:ml-5 sm:mt-5 ">
      <Image
        src="/logo.jpg"
        height="130"
        width="130"
        alt="Nail spa Athens logo"
        quality={100}
      />
    </Link>
  );
}

export default Logo;
