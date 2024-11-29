import Link from "next/link";
import Image from "next/image";
import Reveal from "./Words";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10 ">
      <Image
        src="/logo.jpg"
        height="158"
        width="158"
        alt="Nail spa Athens logo"
        quality={100}
      />
    </Link>
  );
}

export default Logo;
