import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { notDayOperations } from "../../state/not-day";
import { defaultOptions, S3Key } from "../../utils";
import { useDispatchPromise } from "../../utils/hooks";
import { TextInputWithBottomBorder } from "../../utils/ui-library";
import { Header } from "../_shared/Header";
import { AppContainer, Content, ContentItemContainer, ListItemIcon, LoadingContainer } from "../_shared/styled";
import { FormSection } from "./styled";
import Lottie from "react-lottie";
import BlueLoading from "../../utils/lotties/blue-loading.json";
import { useRequireAuth } from "../_shared/FirebaseAuthProvider";

interface ListItem {
    order: number;
    value: string;
}

export const AddList = () => {
    const history = useHistory();
    const requireAuth = useRequireAuth();
    const dispatchPromise = useDispatchPromise();
    const [listTitle, updateListTitle] = useState<string>("");
    const [listItems, updateListItems] = useState<ListItem[]>([]);
    const [newValue, updateNewValue] = useState<string>("");
    const [id, updateId] = useState<number>(1);

    const backIconAction = () => {
        history.goBack();
    };

    const submit = () => {
        if (newValue !== "") {
            const listItemsCopy = [...listItems];
            const newListItems = listItemsCopy.concat({ order: id, value: newValue });
            dispatchPromise(notDayOperations.createList(listTitle, newListItems)).then(() => {
                history.push("/lists");
            });
        } else {
            dispatchPromise(notDayOperations.createList(listTitle, listItems)).then(() => {
                history.push("/lists");
            });
        }
    };

    console.log(listItems);

    const createNewListItem = () => {
        if (newValue !== "") {
            const listItemsCopy = [...listItems];
            const newListItems = listItemsCopy.concat({ order: id, value: newValue });
            updateListItems(newListItems);
            updateNewValue("");
            updateId(id + 1);
        }
    };

    const changePreviousValue = (id: number, value: string) => {
        const newObject = [{ order: id, value: value }];
        const listItemsCopy = [...listItems];
        const newListItems = listItemsCopy.map((obj) => newObject.find((o) => o.order === obj.order) || obj);
        updateListItems(newListItems);
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
                            placeholder="Enter list title"
                            bordered={false}
                            value={listTitle}
                            onChange={(e) => updateListTitle(e.target.value)}
                        />
                    </FormSection>
                    {listItems.map((listItem) => (
                        <FormSection key={listItem.order}>
                            <ContentItemContainer>
                                <ListItemIcon
                                    src={S3Key + "rect-unchecked-grey.png"}
                                    alt="unchecked"
                                    style={{ marginTop: "3px" }}
                                />
                                <TextInputWithBottomBorder
                                    key={listItem.order}
                                    placeholder="Enter list item"
                                    defaultValue={listItem.value}
                                    bordered={false}
                                    onChange={(e) => changePreviousValue(listItem.order, e.target.value)}
                                />
                            </ContentItemContainer>
                        </FormSection>
                    ))}
                    <FormSection>
                        <ContentItemContainer>
                            <ListItemIcon
                                src={S3Key + "rect-unchecked-grey.png"}
                                alt="unchecked"
                                style={{ marginTop: "3px" }}
                            />
                            <TextInputWithBottomBorder
                                placeholder="Enter list item"
                                value={newValue}
                                bordered={false}
                                onChange={(e) => updateNewValue(e.target.value)}
                                onPressEnter={createNewListItem}
                            />
                        </ContentItemContainer>
                    </FormSection>
                    <FormSection>
                        <ContentItemContainer>
                            <ListItemIcon src={S3Key + "plus-grey.png"} alt="plus" onClick={createNewListItem} />
                        </ContentItemContainer>
                    </FormSection>
                </Content>
            </AppContainer>
        );
    }
};
