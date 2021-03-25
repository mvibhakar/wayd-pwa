import { produce } from "immer";
import { payloadAction, actionFactory, ActionUnion, simpleAction } from "reductser";
import * as notDayOperations from "./operations";
var moment = require("moment-timezone");

// const actionMap = {
//     updateAddDayItemSetting: payloadAction<"event" | "task" | "thought">(),
//     updateAddDayItemContent: payloadAction<string | undefined>(),
//     updateAddDayItemDate: payloadAction<moment.Moment | null>(),
//     updateAddEventIsAllDay: payloadAction<boolean>(),
//     updateAddEventStartTime: payloadAction<moment.Moment | null>(),
//     updateAddEventEndTime: payloadAction<moment.Moment | null>(),
//     resetAddDayItem: simpleAction(),
// };

// export const dayActions = actionFactory(actionMap, "DAY");

// export type DayAction = ActionUnion<typeof dayActions>;

// export interface DayState {
//     addDayItemSetting: "event" | "task" | "thought";
//     addDayItemContent: string | undefined;
//     addDayItemDate: moment.Moment | null;
//     addEventIsAllDay: boolean;
//     addEventStartTime: moment.Moment | null;
//     addEventEndTime: moment.Moment | null;
// }

// const remainder = 30 - (moment().minute() % 30);

// export const getInitialState = (): DayState => ({
//     addDayItemSetting: "event",
//     addDayItemContent: undefined,
//     addDayItemDate: moment(),
//     addEventIsAllDay: false,
//     addEventStartTime: moment().add(remainder, "minutes"),
//     addEventEndTime: moment().add(remainder + 60, "minutes"),
// });

// const dayReducer = (state = getInitialState(), action: DayAction) =>
//     produce(state, (draftState) => {
//         if (action.reducer === "DAY") {
//             switch (action.type) {
//                 case "updateAddDayItemSetting":
//                     draftState.addDayItemSetting = action.payload;
//                     break;
//                 case "updateAddDayItemContent":
//                     draftState.addDayItemContent = action.payload;
//                     break;
//                 case "updateAddDayItemDate":
//                     draftState.addDayItemDate = action.payload;
//                     break;
//                 case "updateAddEventIsAllDay":
//                     draftState.addEventIsAllDay = action.payload;
//                     break;
//                 case "updateAddEventStartTime":
//                     draftState.addEventStartTime = action.payload;
//                     break;
//                 case "updateAddEventEndTime":
//                     draftState.addEventEndTime = action.payload;
//                     break;
//                 case "resetAddDayItem":
//                     draftState.addDayItemSetting = getInitialState().addDayItemSetting;
//                     draftState.addDayItemContent = getInitialState().addDayItemContent;
//                     draftState.addDayItemDate = getInitialState().addDayItemDate;
//                     draftState.addEventIsAllDay = getInitialState().addEventIsAllDay;
//                     draftState.addEventStartTime = getInitialState().addEventStartTime;
//                     draftState.addEventEndTime = getInitialState().addEventEndTime;
//                     break;
//                 default:
//                     break;
//             }
//         }
//     });

export { notDayOperations };
// export default dayReducer;