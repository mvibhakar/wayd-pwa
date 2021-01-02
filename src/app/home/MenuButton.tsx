import React from "react";
import styled from "styled-components";
import { S3Key, textGrey } from "../../utils";

interface MenuButtonProps {
    title: string;
    image: string;
    divider: boolean;
}

export const MenuButton = ({ title, image, divider }: MenuButtonProps) => {
    return (
        <MenuButtonContainer divider={divider}>
            <img src={S3Key + image + ".png"} alt={image} width="24px" style={{ marginRight: "20px" }} />
            {title}
        </MenuButtonContainer>
    );
};

interface MenuButtonContainerProps {
    divider: boolean;
}

const MenuButtonContainer = styled.div`
    height: 100px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: ${(props: MenuButtonContainerProps) =>
        props.divider ? "0.5px solid rgba(82, 82, 82, 0.4)" : "none"};
    font-size: 15px;
    text-transform: uppercase;
    color: ${textGrey};
    font-weight: bold;
    letter-spacing: 4px;
`;
