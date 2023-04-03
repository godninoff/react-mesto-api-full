import { useNavigate } from "react-router-dom";
import React from "react";
import { useSignInMutation } from "../store/api/authApi";
import { useAppDispatch } from "../store/hooks";
import { getUserData } from "../store/authSlice";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const [signIn, { data, isSuccess }] = useSignInMutation();

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
      dispatch(getUserData({ token: data.token }));
      navigate("/");
    }
  });

  console.log(data);

  // function handleSubmit(evt) {
  //   evt.preventDefault();
  //   if (!email || !password) {
  //     return;
  //   }
  //   props.handleLogin(email, password);
  //   setEmail("");
  //   setPassword("");
  // }

  return (
    <main className="content">
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
            id="email"
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
};
export default Login;
