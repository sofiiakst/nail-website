import Link from "next/link";
import MotionBtn2 from "../components/MotionBtn2";
import Reveal from "../components/Words";

export const metadata = {
  title: "Services",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white flex justify-center items-center gap-4 ">
      <Reveal>
        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-10 ">
          {/* Square 1 */}
          <div
            className="rounded-md relative w-80 h-80 bg-cover bg-center  border-primary-200 flex items-center "
            style={{
              backgroundImage: "url('/french.jpg')",
              textDecorationThickness: "1px",
            }}
          >
            <Link href="/mani" passHref className="notranslate">
              <MotionBtn2>Manicures</MotionBtn2>
            </Link>
          </div>

          {/* Square 2 */}
          <div
            className="rounded-md relativew-80 h-80 bg-cover bg-center border-primary-200 flex items-center"
            style={{
              backgroundImage: "url('/frenchpedi1.jpg')",
              textDecorationThickness: "1px",
            }}
          >
            <Link href="/pedi" passHref className="notranslate">
              <MotionBtn2>Pedicures</MotionBtn2>
            </Link>
          </div>

          {/* Square 3 */}
          <div
            className="rounded-md relative w-80 h-80 bg-cover bg-center  bg-white  border-2  flex items-center"
            style={{
              backgroundImage: "url('/lashes.jpg')",
              textDecorationThickness: "1px",
            }}
          >
            <Link href="/lashes" passHref className="notranslate">
              <MotionBtn2>Eyelashes</MotionBtn2>
            </Link>
          </div>

          {/* Square 4 */}
          <div
            className="rounded-md relative w-80 h-80 bg-cover bg-center  bg-black/30 flex items-center"
            style={{
              backgroundImage: "url('/brows1.jpg')",
              textDecorationThickness: "1px",
            }}
          >
            <Link href="/brows" passHref className="notranslate">
              <MotionBtn2>Eyebrows</MotionBtn2>
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
