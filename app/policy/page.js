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
            1. Δεν πραγματοποιουνται αλλαγες στα ραντεβου.
          </h2>
          <h2 className="text-primary-800 font-bold text-l md:text-xl mt-5">
            2. Μετα απο το πρωτο δεκαλεπτο αργοποριας, το ραντεβου ακυρωνεται
            αυτοματα, και η υπηρεσια δεν θα πραγματοποιηθει.
          </h2>
          <h2 className="text-primary-800 font-bold text-l md:text-xl mt-5">
            3. Η προκαταβολη ΚΡΑΤΕΙΤΑΙ ακομα και μετα την ακυρωση του ραντεβου.
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
