import React, { useState } from "react";
import logo from "../assets/logo-white.svg";
import { connect } from "react-redux";
import { loggedIn } from "../redux/modules/auth";
import {
    Grid,
    Paper,
    Typography,
    Link,
    TextField,
    Button,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { Link as LinkRoute } from "react-router-dom";

const Login = ({ login }) => {
    const [authLogin, setAuthLogin] = useState(null);
    const [authPassword, setAuthPassword] = useState(null);

    return (
        <>
            <Grid item xs={4} lg={3}>
                <img className="MainLogo" src={logo} alt="" />
            </Grid>
            <Grid item xs={7} lg={5}>
                <Paper elevation={0} className="AppForm">
                    <Typography
                        variant="h4"
                        component="h4"
                        className="AppForm_margin"
                    >
                        Войти
                    </Typography>
                    <Typography
                        variant="body1"
                        component="p"
                        className="AppForm_margin"
                    >
                        Новый пользователь?{" "}
                        <Link
                            href="/"
                            component={LinkRoute}
                            to="/signup"
                            color="primary"
                        >
                            Зарегистрируйтесь
                        </Link>
                    </Typography>

                    <form noValidate autoComplete="off">
                        <Grid container justify="center" direction="column">
                            <Grid item>
                                <TextField
                                    required
                                    id="userName"
                                    inputProps={{
                                        "data-testid": "userNameField",
                                    }}
                                    label="Имя пользователя"
                                    className="AppForm_margin"
                                    fullWidth={true}
                                    onChange={(e) => {
                                        setAuthLogin(e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    required
                                    id="userPassword"
                                    label="Пароль"
                                    inputProps={{
                                        "data-testid": "userPasswordField",
                                    }}
                                    type="password"
                                    className="AppForm_margin"
                                    fullWidth={true}
                                    onChange={(e) => {
                                        setAuthPassword(e.target.value);
                                    }}
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
                                    data-testid="loginBtn"
                                    onClick={(e) => {
                                        login(authLogin, authPassword);
                                    }}
                                >
                                    Войти
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </>
    );
};

Login.propTypes = {
    login: PropTypes.func,
};

export default connect(null, (dispatch) => ({
    login: (email, password) => {
        dispatch(loggedIn({ email, password }));
    },
}))(Login);
