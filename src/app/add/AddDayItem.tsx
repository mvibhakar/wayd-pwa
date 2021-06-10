import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Header } from "../_shared/Header";
import { AppContainer, Content, ContentContainer, LoadingContainer } from "../_shared/styled";
import { EventForm } from "./EventForm";
import { RadioGroup, RadioButton } from "./styled";
import { TaskForm } from "./TaskForm";
import { ThoughtForm } from "./ThoughtForm";
import { dayActions, dayOperations } from "../../state/day";
import { useDispatchPromise, useSelectFromRedux } from "../../utils/hooks";
import { Popup } from "../../utils/ui-library";
import Lottie from "react-lottie";
import { useRequireAuth } from "../_shared/FirebaseAuthProvider";
import { defaultOptions } from "../../utils";

export const AddDayItem = () => {
    const requireAuth = useRequireAuth();
    const dispatch = useDispatch();
    const dispatchPromise = useDispatchPromise();
    const history = useHistory();
    const { addDayItemSetting, addDayItemDate, addEventId, addTaskId, addThoughtId } = useSelectFromRedux(
        (state) => state.day
    );
    const dateForNav = addDayItemDate ? addDayItemDate.toDate().toLocaleDateString("en-US") : null;
    const [isModalVisible, updateIsModalVisible] = useState<boolean>(false);

    const backIconAction = () => {
        history.goBack();
    };

    const checkIconAction = () => {
        if (addEventId || addTaskId || addThoughtId) {
            if (addDayItemSetting === "event" && addEventId) {
                dispatchPromise(dayOperations.updateEvent()).then(() => {
                    if (dateForNav) {
                        history.push("/day/" + dateForNav);
                    } else {
                        history.goBack();
                    }
                });
            }
            if (addDayItemSetting === "to-do" && addTaskId) {
                dispatchPromise(dayOperations.updateTask()).then(() => {
                    if (dateForNav) {
                        history.push("/day/" + dateForNav);
                    } else {
                        history.goBack();
                    }
                });
            }
            if (addDayItemSetting === "thought" && addThoughtId) {
                dispatchPromise(dayOperations.updateThought()).then(() => {
                    if (dateForNav) {
                        history.push("/day/" + dateForNav);
                    } else {
                        history.goBack();
                    }
                });
            }
        } else {
            if (addDayItemSetting === "event") {
                dispatchPromise(dayOperations.createEvent()).then(() => {
                    if (dateForNav) {
                        history.push("/day/" + dateForNav);
                    } else {
                        history.goBack();
                    }
                });
            } else if (addDayItemSetting === "to-do") {
                dispatchPromise(dayOperations.createTask()).then(() => {
                    if (dateForNav) {
                        history.push("/day/" + dateForNav);
                    } else {
                        history.goBack();
                    }
                });
            } else if (addDayItemSetting === "thought") {
                dispatchPromise(dayOperations.createThought()).then(() => {
                    if (dateForNav) {
                        history.push("/day/" + dateForNav);
                    } else {
                        history.goBack();
                    }
                });
            }
        }
    };

    const deleteDayItem = () => {
        if (addDayItemSetting === "event") {
            dispatchPromise(dayOperations.deleteEvent()).then(() => {
                history.goBack();
            });
        } else if (addDayItemSetting === "to-do") {
            dispatchPromise(dayOperations.deleteTask()).then(() => {
                history.goBack();
            });
        } else if (addDayItemSetting === "thought") {
            dispatchPromise(dayOperations.deleteThought()).then(() => {
                history.goBack();
            });
        }
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
                    {!addEventId && !addTaskId && !addThoughtId ? (
                        <Header
                            title=""
                            leftSideIcon="left-arrow-grey"
                            leftSideIconAction={backIconAction}
                            rightSideRightIcon="check-grey"
                            rightSideRightIconAction={checkIconAction}
                        />
                    ) : (
                        <Header
                            title=""
                            leftSideIcon="left-arrow-grey"
                            leftSideIconAction={backIconAction}
                            rightSideLeftIcon="check-grey"
                            rightSideLeftIconAction={checkIconAction}
                            rightSideRightIcon="delete-grey"
                            rightSideRightIconAction={() => updateIsModalVisible(true)}
                        />
                    )}
                    <Content style={{ padding: "0 40px" }}>
                        {!addEventId && !addTaskId && !addThoughtId && (
                            <RadioGroup
                                value={addDayItemSetting}
                                onChange={(e) => dispatch(dayActions.updateAddDayItemSetting(e.target.value))}
                            >
                                <RadioButton value="event">EVENT</RadioButton>
                                <RadioButton value="to-do">TO-DO</RadioButton>
                                <RadioButton value="thought">THOUGHT</RadioButton>
                            </RadioGroup>
                        )}
                        {addDayItemSetting === "event" && <EventForm />}
                        {addDayItemSetting === "to-do" && <TaskForm />}
                        {addDayItemSetting === "thought" && <ThoughtForm />}
                    </Content>
                </ContentContainer>
                <Popup
                    visible={isModalVisible}
                    okText="Delete"
                    closable={false}
                    centered={true}
                    width={230}
                    onOk={deleteDayItem}
                    onCancel={() => updateIsModalVisible(false)}
                >
                    Delete this {addDayItemSetting}?
                </Popup>
            </AppContainer>
        );
    }
};
