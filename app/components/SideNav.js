"use client";
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
  n,
} from "@heroicons/react/24/solid";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Appointments",
    href: "/account",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-700" />,
  },
];

function SideNavigation() {
  const pathname = usePathname();
  return (
    <nav className="border-r border-primary-900 ">
      <ul className="flex flex-col gap-2 h-full text-lg">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 ${
                pathname == link.href ? "bg-primary-900" : ""
              }`}
              href={link.href}
            >
              {link.icon}
              <span className="text-primary-700">{link.name}</span>
            </Link>
          </li>
        ))}

        <li className="">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
