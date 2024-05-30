import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthDialog } from "@/lib/redux/features/auth-dialog/use-auth-dialog";
import { useAuth } from "@/lib/redux/features/auth/use-auth";
import {
  BaggageClaim,
  LogIn,
  LogOut,
  UserIcon,
  UserRoundPlus,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Menu() {
  const {
    auth: { isLoggedin },
    logout,
  } = useAuth();
  const { setAuthDialog } = useAuthDialog();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      {isLoggedin ? (
        <DropdownMenuContent className="w-60">
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator /> */}
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => router.push("/orders")}
            >
              {/* <Link href={"/orders"} className="flex items-center"> */}
              <BaggageClaim className="mr-2 h-4 w-4" />
              <span>My Orders</span>
              {/* </Link> */}

              {/* <DropdownMenuShortcut>⇧⌘O</DropdownMenuShortcut> */}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent className="w-60">
          {/* <DropdownMenuLabel>Menu</DropdownMenuLabel> */}
          {/* <DropdownMenuSeparator /> */}
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setAuthDialog(true, "login")}
            >
              <LogIn className="mr-2 h-4 w-4" />
              <span>Login</span>
              {/* <DropdownMenuShortcut>⇧⌘O</DropdownMenuShortcut> */}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setAuthDialog(true, "signup")}
          >
            <UserRoundPlus className="mr-2 h-4 w-4" />
            <span>Signup</span>
            {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
