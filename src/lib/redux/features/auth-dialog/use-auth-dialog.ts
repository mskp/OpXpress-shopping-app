import { useDispatch, useSelector } from "react-redux";
import {
  setAuthDialog as setAuthDialogData,
  selectAuthDialog,
} from "./auth-dialog-slice";

/**
 * Custom hook to manage the authentication dialog state.
 * @returns Object containing the authentication dialog state and a function to set the dialog state.
 */
export const useAuthDialog = () => {
  const dispatch = useDispatch();
  const authDialog = useSelector(selectAuthDialog);

  /**
   * Function to set the authentication dialog state.
   * @param isOpen - Whether the dialog is open or not
   * @param type - The type of dialog, either "login" or "signup". Default is "login".
   */
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
