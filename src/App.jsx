import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import "./App.css";
import Navigation from "./components/Navigation";
function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBKkkRzGnp3kCc5x9OqWxXpSkNomDYJm-E",
  });

  if (!isLoaded) {
    return <h1>LOADING</h1>;
  }
  const center = { lat: 48.8584, lng: 2.2945 };
  return (
    <>
      <Navigation></Navigation>
      <GoogleMap
        zoom={15}
        center={center}
        mapContainerStyle={{ width: "100%", height: "100%" }}
      ></GoogleMap>
    </>
  );
}

export default App;
