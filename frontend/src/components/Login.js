import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../utils/auth";
import Header from "./Header";
import InfoTooltip from "./InfoTooltip";

function Login({ handleLogIn, history }) {
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(true);

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
    login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          return data;
        }
      })
      .then((res) => {
        handleLogIn();
        history.push("/");
      })
      .catch((err) => {
        showDialogWindow();
        setIsError(true);
      });
  }

  return (
    <div className="page">
      <Header>
        <Link className="clearbutton header__button" to="register">
          Регистрация
        </Link>
      </Header>
      <div className="log">
        <h1 className="log__title">Вход</h1>
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

export default Login;
