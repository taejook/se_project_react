import "./ModalWithForm.css";
import Close from "../../../assets/close.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  onClose,
}) {
  return (
    <div className={`modal ${activeModal === "add-garment" && "modal__open"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          className="modal__close"
          type="button"
        >
          <img src={Close} alt="close button" className="modal__button-img" />
        </button>
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
