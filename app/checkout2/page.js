"use client";
import { useSearchParams } from "next/navigation";
import CheckoutClientComponent from "../components/CheckoutClient";
import { convertToSub } from "../lib/convertToSub";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("Stripe public key not defined");
}

export default function Page() {
  const searchParams = useSearchParams(); // Access query parameters

  // Get query parameters safely
  const serviceName = searchParams.get("serviceName") || "";
  const servicePrice = searchParams.get("servicePrice") || "";
  const amount = servicePrice ? convertToSub(servicePrice) : 1;
  const appointmentDateTime = searchParams.get("appointmentDateTime") || "";
  console.log("from checkout2 page:", appointmentDateTime);
  const techName = searchParams.get("techName") || "";
  const phone = searchParams.get("phone") || "";
  const image = searchParams.get("image") || "";
  const fullName = searchParams.get("fullName") || "";

  return (
    <div className="text-primary-950">
      <CheckoutClientComponent
        serviceName={serviceName}
        servicePrice={amount}
        appointmentDateTime={appointmentDateTime}
        techName={techName}
        phone={phone}
        image={image}
        fullName={fullName}
      />
    </div>
  );
}
