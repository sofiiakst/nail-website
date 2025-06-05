import { getExtras, getLashes, getTech } from "../lib/dataServices";
import ClientFormWrapper from "../components/ClientFormWrapper";
import { Suspense } from "react";
import Spinner from "../components/Spinner";

export const metadata = {
  title: "Eyelashes",
};

export default async function Page() {
  const lashes = await getLashes();
  const datatype = "lashes";
  const tech = await getTech();
  const extras = await getExtras();

  return (
    <Suspense fallback={<Spinner />}>
      <ClientFormWrapper
        extras={extras}
        datatype={datatype}
        data={lashes}
        tech={tech}
      />
    </Suspense>
  );
}
