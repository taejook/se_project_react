import React from "react";
import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({
  onClose,
  onLogin,
  isOpen,
  handleRegisterClick,
}) => {
  const [values, setValues] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values);
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      showSecondaryButton={true}
      secondaryButtonText="or Sign Up"
      onSecondaryClick={handleRegisterClick}
    >
      <label htmlFor="login-email" className="modal__label">
        Email{""}
        <input
          type="email"
          className="modal__input"
          id="login-email"
          placeholder="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          id="login-password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
