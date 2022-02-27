/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useRef, useState } from "react";
import { Source, Layer } from "react-map-gl";
import * as turf from "@turf/turf";
import DestinationMarker from "./DestinationMarker";
import { Timeline } from "./Timeline";

export default function MovingMarker({
  setStart,
  start,
  timer,
  coordinates,
  path,
  geoData,
}) {
  const currentPointRef = useRef(0);
  const [pointData, setPointData] = useState(null);
  const icon = useMemo(
    () => geoData?.find((el) => el.code === path)?.icon?.name,
    [path]
  );

  const sliderChange = (e) => {
    setStart(false);
    currentPointRef.current = e.target.value;
    moveMarker();
  };

  const moveMarker = () => {
    if (currentPointRef.current >= coordinates.length) {
      setStart((pre) => !pre);
      currentPointRef.current = 0;
    } else {
      const point = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Point",
              coordinates: coordinates[currentPointRef.current],
            },
          },
        ],
      };
      if (currentPointRef.current < coordinates.length - 1) {
        point.features[0].properties.bearing = turf.bearing(
          turf.point(coordinates[currentPointRef.current]),
          turf.point(coordinates[currentPointRef.current + 1])
        );
      }
      setPointData(point);
    }
  };

  useEffect(() => {
    currentPointRef.current = 0;
    moveMarker();
  }, [path, coordinates]);

  useEffect(() => {
    let startTime = 0;
    let frameId = null;

    function animate(timestamp) {
      // animate function to set location
      if (!startTime || timestamp - startTime >= timer * 1000) {
        startTime = timestamp;
        currentPointRef.current += 1;
        moveMarker();
      }
      frameId = requestAnimationFrame(animate);
    }

    if (start) {
      if (currentPointRef.current >= coordinates.length - 1) {
        currentPointRef.current = 0;
      }
      frameId = requestAnimationFrame((timeStamp) => {
        startTime = timeStamp;
        animate(timeStamp);
      });
    }

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [start]);

  const totalPoints = coordinates?.length - 1;
  const remainingPoints = totalPoints - currentPointRef.current;

  return (
    <>
      {pointData && (
        <Source type="geojson" data={pointData}>
          <Layer
            type="symbol"
            layout={{
              "icon-image": icon,
              "icon-rotate": ["get", "bearing"],
              "icon-rotation-alignment": "map",
              "icon-size": 0.33,
            }}
          />
        </Source>
      )}
      <DestinationMarker
        timer={timer}
        remainingPoints={remainingPoints}
        destination={coordinates[coordinates.length - 1]}
      />
      <Timeline
        totalPoints={totalPoints}
        currentPoint={currentPointRef.current}
        sliderChange={sliderChange}
      />
    </>
  );
}
