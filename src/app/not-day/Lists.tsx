import React from "react";
import { useHistory } from "react-router-dom";
import { S3Key } from "../../utils";
import { useSelectFromRedux } from "../../utils/hooks";
import { useRequireAuth } from "../_shared/FirebaseAuthProvider";
import { useDispatch } from "react-redux";

// components
import { Header } from "../_shared/Header";
import {
    AppContainer,
    Content,
    FAB,
    Card,
    CardHeader,
    ContentItemContainer,
    ListItemIcon,
    ListItemText,
} from "../_shared/styled";
import { notDayOperations } from "../../state/not-day";

export const Lists = () => {
    const requireAuth = useRequireAuth();
    const history = useHistory();
    const dispatch = useDispatch();
    const { cuserId, lists, listItems } = useSelectFromRedux((state) => state.cuser);

    const homeIconAction = () => {
        history.push("/");
    };

    const getFABAction = () => {
        history.push("/add-list");
    };

    if (!cuserId) {
        return <div style={{ height: "500px", width: "500px", background: "purple" }} />;
    } else {
        return (
            <AppContainer>
                <Header title="my lists" leftSideIcon="home-grey" leftSideIconAction={homeIconAction} />
                <Content>
                    {lists &&
                        lists.map((list: any) => (
                            <Card key={list.id}>
                                <CardHeader>{list.title}</CardHeader>
                                {listItems &&
                                    listItems
                                        .filter((listItem: any) => listItem.list_id === list.id)
                                        .map((listItem: any) => (
                                            <ContentItemContainer key={listItem.id}>
                                                <ListItemIcon
                                                    src={
                                                        listItem.checked
                                                            ? S3Key + "rect-checked-blue.png"
                                                            : S3Key + "rect-unchecked-grey.png"
                                                    }
                                                    alt={listItem.checked ? "checked" : "unchecked"}
                                                    onClick={() =>
                                                        dispatch(
                                                            notDayOperations.updateListItemChecked(
                                                                listItem.id,
                                                                listItem.checked
                                                            )
                                                        )
                                                    }
                                                />
                                                <ListItemText>{listItem.content}</ListItemText>
                                            </ContentItemContainer>
                                        ))}
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
