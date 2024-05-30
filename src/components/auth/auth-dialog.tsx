"use client";

import { useAuthDialog } from "@/lib/redux/features/auth-dialog/use-auth-dialog";
import LoginDialog from "./login-dialog";
import SignupDialog from "./signup-dialog";

function AuthDialog() {
  const {
    authDialog: { type, isOpen },
  } = useAuthDialog();

  if (!isOpen) return null;

  switch (type) {
    case "login":
      return <LoginDialog />;
    case "signup":
      return <SignupDialog />;
  }
}

export default AuthDialog;
