import "@/assets/globals.css";
import AuthDialog from "@/components/auth/auth-dialog";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar";
import "@/config/env";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Providers from "./providers";

const poppins = Poppins({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
  title: "OpXpress - Your Ultimate Destination for Quick and Easy Shopping",
  description:
    "Discover a world of convenience with OpXpress! Shop for the latest trends, hottest deals, and must-have items all in one place. With our user-friendly interface and lightning-fast service, shopping has never been easier. Join the OpXpress community today and experience hassle-free shopping like never before!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          <Navbar />
          <AuthDialog />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
