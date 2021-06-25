import React from "react";
import { lightBeige, S3Key } from "../../utils";
import { ContentText } from "../../utils/ui-library";
import styled from "styled-components";
import { FlexContainer } from "../_shared/styled";
import { useHistory } from "react-router-dom";

interface SidebarIconLinkProps {
    icon: string;
    text: string;
    path: string;
}

export const SidebarIconLink = ({ icon, text, path }: SidebarIconLinkProps) => {
    const history = useHistory();

    return (
        <FlexContainer onClick={() => history.push(path)}>
            <SidebarIconLinkImage src={S3Key + icon + ".png"} alt={text} />
            <SidebarIconLinkText>{text}</SidebarIconLinkText>
        </FlexContainer>
    );
};

const SidebarIconLinkImage = styled.img`
    width: 20px;
    height: 20px;
    margin: 0 15px;
`;

const SidebarIconLinkText = styled(ContentText)`
    font-size: 14px;
    margin-top: 2px;
`;
