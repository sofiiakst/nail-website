import ToggleButton from "@/app/components/ToggleButton";
import Reveal from "./Words";

export default function GiftCardsPage() {
  return (
    <main className="mt-11">
      <div className="relative z-10 flex flex-col md:flex-row w-full">
        <div className="flex flex-col">
          <Reveal>
            <h1 className="text-primary-950 text-3xl sm:text-5xl font-bold max-w-md">
              Give the gift of this experience!
            </h1>
          </Reveal>
          <p className="text-primary-900 mr-16 text-sm sm:text-xl max-w-md mt-11">
            The perfect way to treat your loved ones to a moment of relaxation
            and pampering. Let them choose the pampering experience they
            deserve.
          </p>
        </div>

        <div className="flex flex-col mt-20 mr-20 md:ml-80">
          <h1 className="text-primary-950 ml-0 md:ml-6 font-bold mb-6 ">
            HOW TO BUY THE GIFTCARD:
          </h1>
          <ToggleButton
            title="Step 1"
            text="Click on the -Book An Appointment- button in our website. "
          />
          <ToggleButton title="Step 2" text="Then click on -Gift Cards- " />
        </div>
      </div>
    </main>
  );
}
