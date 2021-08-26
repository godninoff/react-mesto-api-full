import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleChange(evt) {
        evt.preventDefault();
        if(evt.target.name === 'email') {
            setEmail(evt.target.value);
        } else if(evt.target.name ==='password') {
            setPassword(evt.target.value);
        }

    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.handleRegister(email, password);
    }

    return (
        <main className="content">
            <section className="sign-up">
            <h2 className="login__title">Регистрация</h2>
            <form 
                className="sign__form" 
                name="sign-up" 
                onSubmit={handleSubmit}
            >
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
                <button 
                    className="sign__enter-button" 
                    type="submit" 
                    name="submit">Зарегистрироваться
                </button>
                <p className="sign__form-bottom-text">
                    <Link to="/sign-in" className="sign__form-bottom-link header__link">
                        Уже зарегистрированы? Войти
                    </Link>
                </p>
            </form>

            </section>
        </main>
    )
}

export default Register;