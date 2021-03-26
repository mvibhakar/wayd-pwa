import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { notDayActions, notDayOperations } from "../../state/not-day";
import { useDispatchPromise, useSelectFromRedux } from "../../utils/hooks";

// components
import { ExpandingTextAreaWithBottomBorder, TextInputWithBottomBorder } from "../../utils/ui-library";
import { Header } from "../_shared/Header";
import { AppContainer, Content } from "../_shared/styled";
import { FormSection } from "./styled";

export const AddNote = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const dispatchPromise = useDispatchPromise();
    const { addNoteId, addNoteTitle, addNoteContent } = useSelectFromRedux((state) => state.notDay);
    const [noteTitle, updateNoteTitle] = useState<string>(addNoteTitle);
    const [noteContent, updateNoteContent] = useState<string>(addNoteContent);

    const backIconAction = () => {
        history.goBack();
        dispatch(notDayActions.updateAddNoteId(""));
    };

    if (addNoteId) {
        console.log(true);
    } else {
        console.log(false);
    }

    const submit = () => {
        if (addNoteId) {
            dispatchPromise(notDayOperations.updateNote(addNoteId, noteTitle, noteContent)).then(() => {
                history.push("/notes");
            });
        } else {
            dispatchPromise(notDayOperations.createNote(noteTitle, noteContent)).then(() => {
                history.push("/notes");
            });
        }

        dispatch(notDayActions.updateAddNoteId(""));
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
