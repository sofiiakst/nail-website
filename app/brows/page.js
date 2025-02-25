import { getBrows, getTech } from "../lib/dataServices";
import ClientFormWrapper from "../components/ClientFormWrapper";
import { Suspense } from "react";
import Spinner from "../components/Spinner";

export const metadata = {
  title: "Brows",
};

export default async function Page() {
  const brows = await getBrows();
  brows.map((brow) => {
    console.log(brow.name);
  });

  const tech = await getTech();

  return (
    <Suspense fallback={<Spinner />}>
      <ClientFormWrapper data={brows} tech={tech} />
    </Suspense>
  );
}
