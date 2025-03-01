"use client";
import { useState, useRef, useEffect } from "react";
import SubmitBtn from "./SubmitBtn";
import { useFormState } from "react-dom";
import addRecall from "../lib/addRecall";
export default function UserForm({
  onPhoneChange,
  onNameChange,
  onButtonClick,
}) {
  const [formState, action] = useFormState(addRecall, { errors: {} });
  const inputRef = useRef(null);
  const handleBlur = () => {
    if (inputRef.current && inputRef.current.value.length >= 1) {
      onNameChange(inputRef.current.value); // Send value to parent
      console.log("Full name updated:", inputRef.current.value);
    }
  };
  useEffect(() => {
    console.log(formState);
    if (formState.success) {
      onButtonClick();
      console.log("Form submitted successfully! Proceeding...");
    }
  }, [formState]);

  return (
    <div className="">
      <form
        action={action}
        className="lg:h-auto py-10 px-16 text-lg sm:text-xl flex gap-5 flex-col md:flex-row text-primary-900 mr-5 sm:mr-0"
      >
        <div className="space-y-4 space-x-4  ">
          <label>Full Name:</label>

          <input
            ref={inputRef}
            required
            type="text"
            name="name"
            placeholder="Full Name required "
            onBlur={handleBlur}
            className="px-5 py-3 bg-primary-50 text-primary-500 w-full md:w-1/2 lg:w-full shadow-sm rounded-md"
          />
          {formState.errors?.name && (
            <p className="text-red-700">
              Name should be at least 3 characters.
            </p>
          )}
        </div>

        <div className="space-y-4 space-x-4">
          <label>Phone number:</label>
          <input
            required
            type="tel"
            name="phone"
            placeholder="Phone number required "
            onChange={(e) => {
              const phone = e.target.value;
              if (phone.length === 10) {
                onPhoneChange(phone);
                console.log("Phone:", phone);
              }
            }}
            className="px-5 py-3 bg-primary-50 text-primary-500 w-full md:w-1/2 lg:w-full shadow-sm rounded-md"
          />
          {formState.errors?.phone && (
            <p className="text-red-700">Invalid phone number.</p>
          )}
        </div>
        <SubmitBtn>BOOK APPOINTMENT</SubmitBtn>
      </form>
    </div>
  );
}
