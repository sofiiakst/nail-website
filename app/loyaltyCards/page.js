import Link from "next/link";
import CheckoutBtn from "../components/CheckoutBtn";
import ToggleButton from "../components/ToggleButton";
import Reveal from "../components/Words";

export const metadata = {
  title: "Loyalty Cards",
};

export default function Page() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col    ">
          <Reveal>
            <h1 className="text-primary-950 font-extrabold text-5xl md:text-6xl">
              Digital Loyalty Card
            </h1>
            <h2 className="text-primary-950 font-bold mt-10 text-xl md:text-3xl max-w-md">
              Enjoy our service with rewards on your fingertips!
            </h2>
            <p className="text-primary-950 max-w-md mt-10 text-lg ">
              A digital loyalty card for a nail spa enhances your pampering
              experience with exclusive perks and seamless convenience.
              <span className="font-bold">
                From free manicures,special offers like discounts on your
                favorite services, complimentary treatments or priority booking.
              </span>
            </p>
            <p className="text-primary-600 max-w-md mt-10 text-xl font-bold ">
              No more worrying about forgetting your card.
            </p>
          </Reveal>
        </div>
        <div className="flex flex-col ml-5 mt-24 md:mt-10 md:ml-60">
          <h2 className="text-primary-600 text-xl md:text-2xl font-semibold ml-5">
            BUY A LOYALTY CARD <span className="text-primary-950"> (10€ )</span>
          </h2>
          <ToggleButton
            title="How the loyalty card works"
            text="On every 7th visit, you will receive either 50% discounts,free pedicures, or extra free complimentary services of your choice."
          />
          <ToggleButton
            title="Where can I view my progress?"
            text="You get to see your progress on your physical card."
          />
        </div>
      </div>
      <Link href="/checkout3" passHref>
        <CheckoutBtn>BUY</CheckoutBtn>
      </Link>
    </div>
  );
}
