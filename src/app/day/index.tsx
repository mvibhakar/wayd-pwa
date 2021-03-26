import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { S3Key } from "../../utils";
import { useSelectFromRedux } from "../../utils/hooks";
import { useDispatch } from "react-redux";

// components
import { ContentText } from "../../utils/ui-library";
import { Header } from "../_shared/Header";
import {
    AppContainer,
    Content,
    FAB,
    Card,
    CardHeader,
    ContentItemContainer,
    ListItemIcon,
    ListItemText,
    HabitListItemText,
    StreakContainer,
} from "../_shared/styled";
import { TaskTextContainer, TaskTimeContainer } from "./styled";
import firebase from "../../utils/firebase";
import { dayOperations } from "../../state/day";
import { cuserOperations } from "../../state/cuser";

var moment = require("moment");

export const Day = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const path = window.location.pathname;
    const rawDate = path.slice(-10);
    const formattedDate = moment(new Date(rawDate));
    const current = moment();
    const { events, tasks, habits, thoughts } = useSelectFromRedux((state) => state.cuser);
    const { habits_array } = useSelectFromRedux((state) => state.cuser.userProfile);
    const filteredEvents =
        events && events.filter((event: any) => moment(event.start_datetime.toDate()).isSame(formattedDate, "day"));
    const filteredTasks =
        tasks && tasks.filter((task: any) => moment(task.datetime.toDate()).isSame(formattedDate, "day"));
    const filteredHabits =
        habits && habits.filter((habit: any) => moment(habit.datetime.toDate()).isSame(formattedDate, "day"));
    const filteredThoughts =
        thoughts && thoughts.filter((thought: any) => moment(thought.datetime.toDate()).isSame(formattedDate, "day"));
    const noData =
        filteredEvents &&
        filteredEvents.length === 0 &&
        filteredTasks &&
        filteredTasks.length === 0 &&
        filteredHabits &&
        filteredHabits.length === 0 &&
        filteredThoughts &&
        filteredThoughts.length === 0;

    useEffect(() => {
        dispatch(cuserOperations.createTodaysHabits());
    }, [habits_array]);

    const getHeaderString = () => {
        const current = moment();
        const yesterday = moment().subtract(1, "days");
        const tomorrow = moment().add(1, "days");

        if (moment(formattedDate).isSame(current, "day")) {
            return "today";
        } else if (moment(formattedDate).isSame(yesterday, "day")) {
            return "yesterday";
        } else if (moment(formattedDate).isSame(tomorrow, "day")) {
            return "tomorrow";
        } else {
            return formattedDate.format("MMMM Do");
        }
    };

    const getFABAction = () => {
        history.push("/add-day-item");
    };

    const goToPreviousDay = () => {
        const previousDay = formattedDate.subtract(1, "days").toDate().toLocaleDateString("en-US");
        history.push("/day/" + previousDay);
    };

    const goToNextDay = () => {
        const nextDay = formattedDate.add(1, "days").toDate().toLocaleDateString("en-US");
        history.push("/day/" + nextDay);
    };

    const homeIconAction = () => {
        history.push("/");
    };

    const getStartEndTimeString = (
        startTime: firebase.firestore.Timestamp,
        endTime: firebase.firestore.Timestamp,
        isAllday: boolean
    ) => {
        if (isAllday) {
            return "All day";
        } else {
            const formattedStartTime = moment(startTime.toDate()).format("h:mma");
            const formattedEndTime = moment(endTime.toDate()).format("h:mma");
            return formattedStartTime + " - " + formattedEndTime;
        }
    };

    return (
        <AppContainer>
            <Header
                title={getHeaderString()}
                leftSideIcon="home-grey"
                leftSideIconAction={homeIconAction}
                rightSideLeftIcon="left-arrow-grey"
                rightSideLeftIconAction={goToPreviousDay}
                rightSideRightIcon="right-arrow-grey"
                rightSideRightIconAction={goToNextDay}
            />
            <Content>
                {noData && (
                    <Card style={{ background: "transparent", filter: "none" }}>
                        <ContentText
                            style={{ textTransform: "none", width: "100%", display: "flex", justifyContent: "center" }}
                        >
                            You have the day off!
                        </ContentText>
                    </Card>
                )}
                {filteredEvents && filteredEvents.length > 0 && (
                    <Card>
                        <CardHeader>schedule</CardHeader>
                        {filteredEvents &&
                            filteredEvents.length > 0 &&
                            filteredEvents.map((event: any) => (
                                <ContentItemContainer event={true} key={event.id}>
                                    <TaskTimeContainer>
                                        {getStartEndTimeString(
                                            event.start_datetime,
                                            event.end_datetime,
                                            event.is_allday
                                        )}
                                    </TaskTimeContainer>
                                    <TaskTextContainer>{event.content}</TaskTextContainer>
                                </ContentItemContainer>
                            ))}
                    </Card>
                )}
                {filteredTasks && filteredTasks.length > 0 && (
                    <Card>
                        <CardHeader>to-do</CardHeader>
                        {filteredTasks &&
                            filteredTasks.length > 0 &&
                            filteredTasks.map((task: any) => (
                                <ContentItemContainer key={task.id}>
                                    <ListItemIcon
                                        src={
                                            task.checked
                                                ? S3Key + "rect-checked-blue.png"
                                                : S3Key + "rect-unchecked-grey.png"
                                        }
                                        alt={task.checked ? "checked" : "unchecked"}
                                        onClick={() => dispatch(dayOperations.updateTaskChecked(task.id, task.checked))}
                                    />
                                    <ListItemText>{task.content}</ListItemText>
                                </ContentItemContainer>
                            ))}
                    </Card>
                )}
                {filteredHabits && filteredHabits.length > 0 && (
                    <Card>
                        <CardHeader>habits</CardHeader>
                        {filteredHabits &&
                            filteredHabits.length > 0 &&
                            filteredHabits.map((habit: any) => (
                                <ContentItemContainer key={habit.id}>
                                    <ListItemIcon
                                        src={
                                            habit.checked
                                                ? S3Key + "round-checked-orange.png"
                                                : S3Key + "round-unchecked-grey.png"
                                        }
                                        alt={habit.checked ? "checked" : "unchecked"}
                                        onClick={() => {
                                            if (moment(formattedDate).isSame(current, "day"))
                                                dispatch(dayOperations.updateHabitChecked(habit.id, habit.checked));
                                        }}
                                    />
                                    <HabitListItemText>
                                        <div>{habit.content}</div>
                                        <StreakContainer streak={habit.streak > 0 ? true : false}>
                                            <div>{habit.streak}</div>
                                            <img
                                                src={
                                                    habit.streak > 0
                                                        ? S3Key + "streak-orange.png"
                                                        : S3Key + "streak-grey.png"
                                                }
                                                alt={habit.streak > 0 ? "streak" : "no-streak"}
                                                width="20px"
                                            />
                                        </StreakContainer>
                                    </HabitListItemText>
                                </ContentItemContainer>
                            ))}
                    </Card>
                )}
                {filteredThoughts && filteredThoughts.length > 0 && (
                    <Card style={{ marginBottom: "0px" }}>
                        <CardHeader style={{ marginBottom: "10px" }}>thoughts</CardHeader>
                        {filteredThoughts &&
                            filteredThoughts.length > 0 &&
                            filteredThoughts.map((thought: any) => (
                                <ContentText key={thought.id} style={{ whiteSpace: "pre-line" }}>
                                    {thought.content}
                                </ContentText>
                            ))}
                    </Card>
                )}
            </Content>
            <FAB>
                <img src={S3Key + "plus-white.png"} alt="plus" width="36px" onClick={getFABAction} />
            </FAB>
        </AppContainer>
    );
};
