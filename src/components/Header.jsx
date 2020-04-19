import React from "react";
import { Grid, Paper, Button } from "@material-ui/core";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loggedOut } from "../redux/modules/auth";
import PropTypes from "prop-types";

let Header = ({ logout }) => {
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
                                logout();
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
    logout: PropTypes.func,
};

const mapStateToProps = null;
const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(loggedOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
