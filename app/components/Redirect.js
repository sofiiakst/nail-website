"use client";

import { useEffect } from "react";

export default function RedirectToBrowser() {
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (
      userAgent.includes("Instagram") ||
      userAgent.includes("FBAN") ||
      userAgent.includes("FBAV")
    ) {
      alert(
        "You will be redirected to your default browser to log in securely."
      );
      window.location.href = "https://nail-website-demo.vercel.app"; // Replace with your app URL
    }
  }, []);

  return null;
}
