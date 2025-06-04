import "./ModalWithForm.css";
import Close from "../../../assets/close.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  onClose,
  isOpen,
  onSubmit,
  onSecondaryClick,
  showSecondaryButton,
  secondaryButtonText,
}) {
  return (
    <div className={`modal ${isOpen && "modal_open"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} className="modal__close" type="button">
          <img src={Close} alt="close button" className="modal__button-img" />
        </button>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <div className="modal__button-container">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
            {showSecondaryButton && (
                <button
                  type="button"
                  onClick={onSecondaryClick}
                  className="modal__submit modal__submit_secondary"
                >
                  {secondaryButtonText}
                </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
