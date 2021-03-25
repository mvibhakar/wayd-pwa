import { cuserActions } from ".";
// import { dayActions } from ".";
import { PromiseOperation } from "..";
import firebase from "../../utils/firebase";

export const loadData: PromiseOperation<void> = (cuserId) => async (dispatch, getState) => {
    const db = firebase.firestore();

    db.collection("events")
        .where("uid", "==", cuserId)
        .orderBy("is_allday", "desc")
        .orderBy("start_datetime")
        .orderBy("end_datetime")
        .onSnapshot((querySnapshot) => {
            let events = Array.from(
                new Set(
                    querySnapshot.docs.map((d: any) => ({
                        id: d.id,
                        ...d.data(),
                    }))
                )
            );
            dispatch(cuserActions.updateEvents(events));
        });

    db.collection("listItems")
        .where("uid", "==", cuserId)
        .orderBy("order")
        .onSnapshot((querySnapshot) => {
            let listItems = Array.from(
                new Set(
                    querySnapshot.docs.map((d: any) => ({
                        id: d.id,
                        ...d.data(),
                    }))
                )
            );
            dispatch(cuserActions.updateListItems(listItems));
        });

    db.collection("lists")
        .where("uid", "==", cuserId)
        .onSnapshot((querySnapshot) => {
            let lists = Array.from(
                new Set(
                    querySnapshot.docs.map((d: any) => ({
                        id: d.id,
                        ...d.data(),
                    }))
                )
            );
            dispatch(cuserActions.updateLists(lists));
        });

    db.collection("notes")
        .where("uid", "==", cuserId)
        .orderBy("created_at", "desc")
        .onSnapshot((querySnapshot) => {
            let notes = Array.from(
                new Set(
                    querySnapshot.docs.map((d: any) => ({
                        id: d.id,
                        ...d.data(),
                    }))
                )
            );
            dispatch(cuserActions.updateNotes(notes));
        });

    db.collection("tasks")
        .where("uid", "==", cuserId)
        .orderBy("datetime")
        .onSnapshot((querySnapshot) => {
            let tasks = Array.from(
                new Set(
                    querySnapshot.docs.map((d: any) => ({
                        id: d.id,
                        ...d.data(),
                    }))
                )
            );
            dispatch(cuserActions.updateTasks(tasks));
        });

    db.collection("thoughts")
        .where("uid", "==", cuserId)
        .onSnapshot((querySnapshot) => {
            let thoughts = Array.from(
                new Set(
                    querySnapshot.docs.map((d: any) => ({
                        id: d.id,
                        ...d.data(),
                    }))
                )
            );
            dispatch(cuserActions.updateThoughts(thoughts));
        });
};
