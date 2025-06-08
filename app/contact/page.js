import Link from "next/link";
import Reveal from "../components/Words";
import { TextGenerateSmall } from "../components/ui/text-generate-small";

export const metadata = {
  title: "Contact us",
};

export default function Contact() {
  const words1 = `Στο NAILTOPIA, κάθε πελάτης είναι μοναδικός και η φροντίδα του αποτελεί την απόλυτη προτεραιότητά μας. Κάθε επίσκεψη είναι μια ξεχωριστή εμπειρία, εστιασμένη στην εμπιστοσύνη, την ποιότητα και τον επαγγελματισμό. Εκτιμούμε την ευκαιρία να προσφέρουμε τις καλύτερες υπηρεσίες.
Η φιλοσοφία μας βασίζεται στην ειλικρίνεια, τη διαφάνεια και την αφοσίωσή μας στην καλύτερη φροντίδα σας. Διασφαλίζουμε αυστηρά πρότυπα υγιεινής και ασφάλειας χρησιμοποιώντας πιστοποιημένα προϊόντα και σύγχρονες τεχνικές, ενώ οι τιμές μας αντικατοπτρίζουν την υψηλή ποιότητα των υπηρεσιών μας, πάντα προσαρμοσμένες στις ανάγκες σας.
  Η σχέση μας με εσάς βασίζεται στην εμπιστοσύνη και το σεβασμό, διασφαλίζοντας ότι η φροντίδα σας βρίσκεται πάντα στα καλύτερα χέρια.
  `;

  return (
    <div className="flex flex-col items-center  min-h-screen overflow-auto">
      <Reveal>
        <h1 className="text-primary-950 text-xl text-center sm:text-start  sm:text-2xl font-bold max-w-screen-md">
          Γιατί να επιλέξετε το κατάστημά μας
        </h1>
      </Reveal>
      <div className="text-primary-900  text-md sm:text-3xl max-w-screen-md mt-11">
        <TextGenerateSmall words={words1} />
      </div>
      <div className="mt-8 flex flex-col ">
        <h2 className="text-primary-900 text-3xl sm:text-4xl text-center">
          Contact us
        </h2>
        <h3 className="mt-4 max-w-md text-primary-700">
          Για οποιεσδήποτε πληροφορίες, μπορείτε να μας βρείτε στα παρακάτω
          στοιχεία:
        </h3>

        <p className=" text-primary-900 text-md font-extrabold mt-2">
          Τηλέφωνο: <span className=" text-primary-700">2104186806</span>
        </p>

        <h4 className=" text-primary-700 mt-2">
          Επισκεφτείτε μας επίσης στα κοινωνικά δίκτυα:
        </h4>
        <p className=" text-primary-900 text-md font-extrabold mt-2">
          Instagram: <span className=" text-primary-700">nailtopia_m</span>
        </p>

        <p className="text-red-800 mt-5 max-w-md">
          *Τα ραντεβού κλείνονται αποκλειστικά μέσω της ιστοσελίδας μας. Δεν
          δέχονται ραντεβού μέσω τηλεφώνου ή άλλων μέσων. Μπορείτε να βρείτε την
          τοποθεσία μας στον χάρτη παρακάτω.
        </p>
      </div>
      <div className="flex flex-col mt-10">
        <h1 className="text-primary-900 font-bold ml-28 sm:ml-0 sm:text-xl mt-10 lg:mt-0">
          VISIT THE NAIL SPA
        </h1>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3147.0338605823017!2d23.627614475403853!3d37.929639403224925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1b97c9cce283b%3A0x6e4ca6dc3a14db63!2zzpHOus-Ezq4gzpjOtc68zrnPg8-Ezr_Ous67zq3Ov8-Fz4IgMjgwLCDOoM61zrnPgc6xzrnOrM-CIDE4NSAzOQ!5e0!3m2!1sel!2sgr!4v1740509407164!5m2!1sel!2sgr"
          width="550"
          height="450"
          className="border-0 sm:mt-10"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
