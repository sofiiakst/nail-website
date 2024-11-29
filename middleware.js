import { auth } from "@/app/lib/auth";

/*import { NextResponse } from "next/server";

export function middleware(request) {
  return NextResponse.redirect(new URL("/"));
}*/
export const middleware = auth;
export const config = {
  matcher: ["/serv"],
};
