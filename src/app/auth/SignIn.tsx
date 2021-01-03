import React from "react";
import { lightBeige } from "../../utils";
import { EmailInput, PasswordInput, AuthButton } from "../../utils/ui-library";
import { AuthInputContainer } from "../styled";

export default () => {
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
                <EmailInput placeholder="Email" bordered={false} />
            </AuthInputContainer>
            <AuthInputContainer>
                <img
                    src="https://wayd-static.nyc3.digitaloceanspaces.com/password-grey.png"
                    alt="password"
                    style={{ width: "20px" }}
                />
                <PasswordInput placeholder="Password" bordered={false} />
            </AuthInputContainer>
            <AuthButton>SIGN IN</AuthButton>
        </div>
    );
};
