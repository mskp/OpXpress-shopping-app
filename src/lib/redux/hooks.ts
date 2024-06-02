import { useDispatch, useSelector, useStore } from "react-redux";
import type { RootState, AppDispatch, AppStore } from "./store";

/**
 * Hook to get the useDispatch hook with typed dispatch.
 * @returns Typed dispatch function
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

/**
 * Hook to get the useSelector hook with typed state.
 * @returns Typed state selector function
 */
export const useAppSelector = useSelector.withTypes<RootState>();

/**
 * Hook to get the useStore hook with typed store.
 * @returns Typed store object
 */
export const useAppStore = useStore.withTypes<AppStore>();
