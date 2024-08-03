import "./Header.css";
import logo from "../../../assets/logo.svg";
import trueavatar from "../../../assets/trueavatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="App Logo" />
      <p className="header__date">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__switch-container">
      <ToggleSwitch />
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-button"
      >
        + Add clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">NAME</p>
        <img src={trueavatar} alt="avatar" className="header__avatar" />
      </div>
      </div>
    </header>
  );
}

export default Header;
