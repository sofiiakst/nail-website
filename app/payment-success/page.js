import Link from "next/link";
import MotionBtn from "../components/MotionBtn";
import { revertToSuper } from "../lib/revertToSuper";

export default function Page({ searchParams }) {
  const amount = searchParams?.amount;
  const amount2 = revertToSuper(amount);
  return (
    <main>
      <div className="flex flex-col items-center">
        <div>
          <h1 className="text-primary-900 font-extrabold text-3xl text-center">
            Thank you!
          </h1>
          <h2 className="text-primary-700 text-center mt-10 text-xl">
            Your {amount2}$ payment was successful!
          </h2>
        </div>
        <div className=" mt-10">
          <Link href="/" passHref>
            <MotionBtn>BACK TO HOME</MotionBtn>
          </Link>
        </div>
      </div>
    </main>
  );
}
