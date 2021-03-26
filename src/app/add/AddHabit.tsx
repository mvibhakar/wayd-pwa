import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { notDayOperations } from "../../state/not-day";
import { useDispatchPromise } from "../../utils/hooks";

// components
import { TextInputWithBottomBorder } from "../../utils/ui-library";
import { Header } from "../_shared/Header";
import { AppContainer, Content } from "../_shared/styled";
import { FormSection } from "./styled";

export const AddHabit = () => {
    const dispatchPromise = useDispatchPromise();
    const history = useHistory();
    const [habitContent, updateHabitContent] = useState<string>("");

    const backIconAction = () => {
        history.goBack();
    };

    const submit = () => {
        dispatchPromise(notDayOperations.createHabit(habitContent)).then(() => {
            history.push("/habits");
        });
    };

    return (
        <AppContainer>
            <Header
                title=""
                leftSideIcon="left-arrow-grey"
                leftSideIconAction={backIconAction}
                rightSideRightIcon="check-grey"
                rightSideRightIconAction={submit}
            />
            <Content style={{ padding: "0 40px 40px" }}>
                <FormSection>
                    <TextInputWithBottomBorder
                        placeholder="Enter new habit"
                        bordered={false}
                        value={habitContent}
                        onChange={(e) => updateHabitContent(e.target.value)}
                    />
                </FormSection>
            </Content>
        </AppContainer>
    );
};
