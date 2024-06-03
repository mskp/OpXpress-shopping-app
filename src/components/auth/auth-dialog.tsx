"use client";

import { useAuthDialog } from "@/lib/redux/features/auth-dialog/use-auth-dialog";
import LoginDialog from "./login-dialog";
import SignupDialog from "./signup-dialog";

/**
 * AuthDialog component for rendering the login or signup dialog based on the type.
 * @returns {JSX.Element | null} The JSX element representing the authentication dialog.
 */
function AuthDialog(): JSX.Element | null {
  const {
    authDialog: { type, isOpen },
  } = useAuthDialog();

  // If the dialog is not open, return null
  if (!isOpen) return null;

  // Render the appropriate dialog based on the type
  switch (type) {
    case "login":
      return <LoginDialog />;
    case "signup":
      return <SignupDialog />;
    default:
      return null;
  }
}

export default AuthDialog;
