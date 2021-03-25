import { cuserActions } from ".";
// import { dayActions } from ".";
import { PromiseOperation } from "..";
import firebase from "../../utils/firebase";

export const loadData: PromiseOperation<void> = (cuserId) => async (dispatch, getState) => {
    const db = firebase.firestore();

    db.collection("events")
        .where("uid", "==", cuserId)
        .get()
        .then((querySnapshot) => {
            let events = Array.from(
                new Set(
                    querySnapshot.docs.map((d: any) => ({
                        id: d.id,
                        ...d.data(),
                    }))
                )
            );
            dispatch(cuserActions.updateEvents(events));
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

    db.collection("listItems")
        .where("uid", "==", cuserId)
        .get()
        .then((querySnapshot) => {
            let listItems = Array.from(
                new Set(
                    querySnapshot.docs.map((d: any) => ({
                        id: d.id,
                        ...d.data(),
                    }))
                )
            );
            dispatch(cuserActions.updateListItems(listItems));
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

    db.collection("lists")
        .where("uid", "==", cuserId)
        .get()
        .then((querySnapshot) => {
            let lists = Array.from(
                new Set(
                    querySnapshot.docs.map((d: any) => ({
                        id: d.id,
                        ...d.data(),
                    }))
                )
            );
            dispatch(cuserActions.updateLists(lists));
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

    db.collection("notes")
        .where("uid", "==", cuserId)
        .get()
        .then((querySnapshot) => {
            let notes = Array.from(
                new Set(
                    querySnapshot.docs.map((d: any) => ({
                        id: d.id,
                        ...d.data(),
                    }))
                )
            );
            dispatch(cuserActions.updateNotes(notes));
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

    db.collection("tasks")
        .where("uid", "==", cuserId)
        .get()
        .then((querySnapshot) => {
            let tasks = Array.from(
                new Set(
                    querySnapshot.docs.map((d: any) => ({
                        id: d.id,
                        ...d.data(),
                    }))
                )
            );
            dispatch(cuserActions.updateTasks(tasks));
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

    db.collection("thoughts")
        .where("uid", "==", cuserId)
        .get()
        .then((querySnapshot) => {
            let thoughts = Array.from(
                new Set(
                    querySnapshot.docs.map((d: any) => ({
                        id: d.id,
                        ...d.data(),
                    }))
                )
            );
            dispatch(cuserActions.updateThoughts(thoughts));
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
};
