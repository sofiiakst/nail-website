"use server";

import { auth } from "../lib/auth";
import Navigation from "./Navigation";

export default async function NavHelper() {
  const session = await auth();

  return <Navigation session={session} />;
}
