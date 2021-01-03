import React from "react";
import { useHistory } from "react-router-dom";
import { S3Key } from "../../utils";

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

export const Lists = () => {
    const history = useHistory();

    const homeIconAction = () => {
        history.push("/");
    };

    return (
        <AppContainer>
            <Header title="my lists" leftSideIcon="home-grey" leftSideIconAction={homeIconAction} />
            <Content>
                <Card>
                    <CardHeader>jfkrflmink</CardHeader>
                    <ContentItemContainer>
                        <ListItemIcon src={S3Key + "rect-unchecked-grey.png"} alt="unchecked" />
                        <ListItemText>quis ligula ultricies</ListItemText>
                    </ContentItemContainer>
                    <ContentItemContainer>
                        <ListItemIcon src={S3Key + "rect-checked-blue.png"} alt="checked" />
                        <ListItemText>lobortis malesuada</ListItemText>
                    </ContentItemContainer>
                    <ContentItemContainer>
                        <ListItemIcon src={S3Key + "rect-checked-blue.png"} alt="checked" />
                        <ListItemText>scelerisque sodales</ListItemText>
                    </ContentItemContainer>
                    <ContentItemContainer>
                        <ListItemIcon src={S3Key + "rect-unchecked-grey.png"} alt="unchecked" />
                        <ListItemText>euismod nibh diam</ListItemText>
                    </ContentItemContainer>
                </Card>
                <Card>
                    <CardHeader>plifthar</CardHeader>
                    <ContentItemContainer>
                        <ListItemIcon src={S3Key + "rect-unchecked-grey.png"} alt="unchecked" />
                        <ListItemText>sed ipfmkum friujut</ListItemText>
                    </ContentItemContainer>
                    <ContentItemContainer>
                        <ListItemIcon src={S3Key + "rect-checked-blue.png"} alt="checked" />
                        <ListItemText>eiumsud quis a quis</ListItemText>
                    </ContentItemContainer>
                    <ContentItemContainer>
                        <ListItemIcon src={S3Key + "rect-checked-blue.png"} alt="checked" />
                        <ListItemText>malesuada efficitur</ListItemText>
                    </ContentItemContainer>
                </Card>
            </Content>
            <FAB>
                <img src={S3Key + "plus-white.png"} alt="plus" width="36px" />
            </FAB>
        </AppContainer>
    );
};
