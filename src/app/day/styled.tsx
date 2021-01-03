import styled from "styled-components";
import { ContentHeader, ContentText, TimeText } from "../../utils/ui-library";

export const Card = styled.div`
    background: white;
    padding: 15px;
    width: 100%;
    filter: drop-shadow(0px 2px 4px rgba(209, 209, 209, 0.5));
    border-radius: 8px;
    margin-bottom: 20px;
`;

export const CardHeader = styled(ContentHeader)``;

interface ContentItemContainerProps {
    event?: boolean;
}

export const ContentItemContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: ${(props: ContentItemContainerProps) => (props.event ? "flex-start" : "center")};
    margin-top: ${(props: ContentItemContainerProps) => (props.event ? "5px" : "8px")};
`;

export const TaskTimeContainer = styled(TimeText)`
    width: 48%;
`;

export const TaskTextContainer = styled(ContentText)`
    width: 50%;
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
