import "./Header.css";
import Logo from "../../../assets/logo.svg";
import trueavatar from "../../../assets/trueavatar.svg";

function Header({handleAddClick, weatherData}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img className="header__logo" src={Logo} alt="App Logo" />
      <p className="header__date">{currentDate}, {weatherData.city}</p>
      <button onClick = {handleAddClick} 
      type = "button" 
      className="header__add-clothes-button"
      >
        + Add clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">NAME</p>
        <img src={trueavatar} alt="" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
