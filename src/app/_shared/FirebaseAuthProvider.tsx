import firebase from "../../utils/firebase";
import React, { createContext, FunctionComponent, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSelectFromRedux } from "../../utils/hooks";
import { cuserActions, cuserOperations } from "../../state/cuser";

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

    useEffect(() => {
        void firebase
            .auth()
            .setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => setAuth(firebase.auth()));

        firebase.auth().onAuthStateChanged((fbUser) => {
            if (fbUser) {
                setUser(fbUser);
                dispatch(cuserActions.updateCuserId(fbUser.uid));
                dispatch(cuserOperations.loadData(fbUser.uid));
            } else {
                setUser(null);
                dispatch(cuserActions.updateCuserId(null));
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
