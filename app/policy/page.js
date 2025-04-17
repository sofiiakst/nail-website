import Link from "next/link";
import MotionBtn from "../components/MotionBtn";
import CheckoutBtn from "../components/CheckoutBtn";
import Reveal from "../components/Words";

export default function Page() {
  return (
    <>
      <div className="flex flex-col items-center notranslate">
        <Reveal>
          <h1 className="text-primary-800 font-extrabold text-center text-5xl md:text-6xl ">
            Terms of service
          </h1>
        </Reveal>

        <div className="mt-10 items-center flex flex-col max-w-80 sm:max-w-96">
          <h2 className="text-primary-800 font-bold text-l md:text-xl ">
            1. Δεν πραγματοποιούμε συντήρηση ή διόρθωση εργασίας που έχει γίνει
            από άλλη τεχνίτρια.
          </h2>
          <h2 className="text-primary-800 font-bold text-l md:text-xl mt-5">
            2. Οι τροποποιήσεις των ραντεβού γίνονται μόνο κατόπιν έγκαιρης
            συνεννόησης με το προσωπικό και σε περιπτώσεις ανάγκης.
          </h2>
          <h2 className="text-primary-800 font-bold text-l md:text-xl mt-5">
            3. Σε περίπτωση καθυστέρησης άνω των{" "}
            <span className="text-2xl">10</span> λεπτών, το ραντεβού ακυρώνεται
            αυτόματα.
          </h2>
          <h2 className="text-primary-800 font-bold text-l md:text-xl mt-5">
            4. Η μη προσέλευση χωρίς ενημέρωση συνεπάγεται σε αποκλεισμό από
            μελλοντικές κρατήσεις.
          </h2>
          <h2 className="text-primary-800 font-bold text-l md:text-xl mt-5">
            5. Η προκαταβολή διασφαλίζει την κράτησή σας και δεν επιστρέφεται,
            ανεξαρτήτως ακύρωσης.
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
