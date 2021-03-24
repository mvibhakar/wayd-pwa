import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppState, PromiseDispatch } from "../state";

export const useSelectFromRedux = <ReturnType>(selector: (state: AppState) => ReturnType) =>
    useSelector<AppState, ReturnType>(selector, shallowEqual);

export const useDispatchPromise = () => useDispatch<PromiseDispatch>();
