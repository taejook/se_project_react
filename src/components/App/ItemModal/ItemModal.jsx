import "./ItemModal.css";
import Close from "../../../assets/close.svg";

function ItemModal({ activeModal, onClose, card }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal__open"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} className="modal__close modal__close_image" type="button">
          <img src={Close} alt="close button" className="modal__button-img" />
        </button>
        <img src={card.link} alt="" className="modal__image" />
        <div className="modal__footer">
            <h2 className="modal__caption">
                {card.name}
            </h2>
            <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
