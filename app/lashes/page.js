import { getLashes, getTech } from "../lib/dataServices";
import ClientFormWrapper from "../components/ClientFormWrapper";
import { Suspense } from "react";
import Spinner from "../components/Spinner";

export const metadata = {
  title: "Eyelashes",
};

export default async function Page() {
  const lashes = await getLashes();
  const tech = await getTech();

  return (
    <Suspense fallback={<Spinner />}>
      <ClientFormWrapper data={lashes} tech={tech} />
    </Suspense>
  );
}
