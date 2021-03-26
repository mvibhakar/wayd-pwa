import React from "react";
import { useHistory } from "react-router-dom";
import { S3Key } from "../../utils";
import { useSelectFromRedux } from "../../utils/hooks";
import { useDispatch } from "react-redux";

// components
import { ContentText } from "../../utils/ui-library";
import { Header } from "../_shared/Header";
import { AppContainer, Content, FAB, Card, CardHeader } from "../_shared/styled";
import { notDayActions } from "../../state/not-day";

export const Notes = () => {
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

    return (
        <AppContainer>
            <Header title="my notes" leftSideIcon="home-grey" leftSideIconAction={homeIconAction} />
            <Content>
                {notes &&
                    notes.map((note: any) => (
                        <Card key={note.id} onClick={() => updateNote(note.id, note.title, note.content)}>
                            <CardHeader style={{ marginBottom: "10px" }}>{note.title}</CardHeader>
                            <ContentText style={{ whiteSpace: "pre-line" }}>{note.content}</ContentText>
                        </Card>
                    ))}
                {/* <Card>
                    <CardHeader style={{ marginBottom: "10px" }}>hutnke fnjnks</CardHeader>
                    <ContentText>
                        Ut accumsan nulla eget turpis malesuada, eget aliquet enim faucibus. Phasellus id mauris vitae
                        risus tempus tristique. Sed vehicula quam consectetur convallis feugiat. Fusce dapibus a diam
                        sed molestie. Nam et vulputate urna, sed volutpat lectus. Donec viverra turpis nec velit
                        consectetur pretium. Quisque quis ligula sit amet urna sollicitudin elementum sit amet aliquam
                        lacus. Mauris ut mattis tortor. Sed ex nulla, pretium ut vulputate sit amet, blandit et elit.
                        Praesent in vestibulum risus, quis ultricies ante. Aliquam sit amet nibh sit amet sapien ornare
                        ultrices eget ac sem. Nulla facilisi. Integer bibendum, sapien sed accumsan imperdiet, dolor
                        odio dapibus tortor, in luctus ipsum diam sit amet diam.
                    </ContentText>
                </Card> */}
            </Content>
            <FAB>
                <img src={S3Key + "plus-white.png"} alt="plus" width="36px" onClick={getFABAction} />
            </FAB>
        </AppContainer>
    );
};
