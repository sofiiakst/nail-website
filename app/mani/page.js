import { getExtras, getMani, getTech } from "../lib/dataServices";
import ClientFormWrapper from "../components/ClientFormWrapper";
import { Suspense } from "react";
import Spinner from "../components/Spinner";

export const metadata = {
  title: "Manicures",
};

export default async function Page() {
  const mani = await getMani();
  const tech = await getTech();
  const datatype = "mani";
  const extras = await getExtras();
  /*
  return (
    <>
      <div className="h-auto flex flex-col lg:flex-row border border-primary-200 text-accent-400 lg:h-screen bg-primary-100">
        <div className="flex flex-col h-1/2">
          <Form data={mani} tech={tech} />
        </div>
        <div className="flex flex-col lg:ml-44 lg:mr-44">
          <DateSelector />
          <TimeSelector />
          <div className="mt-10 ml-28 lg:ml-0 lg:mt-5">
            <Link href="/checkout2" passHref>
              <MotionBtn>BOOK APPOINTMENT</MotionBtn>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
  */
  return (
    <Suspense fallback={<Spinner />}>
      <ClientFormWrapper
        extras={extras}
        datatype={datatype}
        data={mani}
        tech={tech}
      />
    </Suspense>
  );
}
