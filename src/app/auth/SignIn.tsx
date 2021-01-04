import React from "react";
import { useHistory } from "react-router-dom";
import { lightBeige } from "../../utils";
import { TextInput, PasswordInput, AuthButton } from "../../utils/ui-library";
import { AuthInputContainer } from "../styled";

export default () => {
    const history = useHistory();

    const submit = () => {
        history.push("/");
    };

    return (
        <div
            style={{
                width: "100vw",
                height: window.innerHeight,
                background: lightBeige,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <img
                src="https://wayd-static.nyc3.digitaloceanspaces.com/wayd-logo.png"
                alt="wayd logo"
                style={{ width: "165px" }}
            />
            <AuthInputContainer>
                <img
                    src="https://wayd-static.nyc3.digitaloceanspaces.com/email-grey.png"
                    alt="email"
                    style={{ width: "20px" }}
                />
                <TextInput placeholder="Email" bordered={false} />
            </AuthInputContainer>
            <AuthInputContainer>
                <img
                    src="https://wayd-static.nyc3.digitaloceanspaces.com/password-grey.png"
                    alt="password"
                    style={{ width: "20px" }}
                />
                <PasswordInput placeholder="Password" bordered={false} />
            </AuthInputContainer>
            <AuthButton onClick={submit}>SIGN IN</AuthButton>
        </div>
    );
};
