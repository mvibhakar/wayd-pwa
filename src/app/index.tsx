import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// components
import SignIn from "./SignIn";
import Home from "./home";

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/" exact component={() => <Home />} />
                    <Route path="/sign-in" exact component={() => <SignIn />} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
