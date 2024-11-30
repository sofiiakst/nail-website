import ToggleButton from "@/app/components/ToggleButton";
import Reveal from "./Words";

export default function LoyaltyCardsPage() {
  return (
    <main className="mt-11">
      {/* Background Image */}

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row w-full">
        {/* Left Section */}
        <div className="flex flex-col">
          <Reveal>
            <h1 className="text-primary-950 text-3xl sm:text-5xl font-bold max-w-md">
              What is a Loyalty Card?
            </h1>
          </Reveal>
          <p className="text-primary-900 text-sm mr-16 text-md sm:text-xl max-w-md mt-11">
            Each time you come back, the store adds the number of visits to your
            Loyalty Card. After you collect enough visits, you can get
            discounts, free services, or special offers!
          </p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col mt-20   md:ml-80">
          <h1 className="text-primary-950 ml-10 md:ml-6 font-bold mb-6 ">
            HOW TO BUY THE LOYALTY CARD:
          </h1>
          <ToggleButton
            title="Step 1"
            text="Click on the -Book An Appointment- button in our website. "
          />
          <ToggleButton title="Step 2" text="Then click on -Lo. Cards- " />
        </div>
      </div>
    </main>
  );
}
