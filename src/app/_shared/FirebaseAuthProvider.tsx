import firebase from "../../utils/firebase";
import React, { createContext, FunctionComponent, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// import { userActions } from '../../_state/user';
// import * as userOperations from '../../_state/user/operations';

interface AuthContext {
    user: firebase.User | null | undefined;
    auth: firebase.auth.Auth | undefined;
    logout(): void;
}
const authContext = createContext<AuthContext>({
    user: undefined,
    auth: undefined,
    logout: () => null,
});
const { Provider } = authContext;

export const FirebaseAuthProvider: FunctionComponent = ({ children }) => {
    const [user, setUser] = useState<firebase.User | null | undefined>(undefined);
    const [auth, setAuth] = useState<firebase.auth.Auth | undefined>(undefined);
    const dispatch = useDispatch();

    // console.log({ user, auth });

    useEffect(() => {
        void firebase
            .auth()
            .setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => setAuth(firebase.auth()));

        firebase.auth().onAuthStateChanged((fbUser) => {
            if (fbUser) {
                setUser(fbUser);
                // console.log("YEET", fbUser);
                // dispatch(userOperations.getCuser());
            } else {
                setUser(null);
                // console.log("NAH");
                // dispatch(userActions.setCuser(null));
            }
        });
    }, []);

    const logout = () =>
        auth?.signOut().then(() => {
            setUser(null);
        });

    return <Provider value={{ user, auth, logout }}>{children}</Provider>;
};
export const useAuth = (): AuthContext => useContext(authContext);

export const useRequireAuth = () => {
    const auth = useAuth();
    const history = useHistory();
    useEffect(() => {
        if (auth.user === null) {
            void history.push("/sign-in");
        }
    }, [auth, history]);

    return auth;
};
