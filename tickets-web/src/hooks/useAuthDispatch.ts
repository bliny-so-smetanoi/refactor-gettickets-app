import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

export const useAuthDispatch = () => useDispatch<AppDispatch>();
export const useAuthSelector: TypedUseSelectorHook<RootState> = useSelector;