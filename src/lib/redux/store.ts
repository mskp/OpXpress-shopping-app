import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./features/auth/auth-slice";
import { authDialogReducer } from "./features/auth-dialog/auth-dialog-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      authDialog: authDialogReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
