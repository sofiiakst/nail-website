import Link from "next/link";
import MotionBtn from "../components/MotionBtn";
import CheckoutBtn from "../components/CheckoutBtn";
import Reveal from "../components/Words";

export default function Page() {
  return (
    <>
      <div className="flex flex-col items-center">
        <Reveal>
          <h1 className="text-primary-800 font-extrabold text-center text-5xl md:text-6xl ">
            Terms of service
          </h1>
        </Reveal>

        <div className="mt-10 items-center flex flex-col max-w-80 sm:max-w-96">
          <h2 className="text-primary-800 font-bold text-l md:text-xl ">
            1. Δεν πραγματοποιούνται αλλαγές στα ραντεβού.
          </h2>
          <h2 className="text-primary-800 font-bold text-l md:text-xl mt-5">
            2. Μετά από το πρώτο δεκάλεπτο αργοπορίας, το ραντεβού ακυρώνεται
            αυτόματα.
          </h2>
          <h2 className="text-primary-800 font-bold text-l md:text-xl mt-5">
            3. Η προκαταβολή ΚΡΑΤΕΊΤΑΙ ακόμα και μετά την ακύρωση του ραντεβού.
          </h2>
        </div>
      </div>
      <div className="mt-5">
        <Link href="/serv" passHref>
          <CheckoutBtn>Continue to Services</CheckoutBtn>
        </Link>
      </div>
    </>
  );
}
