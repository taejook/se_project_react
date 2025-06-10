import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useContext, useState } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

const EditProfileModal = ({ onClose, onEditProfile, isOpen }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [values, setValues] = useState({ name: currentUser?.name, avatar: currentUser?.avatar });
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
      e.preventDefault();
      onEditProfile(values);
    };

  useEffect(() => {
    if (isOpen){
      setValues(currentUser?.name, currentUser?.avatar);
    }
  }, [])

  return (
    <ModalWithForm
      name="Name *"
      avatar="Avatar *"
      buttonText="Save changes"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{""}
        <input
          type="name"
          className="modal__input"
          id="name"
          placeholder="Name"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar URL{" "}
        <input
          type="url"
          className="modal__input"
          id="avatar"
          name="avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};
export default EditProfileModal;
