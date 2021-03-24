import React, { useState } from "react";
import { Moment } from "moment";
import { useDispatch } from "react-redux";
import { ContentHeader, ContentText, TextInputWithBottomBorder } from "../../utils/ui-library";
import { DatePicker, FormSection, TimePicker, Toggle } from "./styled";
import { dayActions } from "../../state/day";
import { useSelectFromRedux } from "../../utils/hooks";
var moment = require("moment-timezone");

export const TaskForm = () => {
    const dispatch = useDispatch();
    const dateFormat = "MMMM Do, YYYY";
    const currentDateForIsBefore = moment().format("YYYY-MM-DD");
    const { addDayItemContent, addDayItemDate } = useSelectFromRedux((state) => state.day);

    return (
        <>
            <FormSection>
                <TextInputWithBottomBorder
                    placeholder="Enter to-do"
                    bordered={false}
                    value={addDayItemContent}
                    onChange={(e) => dispatch(dayActions.updateAddDayItemContent(e.target.value))}
                />
            </FormSection>
            <FormSection>
                <ContentHeader>date</ContentHeader>
                <DatePicker
                    bordered={false}
                    format={dateFormat}
                    value={addDayItemDate || undefined}
                    onChange={(value) => dispatch(dayActions.updateAddDayItemDate(value))}
                    disabledDate={(d) => !d || d.isBefore(currentDateForIsBefore)}
                    inputReadOnly={true}
                />
            </FormSection>
        </>
    );
};
