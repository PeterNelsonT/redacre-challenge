import React, { useState } from "react";
import { Source, Layer } from "react-map-gl";
import { bbox } from "@turf/turf";
import Marker from "./Marker";
import Controls from "./Controls";

export default function MapLayer({ geoData, mymap }) {
  const [timer, setTimer] = useState(1);
  const [start, setStart] = useState(false);
  const [path, setPath] = useState("");
  const [lineData, setLineData] = useState(null);

  const handleChangePath = (e) => {
    setStart(false);
    const currentLine = geoData?.find(
      (el) => el.code === e.target.value
    )?.value;
    const currentCoordinates = currentLine?.features[0]?.geometry?.coordinates;

    const [longitude, latitude] = currentCoordinates[0];
    mymap.easeTo({
      center: [longitude, latitude],
      duration: 1000,
    });

    const [minLng, minLat, maxLng, maxLat] = bbox(currentLine);
    mymap.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      { padding: 60, duration: 1000 }
    );
    setPath(e.target.value);
    setLineData(currentLine);
  };

  const handleChangeTimer = (e) => {
    setTimer(e.target.value);
  };

  const coordinates = lineData
    ? lineData.features[0]?.geometry?.coordinates
    : null;

  return (
    <>
      <Controls
        handleChangeTimer={handleChangeTimer}
        handleChangePath={handleChangePath}
        setStart={setStart}
        setPath={setPath}
        setTimer={setTimer}
        start={start}
        timer={timer}
        path={path}
        geoData={geoData}
      />
      {lineData && (
        <Source type="geojson" data={lineData}>
          <Layer
            type="line"
            paint={{
              "line-color": "rgba(3, 170, 238, 0.5)",
              "line-width": 3,
            }}
          />
        </Source>
      )}
      {coordinates && (
        <Marker
          setStart={setStart}
          start={start}
          timer={timer}
          coordinates={coordinates}
          path={path}
          geoData={geoData}
        />
      )}
    </>
  );
}
