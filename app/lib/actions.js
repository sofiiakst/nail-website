"use server";
import { auth, signIn, signOut } from "./auth";
export async function signInAction() {
  await signIn("google", { redirectTo: "/serv" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
