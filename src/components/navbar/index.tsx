"use client";
import { useAuthDialog } from "@/lib/redux/features/auth-dialog/use-auth-dialog";
import { useAuth } from "@/lib/redux/features/auth/use-auth";
import { ShoppingCart } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BrandIcon from "../misc/brand-icon";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";
import Menu from "./menu";

function Navbar() {
  const { auth } = useAuth();
  const { setAuthDialog } = useAuthDialog();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

  useEffect(() => {
    if (!searchTerm.trim()) router.replace("/");
  }, [searchTerm, router]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    router.push(`/search-results?q=${value}`);
  };

  return (
    <>
      <nav className="bg-black text-white bg-opacity-90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4 relative z-50">
          <div className="flex items-center relative z-50">
            <BrandIcon />
          </div>
          <div className="relative w-1/2 hidden md:block z-50">
            <Input
              className="border-none focus:ring-0 text-black rounded-full w-full relative z-50"
              placeholder="Search for products..."
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <ul className="flex space-x-6 items-center relative z-50">
            <li>
              <Menu />
            </li>
            <li>
              <Button
                variant={"ghost"}
                onClick={() => {
                  if (auth?.isLoggedin) {
                    router.push(`/cart/${auth?.auth?.uid}`);
                  } else {
                    toast({
                      title: "You must login first",
                    });
                    setAuthDialog(true, "login");
                  }
                }}
              >
                <div className="relative inline-block z-50">
                  <ShoppingCart />
                </div>
              </Button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="block md:hidden bg-black text-white bg-opacity-90 backdrop-blur-xl p-4 relative z-50">
        <div className="relative w-full max-w-md mx-auto z-50">
          <Input
            className="border-none focus:ring-0 rounded-full text-black w-full relative z-50"
            placeholder="Search for products..."
            type="search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </>
  );
}

export default Navbar;
