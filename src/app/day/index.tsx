import React from "react";
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

var moment = require("moment");

export const Day = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const path = window.location.pathname;
    const rawDate = path.slice(-10);
    const formattedDate = moment(new Date(rawDate));
    const { events, tasks, thoughts } = useSelectFromRedux((state) => state.cuser);
    const filteredEvents =
        events && events.filter((event: any) => moment(event.start_datetime.toDate()).isSame(formattedDate, "day"));
    const filteredTasks =
        tasks && tasks.filter((task: any) => moment(task.datetime.toDate()).isSame(formattedDate, "day"));
    const filteredThoughts =
        thoughts && thoughts.filter((thought: any) => moment(thought.datetime.toDate()).isSame(formattedDate, "day"));

    console.log(filteredTasks);

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
        const previousDay = formattedDate.subtract(1, "days").format("MM-DD-YYYY");
        history.push("/day/" + previousDay);
    };

    const goToNextDay = () => {
        const nextDay = formattedDate.add(1, "days").format("MM-DD-YYYY");
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
                <Card>
                    <CardHeader>schedule</CardHeader>
                    {/* <ContentItemContainer event={true}>
                        <TaskTimeContainer>7:00am - 8:00am</TaskTimeContainer>
                        <TaskTextContainer>Nullam nisl</TaskTextContainer>
                    </ContentItemContainer>
                    <ContentItemContainer event={true}>
                        <TaskTimeContainer>All day</TaskTimeContainer>
                        <TaskTextContainer>
                            Vesti bulum ornare, nisl nec malesuada hendrerit, erat elit fringilla eros, in auctor lacus
                        </TaskTextContainer>
                    </ContentItemContainer> */}
                    {filteredEvents &&
                        filteredEvents.length > 0 &&
                        filteredEvents.map((event: any) => (
                            <ContentItemContainer event={true} key={event.id}>
                                <TaskTimeContainer>
                                    {getStartEndTimeString(event.start_datetime, event.end_datetime, event.is_allday)}
                                </TaskTimeContainer>
                                <TaskTextContainer>{event.content}</TaskTextContainer>
                            </ContentItemContainer>
                        ))}
                </Card>
                <Card>
                    <CardHeader>to-do</CardHeader>
                    {/* <ContentItemContainer>
                        <ListItemIcon src={S3Key + "rect-unchecked-grey.png"} alt="unchecked" />
                        <ListItemText>
                            esti bulum ornare, nisl nec malesuada hendrerit, erat elit fringilla
                        </ListItemText>
                    </ContentItemContainer>
                    <ContentItemContainer>
                        <ListItemIcon src={S3Key + "rect-checked-blue.png"} alt="checked" />
                        <ListItemText>lobortis malesuada</ListItemText>
                    </ContentItemContainer> */}
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
                <Card>
                    <CardHeader>habits</CardHeader>
                    <ContentItemContainer>
                        <ListItemIcon src={S3Key + "round-checked-orange.png"} alt="checked" />
                        <HabitListItemText>
                            <div>libero</div>
                            <StreakContainer streak={true}>
                                <div>7</div>
                                <img src={S3Key + "streak-orange.png"} alt="streak" width="20px" />
                            </StreakContainer>
                        </HabitListItemText>
                    </ContentItemContainer>
                    <ContentItemContainer>
                        <ListItemIcon src={S3Key + "round-unchecked-grey.png"} alt="unchecked" />
                        <HabitListItemText>
                            <div>erat vitae mattis erat vitae mattis erat vitae</div>
                            <StreakContainer streak={true}>
                                <div>13</div>
                                <img src={S3Key + "streak-orange.png"} alt="streak" width="20px" />
                            </StreakContainer>
                        </HabitListItemText>
                    </ContentItemContainer>
                    <ContentItemContainer>
                        <ListItemIcon src={S3Key + "round-unchecked-grey.png"} alt="unchecked" />
                        <HabitListItemText>
                            <div>vitae efficitur</div>
                            <StreakContainer streak={false}>
                                <div>0</div>
                                <img src={S3Key + "streak-grey.png"} alt="streak" width="20px" />
                            </StreakContainer>
                        </HabitListItemText>
                    </ContentItemContainer>
                </Card>
                <Card style={{ marginBottom: "0px" }}>
                    <CardHeader style={{ marginBottom: "10px" }}>thoughts</CardHeader>
                    {filteredThoughts &&
                        filteredThoughts.length > 0 &&
                        filteredThoughts.map((thought: any) => (
                            <ContentText key={thought.id} style={{ whiteSpace: "pre-line" }}>
                                {thought.content}
                            </ContentText>
                        ))}
                    {filteredThoughts && filteredThoughts.length === 0 && (
                        <ContentText>No thoughts for today!</ContentText>
                    )}
                </Card>
            </Content>
            <FAB>
                <img src={S3Key + "plus-white.png"} alt="plus" width="36px" onClick={getFABAction} />
            </FAB>
        </AppContainer>
    );
};
