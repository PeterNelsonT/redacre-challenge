/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable react-hooks/exhaustive-deps */
import mapboxgl from "mapbox-gl"; 
import { useEffect, useRef, useState } from "react";
import { Map, NavigationControl, MapProvider } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styled from "@emotion/styled";
import MapLayer from "./MapLayer";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

export default function MapView({ geoData }) {
  const mapRef = useRef();
  const [mapLoaded, setMapLoaded] = useState(false);

  const handleMapLoad = () => {
    const icons = geoData
      ?.map((el) => el.icon)
      .filter(
        (el, id, ary) => ary.findIndex((item) => item.name === el.name) === id
      );
    icons?.forEach((el) => {
      mapRef.current.loadImage(el.url, (error, image) => {
        if (!error) mapRef.current.addImage(el.name, image);
      });
    });
    setMapLoaded(true);
  };

  useEffect(() => {
    if (mapLoaded && geoData) handleMapLoad();
  }, [mapLoaded, geoData]);

  return (
    <StyledMap>
      <MapProvider>
        <Map
          ref={mapRef}
          onLoad={() => setMapLoaded(true)}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        >
          <NavigationControl />
          {mapLoaded && geoData && (
            <MapLayer geoData={geoData} mymap={mapRef.current} />
          )}
        </Map>
      </MapProvider>
    </StyledMap>
  );
}

const StyledMap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  .mapboxgl-ctrl-bottom-left,
  .mapboxgl-ctrl-bottom-right,
  .mapboxgl-popup-close-button {
    display: none;
  }
  .mapboxgl-popup-content {
    padding: 0px;
  }
  .popupData {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 2.5px 5px;
    padding: 5px;
  }
`;
