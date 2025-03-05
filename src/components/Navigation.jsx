import { Autocomplete } from "@react-google-maps/api";
import { useState } from "react";

function Navigation(props) {
  const {
    startingPointRef,
    destinationRef,
    calculateRoute,
    clearRoute,
    distance,
    duration,
  } = props;
  const [travelMode, setTravelMode] = useState("DRIVING");

  return (
    <aside className="navigation__bar">
      <h1 className="app__title">Route Planner</h1>
      <div className="form__div">
        <Autocomplete>
          <input
            type="text"
            placeholder="Starting point"
            ref={startingPointRef}
          />
        </Autocomplete>
        <Autocomplete className="auto__complete">
          <input type="text" placeholder="Destination" ref={destinationRef} />
        </Autocomplete>
        <select onChange={(e) => setTravelMode(e.target.value)}>
          <option value="DRIVING">Driving</option>
          <option value="WALKING">Walking</option>
        </select>
        <div className="btn-div">
          <button
            className="form__btn"
            onClick={() => calculateRoute(travelMode)}
          >
            Calculate Route
          </button>
          <button className="form__btn x-btn" onClick={clearRoute}>
            x
          </button>
        </div>
        {distance && duration && (
          <div className="info__div">
            <p className="info">Distance: {distance}</p>
            <p className="info">Duration: {duration}</p>
            <p className="info">Travel Mode: {travelMode}</p>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Navigation;
