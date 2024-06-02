"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  setCheckoutDialog as setCheckoutDialogData,
  selectCheckoutDialog,
} from "./checkout-dialog-slice";

export const useCheckoutDialog = () => {
  const dispatch = useDispatch();
  const checkoutDialog = useSelector(selectCheckoutDialog);

  const setCheckoutDialog = (isOpen: boolean) => {
    dispatch(setCheckoutDialogData(isOpen));
  };

  return {
    checkoutDialog,
    setCheckoutDialog,
  };
};
