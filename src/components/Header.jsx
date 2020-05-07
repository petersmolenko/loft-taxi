import React from "react";
import { Grid, Paper, Button } from "@material-ui/core";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { loggedOut } from "../store/modules/auth";
import { clearRoute } from "../store/modules/routes";
import { useDispatch } from "react-redux";

let Header = () => {
    const dispatch = useDispatch();
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
                        <Button component={Link} to="/map">
                            Карта
                        </Button>
                        <Button component={Link} to="/profile">
                            Профиль
                        </Button>
                        <Button
                            onClick={() => {
                                dispatch(clearRoute());
                                dispatch(loggedOut());
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

export default Header;
