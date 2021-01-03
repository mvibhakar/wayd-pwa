import styled from "styled-components";
import { darkOrange } from "../../utils";

export const AppContainer = styled.div`
    width: ${window.innerWidth};
    height: ${window.innerHeight};
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Content = styled.div`
    height: calc(${window.innerHeight} - 56px);
    width: 100%;
    padding: 0 20px 20px;
    margin-top: 56px;
`;

export const FAB = styled.div`
    background: ${darkOrange};
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
