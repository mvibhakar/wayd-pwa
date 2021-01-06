import React from "react";
import { useHistory } from "react-router-dom";
import { S3Key } from "../../utils";

// components
import { FormSection } from "../add/styled";
import { Header } from "../_shared/Header";
import {
    AppContainer,
    Content,
    FAB,
    ContentItemContainer,
    ListItemIcon,
    HabitListItemText,
    StreakContainer,
} from "../_shared/styled";

export const Habits = () => {
    const history = useHistory();

    const homeIconAction = () => {
        history.push("/");
    };

    const getFABAction = () => {
        history.push("/add-habit");
    };

    return (
        <AppContainer>
            <Header title="my habits" leftSideIcon="home-grey" leftSideIconAction={homeIconAction} />
            <Content style={{ padding: "0px 40px 40px" }}>
                <FormSection>
                    <ContentItemContainer>
                        <ListItemIcon src={S3Key + "round-checked-orange.png"} alt="checked" />
                        <HabitListItemText>
                            <div>libero</div>
                            <StreakContainer streak={true}>
                                <div>7</div>
                                <img src={S3Key + "streak-orange.png"} alt="streak" width="20px" />
                            </StreakContainer>
                        </HabitListItemText>
                    </ContentItemContainer>
                </FormSection>
                <FormSection>
                    <ContentItemContainer>
                        <ListItemIcon src={S3Key + "round-unchecked-grey.png"} alt="unchecked" />
                        <HabitListItemText>
                            <div>erat vitae mattis erat vitae mattis erat vitae</div>
                            <StreakContainer streak={true}>
                                <div>13</div>
                                <img src={S3Key + "streak-orange.png"} alt="streak" width="20px" />
                            </StreakContainer>
                        </HabitListItemText>
                    </ContentItemContainer>
                </FormSection>
                <FormSection>
                    <ContentItemContainer>
                        <ListItemIcon src={S3Key + "round-unchecked-grey.png"} alt="unchecked" />
                        <HabitListItemText>
                            <div>vitae efficitur</div>
                            <StreakContainer streak={false}>
                                <div>0</div>
                                <img src={S3Key + "streak-grey.png"} alt="streak" width="20px" />
                            </StreakContainer>
                        </HabitListItemText>
                    </ContentItemContainer>
                </FormSection>
            </Content>
            <FAB>
                <img src={S3Key + "plus-white.png"} alt="plus" width="36px" onClick={getFABAction} />
            </FAB>
        </AppContainer>
    );
};
