import { Suspense } from "react";
import ClientFormWrapper from "../components/ClientFormWrapper";

import { getPedi, getTech } from "../lib/dataServices";
import Spinner from "../components/Spinner";
export const metadata = {
  title: "Pedicures",
};

export default async function Page() {
  const pedi = await getPedi();
  const tech = await getTech();
  /*
  return (
    <div className="h-auto flex flex-col lg:flex-row border border-primary-200 text-accent-400 lg:h-screen bg-primary-100">
      <div className="flex flex-col h-1/2">
        <Form data={pedi} tech={tech} />
      </div>
      <div className="flex flex-col lg:ml-44 lg:mr-44">
        <DateSelector />
        <TimeSelector />
        <div className="mt-10 ml-28 lg:ml-0 lg:mt-5">
          <MotionBtn>BOOK APPOINTMENT</MotionBtn>
        </div>
      </div>
    </div>
  );
  */
  return (
    <Suspense fallback={<Spinner />}>
      <ClientFormWrapper data={pedi} tech={tech} />;
    </Suspense>
  );
}
