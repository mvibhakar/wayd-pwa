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
import { Habits } from "./not-day/Habits";
import { AddHabit } from "./add/AddHabit";
import { Sidebar } from "./_shared/Sidebar";

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route
                        path="/sign-in"
                        exact
                        component={() => (
                            <>
                                <Sidebar />
                                <SignIn />
                            </>
                        )}
                    />
                    <Route
                        path="/"
                        exact
                        component={() => (
                            <>
                                <Sidebar />
                                <Home />
                            </>
                        )}
                    />
                    <Route
                        path="/day"
                        component={() => (
                            <>
                                <Sidebar />
                                <Day />
                            </>
                        )}
                    />
                    <Route
                        path="/lists"
                        component={() => (
                            <>
                                <Sidebar />
                                <Lists />
                            </>
                        )}
                    />
                    <Route
                        path="/notes"
                        component={() => (
                            <>
                                <Sidebar />
                                <Notes />
                            </>
                        )}
                    />
                    <Route
                        path="/habits"
                        component={() => (
                            <>
                                <Sidebar />
                                <Habits />
                            </>
                        )}
                    />
                    <Route
                        path="/add-day-item"
                        component={() => (
                            <>
                                <Sidebar />
                                <AddDayItem />
                            </>
                        )}
                    />
                    <Route
                        path="/add-list"
                        component={() => (
                            <>
                                <Sidebar />
                                <AddList />
                            </>
                        )}
                    />
                    <Route
                        path="/add-note"
                        component={() => (
                            <>
                                <Sidebar />
                                <AddNote />
                            </>
                        )}
                    />
                    <Route
                        path="/add-habit"
                        component={() => (
                            <>
                                <Sidebar />
                                <AddHabit />
                            </>
                        )}
                    />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
