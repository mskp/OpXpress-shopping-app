import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "firebase/auth";
import { RootState } from "../../store";

/**
 * Type for the authentication state.
 */
type AuthState = {
  isLoggedin: boolean; // Whether the user is logged in or not
  auth: User | null; // The authenticated user, or null if not authenticated
};

/**
 * Initial state for the authentication slice.
 */
const initialState: AuthState = {
  isLoggedin: false, // Initially, the user is not logged in
  auth: null, // No authenticated user initially
};

/**
 * Slice for managing authentication state.
 */
export const authSlice = createSlice({
  name: "auth", // Name of the slice
  initialState, // Initial state
  reducers: {
    // Reducer functions to handle actions
    /**
     * Action to set authentication state.
     * @param state - Current state
     * @param action - Action with payload containing the authenticated user and logged-in status
     */
    setAuth: (
      state,
      action: PayloadAction<{ auth: User; isLoggedin: boolean }>
    ) => {
      state.auth = action.payload.auth; // Set the authenticated user
      state.isLoggedin = action.payload.isLoggedin; // Set the logged-in status
    },
    /**
     * Action to clear authentication state.
     * @param state - Current state
     */
    clearAuth: (state) => {
      state = initialState; // Reset the state to initial state
    },
  },
});

/**
 * Selector function to get the authentication state from the root state.
 * @param state - The root state
 * @returns The authentication state
 */
export const selectAuth = (state: RootState): AuthState => state.auth;

// Export the actions to be used in the application
export const { setAuth, clearAuth } = authSlice.actions;

// Export the reducer to be included in the store
export const authReducer = authSlice.reducer;
