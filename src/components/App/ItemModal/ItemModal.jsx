import "./ItemModal.css";
import { useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import Close from "../../../assets/close.svg";

function ItemModal({ item, activeModal, onClose, card, onDelete }) {

  const { currentUser } = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser?._id;

  // Creating a variable which you'll then set in `className` for the delete button
  const itemDeleteButtonClassName = `modal__delete ${
    isOwn ? "" : "modal__delete_hidden"
  }`;

  return (
    <div className={`modal ${activeModal === "preview" && "modal_open"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          className="modal__close modal__close_image"
          type="button"
        >
          <img src={Close} alt="close button" className="modal__button-img" />
        </button>
        <img src={card.imageUrl} alt="clothes" className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          {isOwn && (
            <button
              className={itemDeleteButtonClassName}
              type="button"
              onClick={()=> onDelete(card)}
            >
              Delete item
            </button>
          )}
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
