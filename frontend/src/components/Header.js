import React from "react";
import logo from "../images/logo.svg";
import { Switch, Route, Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Место" />
      <Switch>
        <Route exact path="/sign-in">
          <Link className="header__link" to="/sign-up">
            Регистрация
          </Link>
        </Route>
        <Route exact path="/sign-up">
          <Link className="header__link" to="/sign-in">
            Войти
          </Link>
        </Route>
        <Route exact path="/">
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
        </Route>
      </Switch>
    </header>
  );
}
export default Header;
