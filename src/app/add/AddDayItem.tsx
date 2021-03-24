import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Header } from "../_shared/Header";
import { AppContainer, Content } from "../_shared/styled";
import { EventForm } from "./EventForm";
import { RadioGroup, RadioButton } from "./styled";
import { TaskForm } from "./TaskForm";
import { ThoughtForm } from "./ThoughtForm";
import { dayOperations } from "../../state/day";
import { useDispatchPromise } from "../../utils/hooks";

export const AddDayItem = () => {
    const dispatchPromise = useDispatchPromise();
    const history = useHistory();
    const [radioValue, updateRadioValue] = useState<string>("event");

    const backIconAction = () => {
        history.goBack();
    };

    const checkIconAction = () => {
        dispatchPromise(dayOperations.createEvent()).then(() => {
            history.push("/");
        });
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
                <RadioGroup value={radioValue} onChange={(e) => updateRadioValue(e.target.value)}>
                    <RadioButton value="event">EVENT</RadioButton>
                    <RadioButton value="task">TASK</RadioButton>
                    <RadioButton value="thought">THOUGHT</RadioButton>
                </RadioGroup>
                {radioValue === "event" && <EventForm />}
                {radioValue === "task" && <TaskForm />}
                {radioValue === "thought" && <ThoughtForm />}
            </Content>
        </AppContainer>
    );
};
