import React, { useState } from "react";
import { ExpandingTextAreaWithBottomBorder } from "../../utils/ui-library";
import { Moment } from "moment";
import { ContentHeader } from "../../utils/ui-library";
import { DatePicker, FormSection } from "./styled";
var moment = require("moment-timezone");

export const ThoughtForm = () => {
    const dateFormat = "MMMM Do, YYYY";
    const current = moment();
    const [datepickerDate, updateDatepickerDate] = useState<Moment | null>(current);
    const currentDateForIsAfter = moment().add(24, "hours").format("YYYY-MM-DD");

    return (
        <>
            <FormSection>
                <ExpandingTextAreaWithBottomBorder placeholder="Enter thought" bordered={false} autoSize />
            </FormSection>
            <FormSection>
                <ContentHeader>date</ContentHeader>
                <DatePicker
                    bordered={false}
                    format={dateFormat}
                    value={datepickerDate || undefined}
                    onChange={(value) => updateDatepickerDate(value)}
                    disabledDate={(d) => !d || d.isAfter(currentDateForIsAfter)}
                    inputReadOnly={true}
                />
            </FormSection>
        </>
    );
};
