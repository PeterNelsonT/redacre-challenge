import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Map from "./components/Map";

export default function App() {
  const [geoData, setGeoData] = useState(null);

  /**
   * Initialises the socket and listen for message from server
   * Once the geojson data is recieved,its set in a state
   */
  const initializeSocket = () => {
    const ws = new WebSocket(process.env.REACT_APP_WS);
    ws.onmessage = function (event) {
      try {
        setGeoData(JSON.parse(event.data));
      } catch (err) {
        console.log(err);
      }
    };
  };

  useEffect(() => {
    initializeSocket();
  }, []);

  return (
    <StyledContainer>
      <Map geoData={geoData} />
      
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
