import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

/**
 * Type for the checkout dialog state.
 */
export type DialogState = {
  isOpen: boolean; // Whether the dialog is open or not
};

/**
 * Initial state for the checkout dialog slice.
 */
const initialState: DialogState = {
  isOpen: false, // Initially, the dialog is closed
};

/**
 * Slice for managing checkout dialog state.
 */
export const checkoutDialogSlice = createSlice({
  name: "checkoutDialog", // Name of the slice
  initialState, // Initial state
  reducers: {
    // Reducer functions to handle actions
    /**
     * Action to set the checkout dialog state.
     * @param state - Current state
     * @param action - Action with payload containing the dialog open status
     */
    setCheckoutDialog: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload; // Set the dialog open status
    },
  },
});

/**
 * Selector function to get the checkout dialog state from the root state.
 * @param state - The root state
 * @returns The checkout dialog state
 */
export const selectCheckoutDialog = (state: RootState): DialogState =>
  state.checkoutDialog;

// Export the actions to be used in the application
export const { setCheckoutDialog } = checkoutDialogSlice.actions;

// Export the reducer to be included in the store
export const checkoutDialogReducer = checkoutDialogSlice.reducer;
