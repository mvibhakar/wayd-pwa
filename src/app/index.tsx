import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// components
import SignIn from "./auth/SignIn";
import Home from "./home";
import { Day } from "./day";
import { Lists } from "./not-day/Lists";

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/" exact component={() => <Home />} />
                    <Route path="/sign-in" exact component={() => <SignIn />} />
                    <Route path="/day" component={() => <Day />} />
                    <Route path="/lists" component={() => <Lists />} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
