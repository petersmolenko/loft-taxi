import React, { useEffect } from "react";
import { signUp, isLoaded, getError, clearErrors } from "../store/modules/auth";
import { useSelector, useDispatch } from "react-redux";
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
import logo from "../assets/logo-white.svg";
import { Link as LinkRoute } from "react-router-dom";
import { useForm } from "react-hook-form";

const Signup = ({ signup }) => {
    const { register, handleSubmit, errors } = useForm();
    const isAuthLoaded = useSelector(isLoaded);
    const authError = useSelector(getError);
    const dispatch = useDispatch();
    const onSubmit = (data) => {
        const {
            userEmail: email,
            userFirstName: name,
            userSurname: surname,
            userPassword: password,
        } = data;
        dispatch(signUp({ email, name, surname, password }));
    };
    const renderAuthLoaded = () => (
        <Grid item sm={6}>
            <Grid container>
                <Grid item xs={2}>
                    <HowToRegIcon
                        style={{
                            marginRight: ".25rem",
                        }}
                        color="primary"
                    />
                </Grid>
                <Grid item xs={10}>
                    <Typography
                        variant="body2"
                        color="primary"
                        component="span"
                    >
                        Идет регистрация...
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );

    const renderAuthError = () => (
        <Grid item sm={6}>
            <Grid container justify="center" alignItems="center">
                <Grid item xs={2}>
                    <ErrorOutlinedIcon
                        color="error"
                        style={{
                            marginRight: ".25rem",
                        }}
                    />
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="body2" color="error" component="span">
                        {authError}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
    useEffect(() => {
        dispatch(clearErrors());
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Grid
                item
                xs={10}
                sm={9}
                md={3}
                container
                justify="center"
                alignItems="flex-end"
                style={{ padding: "2rem 0" }}
            >
                <img className="MainLogo" src={logo} alt="" />
            </Grid>

            <Grid item xs={10} sm={9} md={6} lg={5}>
                <Paper elevation={0} className="AppForm">
                    <Grid container direction="column" justify="space-between">
                        <Grid item>
                            <Typography
                                variant="h4"
                                component="h4"
                                className="AppForm_margin"
                            >
                                Регистрация
                            </Typography>
                        </Grid>
                        <Grid item>
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
                        </Grid>
                        <Grid item>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                autoComplete="off"
                            >
                                <Grid
                                    container
                                    justify="center"
                                    direction="column"
                                >
                                    <Grid item>
                                        <TextField
                                            label="Адрес электронной почты"
                                            id="userEmail"
                                            name="userEmail"
                                            style={{
                                                marginBottom: errors.userEmail
                                                    ? "0.225rem"
                                                    : "1.6rem",
                                            }}
                                            helperText={
                                                errors.userEmail &&
                                                errors.userEmail.message
                                            }
                                            error={!!errors.userEmail}
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
                                    <Grid
                                        item
                                        justify="space-between"
                                        spacing={2}
                                        container
                                    >
                                        <Grid item xs={6}>
                                            <TextField
                                                label="Имя"
                                                fullWidth={true}
                                                id="userFirstName"
                                                name="userFirstName"
                                                style={{
                                                    marginBottom: errors.userFirstName
                                                        ? "0.225rem"
                                                        : "1.6rem",
                                                }}
                                                helperText={
                                                    errors.userFirstName &&
                                                    errors.userFirstName.message
                                                }
                                                error={!!errors.userFirstName}
                                                inputRef={register({
                                                    required: {
                                                        value: true,
                                                        message:
                                                            "Поле должно быть заполено!",
                                                    },
                                                    maxLength: {
                                                        value: 50,
                                                        message:
                                                            "Поле не должно содержать больше 50 символов!",
                                                    },
                                                })}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="Фамилия"
                                                id="userSurname"
                                                name="userSurname"
                                                fullWidth={true}
                                                style={{
                                                    marginBottom: errors.userSurname
                                                        ? "0.225rem"
                                                        : "1.6rem",
                                                }}
                                                helperText={
                                                    errors.userSurname &&
                                                    errors.userSurname.message
                                                }
                                                error={!!errors.userSurname}
                                                inputRef={register({
                                                    required: {
                                                        value: true,
                                                        message:
                                                            "Поле должно быть заполено!",
                                                    },
                                                    maxLength: {
                                                        value: 50,
                                                        message:
                                                            "Поле не должно содержать больше 50 символов!",
                                                    },
                                                })}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            label="Пароль"
                                            type="password"
                                            id="userPassword"
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
                                    <Grid item container spacing={1}>
                                        {isAuthLoaded
                                            ? renderAuthLoaded()
                                            : authError
                                            ? renderAuthError()
                                            : null}
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
                                                    data-testid="signupBtn"
                                                >
                                                    Зарегистрироваться
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

export default Signup;
