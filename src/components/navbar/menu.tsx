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
import { useRouter } from "next/navigation";

/**
 * The Menu component displays a dropdown menu for user authentication and navigation.
 * Depending on the authentication status, it shows different menu items.
 * If the user is logged in, it displays options to view orders and log out.
 * If the user is not logged in, it displays options to log in and sign up.
 *
 * @returns {JSX.Element} The rendered Menu component.
 */
export default function Menu(): JSX.Element {
  const {
    auth: { isLoggedin, auth },
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
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => router.push(`/orders/${auth?.uid}`)}
            >
              <BaggageClaim className="mr-2 h-4 w-4" />
              <span>My Orders</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent className="w-60">
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setAuthDialog(true, "login")}
            >
              <LogIn className="mr-2 h-4 w-4" />
              <span>Login</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setAuthDialog(true, "signup")}
          >
            <UserRoundPlus className="mr-2 h-4 w-4" />
            <span>Signup</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
