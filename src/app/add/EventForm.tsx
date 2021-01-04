import React, { useState } from "react";
import { Moment } from "moment";
import { ContentHeader, ContentText, TextInputWithBottomBorder } from "../../utils/ui-library";
import { DatePicker, TimePicker, Toggle } from "./styled";
var moment = require("moment-timezone");

export const EventForm = () => {
    const [toggleValue, updateToggleValue] = useState<boolean>(false);
    const dateFormat = "MMMM Do, YYYY";
    const timeFormat = "h:mm A";
    const remainder = 60 - (moment().minute() % 60);
    const defaultStartDateTime = moment().add(remainder, "minutes");
    const defaultEndDateTime = moment().add(remainder + 60, "minutes");
    const [datepickerDate, updateDatepickerDate] = useState<Moment | null>(defaultStartDateTime);
    const [startTimepickerTime, updateStartTimepickerTime] = useState<Moment | null>(defaultStartDateTime);
    const [endTimepickerTime, updateEndTimepickerTime] = useState<Moment | null>(defaultEndDateTime);
    const currentDateForIsBefore = moment().format("YYYY-MM-DD");
    const currentDateForIsAfter = moment().add(24, "hours").format("YYYY-MM-DD");

    const changeStartTime = (value: Moment | null) => {
        if (value) {
            updateStartTimepickerTime(value);
            updateEndTimepickerTime(value.add(1, "hours"));
        }
    };

    return (
        <>
            <div style={{ marginTop: "40px" }}>
                <TextInputWithBottomBorder placeholder="Enter event title" bordered={false} />
            </div>
            <div
                style={{
                    marginTop: "30px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <ContentText>All-day</ContentText>
                <Toggle checked={toggleValue} onClick={() => updateToggleValue(!toggleValue)} />
            </div>
            <div style={{ marginTop: "30px" }}>
                <ContentHeader>start time</ContentHeader>
                <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                    <DatePicker
                        bordered={false}
                        format={dateFormat}
                        value={datepickerDate || undefined}
                        onChange={(value) => updateDatepickerDate(value)}
                        // disabledDate={(d) => !d || d.isAfter(currentDateForDisabling)}
                        inputReadOnly={true}
                    />
                    <TimePicker
                        bordered={false}
                        format={timeFormat}
                        value={startTimepickerTime || undefined}
                        onChange={(value) => changeStartTime(value)}
                        inputReadOnly={true}
                        minuteStep={15}
                    />
                </div>
            </div>
            <div style={{ marginTop: "30px" }}>
                <ContentHeader>end time</ContentHeader>
                <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                    <DatePicker
                        bordered={false}
                        format={dateFormat}
                        value={datepickerDate || undefined}
                        onChange={(value) => updateDatepickerDate(value)}
                        disabledDate={(d) => !d || d.isBefore(currentDateForIsBefore)}
                        inputReadOnly={true}
                    />
                    <TimePicker
                        bordered={false}
                        format={timeFormat}
                        value={endTimepickerTime || undefined}
                        onChange={(value) => updateEndTimepickerTime(value)}
                        inputReadOnly={true}
                        minuteStep={15}
                    />
                </div>
            </div>
        </>
    );
};
