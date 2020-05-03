import React, {useEffect} from "react";
import logo from "../assets/logo-white.svg";
import { useSelector, useDispatch } from "react-redux";
import { loggedIn, isLoaded, getError, clearErrors } from "../redux/modules/auth";
import {
    Grid,
    Paper,
    Typography,
    Link,
    TextField,
    Button,
} from "@material-ui/core";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import ErrorOutlinedIcon from "@material-ui/icons/ErrorOutlined";
import { Link as LinkRoute } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
    const { register, handleSubmit, errors } = useForm();
    const isAuthLoaded = useSelector(isLoaded);
    const authError = useSelector(getError);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(clearErrors())
        // eslint-disable-next-line
    }, [])
    
    const onSubmit = (data) => {
        const { userName: email, userPassword: password } = data;
        dispatch(loggedIn({ email, password }));
    };

    return (
        <>
            <Grid
                item
                xs={11}
                sm={8}
                md={3}
                container
                justify="center"
                alignItems="flex-end"
                style={{ padding: "2rem 0" }}
            >
                <img className="MainLogo" src={logo} alt="" />
            </Grid>
            <Grid item xs={11} sm={8} md={6} lg={5}>
                <Paper elevation={0} className="AppForm">
                    <Grid container direction="column" justify="space-between">
                        <Grid item>
                            <Typography
                                variant="h4"
                                component="h4"
                                className="AppForm_margin"
                            >
                                Войти
                            </Typography>
                        </Grid>
                        <Grid item>
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
                        </Grid>
                        <Grid item>
                            <form
                                autoComplete="off"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <Grid container>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="userName"
                                            inputProps={{
                                                "data-testid": "userNameField",
                                            }}
                                            label="Имя пользователя"
                                            style={{
                                                marginBottom: errors.userName
                                                    ? "0.225rem"
                                                    : "1.6rem",
                                            }}
                                            name="userName"
                                            helperText={
                                                errors.userName &&
                                                errors.userName.message
                                            }
                                            error={!!errors.userName}
                                            fullWidth={true}
                                            inputRef={register({
                                                required: {
                                                    value: true,
                                                    message:
                                                        "Поле должно быть заполено!",
                                                },
                                                pattern: {
                                                    value: /\S+@\S+\.\S+/,
                                                    message:
                                                        'Значение поля должно иметь вид "text@text.text"!',
                                                },
                                                minLength: {
                                                    value: 5,
                                                    message:
                                                        "Поле не должно содержать меньше 5 символов!",
                                                },
                                                maxLength: {
                                                    value: 30,
                                                    message:
                                                        "Поле не должно содержать больше 30 символов!",
                                                },
                                            })}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="userPassword"
                                            inputProps={{
                                                "data-testid":
                                                    "userPasswordField",
                                            }}
                                            label="Пароль"
                                            type="password"
                                            name="userPassword"
                                            style={{
                                                marginBottom: errors.userPassword
                                                    ? "0.225rem"
                                                    : "1.6rem",
                                            }}
                                            error={!!errors.userPassword}
                                            helperText={
                                                errors.userPassword &&
                                                errors.userPassword.message
                                            }
                                            fullWidth={true}
                                            inputRef={register({
                                                required: {
                                                    value: true,
                                                    message:
                                                        "Поле должно быть заполено!",
                                                },
                                                minLength: {
                                                    value: 5,
                                                    message:
                                                        "Поле не должно содержать меньше 5 символов!",
                                                },
                                                maxLength: {
                                                    value: 30,
                                                    message:
                                                        "Поле не должно содержать больше 30 символов!",
                                                },
                                            })}
                                        />
                                    </Grid>

                                    <Grid
                                        item
                                        container
                                        alignItems="center"
                                        justify="space-between"
                                    >
                                        {isAuthLoaded ? (
                                            <Grid item>
                                                <Grid
                                                    container
                                                    justify="center"
                                                    alignItems="center"
                                                >
                                                    <HowToRegIcon
                                                        style={{
                                                            marginRight:
                                                                ".25rem",
                                                        }}
                                                        color="primary"
                                                    />
                                                    <Typography
                                                        variant="body2"
                                                        color="primary"
                                                        component="span"
                                                    >
                                                        Идет авторизация...
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        ) : authError ? (
                                            <Grid item>
                                                <Grid
                                                    container
                                                    justify="center"
                                                    alignItems="center"
                                                >
                                                    <ErrorOutlinedIcon
                                                        color="error"
                                                        style={{
                                                            marginRight:
                                                                ".25rem",
                                                        }}
                                                    />
                                                    <Typography
                                                        variant="body2"
                                                        color="error"
                                                        component="span"
                                                    >
                                                        {authError}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        ) : null}
                                        <Grid item style={{ flexGrow: 1 }}>
                                            <Grid
                                                container
                                                justify="flex-end"
                                                alignItems="center"
                                            >
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    type="submit"
                                                    style={{
                                                        background: "#ffc617",
                                                        color:
                                                            "rgba(0, 0, 0, 0.87)",
                                                    }}
                                                    data-testid="loginBtn"
                                                >
                                                    Войти
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </>
    );
};

export default Login;
