"use client";

import { toast } from "@/components/ui/use-toast";
import { authInstance } from "@/config/firebase.config";
import type { User } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth, selectAuth, setAuth } from "./auth-slice";
// import { useRouter } from "next/navigation";
import { useAuthDialog } from "../auth-dialog/use-auth-dialog";

type LoginCredentials =
  | { loginMethod: "google" }
  | { loginMethod: "emailAndPassword"; email: string; password: string };

export const useAuth = () => {
  const googleAuthProvider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const { setAuthDialog } = useAuthDialog();

  useEffect(() => {
    const unsubscribe = authInstance.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setAuth({ isLoggedin: true, auth: user }));
      }
    });

    return unsubscribe;
  }, [auth.isLoggedin, dispatch]);

  const login = async (data: LoginCredentials) => {
    try {
      let user: User;

      switch (data?.loginMethod) {
        case "emailAndPassword": {
          const { user: userCredentials } = await signInWithEmailAndPassword(
            authInstance,
            data.email,
            data.password
          );
          user = userCredentials;
          break;
        }
        case "google": {
          const { user: userCredentials } = await signInWithPopup(
            authInstance,
            googleAuthProvider
          );
          user = userCredentials;
          break;
        }
      }

      dispatch(setAuth({ isLoggedin: true, auth: user }));
      setAuthDialog(false, null);
    } catch (error) {
      toast({
        title: "Could not login",
        description: "Something went wrong",
      });
    }
  };

  const signup = async (
    email: string,
    password: string,
    signupMethod: "emailAndPassword" | "google" = "emailAndPassword"
  ) => {
    try {
      let user: User;
      switch (signupMethod) {
        case "emailAndPassword": {
          const { user: userCredentials } =
            await createUserWithEmailAndPassword(authInstance, email, password);
          user = userCredentials;
          break;
        }
        case "google": {
          const { user: userCredentials } = await signInWithPopup(
            authInstance,
            googleAuthProvider
          );
          user = userCredentials;
          break;
        }
      }
      dispatch(setAuth({ isLoggedin: true, auth: user }));
      setAuthDialog(false, null);
    } catch (error: any) {
      toast({
        title: "Account could not be created",
        description: "Email already in use",
      });
    }
  };

  const logout = async () => {
    try {
      await signOut(authInstance);
      dispatch(clearAuth());
      toast({
        title: "Logged out successfully",
      });
      if (typeof window !== undefined) window.location.reload();
    } catch (error) {}
  };

  return {
    auth,
    login,
    signup,
    logout,
  };
};
