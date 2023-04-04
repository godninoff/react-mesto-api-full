import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { signOut } from "../store/authSlice";
import { authApi, useGetUserQuery } from "../store/api/authApi";
import React from "react";

const logo = require("../images/logo.png") as string;

const Header = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.token);
  const id = useAppSelector((state) => state.auth.id);

  const { data, isSuccess } = useGetUserQuery(id);

  const handleLogout = () => {
    dispatch(authApi.util.resetApiState());
    dispatch(signOut());
    navigate("/signin");
  };

  React.useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, []);

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Место" />

      {location.pathname === "/signup" ? (
        <Link className="header__link" to="/signin">
          Войти
        </Link>
      ) : (
        ""
      )}

      {location.pathname === "/signin" ? (
        <Link className="header__link" to="/signup">
          Регистрация
        </Link>
      ) : (
        ""
      )}

      {location.pathname !== "/signup" && location.pathname !== "/signin" ? (
        <div className="header__user-auth">
          <p className="header__user-email">{isSuccess && data.email}</p>
          <Link className="header__link" to="/signin" onClick={handleLogout}>
            Выйти
          </Link>
        </div>
      ) : (
        ""
      )}
    </header>
  );
};
export default Header;
