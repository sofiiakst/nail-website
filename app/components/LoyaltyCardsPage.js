import ToggleButton from "@/app/components/ToggleButton";
import Reveal from "./Words";

export default function LoyaltyCardsPage() {
  return (
    <main className="mt-11 notranslate">
      {/* Background Image */}

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row w-full">
        {/* Left Section */}
        <div className="flex flex-col ">
          <Reveal>
            <h1 className="text-primary-950 text-3xl text-center sm:text-start  sm:text-5xl font-bold max-w-md">
              Loyalty Card
            </h1>
          </Reveal>
          <p className="text-primary-900 text-sm text-md sm:text-xl max-w-screen-md mt-11">
            Οι loyalty cards αποτελούν ένα  πρόγραμμα  επιβράβευσης για την
            αφοσίωση και την προτίμηση των πελατών μας. Η ισχύς της κάρτας έχει
            διάρκεια 10 μήνες και ξεκινάει από την μέρα που θα υπάρξει η πρώτη
            σφραγίδα. Έπειτα από 7 συνεχόμενες επισκέψεις στο κατάστημα μας
            έχοντας μαζεψει και τις 7 σφραγίδες κερδίζετε 50% στην επόμενη
            επίσκεψη σας.
          </p>
          <p className="text-red-800 text-xs text-md sm:text-xl max-w-md mt-11">
            * Σε περίπτωση απώλειας της κάρτας, δεν υπάρχει η δυνατότητα
            αντικατάστασής της με τον αντίστοιχο αριθμό σφραγίδων. Ο πελάτης
            μπορεί να ξεκινήσει μία νέα κάρτα επιβράβευσης αμέσως και έπειτα από
            την ενημέρωση του προσωπικού για την απώλεια της.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col mt-20   md:ml-80">
          <h1 className="text-primary-950 ml-10 md:ml-6 font-bold mb-6 ">
            ΠΩΣ ΘΑ ΛΑΒΕΙΣ ΚΑΡΤΑ ΕΠΙΒΡΑΒΕΥΣΗΣ:
          </h1>
          <p className="text-primary-900 text-sm text-md sm:text-xl max-w-md mt-11">
            •Μπορείτε να λάβετε την κάρτα επιβράβευσης σας έπειτα από τρεις
            συνεχόμενες προγραμματισμένες υπηρεσίες είτε αυτές είναι κλεισμένες
            στο κατάστημα είτε online έπειτα και εφόσον την ζητήσετε.
          </p>
          <p className="text-primary-900 text-sm text-md sm:text-xl max-w-md mt-11">
            •Δεν μπορείτε να λάβετε την κάρτα επιβράβευσης online πάρα μόνο
            έπειτα από κάποια επίσκεψη σας στο φυσικό μας κατάστημα.
          </p>
        </div>
      </div>
    </main>
  );
}
