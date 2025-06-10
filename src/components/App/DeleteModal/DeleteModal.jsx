import ModalWithForm from "../ModalWithForm/ModalWithForm";
import Close from "../../../assets/close.svg";
import "./DeleteModal.css";
function DeleteModal({ onSubmit, isOpen, card, onClose, onDelete }) {
  const handleSubmit = (e) => {
    console.log("handleSubmit called");
    e.preventDefault();
    onDelete(card._id);
    console.log("Card ID:", card._id);
    onClose();
  };
  return (
    <div className={`modal ${isOpen && "modal_open"}`}>
      <div className="modal__content">
        <button onClick={onClose} className="modal__close" type="button">
          <img src={Close} alt="close button" className="modal__button-img" />
        </button>
        <div className="delete__text">
          <p>
            Are you sure you want to delete this item?<br></br>
            This action is irreversible
          </p>
        </div>
        <form className="delete-modal-modal__form" onSubmit={handleSubmit}>
          <button className="delete-modal__submit" type="submit">
            Yes, delete item
          </button>
          <button className="cancel__submit" type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
export default DeleteModal;
