// "use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import BrandIcon from "../brand-icon";
import { Card, CardContent } from "../ui/card";
import GoogleLoginButton from "./google-login-button";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginSchema = z.infer<typeof loginSchema>;

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

export default function LoginDialog() {
  const {
    setAuthDialog,
    authDialog: { type, isOpen },
  } = useAuthDialog();
  const { login } = useAuth();
  const open = isOpen && type === "login";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async ({ email, password }: LoginSchema) => {
    await login({ email, password, loginMethod: "emailAndPassword" });
  };
  return (
    <Dialog open={open} onOpenChange={setAuthDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="space-y-1 text-center">
          <DialogTitle className="flex justify-center ">
            <BrandIcon isDisabled />
          </DialogTitle>
        </DialogHeader>
        <Card className="w-full max-w-md border-none">
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
                <Button className="w-full mt-4 rounded-full" type="submit">
                  Login
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <DialogFooter className="pt-0 !flex-col">
          <GoogleLoginButton />
          <div className="flex justify-center items-center mt-4">
            <p>{"Don't have an account?"}</p>
            <Button
              onClick={() => setAuthDialog(true, "signup")}
              variant={"link"}
              className="text-indigo-600 hover:underline"
            >
              Create one
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
