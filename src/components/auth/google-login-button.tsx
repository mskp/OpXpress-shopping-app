import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { useAuth } from "@/lib/redux/features/auth/use-auth";
import { toast } from "../ui/use-toast";

function GoogleLoginButton() {
  const { login } = useAuth();

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
