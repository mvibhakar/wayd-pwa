import styled from "styled-components";
import { darkOrange, lightOrange, textGrey } from "../../utils";
import { ContentHeader, ContentText } from "../../utils/ui-library";
import Modal from "antd/lib/modal";

export const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Content = styled.div`
    height: calc(100vh - 56px);
    width: 100%;
    padding: 0 20px 20px;
    margin-top: 56px;
`;

export const FAB = styled.div`
    background: linear-gradient(${lightOrange}, ${darkOrange});
    height: 55px;
    width: 55px;
    position: fixed;
    bottom: 15px;
    right: 15px;
    border-radius: 50%;
    filter: drop-shadow(0px 2px 4px rgba(144, 144, 144, 0.25));
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

export const Card = styled.div`
    background: white;
    padding: 15px;
    width: 100%;
    filter: drop-shadow(0px 2px 4px rgba(209, 209, 209, 0.5));
    border-radius: 8px;
    margin-bottom: 20px;
`;

export const CardHeader = styled(ContentHeader)`
    text-align: center;
`;

interface ContentItemContainerProps {
    event?: boolean;
}

export const ContentItemContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: ${(props: ContentItemContainerProps) => (props.event ? "5px" : "10px")};
`;

export const ListItemText = styled(ContentText)`
    padding: 2px 0;
    width: 100%;
    border-bottom: 0.5px solid rgba(82, 82, 82, 0.4);
`;

export const ListItemIcon = styled.img`
    width: 22px;
    height: 22px;
    margin-right: 15px;
`;

export const SpaceBetweenFlexContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

interface StreakContainerProps {
    streak: boolean;
}

export const StreakContainer = styled(ContentHeader)`
    display: flex;
    align-items: center;
    color: ${(props: StreakContainerProps) => (props.streak ? darkOrange : textGrey)};
    font-size: 15px;
    padding-left: 10px;
    margin-right: 1px;
    letter-spacing: 1px;
`;

export const HabitListItemText = styled(ListItemText)`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

export const LoadingContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
`;
