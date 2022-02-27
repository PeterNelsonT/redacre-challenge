import { Marker, Popup } from "react-map-gl";
import Pin from "./Pin";
import { secondsToHms } from "../utils/helper";

export default function DestinationMarker({
  destination,
  remainingPoints,
  timer,
}) {
  const timeRemaining = secondsToHms(remainingPoints * timer);
  return (
    <>
      <Marker
        longitude={destination[0]}
        latitude={destination[1]}
        anchor="center"
      >
        <Pin size={20} />
      </Marker>
      <Popup
        anchor="top"
        longitude={destination[0]}
        latitude={destination[1]}
        closeOnClick={false}
      >
        <div className="popupData">
          <div className="customLabel">
            {timeRemaining ? "Estimated time" : "Reached"}
          </div>
          <div className="itemValue">
            {timeRemaining ? timeRemaining : "Destination"}
          </div>
        </div>
      </Popup>
    </>
  );
}
