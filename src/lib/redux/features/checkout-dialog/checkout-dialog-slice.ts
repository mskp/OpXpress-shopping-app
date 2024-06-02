import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type DialogState = {
  isOpen: boolean;
};

const initialState: DialogState = {
  isOpen: false,
};

export const checkoutDialogSlice = createSlice({
  name: "checkoutDialog",
  initialState,
  reducers: {
    setCheckoutDialog: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const selectCheckoutDialog = (state: RootState): DialogState =>
  state.checkoutDialog;

export const { setCheckoutDialog } = checkoutDialogSlice.actions;

export const checkoutDialogReducer = checkoutDialogSlice.reducer;
