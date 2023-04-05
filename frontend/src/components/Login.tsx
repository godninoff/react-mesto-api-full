import { useNavigate } from "react-router-dom";
import React from "react";
import { useSignInMutation } from "../store/api/authApi";
import { useAppDispatch } from "../store/hooks";
import { getUserData } from "../store/authSlice";
import InfoTooltip from "./InfoTooltip";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const [signIn, { data, isSuccess, error }] = useSignInMutation();

  const dispatch = useAppDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      await signIn({ email, password });
    }
    console.error("error");
  };

  React.useEffect(() => {
    if (isSuccess) {
      dispatch(getUserData({ token: data.accessToken, id: data.user.id }));

      navigate("/");
    }
  });

  return (
    <section className="sign-in">
      <h2 className="login__title">Вход</h2>
      <form className="sign__form" name="sign-in" onSubmit={handleLogin}>
        <input
          className="sign__input"
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <span className="form__input-error"></span>
        <input
          className="sign__input"
          type="password"
          placeholder="Пароль"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <span className="form__input-error"></span>
        <button className="sign__enter-button" type="submit" name="submit">
          Войти
        </button>
      </form>
    </section>
  );
};
export default Login;
