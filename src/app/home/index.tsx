import React from "react";
import "react-calendar/dist/Calendar.css";
import { lightBeige, S3Key, darkOrange, lightOrange } from "../../utils";
import { Header } from "../_shared/Header";
import { MenuButton } from "./MenuButton";
import { Calendar } from "./styled";
import styled from "styled-components";

export default () => {
    const getArrowImage = (side: string) => {
        if (side === "left") {
            return <img src={S3Key + "left-arrow-grey.png"} alt="left-arrow" width="18px" />;
        } else {
            return <img src={S3Key + "right-arrow-grey.png"} alt="right-arrow" width="18px" />;
        }
    };

    return (
        <div
            style={{
                width: window.innerWidth,
                height: window.innerHeight,
                background: lightBeige,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Header leftSideIcon="user-grey" />
            <Content>
                <Calendar
                    next2Label={null}
                    prev2Label={null}
                    minDetail="month"
                    nextLabel={getArrowImage("right")}
                    prevLabel={getArrowImage("left")}
                />
                <MenuButton title="lists" image="list-grey" divider={true} />
                <MenuButton title="notes" image="notes-grey" divider={true} />
                <MenuButton title="habits" image="streak-grey" divider={false} />
            </Content>
            <FAB>
                <img src={S3Key + "plus-white.png"} alt="plus" width="36px" />
            </FAB>
        </div>
    );
};

const Content = styled.div`
    padding: 0 20px 20px;
`;

const FAB = styled.div`
    background: ${darkOrange};
    height: 55px;
    width: 55px;
    position: absolute;
    bottom: 15px;
    right: 15px;
    border-radius: 50%;
    filter: drop-shadow(0px 2px 4px rgba(144, 144, 144, 0.25));
    display: flex;
    justify-content: center;
    align-items: center;

    :hover {
        background: ${lightOrange};
    }
`;
