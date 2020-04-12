import React, { useContext } from "react";
import { Grid, Paper, Button } from "@material-ui/core";
import logo from "../assets/logo.svg";
import PropTypes from "prop-types";
import { AuthContext } from "../AuthContext.jsx";

let Header = ({ setRoute }) => {
    const { logout } = useContext(AuthContext);

    return (
        <>
            <Paper elevation={4} square>
                <Grid container justify="center">
                    <Grid item xs={6}>
                        <img className="MainLogo" alt="logo" src={logo} />
                    </Grid>
                    <Grid
                        item
                        xs={5}
                        container
                        justify="flex-end"
                        alignItems="center"
                    >
                        <Button onClick={() => setRoute("map")}>Карта</Button>
                        <Button onClick={() => setRoute("profile")}>
                            Профиль
                        </Button>
                        <Button
                            onClick={() => {
                                logout();
                                setRoute("login");
                            }}
                        >
                            Выйти
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

Header.propTypes = {
    setRoute: PropTypes.func,
};

export default Header;
