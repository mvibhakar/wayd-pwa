import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { notDayActions, notDayOperations } from "../../state/not-day";
import { useDispatchPromise, useSelectFromRedux } from "../../utils/hooks";
import { useDispatch } from "react-redux";
// components
import { Popup, TextInputWithBottomBorder } from "../../utils/ui-library";
import { Header } from "../_shared/Header";
import { AppContainer, Content, LoadingContainer } from "../_shared/styled";
import { FormSection } from "./styled";
import Lottie from "react-lottie";
import BlueLoading from "../../utils/lotties/blue-loading.json";
import { useRequireAuth } from "../_shared/FirebaseAuthProvider";
import { defaultOptions } from "../../utils";

export const AddHabit = () => {
    const requireAuth = useRequireAuth();
    const dispatch = useDispatch();
    const dispatchPromise = useDispatchPromise();
    const history = useHistory();
    const { addHabitContent } = useSelectFromRedux((state) => state.notDay);
    const [habitContent, updateHabitContent] = useState<string>(addHabitContent);
    const [isModalVisible, updateIsModalVisible] = useState<boolean>(false);

    const backIconAction = () => {
        history.goBack();
        dispatch(notDayActions.resetAddHabit());
    };

    const submit = () => {
        if (addHabitContent) {
            dispatchPromise(notDayOperations.updateHabit(habitContent)).then(() => {
                history.push("/habits");
                dispatch(notDayActions.resetAddHabit());
            });
        } else {
            dispatchPromise(notDayOperations.createHabit(habitContent)).then(() => {
                history.push("/habits");
                dispatch(notDayActions.resetAddHabit());
            });
        }
    };

    const deleteHabit = () => {
        dispatchPromise(notDayOperations.deleteHabit()).then(() => {
            history.push("/habits");
            dispatch(notDayActions.resetAddHabit());
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
                {addHabitContent ? (
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
                            placeholder="Enter new habit"
                            bordered={false}
                            value={habitContent}
                            onChange={(e) => updateHabitContent(e.target.value)}
                        />
                    </FormSection>
                </Content>
                <Popup
                    visible={isModalVisible}
                    okText="Delete"
                    closable={false}
                    centered={true}
                    width={230}
                    onOk={deleteHabit}
                    onCancel={() => updateIsModalVisible(false)}
                >
                    Delete this habit?
                </Popup>
            </AppContainer>
        );
    }
};
