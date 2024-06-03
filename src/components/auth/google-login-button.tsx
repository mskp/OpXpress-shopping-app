import { useAuth } from "@/lib/redux/features/auth/use-auth";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

/**
 * GoogleLoginButton component for rendering a button to login with Google.
 * @returns {JSX.Element} The JSX element representing the Google login button.
 */
function GoogleLoginButton(): JSX.Element {
  const { login } = useAuth();

  /**
   * Handles the Google login process.
   * Displays a toast message if an error occurs during login.
   */
  const handleGoogleLogin = async () => {
    try {
      await login({ loginMethod: "google" });
    } catch (error) {
      toast({
        title: "Some error occured",
      });
    }
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      variant={"outline"}
      className="w-full flex items-center justify-center gap-2"
    >
      <FcGoogle className="text-lg" />
      Continue with Google
    </Button>
  );
}

export default GoogleLoginButton;
