import * as Redux from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { ActionCreator } from "redux";
// import { default as someOtherModel, SomeOtherModelState, SomeOtherModelAction } from "./some-other-model";
import { default as cuser, CuserState, CuserAction } from "./cuser";
import { default as day, DayState, DayAction } from "./day";

export type CustomAction = CuserAction | DayAction;
// | WhateverAction

export interface AppState {
    // someOtherModel: SomeOtherModelState;
    cuser: CuserState;
    day: DayState;
}

const appReducer = Redux.combineReducers({
    cuser,
    day,
});

export const rootReducer = (state: any, action: any) => {
    if (action.type === "RESET_APP") {
        state = undefined;
    }

    return appReducer(state, action);
};

export const unreachableCode = (never: never): never => {
    throw new Error("This code should NEVER be called.");
};

export type AsyncAction = ThunkAction<void, AppState, never, CustomAction>;
// operations are async action creators
export type Operation = ActionCreator<AsyncAction>;

export type AsyncPromiseAction<T> = ThunkAction<Promise<T>, AppState, never, CustomAction>;
export type PromiseOperation<T> = ActionCreator<AsyncPromiseAction<T>>;
export type PromiseDispatch = ThunkDispatch<AppState, never, CustomAction>;
