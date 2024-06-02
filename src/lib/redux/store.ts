import { configureStore } from "@reduxjs/toolkit";
import { authDialogReducer } from "./features/auth-dialog/auth-dialog-slice";
import { authReducer } from "./features/auth/auth-slice";
import { checkoutDialogReducer } from "./features/checkout-dialog/checkout-dialog-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      authDialog: authDialogReducer,
      checkoutDialog: checkoutDialogReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
