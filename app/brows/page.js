import { getBrows, getExtras, getTech } from "../lib/dataServices";
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
  const datatype = "brows";
  const extras = await getExtras();

  return (
    <Suspense fallback={<Spinner />}>
      <ClientFormWrapper
        extras={extras}
        datatype={datatype}
        data={brows}
        tech={tech}
      />
    </Suspense>
  );
}
