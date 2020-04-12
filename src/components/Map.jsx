import React, { useEffect, useRef } from "react";
import { Grid, Paper, TextField, Button } from "@material-ui/core";
import "mapbox-gl/dist/mapbox-gl.css";
import { AuthHOC } from "../AuthContext.jsx";
import PropTypes from "prop-types";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken =
    "pk.eyJ1IjoicGV0ZXJzbW9sZW5rbyIsImEiOiJjazhydWVoY3UwYnV2M3F0bDV4ZXh1Z2N4In0.Dj8PKEOg2s4sE5YeGGygow";

const Map = ({ stopSubmit }) => {
    const mapContainer = useRef(null);

    useEffect(() => {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/navigation-preview-night-v4",
                center: [37.62, 55.75],
                zoom: 12,
            });
            return () => map.remove();
    });

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
                    <form noValidate autoComplete="off">
                        <Grid container justify="center" direction="column">
                            <Grid item>
                                <TextField
                                    id="userName"
                                    label="Откуда"
                                    className="AppForm_margin"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="userName"
                                    label="Куда"
                                    className="AppForm_margin"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    disabled
                                    fullWidth
                                    onClick={(e) => {
                                        e.preventDefault();
                                        stopSubmit();
                                    }}
                                >
                                    Вызвать такси
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </>
    );
};

Map.propTypes = {
    stopSubmit: PropTypes.func,
};

export default AuthHOC(Map);
