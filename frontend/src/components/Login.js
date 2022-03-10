import React, { useState } from "react";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!email || !password) {
      return;
    }
    props.handleLogin(email, password);
    setEmail("");
    setPassword("");
  }

  function handleChange(evt) {
    evt.preventDefault();
    if (evt.target.name === "email") {
      setEmail(evt.target.value);
    } else if (evt.target.name === "password") {
      setPassword(evt.target.value);
    }
  }

  return (
    <main className="content">
      <section className="sign-in">
        <h2 className="login__title">Вход</h2>
        <form className="sign__form" name="sign-in" onSubmit={handleSubmit}>
          <input
            className="sign__input"
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={email}
            id="email"
            required
          />
          <span className="form__input-error"></span>
          <input
            className="sign__input"
            type="password"
            placeholder="Пароль"
            name="password"
            onChange={handleChange}
            value={password}
            id="password"
            required
          />
          <span className="form__input-error"></span>
          <button className="sign__enter-button" type="submit" name="submit">
            Войти
          </button>
        </form>
      </section>
    </main>
  );
}
export default Login;
