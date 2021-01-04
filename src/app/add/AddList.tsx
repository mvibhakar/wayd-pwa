import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { S3Key } from "../../utils";
import { TextInputWithBottomBorder } from "../../utils/ui-library";
import { Header } from "../_shared/Header";
import { AppContainer, Content, ContentItemContainer, ListItemIcon } from "../_shared/styled";

interface ListItem {
    id: number;
    value: string;
}

export const AddList = () => {
    const history = useHistory();
    const [listItems, updateListItems] = useState<ListItem[]>([]);
    const [newValue, updateNewValue] = useState<string>("");
    const [id, updateId] = useState<number>(1);

    const backIconAction = () => {
        history.goBack();
    };

    const submit = () => {
        if (newValue !== "") {
            const listItemsCopy = [...listItems];
            const newListItems = listItemsCopy.concat({ id: id, value: newValue });
            // console.log("Final", newListItems);
        }
        history.push("/lists");
    };

    const createNewListItem = () => {
        const listItemsCopy = [...listItems];
        const newListItems = listItemsCopy.concat({ id: id, value: newValue });
        updateListItems(newListItems);
        updateNewValue("");
        updateId(id + 1);
    };

    const changePreviousValue = (id: number, value: string) => {
        const newObject = [{ id: id, value: value }];
        const listItemsCopy = [...listItems];
        const newListItems = listItemsCopy.map((obj) => newObject.find((o) => o.id === obj.id) || obj);
        updateListItems(newListItems);
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
            <Content style={{ padding: "0 40px" }}>
                <Section>
                    <TextInputWithBottomBorder placeholder="Enter list title" bordered={false} />
                </Section>
                {listItems.map((listItem) => (
                    <Section key={listItem.id}>
                        <ContentItemContainer>
                            <ListItemIcon src={S3Key + "rect-unchecked-grey.png"} alt="unchecked" />
                            <TextInputWithBottomBorder
                                key={listItem.id}
                                placeholder="Enter list item"
                                defaultValue={listItem.value}
                                bordered={false}
                                onChange={(e) => changePreviousValue(listItem.id, e.target.value)}
                            />
                        </ContentItemContainer>
                    </Section>
                ))}
                <Section>
                    <ContentItemContainer>
                        <ListItemIcon src={S3Key + "rect-unchecked-grey.png"} alt="unchecked" />
                        <TextInputWithBottomBorder
                            placeholder="Enter list item"
                            value={newValue}
                            bordered={false}
                            onChange={(e) => updateNewValue(e.target.value)}
                            onPressEnter={createNewListItem}
                        />
                    </ContentItemContainer>
                </Section>
                <Section>
                    <ContentItemContainer>
                        <ListItemIcon src={S3Key + "plus-grey.png"} alt="plus" onClick={createNewListItem} />
                    </ContentItemContainer>
                </Section>
            </Content>
        </AppContainer>
    );
};

const Section = styled.div`
    margin-top: 20px;
`;
