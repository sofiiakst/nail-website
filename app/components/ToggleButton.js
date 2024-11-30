"use client";

import { useState } from "react";

export default function Button({ title, text }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleInfo = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="p-6 max-w-md mx-auto ">
      <button
        onClick={toggleInfo}
        className="text-primary-950 w-44 lg:w-96 flex justify-between items-center  p-2 text-center bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none"
      >
        <span className="text-lg font-medium">{title}</span>
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md shadow-md">
          <p className="text-gray-700">{text}</p>
        </div>
      )}
    </div>
  );
}
