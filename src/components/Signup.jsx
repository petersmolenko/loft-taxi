import React from "react";
import {
    Grid,
    Paper,
    Typography,
    Link,
    TextField,
    Button,
} from "@material-ui/core";
import logo from "../assets/logo-white.svg";
import PropTypes from "prop-types";

const Signup = ({ setRoute }) => (
    <>
        <Grid item xs={4} lg={3}>
            <img className="MainLogo" src={logo} alt="" />
        </Grid>
        <Grid item xs={6} lg={5}>
            <Paper elevation={0} className="AppForm">
                <Typography
                    variant="h4"
                    component="h4"
                    className="AppForm_margin"
                >
                    Регистрация
                </Typography>
                <Typography
                    variant="body1"
                    component="p"
                    className="AppForm_margin"
                >
                    Уже зарегистрированы?{" "}
                    <Link
                        href="/"
                        onClick={(e) => {
                            e.preventDefault();
                            setRoute("login");
                        }}
                        color="primary"
                    >
                        Войти
                    </Link>
                </Typography>

                <form noValidate autoComplete="off">
                    <Grid container justify="center" direction="column">
                        <Grid item>
                            <TextField
                                required
                                id="userEmail"
                                label="Адрес электронной почты"
                                className="AppForm_margin"
                                inputProps={{ "data-testid": "userEmailField" }}
                                type="email"
                                fullWidth
                            />
                        </Grid>
                        <Grid
                            item
                            className="AppForm_margin"
                            justify="space-between"
                            container
                        >
                            <TextField
                                required
                                id="userFirstName"
                                inputProps={{
                                    "data-testid": "userFirstNameField",
                                }}
                                label="Имя"
                                type="email"
                            />
                            <TextField
                                required
                                inputProps={{
                                    "data-testid": "userSurenameField",
                                }}
                                id="userSureName"
                                label="Фамилия"
                                type="email"
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                required
                                id="userPassword"
                                inputProps={{
                                    "data-testid": "userPasswordField",
                                }}
                                label="Пароль"
                                type="password"
                                className="AppForm_margin"
                                fullWidth
                            />
                        </Grid>
                        <Grid item align="right">
                            <Button
                                variant="contained"
                                color="primary"
                                style={{
                                    background: "#ffc617",
                                    color: "rgba(0, 0, 0, 0.87)",
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setRoute("map");
                                }}
                            >
                                Зарегистрироваться
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Grid>
    </>
);

Signup.propTypes = {
    stopSubmit: PropTypes.func,
};

export default Signup;
