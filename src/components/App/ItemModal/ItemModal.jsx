import "./ItemModal.css";
import Close from "../../../assets/close.svg";

function ItemModal({ item, activeModal, onClose, card, handleDeleteItem }) {
  const deleteItem = () => {
    handleDeleteItem(card._id);
    onClose();
  }
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
          <button
            className="modal__delete"
            type="button"
            onClick={deleteItem}
          >
            Delete item
          </button>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
