import moment from "moment";
import { Operation, PromiseOperation } from "..";
import firebase from "../../utils/firebase";

export const createList: PromiseOperation<void> = (listTitle, listItems) => async (dispatch, getState) => {
    const state = getState();
    const db = firebase.firestore();

    const { cuserId } = state.cuser;

    const formattedCurrentDateTime = new firebase.firestore.Timestamp(
        Math.floor(Date.parse(moment().toString()) / 1000),
        0
    );

    const listObject: any = {
        uid: cuserId,
        title: listTitle,
        created_at: formattedCurrentDateTime,
    };

    if (cuserId) {
        db.collection("lists")
            .doc(cuserId + formattedCurrentDateTime)
            .set(listObject)
            .then(() => {
                listItems.forEach((item: any) => {
                    let listItemObject: any = {
                        uid: cuserId,
                        list_id: cuserId + formattedCurrentDateTime,
                        content: item.value,
                        order: item.order,
                        checked: false,
                    };
                    db.collection("listItems")
                        .doc()
                        .set(listItemObject)
                        .catch((error) => {
                            console.error("Error writing document: ", error);
                        });
                });
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    }
};

export const createNote: PromiseOperation<void> = (noteTitle, noteContent) => async (dispatch, getState) => {
    const state = getState();
    const db = firebase.firestore();

    const { cuserId } = state.cuser;

    const formattedCurrentDateTime = new firebase.firestore.Timestamp(
        Math.floor(Date.parse(moment().toString()) / 1000),
        0
    );

    const noteObject: any = {
        uid: cuserId,
        title: noteTitle,
        content: noteContent,
        created_at: formattedCurrentDateTime,
    };

    if (cuserId) {
        db.collection("notes")
            .doc()
            .set(noteObject)
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    }
};

export const updateNote: PromiseOperation<void> = (docId, noteTitle, noteContent) => async () => {
    const db = firebase.firestore();

    const noteUpdateObject: any = {
        title: noteTitle,
        content: noteContent,
    };

    db.collection("notes")
        .doc(docId)
        .update(noteUpdateObject)
        .then(() => {
            // dispatch(dayActions.resetAddDayItem());
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
};

export const deleteNote: PromiseOperation<void> = (docId) => async () => {
    const db = firebase.firestore();

    db.collection("notes")
        .doc(docId)
        .delete()
        .then(() => {
            // dispatch(dayActions.resetAddDayItem());
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
};

export const createHabit: PromiseOperation<void> = (habitContent) => async (dispatch, getState) => {
    const state = getState();
    const db = firebase.firestore();
    const { cuserId } = state.cuser;
    const { habits_array } = state.cuser.userProfile;

    const habitsCopy = [...habits_array];
    const newHabits = habitsCopy.concat(habitContent);

    const habitsArrayObject: any = {
        habits_array: newHabits,
    };

    if (cuserId) {
        db.collection("users")
            .doc(cuserId)
            .update(habitsArrayObject)
            .catch((error: any) => {
                console.error("Error writing document: ", error);
            });
    }
};

export const updateHabit: PromiseOperation<void> = (habitContent) => async (dispatch, getState) => {
    const state = getState();
    const db = firebase.firestore();
    const { cuserId } = state.cuser;
    const { habits_array } = state.cuser.userProfile;
    const { addHabitId, addHabitIndex, addHabitStreak, addHabitChecked } = state.notDay;

    const formattedCurrentDateTime = new firebase.firestore.Timestamp(
        Math.floor(Date.parse(moment().toString()) / 1000),
        0
    );

    const habitsCopy = [...habits_array];
    habitsCopy[addHabitIndex] = habitContent;

    const habitsArrayUpdateObject: any = {
        habits_array: habitsCopy,
    };

    if (cuserId) {
        db.collection("users")
            .doc(cuserId)
            .update(habitsArrayUpdateObject)
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    }

    const habitObject: any = {
        uid: cuserId,
        content: habitContent,
        datetime: formattedCurrentDateTime,
        checked: addHabitChecked,
        streak: addHabitStreak,
    };

    if (cuserId) {
        db.collection("habits")
            .doc()
            .set(habitObject)
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    }

    db.collection("habits")
        .doc(addHabitId)
        .delete()
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
};

export const deleteHabit: PromiseOperation<void> = (habitContent) => async (dispatch, getState) => {
    const state = getState();
    const db = firebase.firestore();
    const { cuserId } = state.cuser;
    const { habits_array } = state.cuser.userProfile;
    const { addHabitId, addHabitIndex } = state.notDay;

    const habitsCopy = [...habits_array];
    habitsCopy.splice(addHabitIndex, 1);

    const habitsArrayUpdateObject: any = {
        habits_array: habitsCopy,
    };

    if (cuserId) {
        db.collection("users")
            .doc(cuserId)
            .update(habitsArrayUpdateObject)
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    }

    db.collection("habits")
        .doc(addHabitId)
        .delete()
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
};

export const updateListItemChecked: PromiseOperation<void> = (
    docId: string,
    previouslyChecked: boolean
) => async () => {
    const db = firebase.firestore();

    const listItemObject = {
        checked: !previouslyChecked,
    };

    db.collection("listItems")
        .doc(docId)
        .update(listItemObject)
        .then(() => {
            // dispatch(dayActions.resetAddDayItem());
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
};
