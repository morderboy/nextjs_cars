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
    window.location.href = `${window.location.origin}/`; // Перенаправление на страницу логина после выхода
  };

  return (
    <React.Fragment>
      <nav>
        <ul>
          {csrftoken ? (
            <>
                <li>
                    <button className="logout-btn" onClick={() => window.location.href = `${window.location.origin}/`}>Главная</button>
                </li>
                <li>
                    <button className="logout-btn" onClick={() => window.location.href = `${window.location.origin}/cars`}>Мои Машины</button>
                </li>
                <li>
                    <button className="logout-btn" onClick={handleLogout}>Выйти</button>
                </li>
            </>
          ) : (
            <>
              <li>
                <button className="login-btn" onClick={() => window.location.href = `${window.location.origin}/login`}>Логин</button>
              </li>
              <li>
                <button className="register-btn" onClick={() => window.location.href = `${window.location.origin}/registration`}>Регистрация</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </React.Fragment>
  );
}