import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import { defaultOptions, S3Key } from "../../utils";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSwipeable } from "react-swipeable";

// components
import { Header } from "../_shared/Header";
import { MenuButton } from "./MenuButton";
import { Calendar } from "./styled";
import { FAB, Content, AppContainer, LoadingContainer } from "../_shared/styled";
import firebase from "../../utils/firebase";
import { useSelectFromRedux } from "../../utils/hooks";
import { useRequireAuth } from "../_shared/FirebaseAuthProvider";
import Lottie from "react-lottie";
import { dayActions } from "../../state/day";
var moment = require("moment");

export default () => {
    const dispatch = useDispatch();
    const requireAuth = useRequireAuth();
    const db = firebase.firestore();
    const history = useHistory();
    const remainder = 30 - (moment().minute() % 30);
    const { cuserId, habits } = useSelectFromRedux((state) => state.cuser);
    const [calendarValue, updateCalendarValue] = useState<moment.Moment>(moment());
    const handlers = useSwipeable({
        onSwipedLeft: () => updateCalendarValue(calendarValue.clone().add(1, "months")),
        onSwipedRight: () => updateCalendarValue(calendarValue.clone().subtract(1, "months")),
        trackMouse: true,
    });

    const onDayClick = (value: Date) => {
        // const momentDate = moment(value).format("MM-DD-YYYY");
        const momentDate = moment(value).toDate().toLocaleDateString("en-US");
        history.push("/day/" + momentDate);
    };

    const getFABAction = () => {
        dispatch(dayActions.resetAddDayItem());
        history.push("/add-day-item");
        dispatch(dayActions.updateAddEventStartTime(moment().add(remainder, "minutes")));
        dispatch(dayActions.updateAddEventEndTime(moment().add(remainder + 60, "minutes")));
    };

    const getArrowImage = (side: string) => {
        if (side === "left") {
            return <img src={S3Key + "left-arrow-grey.png"} alt="left-arrow" width="18px" />;
        } else {
            return <img src={S3Key + "right-arrow-grey.png"} alt="right-arrow" width="18px" />;
        }
    };

    if (!requireAuth.user) {
        return (
            <LoadingContainer>
                <Lottie options={defaultOptions} height={400} width={400} />
            </LoadingContainer>
        );
    } else {
        return (
            <AppContainer className="noselect">
                <Header title="wayd" leftSideIcon="user-grey" leftSideIconAction={requireAuth.logout} />
                <Content {...handlers}>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Calendar
                            next2Label={null}
                            prev2Label={null}
                            minDetail="month"
                            nextLabel={getArrowImage("right")}
                            prevLabel={getArrowImage("left")}
                            value={calendarValue.toDate()}
                            onClickDay={(value) => onDayClick(value)}
                        />
                    </div>
                    <Link to="/lists">
                        <MenuButton title="lists" image="list-grey" divider={true} />
                    </Link>
                    <Link to="/notes">
                        <MenuButton title="notes" image="notes-grey" divider={true} />
                    </Link>
                    <Link to="/habits">
                        <MenuButton title="habits" image="streak-grey" divider={false} />
                    </Link>
                </Content>
                <FAB>
                    <img src={S3Key + "plus-white.png"} alt="plus" width="36px" onClick={getFABAction} />
                </FAB>
            </AppContainer>
        );
    }
};
