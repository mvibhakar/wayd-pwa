import React, { useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import { S3Key } from "../../utils";
import { Link, useHistory } from "react-router-dom";

// components
import { Header } from "../_shared/Header";
import { MenuButton } from "./MenuButton";
import { Calendar } from "./styled";
import { FAB, Content, AppContainer } from "../_shared/styled";
import firebase from "../../utils/firebase";
import { useSelectFromRedux } from "../../utils/hooks";
import { useRequireAuth } from "../_shared/FirebaseAuthProvider";
var moment = require("moment");

export default () => {
    const requireAuth = useRequireAuth();
    const db = firebase.firestore();
    const history = useHistory();
    const { cuserId } = useSelectFromRedux((state) => state.cuser);

    const onDayClick = (value: Date) => {
        const momentDate = moment(value).format("MM-DD-YYYY");
        history.push("/day/" + momentDate);
    };

    const getFABAction = () => {
        history.push("/add-day-item");
    };

    const getArrowImage = (side: string) => {
        if (side === "left") {
            return <img src={S3Key + "left-arrow-grey.png"} alt="left-arrow" width="18px" />;
        } else {
            return <img src={S3Key + "right-arrow-grey.png"} alt="right-arrow" width="18px" />;
        }
    };

    console.log(requireAuth);

    // useEffect(() => {
    // db.collection("events")
    //     .where("uid", "==", cuserId)
    //     .get()
    //     .then((querySnapshot) => {
    //         // console.log(querySnapshot.docs.map((d) => d.data()));
    //         let events = Array.from(
    //             new Set(
    //                 querySnapshot.docs.map((d: any) => ({
    //                     id: d.id,
    //                     ...d.data(),
    //                 }))
    //             )
    //         );
    //         console.log(events);
    //         // querySnapshot.forEach((doc) => {
    //         //     // doc.data() is never undefined for query doc snapshots
    //         //     console.log(doc.id, doc.data());
    //         // });
    //     })
    //     .catch((error) => {
    //         console.log("Error getting documents: ", error);
    //     });
    // }, []);

    if (!requireAuth.user) {
        return <div style={{ height: "500px", width: "500px", background: "purple" }} />;
    } else {
        return (
            <AppContainer>
                <Header title="wayd" leftSideIcon="user-grey" />
                <Content>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Calendar
                            next2Label={null}
                            prev2Label={null}
                            minDetail="month"
                            nextLabel={getArrowImage("right")}
                            prevLabel={getArrowImage("left")}
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
