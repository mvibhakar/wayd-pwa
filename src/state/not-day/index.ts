import { produce } from "immer";
import { payloadAction, actionFactory, ActionUnion, simpleAction } from "reductser";
import * as notDayOperations from "./operations";
var moment = require("moment-timezone");

const actionMap = {
    updateAddNoteId: payloadAction<string>(),
    updateAddNoteTitle: payloadAction<string>(),
    updateAddNoteContent: payloadAction<string>(),
    resetAddNote: simpleAction(),
    updateAddHabitId: payloadAction<string>(),
    updateAddHabitIndex: payloadAction<number>(),
    updateAddHabitStreak: payloadAction<number>(),
    updateAddHabitContent: payloadAction<string>(),
    updateAddHabitChecked: payloadAction<boolean>(),
    resetAddHabit: simpleAction(),
};

export const notDayActions = actionFactory(actionMap, "NOT_DAY");

export type NotDayAction = ActionUnion<typeof notDayActions>;

export interface NotDayState {
    addNoteId: string;
    addNoteTitle: string;
    addNoteContent: string;
    addHabitId: string;
    addHabitIndex: number;
    addHabitStreak: number;
    addHabitContent: string;
    addHabitChecked: boolean;
}

export const getInitialState = (): NotDayState => ({
    addNoteId: "",
    addNoteTitle: "",
    addNoteContent: "",
    addHabitId: "",
    addHabitIndex: -1,
    addHabitStreak: 0,
    addHabitContent: "",
    addHabitChecked: false,
});

const notDayReducer = (state = getInitialState(), action: NotDayAction) =>
    produce(state, (draftState) => {
        if (action.reducer === "NOT_DAY") {
            switch (action.type) {
                case "updateAddNoteId":
                    draftState.addNoteId = action.payload;
                    break;
                case "updateAddNoteTitle":
                    draftState.addNoteTitle = action.payload;
                    break;
                case "updateAddNoteContent":
                    draftState.addNoteContent = action.payload;
                    break;
                case "resetAddNote":
                    draftState.addNoteId = getInitialState().addNoteId;
                    draftState.addNoteTitle = getInitialState().addNoteTitle;
                    draftState.addNoteContent = getInitialState().addNoteContent;
                    break;
                case "updateAddHabitId":
                    draftState.addHabitId = action.payload;
                    break;
                case "updateAddHabitIndex":
                    draftState.addHabitIndex = action.payload;
                    break;
                case "updateAddHabitStreak":
                    draftState.addHabitStreak = action.payload;
                    break;
                case "updateAddHabitContent":
                    draftState.addHabitContent = action.payload;
                    break;
                case "updateAddHabitChecked":
                    draftState.addHabitChecked = action.payload;
                    break;
                case "resetAddHabit":
                    draftState.addHabitId = getInitialState().addHabitId;
                    draftState.addHabitIndex = getInitialState().addHabitIndex;
                    draftState.addHabitStreak = getInitialState().addHabitStreak;
                    draftState.addHabitContent = getInitialState().addHabitContent;
                    draftState.addHabitChecked = getInitialState().addHabitChecked;
                    break;
                default:
                    break;
            }
        }
    });

export { notDayOperations };
export default notDayReducer;
