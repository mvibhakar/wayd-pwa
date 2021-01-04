import { Moment } from "moment";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { textGrey } from "../../utils";
import { ContentHeader, ContentText, TextInput, TextInputWithBottomBorder } from "../../utils/ui-library";
import { Header } from "../_shared/Header";
import { AppContainer, Content } from "../_shared/styled";
import { EventForm } from "./EventForm";
import { DatePicker, TimePicker, Toggle, RadioGroup, RadioButton } from "./styled";
var moment = require("moment-timezone");

export const AddDayItem = () => {
    const history = useHistory();
    const dateFormat = "MMMM Do, YYYY";
    const timeFormat = "h:mm A";
    const remainder = 60 - (moment().minute() % 60);
    const defaultStartDateTime = moment().add(remainder, "minutes");
    const defaultEndDateTime = moment().add(remainder + 60, "minutes");
    const [radioValue, updateRadioValue] = useState<string>("event");
    const [datepickerDate, updateDatepickerDate] = useState<Moment | null>(defaultStartDateTime);
    // const [startDatepickerDate, updateStartDatepickerDate] = useState<Moment | null>(defaultStartDateTime);
    const [startTimepickerTime, updateStartTimepickerTime] = useState<Moment | null>(defaultStartDateTime);
    // const [endDatepickerDate, updateEndDatepickerDate] = useState<Moment | null>(defaultEndDateTime);
    const [endTimepickerTime, updateEndTimepickerTime] = useState<Moment | null>(defaultEndDateTime);
    const [toggleValue, updateToggleValue] = useState<boolean>(false);
    const currentDateForIsBefore = moment().format("YYYY-MM-DD");
    const currentDateForIsAfter = moment().add(24, "hours").format("YYYY-MM-DD");

    const backIconAction = () => {
        history.goBack();
    };

    const changeStartTime = (value: Moment | null) => {
        if (value) {
            updateStartTimepickerTime(value);
            updateEndTimepickerTime(value.add(1, "hours"));
        }
    };

    return (
        <AppContainer>
            <Header
                title=""
                leftSideIcon="left-arrow-grey"
                leftSideIconAction={backIconAction}
                rightSideRightIcon="check-grey"
            />
            <Content style={{ padding: "0 40px" }}>
                <RadioGroup defaultValue="event" onChange={(e) => console.log(e.target.value)}>
                    <RadioButton value="event">EVENT</RadioButton>
                    <RadioButton value="task">TASK</RadioButton>
                    <RadioButton value="thought">THOUGHT</RadioButton>
                </RadioGroup>
                <EventForm />
            </Content>
        </AppContainer>
    );
};
