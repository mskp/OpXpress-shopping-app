"use client";

import { useRef } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { makeStore, AppStore } from "@/lib/redux/store";
import { Toaster } from "@/components/ui/toaster";

/**
 * Providers component serves as a wrapper for the entire application, providing access to the Redux store and managing notifications.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be wrapped.
 * @returns {JSX.Element} The JSX element representing the Providers component.
 */
export default function Providers({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  // Initialize a reference to the Redux store
  const storeRef = useRef<AppStore>();

  // Create the Redux store if it doesn't exist
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  // Render the ReduxProvider with the Redux store and children components
  return (
    <ReduxProvider store={storeRef.current}>
      {children}
      <Toaster />
    </ReduxProvider>
  );
}
