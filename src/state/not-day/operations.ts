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