import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthDialog } from "@/lib/redux/features/auth-dialog/use-auth-dialog";
import { useAuth } from "@/lib/redux/features/auth/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import BrandIcon from "../misc/brand-icon";
import { Card, CardContent } from "../ui/card";
import GoogleLoginButton from "./google-login-button";

const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((ctx) => ctx.password === ctx.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type SignupSchema = z.infer<typeof signupSchema>;

export default function SignupDialog() {
  const { setAuthDialog } = useAuthDialog();
  const { signup } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async ({
    email,
    password,
  }: Omit<SignupSchema, "confirmPassword">) => {
    await signup(email, password, "emailAndPassword");
  };

  return (
    <Dialog open={true} onOpenChange={setAuthDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="space-y-1 text-center">
          <DialogTitle className="flex justify-center ">
            <BrandIcon isDisabled />
          </DialogTitle>
        </DialogHeader>
        <Card className="w-full max-w-md border-none rounded-lg">
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="someone@example.com"
                    type="email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    placeholder="••••••••"
                    type="password"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    placeholder="••••••••"
                    type="password"
                    {...register("confirmPassword")}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                <Button className="w-full mt-4 rounded-full" type="submit">
                  Signup
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <DialogFooter className="pt-0 !flex-col">
          <GoogleLoginButton />
          <div className="flex justify-center items-center mt-4">
            <p>Already have an account?</p>{" "}
            <Button
              onClick={() => setAuthDialog(true, "login")}
              variant={"link"}
              className="text-indigo-600 hover:underline"
            >
              Login
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
