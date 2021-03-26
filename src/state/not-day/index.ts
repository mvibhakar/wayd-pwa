import { produce } from "immer";
import { payloadAction, actionFactory, ActionUnion, simpleAction } from "reductser";
import * as notDayOperations from "./operations";
var moment = require("moment-timezone");

const actionMap = {
    updateAddNoteId: payloadAction<string>(),
    updateAddNoteTitle: payloadAction<string>(),
    updateAddNoteContent: payloadAction<string>(),
};

export const notDayActions = actionFactory(actionMap, "NOT_DAY");

export type NotDayAction = ActionUnion<typeof notDayActions>;

export interface NotDayState {
    addNoteId: string;
    addNoteTitle: string;
    addNoteContent: string;
}

export const getInitialState = (): NotDayState => ({
    addNoteId: "",
    addNoteTitle: "",
    addNoteContent: "",
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
                default:
                    break;
            }
        }
    });

export { notDayOperations };
export default notDayReducer;
