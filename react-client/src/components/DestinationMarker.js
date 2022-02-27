import { Marker, Popup } from "react-map-gl";
import Pin from "./Pin";

function secondsToHms(d) {
  if (d === null) return;
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
  return hDisplay + mDisplay + sDisplay;
}

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
