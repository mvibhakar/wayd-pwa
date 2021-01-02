import styled from "styled-components";
import { Input } from "antd";
import { textGrey, darkBlue, lightBlue } from "./index";

export const AppHeader = styled.div`
    font-family: "DM Sans", sans-serif;
    font-size: 20px;
    letter-spacing: 6px;
    text-transform: uppercase;
    color: ${textGrey};
    margin-right: -6px;
`;

export const ContentHeader = styled.div`
    font-family: "DM Sans", sans-serif;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 35%;
    text-transform: uppercase;
    color: ${textGrey};
`;

export const ContentText = styled.div`
    font-family: "DM Sans", sans-serif;
    font-size: 15px;
    letter-spacing: 10%;
    color: ${textGrey};
`;

export const TimeText = styled.div`
    font-family: "DM Sans", sans-serif;
    font-size: 12px;
    font-weight: bold;
    font-style: italic;
    letter-spacing: 10%;
    text-transform: lowercase;
    color: ${darkBlue};
`;

export const EmailInput = styled(Input)`
    font-family: "DM Sans", sans-serif;
    font-size: 15px;
    letter-spacing: 1px;
    width: 230px;
    color: ${textGrey};
    ::placeholder {
        color: ${textGrey} !important;
        letter-spacing: 1px;
    }
`;

export const PasswordInput = styled(Input.Password)`
    font-family: "DM Sans", sans-serif;
    font-size: 15px;
    letter-spacing: 1px;
    width: 230px;
    color: ${textGrey};
    ::placeholder {
        color: ${textGrey} !important;
        letter-spacing: 1px;
    }
`;

export const AuthButton = styled.button`
    font-family: "DM Sans", sans-serif;
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 16px;
    margin: 35px 0;
    width: 250px;
    height: 40px;
    color: white;
    background: ${lightBlue};
    border-radius: 8px;
    border: none;
    outline: none;
    cursor: pointer;
`;
