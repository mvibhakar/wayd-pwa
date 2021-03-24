import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { lightBeige } from "../../utils";
import { TextInput, PasswordInput, AuthButton } from "../../utils/ui-library";
import { AuthInputContainer } from "../styled";
import { useDispatch } from "react-redux";
import firebase from "../../utils/firebase";
import { cuserActions } from "../../state/cuser";
require("firebase/auth");
require("firebase/firestore");

export default () => {
    const db = firebase.firestore();
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, updateEmail] = useState<string>("");
    const [password, updatePassword] = useState<string>("");

    const submit = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential: any) => {
                var user = userCredential.user;
                console.log(user);
                dispatch(cuserActions.updateCuserId(user.uid));
                db.collection("users")
                    .doc()
                    .set({
                        email: user.email,
                        uid: user.uid,
                    })
                    .then(() => {
                        history.push("/");
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });
            })
            .catch((error: any) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log({ errorCode, errorMessage });
            });
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
                <TextInput
                    placeholder="Email"
                    bordered={false}
                    value={email}
                    onChange={(e) => updateEmail(e.target.value)}
                />
            </AuthInputContainer>
            <AuthInputContainer>
                <img
                    src="https://wayd-static.nyc3.digitaloceanspaces.com/password-grey.png"
                    alt="password"
                    style={{ width: "20px" }}
                />
                <PasswordInput
                    placeholder="Password"
                    bordered={false}
                    value={password}
                    onChange={(e) => updatePassword(e.target.value)}
                />
            </AuthInputContainer>
            <AuthButton onClick={submit}>SIGN IN</AuthButton>
        </div>
    );
};
