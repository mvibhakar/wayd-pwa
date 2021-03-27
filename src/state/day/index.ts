import { produce } from "immer";
import { payloadAction, actionFactory, ActionUnion, simpleAction } from "reductser";
import * as dayOperations from "./operations";
var moment = require("moment-timezone");

const actionMap = {
    updateAddDayItemSetting: payloadAction<"event" | "to-do" | "thought">(),
    updateAddDayItemContent: payloadAction<string>(),
    updateAddDayItemDate: payloadAction<moment.Moment | null>(),
    updateAddEventIsAllDay: payloadAction<boolean>(),
    updateAddEventStartTime: payloadAction<moment.Moment | null>(),
    updateAddEventEndTime: payloadAction<moment.Moment | null>(),
    resetAddDayItem: simpleAction(),
    updateAddEventId: payloadAction<string>(),
    updateAddTaskId: payloadAction<string>(),
    updateAddThoughtId: payloadAction<string>(),
};

export const dayActions = actionFactory(actionMap, "DAY");

export type DayAction = ActionUnion<typeof dayActions>;

export interface DayState {
    addDayItemSetting: "event" | "to-do" | "thought";
    addEventId: string;
    addTaskId: string;
    addThoughtId: string;
    addDayItemContent: string;
    addDayItemDate: moment.Moment | null;
    addEventIsAllDay: boolean;
    addEventStartTime: moment.Moment | null;
    addEventEndTime: moment.Moment | null;
}

const remainder = 30 - (moment().minute() % 30);

export const getInitialState = (): DayState => ({
    addDayItemSetting: "event",
    addEventId: "",
    addTaskId: "",
    addThoughtId: "",
    addDayItemContent: "",
    addDayItemDate: moment(),
    addEventIsAllDay: false,
    addEventStartTime: moment().add(remainder, "minutes"),
    addEventEndTime: moment().add(remainder + 60, "minutes"),
});

const dayReducer = (state = getInitialState(), action: DayAction) =>
    produce(state, (draftState) => {
        if (action.reducer === "DAY") {
            switch (action.type) {
                case "updateAddDayItemSetting":
                    draftState.addDayItemSetting = action.payload;
                    break;
                case "updateAddDayItemContent":
                    draftState.addDayItemContent = action.payload;
                    break;
                case "updateAddDayItemDate":
                    draftState.addDayItemDate = action.payload;
                    break;
                case "updateAddEventIsAllDay":
                    draftState.addEventIsAllDay = action.payload;
                    break;
                case "updateAddEventStartTime":
                    draftState.addEventStartTime = action.payload;
                    break;
                case "updateAddEventEndTime":
                    draftState.addEventEndTime = action.payload;
                    break;
                case "resetAddDayItem":
                    draftState.addDayItemSetting = getInitialState().addDayItemSetting;
                    draftState.addDayItemContent = getInitialState().addDayItemContent;
                    draftState.addDayItemDate = moment();
                    draftState.addEventIsAllDay = getInitialState().addEventIsAllDay;
                    draftState.addEventStartTime = moment().add(remainder, "minutes");
                    draftState.addEventEndTime = moment().add(remainder + 60, "minutes");
                    draftState.addEventId = getInitialState().addEventId;
                    draftState.addTaskId = getInitialState().addTaskId;
                    draftState.addThoughtId = getInitialState().addThoughtId;
                    break;
                case "updateAddEventId":
                    draftState.addEventId = action.payload;
                    break;
                case "updateAddTaskId":
                    draftState.addTaskId = action.payload;
                    break;
                case "updateAddThoughtId":
                    draftState.addThoughtId = action.payload;
                    break;
                default:
                    break;
            }
        }
    });

export { dayOperations };
export default dayReducer;
