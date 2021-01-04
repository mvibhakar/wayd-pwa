import React from "react";
import { useHistory } from "react-router-dom";
import { S3Key } from "../../utils";

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
} from "../_shared/styled";
import { TaskTextContainer, TaskTimeContainer } from "./styled";
var moment = require("moment");

export const Day = () => {
    const history = useHistory();
    const path = window.location.pathname;
    const rawDate = path.slice(-10);
    const formattedDate = moment(new Date(rawDate));

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
                    <ContentItemContainer event={true}>
                        <TaskTimeContainer>7:00am - 8:00am</TaskTimeContainer>
                        <TaskTextContainer>Nullam nisl</TaskTextContainer>
                    </ContentItemContainer>
                    <ContentItemContainer event={true}>
                        <TaskTimeContainer>10:00pm - 10:30pm</TaskTimeContainer>
                        <TaskTextContainer>
                            Vesti bulum ornare, nisl nec malesuada hendrerit, erat elit fringilla eros, in auctor lacus
                        </TaskTextContainer>
                    </ContentItemContainer>
                </Card>
                <Card>
                    <CardHeader>to-do</CardHeader>
                    <ContentItemContainer>
                        <ListItemIcon src={S3Key + "rect-unchecked-grey.png"} alt="unchecked" />
                        <ListItemText>quis ligula ultricies</ListItemText>
                    </ContentItemContainer>
                    <ContentItemContainer>
                        <ListItemIcon src={S3Key + "rect-checked-blue.png"} alt="checked" />
                        <ListItemText>lobortis malesuada</ListItemText>
                    </ContentItemContainer>
                </Card>
                <Card>
                    <CardHeader>habits</CardHeader>
                    <ContentItemContainer>
                        <ListItemIcon src={S3Key + "round-checked-orange.png"} alt="checked" />
                        <ListItemText>libero</ListItemText>
                    </ContentItemContainer>
                    <ContentItemContainer>
                        <ListItemIcon src={S3Key + "round-unchecked-grey.png"} alt="unchecked" />
                        <ListItemText>erat vitae mattis</ListItemText>
                    </ContentItemContainer>
                </Card>
                <Card style={{ marginBottom: "0px" }}>
                    <CardHeader style={{ marginBottom: "10px" }}>thoughts</CardHeader>
                    <ContentText>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor hutnke fnjnks plifthar sit
                        amet, consectetur adipisicing elit, sed do eiusmod. Donec vitae tristique erat. Mauris at lorem
                        sed ipsum pharetra tristique in a lectus. Proin sapien elit, dictum sed massa ut, auctor sodales
                        lacus. Suspendisse potenti.
                    </ContentText>
                </Card>
            </Content>
            <FAB>
                <img src={S3Key + "plus-white.png"} alt="plus" width="36px" onClick={getFABAction} />
            </FAB>
        </AppContainer>
    );
};
