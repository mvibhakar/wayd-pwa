import React, { useState } from "react";
import { ExpandingTextAreaWithBottomBorder } from "../../utils/ui-library";
import { Moment } from "moment";
import { useDispatch } from "react-redux";
import { ContentHeader } from "../../utils/ui-library";
import { DatePicker, FormSection } from "./styled";
import { useSelectFromRedux } from "../../utils/hooks";
import { dayActions } from "../../state/day";
var moment = require("moment-timezone");

export const ThoughtForm = () => {
    const dispatch = useDispatch();
    const dateFormat = "MMMM Do, YYYY";
    const currentDateForIsAfter = moment().add(24, "hours").format("YYYY-MM-DD");
    const { addDayItemContent, addDayItemDate } = useSelectFromRedux((state) => state.day);

    return (
        <>
            <FormSection>
                <ExpandingTextAreaWithBottomBorder
                    placeholder="Enter thought"
                    bordered={false}
                    autoSize
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
                    disabledDate={(d) => !d || d.isAfter(currentDateForIsAfter)}
                    inputReadOnly={true}
                />
            </FormSection>
        </>
    );
};
