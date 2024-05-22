'use client'

'use client'
import {Formik, Field, Form} from 'formik';
import styles from './page.module.css'
import Cookies from 'js-cookie';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function EditCar({params}) {
  const [csrftoken, setCsrfToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [car, setData] = useState(null);

  useEffect(() => {
    const token = Cookies.get('csrftoken');
    setCsrfToken(token);
  }, []);

  useEffect(() => {
    // Функция для получения данных с сервера
    const fetchData = async () => {
        try {
            const response = await axios.get(`${window.location.origin}/api/car/one/${params.id}`, {
            headers: {
                'Authorization': `Bearer ${csrftoken}`,
                'X-CSRFToken': csrftoken
            }
            });

            const jsonData = response.data;
            setData(jsonData);
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
        finally {
        }
        };

        // Вызываем функцию для получения данных при монтировании компонента
        if (csrftoken != null){
            fetchData();
        }
    }, [csrftoken]);

    useEffect(() => {
    if (car !== null) {
        setLoading(false);
    }
    }, [car]);

  return (
    <main className={styles.main}>
        <h1>Редактирование сервиса</h1>
        {loading ? (
        <p>Загрузка...</p> // отображается, пока идет загрузка
        ) : (
        <div>
            <h1 className="display-6 mb-3">Добавить машину</h1>
            <Formik
            initialValues={{
                car_name: car.car.car_name,
                car_number: car.car.car_number,
                car_id: params.id
            }}
            onSubmit={async (values, { setSubmitting }) => {
                if (!csrftoken) {
                throw new Error('User ID or CSRF token is not set');
                }
                try {
                const response = await axios.put(`${window.location.origin}/api/car/update/${params.id}`, values, {
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
            {({ handleSubmit }) => {
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
        )}
  </main>
  );
}