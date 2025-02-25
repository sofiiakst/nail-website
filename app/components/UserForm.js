"use client";
import { useState, useRef } from "react";
export default async function UserForm({ onPhoneChange, onNameChange }) {
  const inputRef = useRef(null);
  const handleBlur = () => {
    if (inputRef.current && inputRef.current.value.length >= 1) {
      onNameChange(inputRef.current.value); // Send value to parent
      console.log("Full name updated:", inputRef.current.value);
    }
  };

  return (
    <div className="flex flex-col h-1/2">
      <form
        className="lg:h-auto py-10 px-16 text-lg sm:text-xl flex gap-5 flex-col text-primary-900 mr-5 sm:mr-0"
        encType="multipart/form-data"
      >
        <div className="space-y-4 space-x-4">
          <label>Full Name:</label>
          <input
            required
            type="text"
            placeholder="Full Name required "
            onBlur={handleBlur}
            className="px-5 py-3 bg-primary-50 text-primary-500 w-full md:w-1/2 lg:w-full shadow-sm rounded-md"
          />
        </div>

        <div className="space-y-4 space-x-4">
          <label>Phone number:</label>
          <input
            required
            type="tel"
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
        </div>
      </form>
    </div>
  );
}
