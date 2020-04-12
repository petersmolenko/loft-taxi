import React from "react";
import { Grid, Paper, Typography, TextField, Button } from "@material-ui/core";
import cardLogo from "../assets/mc_symbol.svg";
import PropTypes from "prop-types";
import { AuthHOC } from "../AuthContext.jsx";

const Profile = ({ stopSubmit }) => (
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
                                style={{ padding: "2.5rem 2rem" }}
                            >
                                <div style={{ position: "relative" }}>
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
                                />
                                <TextField
                                    required
                                    id="userCardDuration"
                                    label="Срок действия"
                                    fullWidth
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper
                                elevation={3}
                                style={{ padding: "2.5rem 2rem" }}
                            >
                                <TextField
                                    required
                                    id="userCardHolder"
                                    label="Имя владельца"
                                    className="AppForm_margin"
                                    fullWidth
                                />
                                <TextField
                                    required
                                    id="userCardCVC"
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
                            style={{
                                background: "#ffc617",
                                color: "rgba(0, 0, 0, 0.87)",
                            }}
                            onClick={stopSubmit}
                        >
                            Сохранить
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Grid>
);

Profile.propTypes = {
    stopSubmit: PropTypes.func
};

export default AuthHOC(Profile);
