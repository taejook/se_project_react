import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./DeleteModal.css";
function DeleteModal({ isOpen, card, onClose, onDelete }) {
  const handleSubmit = (e) => {
    console.log("handleSubmit called");
    e.preventDefault();
    onDelete(card._id);
    console.log("Card ID:", card._id);
    onClose();
  };
  return (
    <ModalWithForm
      onClose={onClose}
      isOpen={isOpen}
    >
      <div className="delete__text">
        <p>
          Are you sure you want to delete this item?<br></br>
          This action is irreversible
        </p>
      </div>
       <form className="delete-modal-modal__form">
          <button
            className="delete-modal__submit"
            type="submit"
            onClick={handleSubmit}
          >
            Yes, delete item
          </button>
          <button className="cancel__submit" type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
    </ModalWithForm>
  );
}
export default DeleteModal;
