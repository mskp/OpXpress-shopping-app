import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

/**
 * Type for the authentication dialog state.
 */
export type DialogState = {
  isOpen: boolean; // Whether the dialog is open or not
  type: "login" | "signup" | null; // The type of dialog, either login or signup, or null if none
};

/**
 * Initial state for the authentication dialog slice.
 */
const initialState: DialogState = {
  isOpen: false, // Initially, the dialog is closed
  type: null, // No dialog type initially
};

/**
 * Slice for managing authentication dialog state.
 */
export const authDialogSlice = createSlice({
  name: "authDialog", // Name of the slice
  initialState, // Initial state
  reducers: {
    // Reducer functions to handle actions
    /**
     * Action to set the authentication dialog state.
     * @param state - Current state
     * @param action - Action with payload containing the dialog open status and type
     */
    setAuthDialog: (
      state,
      action: PayloadAction<{
        isOpen: boolean;
        type: "login" | "signup" | null;
      }>
    ) => {
      state.isOpen = action.payload.isOpen; // Set the dialog open status
      state.type = action.payload.type; // Set the dialog type
    },
  },
});

/**
 * Selector function to get the authentication dialog state from the root state.
 * @param state - The root state
 * @returns The authentication dialog state
 */
export const selectAuthDialog = (state: RootState): DialogState =>
  state.authDialog;

// Export the actions to be used in the application
export const { setAuthDialog } = authDialogSlice.actions;

// Export the reducer to be included in the store
export const authDialogReducer = authDialogSlice.reducer;
