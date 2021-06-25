import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { defaultOptions, S3Key } from "../../utils";
import { useSelectFromRedux } from "../../utils/hooks";
import { useDispatch } from "react-redux";
import { useSwipeable } from "react-swipeable";

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
    LoadingContainer,
    CardContainer,
    ContentContainer,
    DrawerHeader,
    Drawer,
    WaydLogo,
    LinkSection,
} from "../_shared/styled";
import { TaskTextContainer, TaskTimeContainer, ThoughtText } from "./styled";
import firebase from "../../utils/firebase";
import { dayActions, dayOperations } from "../../state/day";
import { cuserOperations } from "../../state/cuser";
import Lottie from "react-lottie";
import { useRequireAuth } from "../_shared/FirebaseAuthProvider";
import { Calendar } from "../home/styled";
import { SidebarIconLink } from "../_shared/SidebarIconLink";
import { Sidebar } from "../_shared/Sidebar";
import Masonry from "react-masonry-css";
var moment = require("moment");

const breakpointColumnsObj = {
    default: 2,
    800: 1,
};

export const Day = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const requireAuth = useRequireAuth();
    const path = window.location.pathname;
    const rawDate = path.slice(-10);
    const formattedDate = moment(new Date(rawDate));
    const current = moment();
    const remainder = 30 - (moment().minute() % 30);
    // const [calendarValue, updateCalendarValue] = useState<moment.Moment>(moment());
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
    const handlers = useSwipeable({
        onSwipedLeft: () => goToNextDay(),
        onSwipedRight: () => goToPreviousDay(),
        trackMouse: true,
    });

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
            return formattedDate.format("MMM Do");
        }
    };

    const getFABAction = () => {
        dispatch(dayActions.resetAddDayItem());
        history.push("/add-day-item");
        dispatch(dayActions.updateAddDayItemDate(formattedDate));
        dispatch(dayActions.updateAddEventStartTime(moment().add(remainder, "minutes")));
        dispatch(dayActions.updateAddEventEndTime(moment().add(remainder + 60, "minutes")));
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

    const updateEvent = (
        eventId: string,
        eventContent: string,
        startDateTime: firebase.firestore.Timestamp,
        endDateTime: firebase.firestore.Timestamp,
        isAllday: boolean
    ) => {
        dispatch(dayActions.updateAddEventId(eventId));
        dispatch(dayActions.updateAddDayItemContent(eventContent));
        dispatch(dayActions.updateAddDayItemDate(moment(startDateTime.toDate())));
        dispatch(dayActions.updateAddEventStartTime(moment(startDateTime.toDate())));
        dispatch(dayActions.updateAddEventEndTime(moment(endDateTime.toDate())));
        dispatch(dayActions.updateAddEventIsAllDay(isAllday));
        history.push("/add-day-item");
    };

    const updateTask = (taskId: string, taskContent: string, taskDateTime: firebase.firestore.Timestamp) => {
        dispatch(dayActions.updateAddDayItemSetting("to-do"));
        dispatch(dayActions.updateAddTaskId(taskId));
        dispatch(dayActions.updateAddDayItemContent(taskContent));
        dispatch(dayActions.updateAddDayItemDate(moment(taskDateTime.toDate())));
        history.push("/add-day-item");
    };

    const updateThought = (
        thoughtId: string,
        thoughtContent: string,
        thoughtDateTime: firebase.firestore.Timestamp
    ) => {
        dispatch(dayActions.updateAddDayItemSetting("thought"));
        dispatch(dayActions.updateAddThoughtId(thoughtId));
        dispatch(dayActions.updateAddDayItemContent(thoughtContent));
        dispatch(dayActions.updateAddDayItemDate(moment(thoughtDateTime.toDate())));
        history.push("/add-day-item");
    };

    if (!requireAuth.user) {
        return (
            <LoadingContainer>
                <Lottie options={defaultOptions} height={400} width={400} />
            </LoadingContainer>
        );
    } else {
        return (
            <>
                <AppContainer className="noselect">
                    <ContentContainer>
                        <Header
                            title={getHeaderString()}
                            leftSideIcon="home-grey"
                            leftSideIconAction={homeIconAction}
                            rightSideLeftIcon="left-arrow-grey"
                            rightSideLeftIconAction={goToPreviousDay}
                            rightSideRightIcon="right-arrow-grey"
                            rightSideRightIconAction={goToNextDay}
                        />
                        <Content {...handlers}>
                            <Masonry
                                breakpointCols={breakpointColumnsObj}
                                className="my-masonry-grid"
                                columnClassName="my-masonry-grid_column"
                            >
                                {noData && (
                                    <Card style={{ background: "transparent", filter: "none" }}>
                                        <ContentText
                                            style={{
                                                textTransform: "none",
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
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
                                                <ContentItemContainer
                                                    event={true}
                                                    key={event.id}
                                                    onClick={() =>
                                                        updateEvent(
                                                            event.id,
                                                            event.content,
                                                            event.start_datetime,
                                                            event.end_datetime,
                                                            event.is_allday
                                                        )
                                                    }
                                                >
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
                                                        onClick={() =>
                                                            dispatch(
                                                                dayOperations.updateTaskChecked(task.id, task.checked)
                                                            )
                                                        }
                                                    />
                                                    <ListItemText
                                                        onClick={() => updateTask(task.id, task.content, task.datetime)}
                                                    >
                                                        {task.content}
                                                    </ListItemText>
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
                                                                dispatch(
                                                                    dayOperations.updateHabitChecked(
                                                                        habit.id,
                                                                        habit.checked
                                                                    )
                                                                );
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
                                                <ThoughtText
                                                    key={thought.id}
                                                    onClick={() =>
                                                        updateThought(thought.id, thought.content, thought.datetime)
                                                    }
                                                >
                                                    {thought.content}
                                                </ThoughtText>
                                            ))}
                                    </Card>
                                )}
                            </Masonry>
                        </Content>
                    </ContentContainer>
                    <FAB>
                        <img src={S3Key + "plus-white.png"} alt="plus" width="36px" onClick={getFABAction} />
                    </FAB>
                </AppContainer>
            </>
        );
    }
};
