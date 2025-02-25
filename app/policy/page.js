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
            1. Συντήρηση σε δουλειά άλλης τεχνίτριας δεν πραγματοποιείται.
          </h2>
          <h2 className="text-primary-800 font-bold text-l md:text-xl mt-5">
            2. Αλλαγές σε ραντεβού πραγματοποιούνται μόνο έπειτα από έγκαιρη
            συνεννόηση με το προσωπικό και μόνο για σοβαρούς λόγους.
          </h2>
          <h2 className="text-primary-800 font-bold text-l md:text-xl mt-5">
            3. Έπειτα από το πρώτο 10λεπτο αργοπορίας, το ραντεβού ακυρώνεται
            αυτομάτως.
          </h2>
          <h2 className="text-primary-800 font-bold text-l md:text-xl mt-5">
            4. Σε περίπτωση μη εμφάνισης σε ήδη προγραμματισμένο ραντεβού, το
            άτομο δεν θα εξυπηρετείται ξανά.
          </h2>
          <h2 className="text-primary-800 font-bold text-l md:text-xl mt-5">
            5. Η προκαταβολή, ακόμα και μετά από την ακύρωση ενός ραντεβού,
            ΚΡΑΤΕΊΤΑΙ.
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
