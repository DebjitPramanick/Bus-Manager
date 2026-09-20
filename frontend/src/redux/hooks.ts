import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, store } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector =
  useSelector.withTypes<ReturnType<typeof store.getState>>();
