import Link from "next/link";

export default function CheckoutBtn({ children }) {
  return (
    <button className="font-medium text-center mt-10 py-4 border-y-2 border-x-2 rounded-lg border-primary-600 text-primary-600 w-full text-xl hover:bg-black hover:text-white hover:border-black">
      {children}
    </button>
  );
}
