import React, { useState } from "react";
import { Moment } from "moment";
import { ContentHeader, ContentText, TextInputWithBottomBorder } from "../../utils/ui-library";
import { DatePicker, FormSection, TimePicker, Toggle } from "./styled";
import { SpaceBetweenFlexContainer } from "../_shared/styled";
var moment = require("moment-timezone");

export const EventForm = () => {
    const [eventTitle, updateEventTitle] = useState<string>("");
    const [isAllDay, updateIsAllDay] = useState<boolean>(false);
    const dateFormat = "MMMM Do, YYYY";
    const timeFormat = "h:mm A";
    const remainder = 30 - (moment().minute() % 30);
    const defaultStartDateTime = moment().add(remainder, "minutes");
    const defaultEndDateTime = moment().add(remainder + 60, "minutes");
    const [datepickerDate, updateDatepickerDate] = useState<Moment | null>(defaultStartDateTime);
    const [startTimepickerTime, updateStartTimepickerTime] = useState<Moment | null>(defaultStartDateTime);
    const [endTimepickerTime, updateEndTimepickerTime] = useState<Moment | null>(defaultEndDateTime);
    const currentDateForIsBefore = moment().format("YYYY-MM-DD");

    const changeStartTime = (value: Moment | null) => {
        if (value) {
            updateStartTimepickerTime(value);
            updateEndTimepickerTime(value.add(1, "hours"));
        }
    };

    console.log(eventTitle);

    return (
        <>
            <FormSection>
                <TextInputWithBottomBorder
                    placeholder="Enter event"
                    bordered={false}
                    value={eventTitle}
                    onChange={(e) => updateEventTitle(e.target.value)}
                />
            </FormSection>
            <FormSection>
                <SpaceBetweenFlexContainer>
                    <ContentText>All-day</ContentText>
                    <Toggle checked={isAllDay} onClick={() => updateIsAllDay(!isAllDay)} />
                </SpaceBetweenFlexContainer>
            </FormSection>
            {isAllDay === false && (
                <>
                    <FormSection>
                        <ContentHeader>start time</ContentHeader>
                        <SpaceBetweenFlexContainer>
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
                                value={startTimepickerTime || undefined}
                                onChange={(value) => changeStartTime(value)}
                                inputReadOnly={true}
                                minuteStep={15}
                            />
                        </SpaceBetweenFlexContainer>
                    </FormSection>
                    <FormSection>
                        <ContentHeader>end time</ContentHeader>
                        <SpaceBetweenFlexContainer>
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
                        </SpaceBetweenFlexContainer>
                    </FormSection>
                </>
            )}
        </>
    );
};
