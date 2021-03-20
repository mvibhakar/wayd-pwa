import { useSelector, shallowEqual } from "react-redux";
import { AppState } from "../state";

export const useSelectFromRedux = <ReturnType>(selector: (state: AppState) => ReturnType) =>
    useSelector<AppState, ReturnType>(selector, shallowEqual);
