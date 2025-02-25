import Link from "next/link";
import Reveal from "../components/Words";

export const metadata = {
  title: "Contact us",
};

export default function Contact() {
  return (
    <div className="flex flex-col items-center  min-h-screen overflow-auto">
      <div className="flex flex-col">
        <h1 className="text-primary-900 font-bold ml-28 sm:ml-0 sm:text-xl mt-10 lg:mt-0">
          VISIT THE NAIL SPA
        </h1>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3147.0338605823017!2d23.627614475403853!3d37.929639403224925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1b97c9cce283b%3A0x6e4ca6dc3a14db63!2zzpHOus-Ezq4gzpjOtc68zrnPg8-Ezr_Ous67zq3Ov8-Fz4IgMjgwLCDOoM61zrnPgc6xzrnOrM-CIDE4NSAzOQ!5e0!3m2!1sel!2sgr!4v1740509407164!5m2!1sel!2sgr"
          width="550"
          height="450"
          className="border-0 sm:mt-10"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
