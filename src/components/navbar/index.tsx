"use client";

import { Menu as MenuIcon, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import BrandIcon from "../brand-icon";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Menu from "./menu";

function Navbar() {
  const router = useRouter();

  return (
    <>
      <nav className="bg-black text-white bg-opacity-90 backdrop-blur-xl  sticky top-0 z-50">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <div className="flex items-center">
            <BrandIcon />
          </div>
          <Input
            className="hidden md:block border-none focus:ring-0 text-black rounded-full w-1/2"
            placeholder="Search for products..."
            type="search"
          />

          <ul className="flex space-x-6 items-center">
            <li>
              <Menu />
            </li>
            <li>
              <Button variant={"ghost"} onClick={() => router.push("/cart")}>
                <div className="relative inline-block">
                  <ShoppingCart />
                  <span className="absolute top-0 right-0 rounded-full bg-white text-black text-xs font-bold w-5 h-5 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                    2
                  </span>
                </div>
              </Button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="block md:hidden bg-black text-white bg-opacity-90  backdrop-blur-xl  p-4">
        <div className="relative w-full max-w-md mx-auto">
          <Input
            className="border-none focus:ring-0 rounded-full text-black"
            placeholder="Search for products..."
            type="search"
          />
        </div>
      </div>
    </>
  );
}
export default Navbar;
