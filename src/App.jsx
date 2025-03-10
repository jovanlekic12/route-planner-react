import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import "./App.css";
import Navigation from "./components/Navigation";
import { useRef, useState } from "react";
function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  const [, setMap] = useState(null);
  const [directionResponse, setDirectionResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [stops, setStops] = useState([]);

  const startingPointRef = useRef();
  const destinationRef = useRef();

  async function calculateRoute(mode) {
    if (
      startingPointRef.current.value === "" ||
      destinationRef.current.value === ""
    ) {
      return;
    }
    const directionService = new google.maps.DirectionsService();
    const results = await directionService.route({
      origin: startingPointRef.current.value,
      destination: destinationRef.current.value,
      waypoints: stops,
      travelMode: google.maps.TravelMode[mode],
    });
    setDirectionResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);

    console.log(results);
  }

  function clearRoute() {
    setDirectionResponse(null);
    setDistance("");
    setDuration("");
    setStops([]);
  }

  if (!isLoaded) {
    return <h1>LOADING</h1>;
  }
  const center = { lat: 42.431486, lng: 19.261586 };
  return (
    <>
      <Navigation
        startingPointRef={startingPointRef}
        destinationRef={destinationRef}
        calculateRoute={calculateRoute}
        clearRoute={clearRoute}
        distance={distance}
        duration={duration}
        stops={stops}
        setStops={setStops}
      ></Navigation>
      <GoogleMap
        zoom={15}
        center={center}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        onLoad={(map) => setMap(map)}
      >
        {!directionResponse && <Marker position={center} />}
        {directionResponse && (
          <DirectionsRenderer directions={directionResponse} />
        )}
      </GoogleMap>
    </>
  );
}

export default App;
