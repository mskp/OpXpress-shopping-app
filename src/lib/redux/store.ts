import { configureStore } from "@reduxjs/toolkit";
import { authDialogReducer } from "./features/auth-dialog/auth-dialog-slice";
import { authReducer } from "./features/auth/auth-slice";
import { checkoutDialogReducer } from "./features/checkout-dialog/checkout-dialog-slice";

/**
 * Function to create the Redux store.
 * @returns Configured Redux store
 */
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer, // Reducer for authentication state
      authDialog: authDialogReducer, // Reducer for authentication dialog state
      checkoutDialog: checkoutDialogReducer, // Reducer for checkout dialog state
    },
  });
};

// Type definitions for the store, state, and dispatch

/**
 * Type definition for the Redux store.
 */
export type AppStore = ReturnType<typeof makeStore>;

/**
 * Type definition for the root state of the Redux store.
 */
export type RootState = ReturnType<AppStore["getState"]>;

/**
 * Type definition for the dispatch function of the Redux store.
 */
export type AppDispatch = AppStore["dispatch"];
