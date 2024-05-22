/* eslint react-hooks/rules-of-hooks: "off", curly: "error" */
'use client'
import {Formik, Field, Form} from 'formik';
import styles from './page.module.css'
import Cookies from 'js-cookie';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function AddCar() {
  const [csrftoken, setCsrfToken] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    const token = Cookies.get('csrftoken');
    setCsrfToken(token);
  }, []);

  useEffect(() => {
    const user_id = Cookies.get('id');
    setId(user_id);
  }, []);

  return (
    <main className={styles.main}>
      <div>
        <h1 className="display-6 mb-3">Добавить машину</h1>
        <Formik
          initialValues={{
            car_name: '',
            car_number: '',
            owner_id: -1
          }}
          onSubmit={async (values, { setSubmitting }) => {
            if (!id || !csrftoken) {
              throw new Error('User ID or CSRF token is not set');
            }
            try {
              const response = await axios.post(`${window.location.origin}/api/car/create`, values, {
                headers: {
                  'Authorization': `Bearer ${csrftoken}`,
                  'X-CSRFToken': csrftoken
                }
              });
              console.log(response.data);
              // Обработайте успешный ответ (например, сохраните токен, перенаправьте пользователя и т.д.)
    
              if (response.status === 200) {
                window.location.href = `${window.location.origin}/cars`;
              }
            } catch (error) {
              console.error('Error:', error);
              // Обработайте ошибку (например, покажите сообщение об ошибке пользователю)
            }
            setSubmitting(false);
          }}
        >
          {({ handleSubmit, setFieldValue }) => {
            // Этот useEffect выполнится при изменении значения id
            useEffect(() => {
              if (id) {
                setFieldValue('owner_id', id);
              }
            }, [id, setFieldValue]);

            return (
              <Form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <Field className="form-control" id="car_name" name="car_name" placeholder="Название машины" />
                </div>
    
                <div className="mb-3">
                  <Field className="form-control" id="car_number" name="car_number" placeholder="Номер машины" />
                </div>
                
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <button type="submit" className="btn btn-dark me-md-2">Отправить</button>
                  <button type="button" className="btn btn-dark" onClick={() => window.location.href = `${window.location.origin}/cars`}>Назад</button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </main>
  );
}