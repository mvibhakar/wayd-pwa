import React, { useState } from "react";
import { Moment } from "moment";
import { ContentHeader, ContentText, TextInputWithBottomBorder } from "../../utils/ui-library";
import { DatePicker, FormSection, TimePicker, Toggle } from "./styled";
var moment = require("moment-timezone");

export const TaskForm = () => {
    const dateFormat = "MMMM Do, YYYY";
    const current = moment();
    const [datepickerDate, updateDatepickerDate] = useState<Moment | null>(current);
    const currentDateForIsBefore = moment().format("YYYY-MM-DD");

    return (
        <>
            <FormSection>
                <TextInputWithBottomBorder placeholder="Enter task" bordered={false} />
            </FormSection>
            <FormSection>
                <ContentHeader>date</ContentHeader>
                <DatePicker
                    bordered={false}
                    format={dateFormat}
                    value={datepickerDate || undefined}
                    onChange={(value) => updateDatepickerDate(value)}
                    disabledDate={(d) => !d || d.isBefore(currentDateForIsBefore)}
                    inputReadOnly={true}
                />
            </FormSection>
        </>
    );
};
