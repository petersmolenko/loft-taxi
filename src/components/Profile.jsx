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
import { putProfile } from "../redux/modules/profile";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPaymentInfo, profileIsLoaded } from "../redux/modules/profile";

const Profile = ({ putProfile, profile, profileIsLoaded }) => {
    const [card, setCard] = useState(
        profile
            ? profile
            : {
                  cardNumber: "",
                  expiryDate: "",
                  cardName: "",
                  cvc: "",
              }
    );
    const [isSubmit, submit] = useState(false);
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
        <form noValidate autoComplete="off">
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
                                required
                                id="userCardNum"
                                label="Номер карты"
                                className="AppForm_margin"
                                fullWidth
                                value={card.cardNumber}
                                onChange={(e) =>
                                    setCard({
                                        ...card,
                                        cardNumber: e.target.value,
                                    })
                                }
                            />
                            <TextField
                                required
                                id="userCardDuration"
                                label="Срок действия"
                                value={card.expiryDate}
                                onChange={(e) =>
                                    setCard({
                                        ...card,
                                        expiryDate: e.target.value,
                                    })
                                }
                                fullWidth
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
                                required
                                id="userCardHolder"
                                label="Имя владельца"
                                className="AppForm_margin"
                                value={card.cardName}
                                onChange={(e) => {
                                    setCard({
                                        ...card,
                                        cardName: e.target.value,
                                    });
                                }}
                                fullWidth
                            />
                            <TextField
                                required
                                id="userCardCVC"
                                value={card.cvc}
                                onChange={(e) =>
                                    setCard({
                                        ...card,
                                        cvc: e.target.value,
                                    })
                                }
                                label="CVC"
                                fullWidth
                            />
                        </Paper>
                    </Grid>
                </Grid>
                <Grid item align="center">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            putProfile(card);
                            submit(true);
                        }}
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
                ) : (
                    <>
                        {isSubmit && !profileIsLoaded ? (
                            <>{renderPaymentInfoUpdateWindow()}</>
                        ) : (
                            <>{renderPaymentInfoForm()}</>
                        )}
                    </>
                )}
            </Paper>
        </Grid>
    );
};

Profile.propTypes = {
    putProfile: PropTypes.func,
    profileIsLoaded: PropTypes.bool,
    profile: PropTypes.shape({
        cardNumber: PropTypes.string,
        expiryDate: PropTypes.string,
        cardName: PropTypes.string,
        cvc: PropTypes.string,
    }),
};

const mapStateToProps = (state) => ({
    profile: getPaymentInfo(state),
    profileIsLoaded: profileIsLoaded(state),
});

const mapDispatchToProps = (dispatch) => ({
    putProfile: (card) => {
        dispatch(putProfile(card));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
