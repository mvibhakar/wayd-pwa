import styled from "styled-components";
import { ContentText, TimeText } from "../../utils/ui-library";

export const TaskTimeContainer = styled(TimeText)`
    width: 48%;
`;

export const TaskTextContainer = styled(ContentText)`
    width: 50%;
`;

export const ThoughtText = styled(ContentText)`
    white-space: pre-line;
    margin-bottom: 15px;
    padding: 10px 10px;
    border-bottom: 0.5px solid rgba(82, 82, 82, 0.4);

    &:last-child {
        padding-bottom: 0px !important;
        margin-bottom: 0px !important;
        border-bottom: none;
    }
`;
