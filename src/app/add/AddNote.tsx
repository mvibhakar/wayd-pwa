import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { notDayActions, notDayOperations } from "../../state/not-day";
import { useDispatchPromise, useSelectFromRedux } from "../../utils/hooks";

// components
import { ExpandingTextAreaWithBottomBorder, Popup, TextInputWithBottomBorder } from "../../utils/ui-library";
import { Header } from "../_shared/Header";
import { AppContainer, Content, ContentContainer, LoadingContainer } from "../_shared/styled";
import { FormSection } from "./styled";
import Lottie from "react-lottie";
import { useRequireAuth } from "../_shared/FirebaseAuthProvider";
import { defaultOptions } from "../../utils";

export const AddNote = () => {
    const requireAuth = useRequireAuth();
    const history = useHistory();
    const dispatch = useDispatch();
    const dispatchPromise = useDispatchPromise();
    const { addNoteId, addNoteTitle, addNoteContent } = useSelectFromRedux((state) => state.notDay);
    const [noteTitle, updateNoteTitle] = useState<string>(addNoteTitle);
    const [noteContent, updateNoteContent] = useState<string>(addNoteContent);
    const [isModalVisible, updateIsModalVisible] = useState<boolean>(false);

    console.log(addNoteId);

    const backIconAction = () => {
        history.goBack();
        dispatch(notDayActions.resetAddNote());
    };

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
        dispatch(notDayActions.resetAddNote());
    };

    const deleteNote = () => {
        dispatchPromise(notDayOperations.deleteNote(addNoteId)).then(() => {
            history.push("/notes");
            dispatch(notDayActions.resetAddNote());
        });
    };

    if (!requireAuth.user) {
        return (
            <LoadingContainer>
                <Lottie options={defaultOptions} height={400} width={400} />
            </LoadingContainer>
        );
    } else {
        return (
            <AppContainer>
                <ContentContainer>
                    {addNoteId ? (
                        <Header
                            title=""
                            leftSideIcon="left-arrow-grey"
                            leftSideIconAction={backIconAction}
                            rightSideLeftIcon="check-grey"
                            rightSideLeftIconAction={submit}
                            rightSideRightIcon="delete-grey"
                            rightSideRightIconAction={() => updateIsModalVisible(true)}
                        />
                    ) : (
                        <Header
                            title=""
                            leftSideIcon="left-arrow-grey"
                            leftSideIconAction={backIconAction}
                            rightSideRightIcon="check-grey"
                            rightSideRightIconAction={submit}
                        />
                    )}
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
                </ContentContainer>
                <Popup
                    visible={isModalVisible}
                    okText="Delete"
                    closable={false}
                    centered={true}
                    width={230}
                    onOk={deleteNote}
                    onCancel={() => updateIsModalVisible(false)}
                >
                    Delete this note?
                </Popup>
            </AppContainer>
        );
    }
};
