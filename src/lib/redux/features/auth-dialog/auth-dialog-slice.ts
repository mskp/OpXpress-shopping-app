import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type DialogState = {
  isOpen: boolean;
  type: "login" | "signup" | null;
};

const initialState: DialogState = {
  isOpen: false,
  type: null,
};

export const authDialogSlice = createSlice({
  name: "authDialog",
  initialState,
  reducers: {
    setAuthDialog: (state, action) => {
      state.isOpen = action.payload.isOpen;
      state.type = action.payload.type;
    },
  },
});

export const selectAuthDialog = (state: RootState): DialogState =>
  state.authDialog;

export const { setAuthDialog } = authDialogSlice.actions;

export const authDialogReducer = authDialogSlice.reducer;
