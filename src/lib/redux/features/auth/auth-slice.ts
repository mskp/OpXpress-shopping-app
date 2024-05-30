import { createSlice } from "@reduxjs/toolkit";
import type { User } from "firebase/auth";
import { RootState } from "../../store";

type AuthState = {
  isLoggedin: boolean;
  auth: User | null;
};

const initialState: AuthState = {
  isLoggedin: false,
  auth: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: { payload: { auth: User; isLoggedin: boolean } }
    ) => {
      state.auth = action.payload.auth;
      state.isLoggedin = action.payload.isLoggedin;
    },
    clearAuth: (state) => {
      state = initialState;
    },
  },
});

export const selectAuth = (state: RootState): AuthState => state.auth;

export const { setAuth, clearAuth } = authSlice.actions;

export const authReducer = authSlice.reducer;
