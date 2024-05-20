'use client'

import "./header.css";
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function Header() {
  const [csrftoken, setCsrfToken] = useState(null);

  useEffect(() => {
    const token = Cookies.get('csrftoken');
    setCsrfToken(token);
  }, []);

  const handleLogout = () => {
    Cookies.remove('csrftoken');
    Cookies.remove('id');
    window.location.href = 'http://5.35.85.98/'; // Перенаправление на страницу логина после выхода
  };

  return (
    <React.Fragment>
      <nav>
        <ul>
          {csrftoken ? (
            <>
                <li>
                    <button className="logout-btn" onClick={() => window.location.href = 'http://5.35.85.98/'}>Главная</button>
                </li>
                <li>
                    <button className="logout-btn" onClick={() => window.location.href = 'http://5.35.85.98/cars'}>Мои Машины</button>
                </li>
                <li>
                    <button className="logout-btn" onClick={handleLogout}>Выйти</button>
                </li>
            </>
          ) : (
            <>
              <li>
                <button className="login-btn" onClick={() => window.location.href = 'http://5.35.85.98/login'}>Логин</button>
              </li>
              <li>
                <button className="register-btn" onClick={() => window.location.href = 'http://5.35.85.98/registration'}>Регистрация</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </React.Fragment>
  );
}