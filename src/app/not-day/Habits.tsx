import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { S3Key } from "../../utils";
import { useSelectFromRedux } from "../../utils/hooks";
import { useDispatch } from "react-redux";

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
import { cuserOperations } from "../../state/cuser";
import { dayOperations } from "../../state/day";
import { notDayActions } from "../../state/not-day";
var moment = require("moment");

export const Habits = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { habits_array } = useSelectFromRedux((state) => state.cuser.userProfile);
    const { habits } = useSelectFromRedux((state) => state.cuser);
    const current = moment();
    const filteredHabits =
        habits && habits.filter((habit: any) => moment(habit.datetime.toDate()).isSame(current, "day"));

    const homeIconAction = () => {
        history.push("/");
    };

    const getFABAction = () => {
        history.push("/add-habit");
    };

    useEffect(() => {
        dispatch(cuserOperations.createTodaysHabits());
    }, [habits_array]);

    const updateHabit = (habitContent: string, habitStreak: number, habitChecked: boolean, docId: string) => {
        dispatch(notDayActions.updateAddHabitContent(habitContent));
        dispatch(notDayActions.updateAddHabitStreak(habitStreak));
        dispatch(notDayActions.updateAddHabitChecked(habitChecked));
        dispatch(notDayActions.updateAddHabitId(docId));
        dispatch(notDayActions.updateAddHabitIndex(habits_array.indexOf(habitContent)));
        history.push("/add-habit");
    };

    return (
        <AppContainer>
            <Header title="my habits" leftSideIcon="home-grey" leftSideIconAction={homeIconAction} />
            <Content style={{ padding: "0px 40px 40px" }}>
                {filteredHabits &&
                    filteredHabits.length > 0 &&
                    filteredHabits.map((habit: any) => (
                        <FormSection key={habit.id}>
                            <ContentItemContainer>
                                <ListItemIcon
                                    src={
                                        habit.checked
                                            ? S3Key + "round-checked-orange.png"
                                            : S3Key + "round-unchecked-grey.png"
                                    }
                                    alt={habit.checked ? "checked" : "unchecked"}
                                    onClick={() => dispatch(dayOperations.updateHabitChecked(habit.id, habit.checked))}
                                />
                                <HabitListItemText
                                    onClick={() => updateHabit(habit.content, habit.streak, habit.checked, habit.id)}
                                >
                                    <div>{habit.content}</div>
                                    <StreakContainer streak={habit.streak > 0 ? true : false}>
                                        <div>{habit.streak}</div>
                                        <img
                                            src={
                                                habit.streak > 0
                                                    ? S3Key + "streak-orange.png"
                                                    : S3Key + "streak-grey.png"
                                            }
                                            alt={habit.streak > 0 ? "streak" : "no-streak"}
                                            width="20px"
                                        />
                                    </StreakContainer>
                                </HabitListItemText>
                            </ContentItemContainer>
                        </FormSection>
                    ))}
            </Content>
            <FAB>
                <img src={S3Key + "plus-white.png"} alt="plus" width="36px" onClick={getFABAction} />
            </FAB>
        </AppContainer>
    );
};
