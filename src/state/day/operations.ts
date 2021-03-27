import moment from "moment";
import { useHistory } from "react-router-dom";
import { dayActions } from ".";
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
        start_datetime: formattedStartDateTime,
        end_datetime: formattedEndDateTime,
    };

    db.collection("events")
        .doc()
        .set(eventObject)
        .then(() => {
            dispatch(dayActions.resetAddDayItem());
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
};

export const updateEvent: PromiseOperation<void> = () => async (dispatch, getState) => {
    const state = getState();
    const db = firebase.firestore();

    const {
        addEventId,
        addDayItemContent,
        addDayItemDate,
        addEventIsAllDay,
        addEventStartTime,
        addEventEndTime,
    } = state.day;

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

    let eventUpdateObject: any = {
        content: addDayItemContent,
        is_allday: addEventIsAllDay,
        start_datetime: formattedStartDateTime,
        end_datetime: formattedEndDateTime,
    };

    db.collection("events")
        .doc(addEventId)
        .update(eventUpdateObject)
        .then(() => {
            dispatch(dayActions.resetAddDayItem());
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
};

export const deleteEvent: PromiseOperation<void> = () => async (dispatch, getState) => {
    const state = getState();
    const db = firebase.firestore();

    const { addEventId } = state.day;

    db.collection("events")
        .doc(addEventId)
        .delete()
        .then(() => {
            dispatch(dayActions.resetAddDayItem());
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
};

export const createTask: PromiseOperation<void> = () => async (dispatch, getState) => {
    const state = getState();
    const db = firebase.firestore();

    const { cuserId } = state.cuser;
    const { addDayItemContent, addDayItemDate } = state.day;

    const dateTimeString = moment(addDayItemDate)?.toString();
    const formattedDateTime = new firebase.firestore.Timestamp(Math.floor(Date.parse(dateTimeString) / 1000), 0);

    const taskObject = {
        uid: cuserId,
        content: addDayItemContent,
        datetime: formattedDateTime,
        checked: false,
    };

    db.collection("tasks")
        .doc()
        .set(taskObject)
        .then(() => {
            dispatch(dayActions.resetAddDayItem());
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
};

export const updateTask: PromiseOperation<void> = () => async (dispatch, getState) => {
    const state = getState();
    const db = firebase.firestore();

    const { addTaskId, addDayItemContent, addDayItemDate } = state.day;

    const dateTimeString = moment(addDayItemDate)?.toString();
    const formattedDateTime = new firebase.firestore.Timestamp(Math.floor(Date.parse(dateTimeString) / 1000), 0);

    const taskUpdateObject = {
        content: addDayItemContent,
        datetime: formattedDateTime,
    };

    db.collection("tasks")
        .doc(addTaskId)
        .update(taskUpdateObject)
        .then(() => {
            dispatch(dayActions.resetAddDayItem());
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
};

export const deleteTask: PromiseOperation<void> = () => async (dispatch, getState) => {
    const state = getState();
    const db = firebase.firestore();

    const { addTaskId } = state.day;

    db.collection("tasks")
        .doc(addTaskId)
        .delete()
        .then(() => {
            dispatch(dayActions.resetAddDayItem());
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
};

export const createThought: PromiseOperation<void> = () => async (dispatch, getState) => {
    const state = getState();
    const db = firebase.firestore();

    const { cuserId } = state.cuser;
    const { addDayItemContent, addDayItemDate } = state.day;

    const dateTimeString = moment(addDayItemDate)?.toString();
    let formattedDateTime = new firebase.firestore.Timestamp(Math.floor(Date.parse(dateTimeString) / 1000), 0);

    let thoughtObject = {
        uid: cuserId,
        content: addDayItemContent,
        datetime: formattedDateTime,
    };

    db.collection("thoughts")
        .doc()
        .set(thoughtObject)
        .then(() => {
            dispatch(dayActions.resetAddDayItem());
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
};

export const updateTaskChecked: PromiseOperation<void> = (docId: string, previouslyChecked: boolean) => async () => {
    const db = firebase.firestore();

    const taskObject = {
        checked: !previouslyChecked,
    };

    db.collection("tasks")
        .doc(docId)
        .update(taskObject)
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
};

export const updateHabitChecked: PromiseOperation<void> = (docId: string, previouslyChecked: boolean) => async () => {
    const db = firebase.firestore();

    const habitObject = {
        checked: !previouslyChecked,
    };

    db.collection("habits")
        .doc(docId)
        .update(habitObject)
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
};
