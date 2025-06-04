import "./Header.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import logo from "../../../assets/logo.svg";
import trueavatar from "../../../assets/trueavatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({
  handleAddClick,
  weatherData,
  handleLoginClick,
  handleRegisterClick,
}) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="App Logo" />
      </Link>
      <p className="header__date">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__switch-container">
        <ToggleSwitch />
      </div>
      {isLoggedIn ? (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-button"
          >
            + Add clothes
          </button>
          <Link to="/profile" className="header__profile-link">
            <div className="header__profile">
              {currentUser?.name || "User"}
              {currentUser?.avatar ? (
                <img
                  className="header__avatar"
                  src={currentUser.avatar}
                  alt="avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">
                  {currentUser?.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>
          </Link>
        </>
      ) : (
        <div className="header__auth-buttons">
          <button className="header__button" onClick={handleRegisterClick}>
            Sign Up
          </button>
          <button className="header__button" onClick={handleLoginClick}>
            Log In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
