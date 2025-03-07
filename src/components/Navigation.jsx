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
    stops,
    setStops,
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
        {stops &&
          stops.map((stop, index) => {
            return (
              <div className="stop__div" key={index}>
                <Autocomplete>
                  <input
                    type="text"
                    className="stop__input"
                    placeholder="Location"
                    value={stop.location}
                    onChange={(e) =>
                      setStops((prev) =>
                        prev.map((s, i) =>
                          i === index ? { ...s, location: e.target.value } : s
                        )
                      )
                    }
                  />
                </Autocomplete>
                <div className="stopover__div">
                  <span className="span">Stopover?</span>
                  <input
                    type="checkbox"
                    className="stopover__checkbox"
                    checked={stop.stopOver}
                    onChange={(e) =>
                      setStops((prev) =>
                        prev.map((s, i) =>
                          i === index ? { ...s, stopover: e.target.checked } : s
                        )
                      )
                    }
                  />
                </div>
              </div>
            );
          })}

        <button
          className="stops__btn"
          onClick={() =>
            setStops((prevStops) => [
              ...prevStops,
              { location: "", stopover: false },
            ])
          }
        >
          Add stops
        </button>
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
