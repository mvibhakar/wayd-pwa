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
    const { addDayItemSetting, addDayItemDate } = useSelectFromRedux((state) => state.day);
    const dateForNav = addDayItemDate ? addDayItemDate.toDate().toLocaleDateString("en-US") : null;

    const backIconAction = () => {
        history.goBack();
    };

    const checkIconAction = () => {
        if (addDayItemSetting === "event") {
            dispatchPromise(dayOperations.createEvent()).then(() => {
                if (dateForNav) {
                    history.push("/day/" + dateForNav);
                } else {
                    history.goBack();
                }
            });
        } else if (addDayItemSetting === "task") {
            dispatchPromise(dayOperations.createTask()).then(() => {
                if (dateForNav) {
                    history.push("/day/" + dateForNav);
                } else {
                    history.goBack();
                }
            });
        } else if (addDayItemSetting === "thought") {
            dispatchPromise(dayOperations.createThought()).then(() => {
                if (dateForNav) {
                    history.push("/day/" + dateForNav);
                } else {
                    history.goBack();
                }
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
