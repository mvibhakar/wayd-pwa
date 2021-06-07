import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { lightBeige, S3Key } from "../../utils";
import { TextInput, PasswordInput, AuthButton, ContentText, ColorfulAuthButton } from "../../utils/ui-library";
import { AuthInputContainer } from "../styled";
import { useDispatch } from "react-redux";
import firebase from "../../utils/firebase";
import { cuserActions } from "../../state/cuser";
import { useRequireAuth } from "../_shared/FirebaseAuthProvider";
import styled from "styled-components";
require("firebase/auth");
require("firebase/firestore");
var provider = new firebase.auth.GoogleAuthProvider();

export default () => {
    const db = firebase.firestore();
    const requireAuth = useRequireAuth();
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, updateEmail] = useState<string>("");
    const [password, updatePassword] = useState<string>("");
    const [isLoginWithEmail, updateIsLoginWithEmail] = useState<boolean>(true);

    const signInWithGoogle = () => {
        firebase
            .auth()
            .signInWithPopup(provider)
            .then((userCredential: any) => {
                var user = userCredential.user;
                dispatch(cuserActions.updateCuserId(user.uid));

                db.collection("users")
                    .doc(user.uid)
                    .get()
                    .then((doc) => {
                        if (!doc.exists) {
                            db.collection("users")
                                .doc(user.uid)
                                .set({
                                    email: user.email,
                                    uid: user.uid,
                                    userPreferences: {
                                        is_events: true,
                                        is_tasks: true,
                                        is_habits: true,
                                        is_thoughts: true,
                                    },
                                    habits_array: [],
                                })
                                .then(() => {
                                    history.push("/");
                                })
                                .catch((error) => {
                                    console.error("Error writing document: ", error);
                                });
                        }
                    });
            })
            .catch((error: any) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log({ errorCode, errorMessage });
            });
    };

    const submit = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential: any) => {
                var user = userCredential.user;
                dispatch(cuserActions.updateCuserId(user.uid));
                db.collection("users")
                    .doc(user.uid)
                    .set({
                        email: user.email,
                        uid: user.uid,
                        userPreferences: {
                            is_events: true,
                            is_tasks: true,
                            is_habits: true,
                            is_thoughts: true,
                        },
                        habits_array: [],
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
                if (errorCode === "auth/email-already-in-use") {
                    firebase
                        .auth()
                        .signInWithEmailAndPassword(email, password)
                        .then((userCredential: any) => {
                            var user = userCredential.user;
                            dispatch(cuserActions.updateCuserId(user.uid));
                        })
                        .catch((error: any) => {
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            console.log({ errorCode, errorMessage });
                        });
                }
            });
    };

    if (requireAuth.user) {
        return <Redirect to="/" />;
    } else {
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
                    style={{ width: "155px" }}
                />
                {!isLoginWithEmail ? (
                    <>
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
                        <ColorfulAuthButton onClick={submit}>Sign in</ColorfulAuthButton>
                    </>
                ) : (
                    <AuthButton onClick={signInWithGoogle}>
                        <GoogleLogo src={S3Key + "google-logo.png"} alt="google" />
                        <AuthButtonText>Sign in with Google</AuthButtonText>
                    </AuthButton>
                )}
                <ContentText onClick={() => updateIsLoginWithEmail(!isLoginWithEmail)} style={{ cursor: "pointer" }}>
                    or <b>{isLoginWithEmail ? "continue with email" : "continue with Google"}</b>
                </ContentText>
            </div>
        );
    }
};

const GoogleLogo = styled.img`
    width: 24px;
    margin: 0 0 0 3px;
`;

const AuthButtonText = styled.div`
    width: calc(100% - 27px);
    display: flex;
    justify-content: center;
`;
