import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Header from "./Header.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Map from "./Map.jsx";
import Profile from "./Profile.jsx";
import PropTypes from "prop-types";

const App = ({ location, isLoggedIn }) => {
    return (
        <Grid
            container
            direction="column"
            style={{
                minHeight: "100vh",
            }}
            className="jss"
        >
            {isLoggedIn && <Header />}

            <Grid
                item
                container
                justify={location.pathname === "/map" ? "flex-start" : "center"}
                alignItems={location.pathname === "/map" ? "stretch" : "center"}
                style={{ flexGrow: 1, position: "relative" }}
            >
                <Switch>
                    <Route
                        exact
                        path="/login"
                        render={() =>
                            isLoggedIn ? <Redirect to="/map" /> : <Login />
                        }
                    />
                    <Route
                        exact
                        path="/signup"
                        render={() =>
                            isLoggedIn ? <Redirect to="/map" /> : <Signup />
                        }
                    />
                    <Route
                        exact
                        path="/map"
                        render={() =>
                            isLoggedIn ? <Map /> : <Redirect to="/login" />
                        }
                    />
                    <Route
                        exact
                        path="/profile"
                        render={() =>
                            isLoggedIn ? <Profile /> : <Redirect to="/login" />
                        }
                    />
                    <Redirect to="/map" exact />
                </Switch>
            </Grid>
        </Grid>
    );
};

Header.propTypes = {
    location: PropTypes.object,
    isLoggedIn: PropTypes.bool,
};

export default connect(({ auth }) => ({ isLoggedIn: auth.isLoggedIn }))(
    withRouter(App)
);
