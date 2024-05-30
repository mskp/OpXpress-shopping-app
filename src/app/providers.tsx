"use client";

import { useRef } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { makeStore, AppStore } from "@/lib/redux/store";
import { Toaster } from "@/components/ui/toaster";

export default function Providers({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <ReduxProvider store={storeRef.current}>
      {children}
      <Toaster />
    </ReduxProvider>
  );
}
