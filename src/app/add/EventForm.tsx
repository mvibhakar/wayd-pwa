import React, { useEffect, useState } from "react";
import { Moment } from "moment";
import { useDispatch } from "react-redux";
import { ContentHeader, ContentText, TextInputWithBottomBorder } from "../../utils/ui-library";
import { DatePicker, FormSection, TimePicker, Toggle } from "./styled";
import { SpaceBetweenFlexContainer } from "../_shared/styled";
import { useSelectFromRedux } from "../../utils/hooks";
import { dayActions } from "../../state/day";
var moment = require("moment-timezone");

export const EventForm = () => {
    const dispatch = useDispatch();
    const dateFormat = "MMMM Do, YYYY";
    const timeFormat = "h:mm A";
    const currentDateForIsBefore = moment().format("YYYY-MM-DD");
    const {
        addDayItemContent,
        addDayItemDate,
        addEventIsAllDay,
        addEventStartTime,
        addEventEndTime,
    } = useSelectFromRedux((state) => state.day);

    const changeStartTime = (value: Moment | null) => {
        if (value) {
            dispatch(dayActions.updateAddEventStartTime(value));
            dispatch(dayActions.updateAddEventEndTime(value.clone().add(1, "hours")));
        }
    };

    return (
        <>
            <FormSection>
                <TextInputWithBottomBorder
                    placeholder="Enter event"
                    bordered={false}
                    value={addDayItemContent}
                    onChange={(e) => dispatch(dayActions.updateAddDayItemContent(e.target.value))}
                />
            </FormSection>
            <FormSection>
                <SpaceBetweenFlexContainer>
                    <ContentText>All-day</ContentText>
                    <Toggle
                        checked={addEventIsAllDay}
                        onClick={() => dispatch(dayActions.updateAddEventIsAllDay(!addEventIsAllDay))}
                    />
                </SpaceBetweenFlexContainer>
            </FormSection>
            {addEventIsAllDay === false && (
                <>
                    <FormSection>
                        <ContentHeader>start time</ContentHeader>
                        <SpaceBetweenFlexContainer>
                            <DatePicker
                                bordered={false}
                                format={dateFormat}
                                value={addDayItemDate || undefined}
                                onChange={(value) => dispatch(dayActions.updateAddDayItemDate(value))}
                                disabledDate={(d) => !d || d.isBefore(currentDateForIsBefore)}
                                inputReadOnly={true}
                            />
                            <TimePicker
                                bordered={false}
                                format={timeFormat}
                                value={addEventStartTime || undefined}
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
                                value={addDayItemDate || undefined}
                                onChange={(value) => dispatch(dayActions.updateAddDayItemDate(value))}
                                disabledDate={(d) => !d || d.isBefore(currentDateForIsBefore)}
                                inputReadOnly={true}
                            />
                            <TimePicker
                                bordered={false}
                                format={timeFormat}
                                value={addEventEndTime || undefined}
                                onChange={(value) => dispatch(dayActions.updateAddEventEndTime(value))}
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
