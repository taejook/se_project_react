import React from "react";
import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ onClose, onAddItem, isOpen }) => {
  const [values, setValues] = useState({ name: "", imageUrl: "", weather: "" });
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(values);
    console.log({ values });
  };

  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add Garment"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{""}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            id="hot"
            value="hot"
            name="weather"
            className="modal__radio-input"
            onChange={handleChange}
            checked={values.weather === "hot"}
          />
          <p className="modal__radio-text">Hot</p>
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            id="warm"
            value="warm"
            name="weather"
            className="modal__radio-input"
            onChange={handleChange}
            checked={values.weather === "warm"}
          />
          <p className="modal__radio-text">Warm</p>
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            value="cold"
            name="weather"
            className="modal__radio-input"
            onChange={handleChange}
            checked={values.weather === "cold"}
          />
          <p className="modal__radio-text">Cold</p>
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
