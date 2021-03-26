import { cuserActions, cuserOperations } from ".";
// import { dayActions } from ".";
import { PromiseOperation } from "..";
import firebase from "../../utils/firebase";
var moment = require("moment");

export const loadData: PromiseOperation<void> = (cuserId) => async (dispatch, getState) => {
    const db = firebase.firestore();

    db.collection("users")
        .where("uid", "==", cuserId)
        .onSnapshot((querySnapshot) => {
            let user = querySnapshot.docs.map((d: any) => ({
                id: d.id,
                ...d.data(),
            }));
            dispatch(cuserActions.updateUserProfile(user[0]));
        });

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

    db.collection("habits")
        .where("uid", "==", cuserId)
        .orderBy("streak", "desc")
        .onSnapshot((querySnapshot) => {
            let habits = Array.from(
                new Set(
                    querySnapshot.docs.map((d: any) => ({
                        id: d.id,
                        ...d.data(),
                    }))
                )
            );
            dispatch(cuserActions.updateHabits(habits));
        });

    dispatch(cuserOperations.createTodaysHabits());
};

export const createTodaysHabits: PromiseOperation<void> = () => async (dispatch, getState) => {
    const db = firebase.firestore();
    const state = getState();
    const current = moment();
    const yesterday = moment().subtract(1, "days");

    const { cuserId } = state.cuser;
    const habitsArray = state.cuser.userProfile.habits_array;
    const { habits } = state.cuser;
    const formattedCurrentDateTime = new firebase.firestore.Timestamp(
        Math.floor(Date.parse(moment().toString()) / 1000),
        0
    );

    if (habitsArray && habitsArray.length > 0) {
        habitsArray.forEach((habit_string: any) => {
            const yesterdaysHabit =
                habits &&
                habits
                    .filter((habit: any) => habit.content === habit_string)
                    .filter((habit: any) => moment(habit.datetime.toDate()).isSame(yesterday, "day"));
            let yesterdaysStreak = 0;
            if (yesterdaysHabit && yesterdaysHabit.length > 0) {
                yesterdaysStreak = yesterdaysHabit[0].streak + 1;
            }

            if (
                habits &&
                habits
                    .filter((habit: any) => habit.content === habit_string)
                    .filter((habit: any) => moment(habit.datetime.toDate()).isSame(current, "day")).length === 0
            ) {
                const habitObject: any = {
                    uid: cuserId,
                    content: habit_string,
                    datetime: formattedCurrentDateTime,
                    checked: false,
                    streak: yesterdaysStreak,
                };

                if (cuserId) {
                    db.collection("habits")
                        .doc()
                        .set(habitObject)
                        .catch((error) => {
                            console.error("Error writing document: ", error);
                        });
                }
            }
        });
    }
};
