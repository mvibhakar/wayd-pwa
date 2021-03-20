import { rootReducer } from ".";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";

const composeEnhancers =
    // @ts-ignore
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
        // @ts-ignore
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })) ||
    compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;
