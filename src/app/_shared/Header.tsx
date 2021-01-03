import React from "react";
import { lightBeige, S3Key } from "../../utils";
import { AppHeader } from "../../utils/ui-library";
import styled from "styled-components";

interface HeaderProps {
    title: string;
    leftSideIcon?: string | undefined;
    leftSideIconAction?: () => void;
    rightSideLeftIcon?: string | undefined;
    rightSideLeftIconAction?: () => void;
    rightSideRightIcon?: string | undefined;
    rightSideRightIconAction?: () => void;
}

export const Header = ({
    title,
    leftSideIcon,
    leftSideIconAction,
    rightSideLeftIcon,
    rightSideLeftIconAction,
    rightSideRightIcon,
    rightSideRightIconAction,
}: HeaderProps) => {
    return (
        <HeaderContainer>
            <div style={{ display: "flex", alignItems: "center" }}>
                <HeaderIconContainer onClick={leftSideIconAction}>
                    {leftSideIcon && <img src={S3Key + leftSideIcon + ".png"} alt={leftSideIcon} width="100%" />}
                </HeaderIconContainer>
                <HeaderIconContainer />
            </div>
            <AppHeader>{title}</AppHeader>
            <div style={{ display: "flex", alignItems: "center" }}>
                <HeaderIconContainer onClick={rightSideLeftIconAction}>
                    {rightSideLeftIcon && (
                        <img src={S3Key + rightSideLeftIcon + ".png"} alt={rightSideLeftIcon} width="100%" />
                    )}
                </HeaderIconContainer>
                <HeaderIconContainer onClick={rightSideRightIconAction}>
                    {rightSideRightIcon && (
                        <img src={S3Key + rightSideRightIcon + ".png"} alt={rightSideRightIcon} width="100%" />
                    )}
                </HeaderIconContainer>
            </div>
        </HeaderContainer>
    );
};

const HeaderContainer = styled.div`
    background: ${lightBeige};
    width: 100vw;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 5;
`;

const HeaderIconContainer = styled.div`
    margin: 10px;
    height: 22px;
    width: 22px;
    cursor: pointer;
    display: flex;
    align-items: center;
`;
