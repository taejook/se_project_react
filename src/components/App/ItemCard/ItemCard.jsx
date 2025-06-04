import "./ItemCard.css";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import { useContext } from "react";
import likeActive from "../../../assets/liked.png";
import likeInactive from "../../../assets/default-like.png";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const { currentUser } = useContext(CurrentUserContext);

  const itemLikeButtonClassName = isLoggedIn
    ? "card__like-button_inactive"
    : "card__like-button_inactive_hidden";
  const isLiked = isLoggedIn ? item.likes.some((likeId) => likeId === currentUser?._id): false;
  // Create a variable which you then set in `className` for the like button

  const handleCardClick = () => {
    onCardClick(item);
  };

  function handleLike() {
    onCardLike({ id: item._id, isLiked });
  }
  return (
    <div className="card">
      <div className="card__header">
        <p className="card__name">{item.name} </p>
        <button
          type="button"
          className={itemLikeButtonClassName}
          onClick={handleLike}
          style={{
            backgroundImage: `url(${isLiked ? likeActive : likeInactive})`,
          }}
        />
      </div>
      <img
        onClick={handleCardClick}
        src={item.imageUrl}
        alt={item.name}
        className="card__img"
      />
    </div>
  );
}

export default ItemCard;
