import Link from "next/link";
import Reveal from "../components/Words";

export const metadata = {
  title: "Contact us",
};

export default function Contact() {
  return (
    <div className="flex flex-col items-center lg:flex-row min-h-screen overflow-auto">
      <div className="flex flex-col sm:w-1/2">
        <Reveal>
          <h1 className="text-primary-900 text-4xl sm:text-6xl">Contact us</h1>
        </Reveal>
        <p className="text-primary-900 text-sm sm:text-lg max-w-md mt-20">
          FEEL FREE TO EMAIL OR MESSAGE US ON SOCIAL MEDIA FOR ANY QUESTIONS ,
          BUT PLEASE CALL DURING BUSSINESS HOURS FOR AN IMMEDIATE RESPONSE.
        </p>

        <p className="text-primary-900 text-sm max-w-md font-bold mt-10 sm:text-lg">
          {" "}
          PLEASE NOTE: APPOINTMENTS CANNOT BE MADE VIA EMAIL!!{"  "}
        </p>
        <Link
          href="/serv"
          className="text-primary-500 underline hover:opacity-50 font-bold text-sm sm:text-lg"
        >
          CLICK HERE TO BOOK AN APPOINTMENT
        </Link>
        <a
          href="tel:+1234567890"
          className="text-primary-900 text-sm sm:text-lg max-w-md mt-11 underline"
        >
          PHONE: (914) 592 - 1118
        </a>
        <a
          className="text-primary-900 text-sm sm:text-lg max-w-md mt-5 underline"
          href="mailto:mariaTh@gmail.com"
        >
          EMAIL: contact@nailtopia.com
        </a>
      </div>

      <div className="flex flex-col">
        <h1 className="text-primary-900 font-bold text-xl mt-10 lg:mt-0">
          VISIT THE NAIL SPA
        </h1>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.667852656149!2d-73.8229239!3d41.0549031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2f3300d215d75%3A0xb7c5f125b4d7dcaf!2s327%20E%20Main%20St%2C%20Elmsford%2C%20NY%2010523%2C%20USA!5e0!3m2!1sen!2s!4v1695762998337!5m2!1sen!2s"
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
