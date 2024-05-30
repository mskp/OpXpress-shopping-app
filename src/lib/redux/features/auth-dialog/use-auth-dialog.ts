import { useDispatch, useSelector } from "react-redux";
import {
  setAuthDialog as setAuthDialogData,
  selectAuthDialog,
} from "./auth-dialog-slice";

export const useAuthDialog = () => {
  const dispatch = useDispatch();
  const authDialog = useSelector(selectAuthDialog);

  const setAuthDialog = (
    isOpen: boolean,
    type: "login" | "signup" | null = "login"
  ) => {
    dispatch(setAuthDialogData({ isOpen, type }));
  };

  return {
    authDialog,
    setAuthDialog,
  };
};
