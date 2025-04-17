"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { auth } from "../lib/auth";
import Reveal from "./Words";

export default function Navigation({ session }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    // Check on mount
    handleResize();

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`z-10 text-xl ${
        !isOpen ? "w-1/3 flex justify-end mr-5" : "w-full"
      } md:w-auto mt-5 md:mt-0 `}
    >
      {/* Desktop navigation */}

      <ul className="hidden md:flex gap-16 items-center mt-5 ">
        <li>
          <Link
            href="/giftcards"
            className="hover:text-primary-400 transition-colors text-primary-700 focus:underline notranslate"
          >
            LOYALTY CARDS
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="hover:text-primary-400 transition-colors text-primary-700 focus:underline notranslate"
          >
            ABOUT US
          </Link>
        </li>
        <li>
          <a
            href="https://www.instagram.com/nailtopia_m?igsh=b3NwdTNqbzEyZ2tm"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Image
              src="/insta.svg"
              alt="Instagram"
              width={28}
              height={28}
              className="hover:opacity-50"
            />
          </a>
        </li>
        <li>
          <a href="mailto:contact@nailtopia.com" aria-label="Send Email">
            <Image
              src="/email.svg"
              alt="Email"
              width={35}
              height={35}
              className="hover:opacity-50"
            />
          </a>
        </li>
        {session?.user?.image && (
          <li>
            <Link href="/account">
              <img
                src={session.user.image}
                className="h-8 rounded-full"
                alt={session.user.name}
                referrerPolicy="no-referrer"
              />
            </Link>
          </li>
        )}
      </ul>

      {/* Mobile menu toggle button */}
      <div className="md:hidden flex flex-col ">
        <button
          onClick={toggleMenu}
          className="text-primary-300 focus:outline-none"
        >
          {!isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile navigation */}
      {isOpen && (
        <div className=" md:hidden fle flex-col items-center gap-4 bg-transparent p-4 rounded-md w-screen h-screen">
          <ul className="flex flex-col items-center gap-10 mt-5 ">
            <li>
              <Link
                onClick={toggleMenu}
                href="/giftcards"
                className="hover:text-primary-800 transition-colors text-primary-300 focus:underline text-3xl notranslate"
              >
                LOYALTY CARDS
              </Link>
            </li>
            <li>
              <Link
                onClick={toggleMenu}
                href="/contact"
                className="hover:text-primary-800 transition-colors text-primary-300 focus:underline text-3xl notranslate"
              >
                ABOUT US
              </Link>
            </li>
            <li>
              <a
                href="https://www.instagram.com/nailtopia_m?igsh=b3NwdTNqbzEyZ2tm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Image
                  src="/insta.svg"
                  alt="Instagram"
                  width={40}
                  height={40}
                  className="hover:opacity-20 icon"
                />
              </a>
            </li>
            <li>
              <a href="mailto:contact@nailtopia.com" aria-label="Send Email">
                <Image
                  src="/email.svg"
                  alt="Email"
                  width={50}
                  height={50}
                  className="hover:opacity-20 icon"
                />
              </a>
            </li>
            {session?.user?.image && (
              <li>
                <Link href="/account" onClick={toggleMenu}>
                  <img
                    src={session.user.image}
                    className="h-10 rounded-full"
                    alt={session.user.name}
                    referrerPolicy="no-referrer"
                  />
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
