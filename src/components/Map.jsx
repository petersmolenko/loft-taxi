import React from "react";
import { Grid, Paper, Button, TextField, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { drawRoute } from "../shared/drawRoute.js";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "mapbox-gl/dist/mapbox-gl.css";
import { fetchRoute, clearRoute } from "../redux/modules/routes";
import { connect } from "react-redux";
import { getPaymentInfo } from "../redux/modules/profile";
import { getAddresses, getRoute, routeIsLoaded } from "../redux/modules/routes";
import PropTypes from "prop-types";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken =
    "pk.eyJ1IjoicGV0ZXJzbW9sZW5rbyIsImEiOiJjazhydWVoY3UwYnV2M3F0bDV4ZXh1Z2N4In0.Dj8PKEOg2s4sE5YeGGygow";

const Map = class extends React.PureComponent {
    state = {
        start: "",
        end: "",
    };

    mapContainer = React.createRef();

    componentDidMount() {
        this.props.clearRoute();
        this.map = new mapboxgl.Map({
            container: this.mapContainer.current,
            style: "mapbox://styles/mapbox/navigation-preview-night-v4",
            center: [30.31, 59.95],
            zoom: 12,
        });
    }

    componentDidUpdate() {
        if (this.props.route && !this.map.getLayer("route")) {
            drawRoute(this.map, this.props.route);
        }
    }

    componentWillUnmount() {
        this.map.remove();
    }

    renderRoutePreloader = () => (
        <Grid item container align="center" justify="center">
            <Typography
                style={{ margin: "4rem" }}
                variant="body1"
                component="p"
            >
                Поиск маршрута...
            </Typography>
        </Grid>
    );

    renderOrderCompleteWindow = () => (
        <Grid item>
            <Typography className="AppForm_margin" variant="h4" component="h4">
                Заказ размещен
            </Typography>
            <Typography
                variant="body1"
                component="p"
                className="AppForm_margin"
            >
                Ваше такси уже едет к вам. Прибудет приблизительно через 10
                минут.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                to="/map"
                onClick={() => {
                    if (this.map.getLayer("route"))
                        this.map.removeLayer("route").removeSource("route");
                    console.log("remove");
                    this.props.clearRoute();
                }}
                style={{
                    background: "#ffc617",
                    color: "rgba(0, 0, 0, 0.87)",
                }}
            >
                Сделать новый заказ
            </Button>
        </Grid>
    );

    renderOrderForm = () => {
        const isFilled = this.state.start && this.state.end;
        return (
            <form noValidate autoComplete="off">
                <Grid item>
                    <Autocomplete
                        id="combo-box-demo"
                        options={this.props.addresses.filter((address) => {
                            if (
                                address !== this.state.start &&
                                address !== this.state.end
                            ) {
                                return true;
                            } else {
                                return false;
                            }
                        })}
                        onChange={(e, val) =>
                            this.setState({
                                ...this.state,
                                start: val,
                            })
                        }
                        getOptionSelected={(option) => option}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Откуда"
                                className="AppForm_margin"
                            />
                        )}
                    />
                </Grid>
                <Grid item>
                    <Autocomplete
                        id="combo-box-demo"
                        options={this.props.addresses.filter((address) => {
                            if (
                                address !== this.state.start &&
                                address !== this.state.end
                            ) {
                                return true;
                            } else {
                                return false;
                            }
                        })}
                        onChange={(e, val) =>
                            this.setState({
                                ...this.state,
                                end: val,
                            })
                        }
                        getOptionSelected={(option) => option}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Куда"
                                className="AppForm_margin"
                            />
                        )}
                    />
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        onClick={() => {
                            this.props.fetchRoute(this.state);
                            this.setState({
                                start: "",
                                end: "",
                            });
                        }}
                        fullWidth
                        disabled={isFilled ? false : true}
                        style={
                            isFilled
                                ? {
                                      background: "#ffc617",
                                      color: "rgba(0, 0, 0, 0.87)",
                                  }
                                : null
                        }
                    >
                        Вызвать такси
                    </Button>
                </Grid>
            </form>
        );
    };

    renderNoPaymenDataWindow = () => (
        <Grid item>
            <Typography className="AppForm_margin" variant="h4" component="h4">
                Заполните платежные данные
            </Typography>
            <Typography
                variant="body1"
                component="p"
                className="AppForm_margin"
            >
                Укажите информацию о банковской карте, чтобы сделать заказ.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                to="/profile"
                component={Link}
                style={{
                    background: "#ffc617",
                    color: "rgba(0, 0, 0, 0.87)",
                }}
            >
                Перейти в профиль
            </Button>
        </Grid>
    );

    render() {
        return (
            <>
                <div
                    id="mapBox"
                    ref={this.mapContainer}
                    style={{
                        flexGrow: 1,
                    }}
                ></div>
                <Grid
                    style={{
                        position: "absolute",
                        top: "3rem",
                        left: "3rem",
                        width: "30%",
                        minWidth: "25rem",
                    }}
                >
                    <Paper elevation={0} className="AppForm">
                        <Grid container justify="center" direction="column">
                            {this.props.profile ? (
                                <>
                                    {this.props.isLoaded ? (
                                        <>{this.renderRoutePreloader()}</>
                                    ) : (
                                        <>
                                            {this.props.route ? (
                                                <>
                                                    {this.renderOrderCompleteWindow()}
                                                </>
                                            ) : (
                                                <>{this.renderOrderForm()}</>
                                            )}
                                        </>
                                    )}
                                </>
                            ) : (
                                <>{this.renderNoPaymenDataWindow()}</>
                            )}
                        </Grid>
                    </Paper>
                </Grid>
            </>
        );
    }
};

Map.propTypes = {
    fetchRoute: PropTypes.func,
    clearRoute: PropTypes.func,
    addresses: PropTypes.array,
    route: PropTypes.array,
    isLoaded: PropTypes.bool,
    profile: PropTypes.shape({
        cardNumber: PropTypes.string,
        expiryDate: PropTypes.string,
        cardName: PropTypes.string,
        cvc: PropTypes.string,
    }),
};

const mapStateToProps = (state) => ({
    addresses: getAddresses(state),
    profile: getPaymentInfo(state),
    route: getRoute(state),
    isLoaded: routeIsLoaded(state),
});

const mapDispatchToProps = (dispatch) => ({
    fetchRoute: (route) => {
        dispatch(fetchRoute(route));
    },
    clearRoute: () => {
        dispatch(clearRoute());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
