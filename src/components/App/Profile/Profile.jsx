import React from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import { useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import "./Profile.css";

function Profile({
  handleCardClick,
  handleAddClick,
  clothingItems,
  handleEditProfileClick,
  handleLogOut,
  handleCardLike,
  isLoggedIn
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const userClothingItems = clothingItems.filter((item) => {
    if (item.owner === currentUser._id){
      return true;
    }
    return false;
  });
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleEditProfileClick={handleEditProfileClick}
          handleLogOut={handleLogOut}
        />
      </section>
      <section className="profile__clothing">
        <ClothesSection
          handleCardClick={handleCardClick}
          clothingItems={userClothingItems}
          handleAddClick={handleAddClick}
          currentUser={currentUser}
          handleCardLike={handleCardLike}
          isLoggedIn={isLoggedIn}
        />
      </section>
    </div>
  );
}
export default Profile;
