import React, { useState } from "react";
import {
    Grid,
    Paper,
    Typography,
    CircularProgress,
    TextField,
    Button,
} from "@material-ui/core";
import cardLogo from "../assets/mc_symbol.svg";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    putProfile,
    getPaymentInfo,
    profileIsLoaded as isProfileLoaded,
} from "../store/modules/profile";
import { useForm } from "react-hook-form";

const Profile = () => {
    const profile = useSelector(getPaymentInfo);
    const profileIsLoaded = useSelector(isProfileLoaded);
    const [isSubmit, submit] = useState(false);
    const dispatch = useDispatch();

    const { register, handleSubmit, errors } = useForm({
        defaultValues: profile
            ? {
                  cardNumber: profile.cardNumber,
                  cardHolder: profile.cardName,
                  cardExpiryDate: profile.expiryDate,
                  cardCVC: profile.cvc,
              }
            : {},
    });

    const onSubmit = (data) => {
        const {
            cardHolder: cardName,
            cardNumber,
            cardExpiryDate: expiryDate,
            cardCVC: cvc,
        } = data;

        dispatch(putProfile({ cardName, cardNumber, expiryDate, cvc }));
        submit(true);
    };

    const renderPaymentInfoUpdateWindow = () => (
        <>
            <Typography
                variant="body1"
                component="p"
                className="AppForm_margin"
            >
                Платёжные данные обновлены. Теперь вы можете заказывать такси.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/map"
                style={{
                    background: "#ffc617",
                    color: "rgba(0, 0, 0, 0.87)",
                }}
            >
                Заказать такси
            </Button>
        </>
    );

    const renderPaymentInfoForm = () => (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Grid container justify="center" direction="column">
                <Grid
                    item
                    container
                    justify="space-between"
                    spacing={3}
                    className="AppForm_margin"
                >
                    <Grid item xs={6}>
                        <Paper
                            elevation={3}
                            style={{
                                padding: "2.5rem 2rem",
                            }}
                        >
                            <div
                                style={{
                                    position: "relative",
                                }}
                            >
                                <img
                                    src={cardLogo}
                                    style={{
                                        position: "absolute",
                                        right: 0,
                                        top: "-.5rem",
                                        width: "2rem",
                                    }}
                                    alt="card logo"
                                />
                            </div>

                            <TextField
                                id="cardNumber"
                                label="Номер карты"
                                name="cardNumber"
                                style={{
                                    marginBottom: errors.cardNumber
                                        ? "0.225rem"
                                        : "1.6rem",
                                }}
                                error={!!errors.cardNumber}
                                helperText={
                                    errors.cardNumber &&
                                    errors.cardNumber.message
                                }
                                fullWidth={true}
                                inputRef={register({
                                    required: {
                                        value: true,
                                        message: "Поле должно быть заполено!",
                                    },
                                    pattern: {
                                        value: /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/,
                                        message:
                                            "Поле должно содержать 16 цифр",
                                    },
                                })}
                            />

                            <TextField
                                label="Срок действия"
                                id="cardExpiryDate"
                                name="cardExpiryDate"
                                style={{
                                    marginBottom: errors.cardExpiryDate
                                        ? "0.225rem"
                                        : "1.6rem",
                                }}
                                error={!!errors.cardExpiryDate}
                                helperText={
                                    errors.cardExpiryDate &&
                                    errors.cardExpiryDate.message
                                }
                                fullWidth={true}
                                inputRef={register({
                                    required: {
                                        value: true,
                                        message: "Поле должно быть заполено!",
                                    },
                                })}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper
                            elevation={3}
                            style={{
                                padding: "2.5rem 2rem",
                            }}
                        >
                            <TextField
                                label="Имя владельца"
                                id="cardHolder"
                                name="cardHolder"
                                style={{
                                    marginBottom: errors.cardHolder
                                        ? "0.225rem"
                                        : "1.6rem",
                                }}
                                error={!!errors.cardHolder}
                                helperText={
                                    errors.cardHolder &&
                                    errors.cardHolder.message
                                }
                                fullWidth={true}
                                inputRef={register({
                                    required: {
                                        value: true,
                                        message: "Поле должно быть заполено!",
                                    },
                                })}
                            />
                            <TextField
                                label="CVC"
                                id="cardCVC"
                                name="cardCVC"
                                style={{
                                    marginBottom: errors.cardCVC
                                        ? "0.225rem"
                                        : "1.6rem",
                                }}
                                error={!!errors.cardCVC}
                                helperText={
                                    errors.cardCVC && errors.cardCVC.message
                                }
                                fullWidth={true}
                                inputRef={register({
                                    required: {
                                        value: true,
                                        message: "Поле должно быть заполено!",
                                    },
                                    pattern: {
                                        value: /^\d{3}$/,
                                        message:
                                            "Поле должно содержать 3 цифры",
                                    },
                                })}
                            />
                        </Paper>
                    </Grid>
                </Grid>
                <Grid item align="center">
                    <Button
                        variant="contained"
                        data-testid="profileSubmitBtn"
                        color="primary"
                        type="submit"
                        style={{
                            background: "#ffc617",
                            color: "rgba(0, 0, 0, 0.87)",
                        }}
                    >
                        Сохранить
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
    return (
        <Grid item xs={11} md={9} lg={7}>
            <Paper elevation={0} className="AppForm">
                <Typography variant="h4" component="h4">
                    Профиль
                </Typography>
                <Typography
                    variant="subtitle1"
                    component="p"
                    className="AppForm_margin"
                    style={{ color: "rgba(0, 0, 0, 0.54)" }}
                >
                    Способ оплаты
                </Typography>

                {profileIsLoaded ? (
                    <Grid container justify="center" align="center">
                        <CircularProgress size="4rem" color="inherit" />
                    </Grid>
                ) : isSubmit && !profileIsLoaded ? (
                    renderPaymentInfoUpdateWindow()
                ) : (
                    renderPaymentInfoForm()
                )}
            </Paper>
        </Grid>
    );
};

export default Profile;
