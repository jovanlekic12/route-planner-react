function Navigation(props) {
  return (
    <aside className="navigation__bar">
      <h1 className="app__title">Route Planner</h1>
      <form className="start__end__form">
        <input type="text" placeholder="Starting point" />
        <input type="text" placeholder="Destination" />
        <select>
          <option value="driving">Driving</option>
          <option value="walking">Walking</option>
        </select>
        <button className="form__btn">Calculate Route</button>
      </form>
    </aside>
  );
}

export default Navigation;
