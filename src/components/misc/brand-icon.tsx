import { APP_NAME } from "@/config/consts";
import { Andika } from "next/font/google";
import Link from "next/link";

const andika = Andika({ subsets: ["latin"], weight: "400" });

function BrandIcon({ isDisabled = false }: { isDisabled?: boolean }) {
  return (
    <Link
      href="/"
      className={`${andika.className} ${
        isDisabled ? "pointer-events-none" : ""
      } text-2xl font-semibold hover:opacity-70`}
    >
      {APP_NAME}
    </Link>
  );
}

export default BrandIcon;
