export const drawRoute = (map, coordinates) => {
    map.flyTo({
      center: coordinates[0],
      zoom: 12
    });
    const layer = {
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates
            }
          }
        },
        layout: {
          "line-join": "round",
          "line-cap": "round"
        },
        paint: {
          "line-color": "#ffc617",
          "line-width": 8
        }
      }
    map.addLayer(layer);
  };