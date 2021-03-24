import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Header } from "../_shared/Header";
import { AppContainer, Content } from "../_shared/styled";
import { EventForm } from "./EventForm";
import { RadioGroup, RadioButton } from "./styled";
import { TaskForm } from "./TaskForm";
import { ThoughtForm } from "./ThoughtForm";
import { dayActions, dayOperations } from "../../state/day";
import { useDispatchPromise, useSelectFromRedux } from "../../utils/hooks";

export const AddDayItem = () => {
    const dispatch = useDispatch();
    const dispatchPromise = useDispatchPromise();
    const history = useHistory();
    const { addDayItemSetting } = useSelectFromRedux((state) => state.day);

    const backIconAction = () => {
        history.goBack();
    };

    const checkIconAction = () => {
        if (addDayItemSetting === "event") {
            dispatchPromise(dayOperations.createEvent()).then(() => {
                history.push("/");
            });
        } else if (addDayItemSetting === "task") {
            dispatchPromise(dayOperations.createTask()).then(() => {
                history.push("/");
            });
        } else if (addDayItemSetting === "thought") {
            dispatchPromise(dayOperations.createThought()).then(() => {
                history.push("/");
            });
        }
    };

    return (
        <AppContainer>
            <Header
                title=""
                leftSideIcon="left-arrow-grey"
                leftSideIconAction={backIconAction}
                rightSideRightIcon="check-grey"
                rightSideRightIconAction={checkIconAction}
            />
            <Content style={{ padding: "0 40px" }}>
                <RadioGroup
                    value={addDayItemSetting}
                    onChange={(e) => dispatch(dayActions.updateAddDayItemSetting(e.target.value))}
                >
                    <RadioButton value="event">EVENT</RadioButton>
                    <RadioButton value="task">TO-DO</RadioButton>
                    <RadioButton value="thought">THOUGHT</RadioButton>
                </RadioGroup>
                {addDayItemSetting === "event" && <EventForm />}
                {addDayItemSetting === "task" && <TaskForm />}
                {addDayItemSetting === "thought" && <ThoughtForm />}
            </Content>
        </AppContainer>
    );
};
