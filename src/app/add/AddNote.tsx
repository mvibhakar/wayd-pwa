import React from "react";
import { useHistory } from "react-router-dom";

// components
import { ExpandingTextAreaWithBottomBorder, TextInputWithBottomBorder } from "../../utils/ui-library";
import { Header } from "../_shared/Header";
import { AppContainer, Content } from "../_shared/styled";
import { FormSection } from "./styled";

export const AddNote = () => {
    const history = useHistory();

    const backIconAction = () => {
        history.goBack();
    };

    const submit = () => {
        history.push("/notes");
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
                    <TextInputWithBottomBorder placeholder="Enter note title" bordered={false} />
                </FormSection>
                <FormSection>
                    <ExpandingTextAreaWithBottomBorder autoSize placeholder="Enter note" bordered={false} />
                </FormSection>
            </Content>
        </AppContainer>
    );
};
