import React from "react";
import { useHistory } from "react-router-dom";
import { S3Key } from "../../utils";
import { defaultOptions } from "../../utils";
import { useSelectFromRedux } from "../../utils/hooks";
import { useDispatch } from "react-redux";

// components
import { ContentText } from "../../utils/ui-library";
import { Header } from "../_shared/Header";
import { AppContainer, Content, FAB, Card, CardHeader, LoadingContainer } from "../_shared/styled";
import { notDayActions } from "../../state/not-day";
import Lottie from "react-lottie";
import { useRequireAuth } from "../_shared/FirebaseAuthProvider";

export const Notes = () => {
    const requireAuth = useRequireAuth();
    const history = useHistory();
    const dispatch = useDispatch();
    const { notes } = useSelectFromRedux((state) => state.cuser);

    const homeIconAction = () => {
        history.push("/");
    };

    const getFABAction = () => {
        history.push("/add-note");
    };

    const updateNote = (noteId: string, noteTitle: string, noteContent: string) => {
        dispatch(notDayActions.updateAddNoteId(noteId));
        dispatch(notDayActions.updateAddNoteTitle(noteTitle));
        dispatch(notDayActions.updateAddNoteContent(noteContent));
        history.push("/add-note");
    };

    if (!requireAuth.user) {
        return (
            <LoadingContainer>
                <Lottie options={defaultOptions} height={400} width={400} />
            </LoadingContainer>
        );
    } else {
        return (
            <AppContainer className="noselect">
                <Header title="my notes" leftSideIcon="home-grey" leftSideIconAction={homeIconAction} />
                <Content>
                    {notes && notes.length === 0 && (
                        <Card style={{ background: "transparent", filter: "none" }}>
                            <ContentText
                                style={{
                                    textTransform: "none",
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                Click the orange button to add a note!
                            </ContentText>
                        </Card>
                    )}
                    {notes &&
                        notes.length > 0 &&
                        notes.map((note: any) => (
                            <Card key={note.id} onClick={() => updateNote(note.id, note.title, note.content)}>
                                <CardHeader style={{ marginBottom: "10px" }}>{note.title}</CardHeader>
                                <ContentText style={{ whiteSpace: "pre-line" }}>{note.content}</ContentText>
                            </Card>
                        ))}
                </Content>
                <FAB>
                    <img src={S3Key + "plus-white.png"} alt="plus" width="36px" onClick={getFABAction} />
                </FAB>
            </AppContainer>
        );
    }
};
