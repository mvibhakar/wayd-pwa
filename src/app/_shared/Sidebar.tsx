import React from "react";
import { lightBeige, S3Key } from "../../utils";
import { AppHeader } from "../../utils/ui-library";
import styled from "styled-components";
import { Drawer, DrawerHeader, LinkSection, WaydLogo } from "./styled";
import { Calendar } from "../home/styled";
import { SidebarIconLink } from "./SidebarIconLink";
import { useHistory } from "react-router-dom";
import { Moment } from "moment";
var moment = require("moment");

export const Sidebar = () => {
    const history = useHistory();

    const getArrowImage = (side: string) => {
        if (side === "left") {
            return <img src={S3Key + "left-arrow-grey.png"} alt="left-arrow" width="18px" />;
        } else {
            return <img src={S3Key + "right-arrow-grey.png"} alt="right-arrow" width="18px" />;
        }
    };

    const onDayClick = (value: Date) => {
        // const momentDate = moment(value).format("MM-DD-YYYY");
        const momentDate = moment(value).toDate().toLocaleDateString("en-US");
        history.push("/day/" + momentDate);
    };

    return (
        <Drawer
            placement="left"
            closable={false}
            visible={window.innerWidth > 1000 ? true : false}
            width="400px"
            mask={false}
        >
            <DrawerHeader>
                <WaydLogo src={S3Key + "wayd-logo.png"} alt="wayd-logo" />
            </DrawerHeader>
            <Calendar
                next2Label={null}
                prev2Label={null}
                minDetail="month"
                nextLabel={getArrowImage("right")}
                prevLabel={getArrowImage("left")}
                // value={calendarValue.toDate()}
                onClickDay={(value) => onDayClick(value)}
            />
            <SidebarIconLink icon="list-grey" text="Lists" path="/lists" />
            <SidebarIconLink icon="notes-grey" text="Notes" path="/notes" />
            <SidebarIconLink icon="streak-grey" text="Habits" path="/habits" />
            <LinkSection>
                <SidebarIconLink icon="add-day-item-grey" text="Add To Your Day" path="/add-day-item" />
                <SidebarIconLink icon="plus-grey" text="Add List" path="/add-list" />
                <SidebarIconLink icon="plus-grey" text="Add Note" path="/add-note" />
            </LinkSection>
            <LinkSection>
                <SidebarIconLink icon="settings-grey" text="Settings" path="" />
            </LinkSection>
        </Drawer>
    );
};
