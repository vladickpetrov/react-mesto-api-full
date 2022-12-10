import { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../utils/auth";
import Header from "./Header";
import InfoTooltip from "./InfoTooltip";

function Register() {
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  function handleEmailChange(e) {
    const email = e.target.value;
    setEmail(email);
  }

  function showDialogWindow() {
    setIsOpen(true);
  }

  function closeDialogWindow() {
    setIsOpen(false);
  }

  function handlePasswordChange(e) {
    const password = e.target.value;
    setPassword(password);
  }

  function handleSubmit(e) {
    e.preventDefault();
    register(email, password)
      .then((res) => {
        setIsError(false);
        console.log(res);
      })
      .catch((err) => {
        setIsError(true);
        console.log(err);
      })
      .finally(() => {
        showDialogWindow();
      });
  }

  return (
    <div className="page">
      <Header>
        <Link className="clearbutton header__button" to="/login">
          Войти
        </Link>
      </Header>
      <div className="log">
        <h1 className="log__title">Регистрация</h1>
        <form
          className="log__form"
          autoComplete="off"
          action="#"
          onSubmit={handleSubmit}
        >
          <input
            className="log__input"
            id="input-email"
            type="email"
            name="email"
            placeholder="Email"
            required
            maxLength="40"
            minLength="2"
            value={email || ""}
            onChange={handleEmailChange}
          />
          <input
            className="log__input"
            id="input-password"
            type="password"
            name="password"
            placeholder="Пароль"
            required
            maxLength="40"
            minLength="2"
            value={password || ""}
            onChange={handlePasswordChange}
          />
          <button className="log__button" type="submit">
            Войти
          </button>
          <p className="log__login">
            Уже зарегистрированы?{" "}
            <Link to="/login" className="log__login">
              Войти
            </Link>
          </p>
        </form>
      </div>
      <InfoTooltip
        isError={isError}
        isOpen={isOpen}
        closeDialogWindow={closeDialogWindow}
      />
    </div>
  );
}

export default Register;
