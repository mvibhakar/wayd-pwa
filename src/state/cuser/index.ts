import { produce } from "immer";
import { payloadAction, actionFactory, ActionUnion, simpleAction } from "reductser";
// import * as teamsOperations from "./operations";

const actionMap = {
    updateCuserId: payloadAction<string | null>(),
};

export const cuserActions = actionFactory(actionMap, "CUSER");

export type CuserAction = ActionUnion<typeof cuserActions>;

// space to describe specific types of actions

export interface CuserState {
    cuserId: string | null;
}

export const getInitialState = (): CuserState => ({
    cuserId: null,
});

const cuserReducer = (state = getInitialState(), action: CuserAction) =>
    produce(state, (draftState) => {
        if (action.reducer === "CUSER") {
            switch (action.type) {
                case "updateCuserId":
                    draftState.cuserId = action.payload;
                    break;
                default:
                    break;
                // unreachableCode(action);
            }
        }
    });

// export { teamsOperations };
export default cuserReducer;
