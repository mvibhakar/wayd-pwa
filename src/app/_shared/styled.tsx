import styled from "styled-components";
import { breakpoint, darkOrange, lightOrange, textGrey } from "../../utils";
import { ContentHeader, ContentText } from "../../utils/ui-library";
import Modal from "antd/lib/modal";
import { Drawer as AntdDrawer } from "antd";

export const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: ${breakpoint}) {
        position: fixed;
        top: 0;
        left: 400px;
        width: calc(100vw - 400px);
    }
`;

export const ContentContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: ${breakpoint}) {
        width: 800px;
    }
`;

export const Content = styled.div`
    height: calc(100vh - 56px);
    width: 100%;
    padding: 0 20px 20px;

    @media (min-width: ${breakpoint}) {
    }
`;

export const CardContainer = styled.div`
    @media (min-width: ${breakpoint}) {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column wrap;
        margin-top: 0px;

        ::after {
            content: "";
            flex-basis: 100%;
            width: 0;
            order: 0;
        }
    }
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
    box-sizing: border-box;

    @media (min-width: ${breakpoint}) {
        width: 360px;
        margin: 10px;
    }
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
    padding: 0 0 2px;
    width: 100%;
    border-bottom: 0.5px solid transparent;
`;

export const ListItemIcon = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 10px;
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

export const Drawer = styled(AntdDrawer)`
    display: none;

    .ant-drawer-body {
        padding-top: 0;
    }

    @media (min-width: ${breakpoint}) {
        display: block;
    }
`;

export const DrawerHeader = styled.div`
    height: 56px;
    width: 100%;
    display: flex;
    align-items: center;
`;

export const WaydLogo = styled.img`
    margin-left: -10px;
    width: 34px;
    height: 34px;
`;

export const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin: 13px 0 15px;
`;

export const LinkSection = styled.div`
    padding-top: 20px;
`;
