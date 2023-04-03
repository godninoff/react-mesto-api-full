import { Routes, Route, Link, NavLink } from "react-router-dom";
import Login from "./Login";
const logo = require("../images/logo.svg") as string;

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Место" />{" "}
      <Link className="header__link" to="/sign-in">
        Войти
      </Link>
      <Routes>
        {/* <Route exact path="/sign-in">
          <Link className="header__link" to="/sign-up">
            Регистрация
          </Link>
        </Route> */}
        <Route path="/sign-up" element={<Login />}></Route>
        {/* <Route exact path="/">
          <div className="header__user-auth">
            <p className="header__user-email">{props.email}</p>
            <Link
              className="header__link"
              to="/sign-in"
              onClick={props.onSignOut}
            >
              Выйти
            </Link>
          </div>
        </Route> */}
      </Routes>
    </header>
  );
}
export default Header;
