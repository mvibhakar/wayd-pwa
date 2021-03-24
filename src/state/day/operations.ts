import moment from "moment";
import { Operation, PromiseOperation } from "..";
import firebase from "../../utils/firebase";

interface Event {
    uid: string | null;
    content: string | undefined;
    is_allday: boolean;
    start_datetime?: firebase.firestore.Timestamp;
    end_datetime?: firebase.firestore.Timestamp;
}

export const createEvent: PromiseOperation<void> = () => async (dispatch, getState) => {
    const state = getState();
    const db = firebase.firestore();

    const { cuserId } = state.cuser;
    const { addDayItemContent, addDayItemDate, addEventIsAllDay, addEventStartTime, addEventEndTime } = state.day;

    const combinedStartDateTime = moment(
        addDayItemDate?.format("DD/MM/YYYY") + " " + addEventStartTime?.format("HH:mm"),
        "DD/MM/YYYY HH:mm"
    ).toString();
    const combinedEndDateTime = moment(
        addDayItemDate?.format("DD/MM/YYYY") + " " + addEventEndTime?.format("HH:mm"),
        "DD/MM/YYYY HH:mm"
    ).toString();

    let formattedStartDateTime = new firebase.firestore.Timestamp(
        Math.floor(Date.parse(combinedStartDateTime) / 1000),
        0
    );
    let formattedEndDateTime = new firebase.firestore.Timestamp(Math.floor(Date.parse(combinedEndDateTime) / 1000), 0);

    let eventObject: Event = {
        uid: cuserId,
        content: addDayItemContent,
        is_allday: addEventIsAllDay,
    };

    if (!addEventIsAllDay) {
        eventObject.start_datetime = formattedStartDateTime;
        eventObject.end_datetime = formattedEndDateTime;
    }

    db.collection("events")
        .doc()
        .set(eventObject)
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
};
