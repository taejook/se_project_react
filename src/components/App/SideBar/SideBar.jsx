import avatar from "../../../assets/trueavatar.svg";
import { useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ handleEditProfileClick, handleLogOut }) {
  const { currentUser } = useContext(CurrentUserContext);
  console.log("SideBar - currentUser:", currentUser);
  return (
    <div className="sidebar">
      <div className="sidebar__text">
        {currentUser?.avatar ? (
          <img
            className="sidebar__avatar"
            src={currentUser.avatar}
            alt="avatar"
          />
        ) : (
          <div className="sidebar__avatar-placeholder">
            {currentUser?.name?.charAt(0).toUpperCase() || "U"}
          </div>
        )}
        {currentUser?.name || "User"}
      </div>
      <div className="sidebar__buttons">
        <button onClick={handleEditProfileClick}>Change profile data</button>
        <button className="sidebar__logout" onClick={handleLogOut}>
          {" "}
          Log out{" "}
        </button>
      </div>
    </div>
  );
}
export default SideBar;
