import React, { useRef, useEffect, useState } from "react";
import { Grid, Paper, Button, TextField, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { drawRoute } from "../shared/drawRoute.js";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "mapbox-gl/dist/mapbox-gl.css";
import { fetchRoute, clearRoute } from "../redux/modules/routes";
import { useSelector, useDispatch } from "react-redux";
import { getPaymentInfo } from "../redux/modules/profile";
import { getAddresses, getRoute, routeIsLoaded } from "../redux/modules/routes";
import { useForm } from "react-hook-form";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken =
    "pk.eyJ1IjoicGV0ZXJzbW9sZW5rbyIsImEiOiJjazhydWVoY3UwYnV2M3F0bDV4ZXh1Z2N4In0.Dj8PKEOg2s4sE5YeGGygow";

const Map = () => {
    const addresses = useSelector(getAddresses);
    const route = useSelector(getRoute);
    const profile = useSelector(getPaymentInfo);
    const isLoaded = useSelector(routeIsLoaded);
    const mapContainer = useRef(null);
    const [formFilled, setFormFilled] = useState(false);
    const map = useRef(null);
    const dispatch = useDispatch();
    const { register, handleSubmit, errors, getValues, setValue } = useForm();

    const onSubmit = (data) => {
        const { startField: start, endField: end } = data;
        dispatch(fetchRoute({ start, end }));
    };

    useEffect(() => {
        if (map.current) {
            if (route && !map.current.getLayer("route")) {
                drawRoute(map.current, route);
            }
        }
    });

    useEffect(() => {
        dispatch(clearRoute());
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/navigation-preview-night-v4",
            center: [30.31, 59.95],
            zoom: 12,
        });

        return () => map.current.remove();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        register(
            { name: "startField" },
            {
                required: {
                    value: true,
                    message: "Поле должно быть заполено!",
                },
            }
        );
        register(
            { name: "endField" },
            {
                required: {
                    value: true,
                    message: "Поле должно быть заполено!",
                },
            }
        );
        const { startCurrent, endCurrent } = getValues();
        if (startCurrent) setValue("startField", startCurrent);
        if (endCurrent) setValue("endField", endCurrent);
    });

    const filterOptions = (options, state) => {
        const curVal = state.inputValue;
        const { startField, endField } = getValues();
        return options.filter((option) => {
            if (
                option !== startField &&
                option !== endField &&
                option.toLowerCase().includes(curVal)
            )
                return true;
            else return false;
        });
    };

    const renderRoutePreloader = () => (
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

    const renderOrderCompleteWindow = () => (
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
                onClick={() => {
                    if (map.current.getLayer("route"))
                        map.current.removeLayer("route").removeSource("route");
                    dispatch(clearRoute());
                    setFormFilled(false);
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

    const renderOrderForm = () => {
        return (
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <Grid item>
                    <Autocomplete
                        id="combo-box-demo"
                        options={addresses}
                        filterOptions={filterOptions}
                        onChange={(e, data) => {
                            setValue("startField", data);
                            const { startField, endField } = getValues();
                            if (startField && endField) {
                                if (!formFilled) setFormFilled(true);
                            } else {
                                if (formFilled) setFormFilled(false);
                            }
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                name="startCurrent"
                                inputRef={register()}
                                label="Откуда"
                                helperText={
                                    errors.startField &&
                                    errors.startField.message
                                }
                                error={!!errors.startField}
                                style={{
                                    marginBottom: errors.startField
                                        ? "0.225rem"
                                        : "1.6rem",
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item>
                    <Autocomplete
                        options={addresses}
                        onChange={(e, data) => {
                            setValue("endField", data);
                            const { startField, endField } = getValues();
                            if (startField && endField) {
                                if (!formFilled) setFormFilled(true);
                            } else {
                                if (formFilled) setFormFilled(false);
                            }
                        }}
                        filterOptions={filterOptions}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                name="endCurrent"
                                inputRef={register()}
                                label="Куда"
                                helperText={
                                    errors.endField && errors.endField.message
                                }
                                error={!!errors.endField}
                                fullWidth={true}
                                style={{
                                    marginBottom: errors.endField
                                        ? "0.225rem"
                                        : "1.6rem",
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        disabled={formFilled ? false : true}
                        style={
                            formFilled
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

    const renderNoPaymenDataWindow = () => (
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

    return (
        <>
            <div
                id="mapBox"
                ref={mapContainer}
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
                        {profile ? (
                            <>
                                {isLoaded ? (
                                    <>{renderRoutePreloader()}</>
                                ) : (
                                    <>
                                        {route ? (
                                            <>{renderOrderCompleteWindow()}</>
                                        ) : (
                                            <>{renderOrderForm()}</>
                                        )}
                                    </>
                                )}
                            </>
                        ) : (
                            <>{renderNoPaymenDataWindow()}</>
                        )}
                    </Grid>
                </Paper>
            </Grid>
        </>
    );
};

export default Map;