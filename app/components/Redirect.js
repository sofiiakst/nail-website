"use client";

import { useEffect } from "react";

export default function RedirectToBrowser() {
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Detect Instagram or Facebook in-app browsers
    const isInAppBrowser =
      userAgent.includes("Instagram") ||
      userAgent.includes("FBAN") ||
      userAgent.includes("FBAV");

    if (isInAppBrowser) {
      alert(
        "You will be redirected to your default browser to log in securely."
      );
      window.location.href = "/open-in-browser"; // Intermediate page path
    }
  }, []);

  return null;
}
