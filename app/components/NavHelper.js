"use server"; // You can also omit this as server components are the default

import { auth } from "../lib/auth"; // Assuming auth is a function that fetches session data
import Navigation from "./Navigation";

export default async function NavHelper() {
  const session = await auth(); // Fetch the session

  return <Navigation session={session} />;
}
