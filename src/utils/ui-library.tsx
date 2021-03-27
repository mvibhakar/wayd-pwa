import styled from "styled-components";
import { Input, Modal } from "antd";
import { textGrey, darkBlue, lightBlue } from "./index";
const { TextArea } = Input;

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
    letter-spacing: 4.5px;
    text-transform: uppercase;
    color: ${textGrey};
    margin-right: -4.5px;
`;

export const ContentText = styled.div`
    font-family: "DM Sans", sans-serif;
    font-size: 14px;
    letter-spacing: 1px;
    color: ${textGrey};
`;

export const TimeText = styled.div`
    font-family: "DM Sans", sans-serif;
    font-size: 12px;
    font-weight: bold;
    font-style: italic;
    letter-spacing: 1px;
    text-transform: lowercase;
    color: ${darkBlue};
    margin-top: 1px;
`;

export const TextInput = styled(Input)`
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

export const ExpandingTextAreaWithBottomBorder = styled(TextArea)`
    font-family: "DM Sans", sans-serif;
    font-size: 15px;
    letter-spacing: 1px;
    width: 230px;
    color: ${textGrey};
    width: 100%;
    border-radius: 0px;
    border-bottom: 0.5px solid rgba(82, 82, 82, 0.4) !important;
    padding-left: 0px !important;
    ::placeholder {
        color: ${textGrey} !important;
        letter-spacing: 1px;
    }
`;

export const TextInputWithBottomBorder = styled(TextInput)`
    width: 100%;
    border-radius: 0px;
    border-bottom: 0.5px solid rgba(82, 82, 82, 0.4) !important;
    padding-left: 0px !important;
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

export const Popup = styled(Modal)`
    font-family: "DM Sans", sans-serif;
    font-size: 15px;
    letter-spacing: 1px;
    color: ${textGrey};

    .ant-modal-content {
        border-radius: 6px;
    }

    .ant-modal-body {
        display: flex;
        justify-content: center;
    }

    .ant-modal-footer {
        display: flex;
        justify-content: space-around;
        border-top: none;
    }

    .ant-btn {
        font-family: "DM Sans", sans-serif;
        letter-spacing: 1px;
        border-radius: 18px;
        box-shadow: none;
    }

    .ant-modal-footer button + button {
        margin-left: 0px;
    }

    .ant-btn-primary {
        background: ${darkBlue};
        border-color: ${darkBlue};
    }
`;
