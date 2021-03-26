import { AntAnchor } from "antd/lib/anchor/Anchor";
import { produce } from "immer";
import { payloadAction, actionFactory, ActionUnion, simpleAction } from "reductser";
import * as cuserOperations from "./operations";

const actionMap = {
    updateCuserId: payloadAction<string | null>(),
    updateEvents: payloadAction<any | null>(),
    updateListItems: payloadAction<any | null>(),
    updateLists: payloadAction<any | null>(),
    updateNotes: payloadAction<any | null>(),
    updateTasks: payloadAction<any | null>(),
    updateThoughts: payloadAction<any | null>(),
    updateHabits: payloadAction<any | null>(),
    updateUserProfile: payloadAction<any | null>(),
};

export const cuserActions = actionFactory(actionMap, "CUSER");

export type CuserAction = ActionUnion<typeof cuserActions>;

// space to describe specific types of actions

export interface CuserState {
    cuserId: string | null;
    events: any;
    listItems: any;
    lists: any;
    notes: any;
    tasks: any;
    thoughts: any;
    habits: any;
    userProfile: {
        email: any;
        habits_array: any;
        uid: any;
        userPreferences: any;
    };
}

export const getInitialState = (): CuserState => ({
    cuserId: null,
    events: null,
    listItems: null,
    lists: null,
    notes: null,
    tasks: null,
    thoughts: null,
    habits: null,
    userProfile: {
        email: null,
        habits_array: null,
        uid: null,
        userPreferences: null,
    },
});

const cuserReducer = (state = getInitialState(), action: CuserAction) =>
    produce(state, (draftState) => {
        if (action.reducer === "CUSER") {
            switch (action.type) {
                case "updateCuserId":
                    draftState.cuserId = action.payload;
                    break;
                case "updateEvents":
                    draftState.events = action.payload;
                    break;
                case "updateListItems":
                    draftState.listItems = action.payload;
                    break;
                case "updateLists":
                    draftState.lists = action.payload;
                    break;
                case "updateNotes":
                    draftState.notes = action.payload;
                    break;
                case "updateTasks":
                    draftState.tasks = action.payload;
                    break;
                case "updateThoughts":
                    draftState.thoughts = action.payload;
                    break;
                case "updateHabits":
                    draftState.habits = action.payload;
                    break;
                case "updateUserProfile":
                    draftState.userProfile = action.payload;
                    break;
                default:
                    break;
                // unreachableCode(action);
            }
        }
    });

export { cuserOperations };
export default cuserReducer;
