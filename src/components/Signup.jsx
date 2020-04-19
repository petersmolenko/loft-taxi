import React, { useState } from "react";
import { signUp } from "../redux/modules/auth";
import { connect } from "react-redux";
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
import { Link as LinkRoute } from "react-router-dom";

const Signup = ({ signup }) => {
    const [regData, setRegData] = useState({
        email: "",
        password: "",
        name: "",
        surname: "",
    });

    return (
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
                            component={LinkRoute}
                            to="/login"
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
                                    inputProps={{
                                        "data-testid": "userEmailField",
                                    }}
                                    type="email"
                                    onChange={(e) =>
                                        setRegData({
                                            ...regData,
                                            email: e.target.value,
                                        })
                                    }
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
                                    onChange={(e) =>
                                        setRegData({
                                            ...regData,
                                            name: e.target.value,
                                        })
                                    }
                                    type="email"
                                />
                                <TextField
                                    required
                                    inputProps={{
                                        "data-testid": "userSurenameField",
                                    }}
                                    id="userSureName"
                                    label="Фамилия"
                                    onChange={(e) =>
                                        setRegData({
                                            ...regData,
                                            surname: e.target.value,
                                        })
                                    }
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
                                    onChange={(e) =>
                                        setRegData({
                                            ...regData,
                                            password: e.target.value,
                                        })
                                    }
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
                                    component={LinkRoute}
                                    to="/"
                                    onClick={() => {
                                        signup(regData);
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
};

Signup.propTypes = {
    signup: PropTypes.func,
};

const mapStateToProps = null;
const mapDispatchToProps = (dispatch) => ({
    signup: (auth) => dispatch(signUp(auth)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
