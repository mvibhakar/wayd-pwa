import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// components
import SignIn from "./auth/SignIn";
import Home from "./home";
import { Day } from "./day";
import { Lists } from "./not-day/Lists";
import { Notes } from "./not-day/Notes";
import { AddDayItem } from "./add/AddDayItem";
import { AddList } from "./add/AddList";
import { AddNote } from "./add/AddNote";

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/" exact component={() => <Home />} />
                    <Route path="/sign-in" exact component={() => <SignIn />} />
                    <Route path="/day" component={() => <Day />} />
                    <Route path="/lists" component={() => <Lists />} />
                    <Route path="/notes" component={() => <Notes />} />
                    <Route path="/add-day-item" component={() => <AddDayItem />} />
                    <Route path="/add-list" component={() => <AddList />} />
                    <Route path="/add-note" component={() => <AddNote />} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
