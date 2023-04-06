import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../store/api/authApi";
import { useDispatch } from "react-redux";
import { getUserData } from "../store/authSlice";
import { closeAllPopups, checkAuthSuccess } from "../store/popupReducer";
import InfoTooltip from "./InfoTooltip";

const Register = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const [signUp, { data, isSuccess }] = useSignUpMutation();

  const dispatch = useDispatch();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      await signUp({ email, password });
      dispatch(closeAllPopups());
    }
    console.error("error");
  };

  React.useEffect(() => {
    if (isSuccess) {
      dispatch(
        getUserData({
          token: data.accessToken,
          userId: data.user.id,
          id: data.user.id,
        })
      );
    }
    dispatch(checkAuthSuccess(isSuccess));
  }, [isSuccess]);

  return (
    <section className="sign-up">
      <h2 className="login__title">Регистрация</h2>
      <form className="sign__form" name="sign-up" onSubmit={handleRegister}>
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
          Зарегистрироваться
        </button>
        <p className="sign__form-bottom-text">
          <Link to="/signin" className="sign__form-bottom-link header__link">
            Уже зарегистрированы? Войти
          </Link>
        </p>
      </form>
      <InfoTooltip />
    </section>
  );
};

export default Register;
