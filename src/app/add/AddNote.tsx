import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { notDayOperations } from "../../state/not-day";
import { useDispatchPromise } from "../../utils/hooks";

// components
import { ExpandingTextAreaWithBottomBorder, TextInputWithBottomBorder } from "../../utils/ui-library";
import { Header } from "../_shared/Header";
import { AppContainer, Content } from "../_shared/styled";
import { FormSection } from "./styled";

export const AddNote = () => {
    const history = useHistory();
    const dispatchPromise = useDispatchPromise();
    const [noteTitle, updateNoteTitle] = useState<string>("");
    const [noteContent, updateNoteContent] = useState<string>("");

    const backIconAction = () => {
        history.goBack();
    };

    const submit = () => {
        dispatchPromise(notDayOperations.createNote(noteTitle, noteContent)).then(() => {
            history.push("/notes");
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
                        placeholder="Enter note title"
                        bordered={false}
                        value={noteTitle}
                        onChange={(e) => updateNoteTitle(e.target.value)}
                    />
                </FormSection>
                <FormSection>
                    <ExpandingTextAreaWithBottomBorder
                        autoSize
                        placeholder="Enter note"
                        bordered={false}
                        value={noteContent}
                        onChange={(e) => updateNoteContent(e.target.value)}
                    />
                </FormSection>
            </Content>
        </AppContainer>
    );
};
