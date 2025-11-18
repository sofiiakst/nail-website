"use client";
import Link from "next/link";
import CheckoutBtn from "./CheckoutBtn";
import Reveal from "./Words";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ClientFormWrapper2() {
  const [formState, setFormState] = useState({
    message: "",
    toName: "",
    toEmail: "",
    firstName: "",
    lastName: "",
    yourEmail: "",
    amount: "",
  });

  const isFormValid =
    formState.toName &&
    formState.toEmail &&
    formState.firstName &&
    formState.lastName &&
    formState.yourEmail &&
    formState.amount;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();

    const selected = document.querySelector('input[name="to"]:checked');

    if (selected) {
      const query = new URLSearchParams({
        selected: selected.value,
      }).toString();

      router.push(`/checkout?${query}`);
    } else {
      alert("Please pick a price to gift.");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col">
          <Reveal>
            <h1 className="text-primary-950 font-extrabold text-5xl md:text-6xl">
              Digital Giftcard
            </h1>

            <h2 className="text-primary-950 font-bold mt-10 text-xl md:text-3xl max-w-md">
              The perfect gift for any occasion with just a click!
            </h2>
            <p className="text-primary-950 max-w-md mt-10 text-lg ">
              The cards lifetime is one of 1 year starting by the time the card
              if purchased on this website. This isnt the case for other
              purchaced gift cards.
            </p>
          </Reveal>
        </div>
        <form className="md:ml-10 ">
          <div className="flex flex-col text-primary-950 mt-32 text-2xl font-semibold md:mt-0 md:ml-60 xl:overflow-y-auto">
            <label for="mess">1. Your message (optional):</label>
            <input
              onChange={handleInputChange}
              type="text"
              id="mess"
              name="mess"
              placeholder="Write a message for your beloved one..."
              className="bg-primary-100 mt-7 rounded-lg py-10 px-10 text-sm w-full border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-500 p-2 cursor-text transition duration-300 ease-in-out placeholder-align-top "
            />
            <div className="flex flex-col xl:flex-row">
              <div className="flex flex-col text-primary-950 mt-20 text-2xl font-semibold md:mt-5 xl:mr-5 ">
                <label for="to">2. Going to:</label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  id="to"
                  name="toName"
                  placeholder="Friends name*"
                  required
                  className="bg-primary-100 mt-7 rounded-lg py-5 px-10 text-sm w-full border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-500 p-2 cursor-text transition duration-300 ease-in-out placeholder-align-top "
                />
                <input
                  onChange={handleInputChange}
                  type="text"
                  id="to"
                  name="toEmail"
                  required
                  placeholder="Friends email*"
                  className="bg-primary-100 mt-7 rounded-lg py-5 px-10 text-sm w-full border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-500 p-2 cursor-text transition duration-300 ease-in-out placeholder-align-top "
                />
              </div>
              <div className="flex flex-col text-primary-950 mt-20 text-2xl font-semibold md:mt-5 ">
                <label for="to">3. Fill your data:</label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  id="to"
                  name="firstName"
                  placeholder="First Name*"
                  required
                  className="bg-primary-100 mt-7 rounded-lg py-5 px-10 text-sm w-full border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-500 p-2 cursor-text transition duration-300 ease-in-out placeholder-align-top "
                />
                <input
                  onChange={handleInputChange}
                  type="text"
                  id="to"
                  name="lastName"
                  placeholder="Last name*"
                  required
                  className="bg-primary-100 mt-7 rounded-lg py-5 px-10 text-sm w-full border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-500 p-2 cursor-text transition duration-300 ease-in-out placeholder-align-top "
                />
                <input
                  onChange={handleInputChange}
                  type="text"
                  id="to"
                  name="yourEmail"
                  placeholder="Your email*"
                  required
                  className="bg-primary-100 mt-7 rounded-lg py-5 px-10 text-sm w-full border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-500 p-2 cursor-text transition duration-300 ease-in-out placeholder-align-top "
                />
              </div>
            </div>
            <div className="flex flex-col text-primary-950 mt-20 text-2xl font-semibold md:mt-5 xl:mr-5 ">
              <label className="mb-7">4. Pick amount:</label>
              <div className="space-y-4 ml-48 ">
                <label for="20" class="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="option1"
                    name="to"
                    value="25"
                    className="form-radio "
                  />
                  <span className="text-primary-700">25$</span>
                </label>
                <label for="20" class="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="option2"
                    name="to"
                    value="35"
                    className="form-radio"
                  />
                  <span className="text-primary-700  ">35$</span>
                </label>
                <label for="20" class="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="option3"
                    name="to"
                    value="45"
                    className="form-radio"
                  />
                  <span className="text-primary-700  ">45$</span>
                </label>
                <label for="20" class="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="option4"
                    name="to"
                    value="50"
                    className="form-radio"
                  />
                  <span className="text-primary-700  ">50$</span>
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
      {!isFormValid ? (
        <button className="opacity-15 animate-pulse  font-medium text-center mt-10 py-4 border-y-2 border-x-2 rounded-lg border-primary-600 text-primary-600 w-full md:w-1/2 md:ml-80 text-xl bg-black hover:text-white">
          Fill Requirements
        </button>
      ) : (
        <Link href="/checkout" onClick={handleSubmit} passHref>
          <CheckoutBtn>CONTINUE</CheckoutBtn>
        </Link>
      )}
    </div>
  );
}
