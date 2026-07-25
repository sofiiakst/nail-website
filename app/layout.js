import Header from "./components/Header";

import "@/app/_styles/globals.css";
import { Playfair_Display } from "next/font/google";
import Footer from "./components/Footer";
import { ConvexClientProvider } from "./ConvexClientProvider";
import AuthProvider from "./AuthProvider";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  display: "swap",
});
export const metadata = {
  title: {
    template: "%s / Nailtopia",
    default: "Welcome / Nailtopia",
  },
  description: "Nail spa .......",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${playfair.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
      >
        <AuthProvider>
          <ConvexClientProvider>
            <div className="min-h-screen bg-white">
              <Header />
              <div className="flex-1 px-8 py-12 flex flex-col min-h-screen">
                <main className="max-w-7xl mx-auto w-full ">{children}</main>
              </div>
              <Footer />
            </div>
          </ConvexClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
