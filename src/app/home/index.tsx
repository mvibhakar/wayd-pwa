import React from "react";
import "react-calendar/dist/Calendar.css";
import { S3Key } from "../../utils";
import { useHistory } from "react-router-dom";

// components
import { Header } from "../_shared/Header";
import { MenuButton } from "./MenuButton";
import { Calendar } from "./styled";
import { FAB, Content, AppContainer } from "../_shared/styled";
var moment = require("moment");

export default () => {
    const history = useHistory();

    const onDayClick = (value: Date) => {
        const momentDate = moment(value).format("MM-DD-YYYY");
        history.push("/day/" + momentDate);
    };

    const getArrowImage = (side: string) => {
        if (side === "left") {
            return <img src={S3Key + "left-arrow-grey.png"} alt="left-arrow" width="18px" />;
        } else {
            return <img src={S3Key + "right-arrow-grey.png"} alt="right-arrow" width="18px" />;
        }
    };

    return (
        <AppContainer>
            <Header title="wayd" leftSideIcon="user-grey" />
            <Content>
                <Calendar
                    next2Label={null}
                    prev2Label={null}
                    minDetail="month"
                    nextLabel={getArrowImage("right")}
                    prevLabel={getArrowImage("left")}
                    onClickDay={(value) => onDayClick(value)}
                />
                <MenuButton title="lists" image="list-grey" divider={true} />
                <MenuButton title="notes" image="notes-grey" divider={true} />
                <MenuButton title="habits" image="streak-grey" divider={false} />
            </Content>
            <FAB>
                <img src={S3Key + "plus-white.png"} alt="plus" width="36px" />
            </FAB>
        </AppContainer>
    );
};
