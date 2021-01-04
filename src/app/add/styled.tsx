import styled from "styled-components";
import { DatePicker as AntDatePicker, TimePicker as AntTimePicker, Switch, Radio } from "antd";
import { darkOrange, lightOrange, textGrey } from "../../utils";

export const RadioGroup = styled(Radio.Group)`
    width: 100%;
    margin-bottom: 20px;

    .ant-radio-button-wrapper-checked {
        background: transparent !important;
        border-top: none !important;
        border-right: none !important;
        border-left: none !important;
        border-bottom: 2px solid ${textGrey} !important;
        border-radius: 0px !important;
        color: ${textGrey} !important;
        font-weight: bold;
    }

    .ant-radio-button-wrapper:first-child {
        border-left: none;
    }

    .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):focus-within {
        box-shadow: none !important;
    }
`;

export const RadioButton = styled(Radio.Button)`
    background: transparent;
    border: none;
    width: 33%;
    text-align: center;
    letter-spacing: 3px;
    outline: none;
    font-family: "DM Sans", sans-serif;
    font-size: 12px;
    text-transform: uppercase;

    :before {
        background: transparent !important;
    }
`;

export const DatePicker = styled(AntDatePicker)`
    width: 70% !important;
    color: ${textGrey};
    font-size; 14px;
    .ant-picker-input > input {
        color: ${textGrey} !important;
        text-align: left;
    letter-spacing: 1px;
    }
    ::placeholder {
        color: ${textGrey} !important;
    }
    .anticon {
        display: none;
    }
`;

export const TimePicker = styled(AntTimePicker)`
    width: 30% !important;
    color: ${textGrey};
    font-size; 14px;
    .ant-picker-input > input {
        color: ${textGrey} !important;
        text-align: right;
    letter-spacing: 1px;
    }
    ::placeholder {
        color: ${textGrey} !important;
    }
    .anticon {
        display: none;
    }
`;

export const Toggle = styled(Switch)`
    &.ant-switch.ant-switch-checked {
        background-color: ${lightOrange} !important;
    }
`;

export const FormSection = styled.div`
    margin-top: 20px;
`;
