import React from "react";
import Header from "./Header.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Map from "./Map.jsx";
import Profile from "./Profile.jsx";
import Grid from "@material-ui/core/Grid";

class App extends React.PureComponent {
    state = {
        route: "login",
        // route: this.props.initRoute || 'loginDefault' //only for testing
    };

    setRoute = (route) => {
        this.setState({
            route: route,
        });
    };

    pages = {
        login: <Login setRoute={this.setRoute} />,
        signup: <Signup setRoute={this.setRoute} />,
        map: <Map stopSubmit={this.stopSubmit} />,
        profile: <Profile stopSubmit={this.stopSubmit} />,
    };

    // pages = this.props.testPages || {loginDefault: <p>DefaulLogin</p>} //only for testing

    stopSubmit = (e) => {
        e.preventDefault();
        console.log("Data submited");
    };

    render() {
        return (
            <Grid
                container
                direction="column"
                style={{
                    minHeight: "100vh",
                }}
                className="jss"
            >
                {this.state.route !== "login" &&
                this.state.route !== "signup" ? (
                    <Header setRoute={this.setRoute} />
                ) : null}

                <Grid
                    item
                    container
                    justify={
                        this.state.route === "map" ? "flex-start" : "center"
                    }
                    alignItems={
                        this.state.route === "map" ? "stretch" : "center"
                    }
                    style={{ flexGrow: 1, position: "relative" }}
                >
                    {this.pages[this.state.route]}
                </Grid>
            </Grid>
        );
    }
}

export default App;
