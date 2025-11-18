import ToggleButton from "@/app/components/ToggleButton";
import Reveal from "./Words";
import { TextGenerateSmall } from "./ui/text-generate-small";

export default function LoyaltyCardsPage() {
  const words1 = `Αναγνωρίζοντας την εμπιστοσύνη και την προτίμησή σας, δημιουργήσαμε ένα πρόγραμμα επιβράβευσης αποκλειστικά για εσάς. Με τη κάρτα επιβράβευσης, κάθε σας επίσκεψη στο κατάστημά μας σας φέρνει πιο κοντά σε μοναδικά προνόμια.
Η διάρκεια ισχύος της κάρτας είναι 10 μήνες από την ημέρα που θα αποκτήσετε την πρώτη σας σφραγίδα. Με τη συμπλήρωση 7 συνεχόμενων επισκέψεων, όπου θα συγκεντρώσετε και τις 7 σφραγίδες, σας προσφέρουμε 50% έκπτωση στην επόμενη επίσκεψή σας.
  Αυτός είναι ο δικός μας τρόπος να σας ευχαριστήσουμε για τη στήριξη και την εμπιστοσύνη σας.`;

  return (
    <main className="mt-11 notranslate">
      <div className="relative z-10 flex flex-col md:flex-row w-full">
        <div className="flex flex-col ">
          <Reveal>
            <h1 className="text-primary-950 text-3xl text-center sm:text-start  sm:text-5xl font-bold max-w-md">
              Αποκτήστε τα προνόμια της Loyalty Card
            </h1>
          </Reveal>
          <div className="text-primary-900 text-sm text-md sm:text-xl max-w-screen-md mt-11">
            <TextGenerateSmall words={words1} />
          </div>
          <p className="text-red-800 text-xs text-md sm:text-xl max-w-md mt-11">
            *Σε περίπτωση απώλειας της Loyalty Card, δεν είναι δυνατή η
            αντικατάστασή της με τον αντίστοιχο αριθμό σφραγίδων. Ωστόσο, ο
            πελάτης έχει τη δυνατότητα να ξεκινήσει άμεσα μια νέα κάρτα
            επιβράβευσης, αφού ενημερώσει το προσωπικό για την απώλεια της
            προηγούμενης.
          </p>
        </div>

        <div className="flex flex-col mt-20   md:ml-80">
          <h1 className="text-primary-950 ml-10 md:ml-6 font-bold mb-6 ">
            ΠΩΣ ΘΑ ΛΑΒΕΙΣ ΚΑΡΤΑ ΕΠΙΒΡΑΒΕΥΣΗΣ:
          </h1>
          <p className="text-primary-900 text-sm text-md sm:text-xl max-w-md mt-11">
            •Η Loyalty Card μπορεί να αποκτηθεί έπειτα από τρεις συνεχόμενες
            προγραμματισμένες υπηρεσίες, είτε κλεισμένες στο κατάστημα είτε μέσω
            της ιστοσελίδας μας, με την προϋπόθεση ότι θα την ζητήσετε κατά την
            επίσκεψή σας.
          </p>
          <p className="text-primary-900 text-sm text-md sm:text-xl max-w-md mt-11">
            •Παρακαλούμε σημειώστε ότι η Loyalty Card δεν είναι διαθέσιμη για
            έκδοση μέσω της ιστοσελίδας μας, αλλά μόνο μετά από κάποια επίσκεψή
            σας στο φυσικό μας κατάστημα. <br />
            <span className="text-red-900 ">
              Για περισσότερες πληροφορίες μην διστάσετε να μας καλέσετε στο
              κατάστημα!
            </span>
          </p>
        </div>
      </div>
    </main>
  );
}
