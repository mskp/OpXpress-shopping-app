"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  setCheckoutDialog as setCheckoutDialogData,
  selectCheckoutDialog,
} from "./checkout-dialog-slice";

/**
 * Custom hook to manage the checkout dialog state.
 * @returns Object containing the checkout dialog state and a function to set the dialog state.
 */
export const useCheckoutDialog = () => {
  const dispatch = useDispatch();
  const checkoutDialog = useSelector(selectCheckoutDialog);

  /**
   * Function to set the checkout dialog state.
   * @param isOpen - Whether the dialog is open or not
   */
  const setCheckoutDialog = (isOpen: boolean) => {
    dispatch(setCheckoutDialogData(isOpen));
  };

  return {
    checkoutDialog,
    setCheckoutDialog,
  };
};
