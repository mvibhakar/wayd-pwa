import { title } from "process";
import { Operation } from "..";
import firebase from "../../utils/firebase";

export const createEvent: Operation = () => async (dispatch, getState) => {
    const state = getState();
    const db = firebase.firestore();

    const { cuserId } = state.cuser;

    db.collection("events")
        .doc()
        .set({
            uid: cuserId,
            title: title,
            // start_time: formattedStartTime,
            // end_time: formattedEndTime,
            // is_allday: isAllDay,
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
};
