'use client'
import {Formik, Field, Form} from 'formik';
import styles from './page.module.css'
import Cookies from 'js-cookie';
import axios from 'axios';
import { useEffect, useState } from 'react';
import * as moment from 'moment'

export default function ServiceEdit({ params }) {
    const [service, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null)

    useEffect(() => {
    const token_local = Cookies.get('csrftoken');
    setToken(token_local)
    }, [])

    useEffect(() => {
    // Функция для получения данных с сервера
    const fetchData = async () => {
    try {
        const response = await axios.get(`http://5.35.85.98/api/car/service/one/${params.serv_id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'X-CSRFToken': token
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
    if (token != null){
        fetchData();
        }
    }, [token]);

    useEffect(() => {
    if (service !== null) {
        setLoading(false);
    }
    }, [service]);

    return (
        <main className={styles.main}>
        <h1>Редактирование сервиса</h1>
        {loading ? (
        <p>Загрузка...</p> // отображается, пока идет загрузка
        ) : (
            <div>
            <h1 className="display-6 mb-3">Добавить сервис</h1>
            <Formik
            initialValues={{
                start_timestamp: moment(new Date(service.service.start_timestamp * 1000)).format("YYYY-MM-DDTHH:mm"),
                end_timestamp: moment(new Date(service.service.end_timestamp * 1000)).format("YYYY-MM-DDTHH:mm"),
                oil_work: service.service.oil_work,
                fluids_work: service.service.fluids_work,
                filters_work: service.service.filters_work,
                brake_system_work: service.service.brake_system_work,
                suspension_steering_work: service.service.suspension_steering_work,
                exhaust_work: service.service.exhaust_work,
                tires_work: service.service.tires_work,
                lighting_work: service.service.lighting_work,
                mileage: service.service.mileage,
                car_id: params.id,
            }}
            onSubmit={async (values, { setSubmitting }) => {
                if (!token) {
                throw new Error('User is not logged in');
                }

                // Преобразование даты и времени в timestamp
                const startTimestamp = new Date(values.start_timestamp).getTime() / 1000;
                const endTimestamp = new Date(values.end_timestamp).getTime() / 1000;

                const payload = {
                ...values,
                start_timestamp: startTimestamp,
                end_timestamp: endTimestamp,
                };

                try {
                const response = await axios.put(`http://5.35.85.98/api/service/update/${params.serv_id}`, payload, {
                    headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-CSRFToken': token
                    }
                });
                console.log(response.data);
                if (response.status === 200) {
                    window.location.href = `http://5.35.85.98/services/${params.id}`;
                }
                } catch (error) {
                console.error('Error:', error);
                }
                setSubmitting(false);
            }}
            >
            {({ handleSubmit}) => {

                return (
                <Form onSubmit={handleSubmit}>
                    <div className="mb-3">
                    <Field className="form-control" type="datetime-local" id="start_timestamp" name="start_timestamp" placeholder="Начало сервиса" />
                    </div>
                    <div className="mb-3">
                    <Field className="form-control" type="datetime-local" id="end_timestamp" name="end_timestamp" placeholder="Конец сервиса" />
                    </div>
                    <div className="mb-3 form-check">
                    <Field className="form-check-input" type="checkbox" id="oil_work" name="oil_work" />
                    <label className="form-check-label" htmlFor="oil_work">Работы с маслом</label>
                    </div>
                    <div className="mb-3 form-check">
                    <Field className="form-check-input" type="checkbox" id="fluids_work" name="fluids_work" />
                    <label className="form-check-label" htmlFor="fluids_work">Работы с жидкостями</label>
                    </div>
                    <div className="mb-3 form-check">
                    <Field className="form-check-input" type="checkbox" id="filters_work" name="filters_work" />
                    <label className="form-check-label" htmlFor="filters_work">Работы с фильтрами</label>
                    </div>
                    <div className="mb-3 form-check">
                    <Field className="form-check-input" type="checkbox" id="brake_system_work" name="brake_system_work" />
                    <label className="form-check-label" htmlFor="brake_system_work">Работы с тормозной системой</label>
                    </div>
                    <div className="mb-3 form-check">
                    <Field className="form-check-input" type="checkbox" id="suspension_steering_work" name="suspension_steering_work" />
                    <label className="form-check-label" htmlFor="suspension_steering_work">Работы с подвеской и рулевым управлением</label>
                    </div>
                    <div className="mb-3 form-check">
                    <Field className="form-check-input" type="checkbox" id="exhaust_work" name="exhaust_work" />
                    <label className="form-check-label" htmlFor="exhaust_work">Работы с выхлопной системой</label>
                    </div>
                    <div className="mb-3 form-check">
                    <Field className="form-check-input" type="checkbox" id="tires_work" name="tires_work" />
                    <label className="form-check-label" htmlFor="tires_work">Работы с шинами</label>
                    </div>
                    <div className="mb-3 form-check">
                    <Field className="form-check-input" type="checkbox" id="lighting_work" name="lighting_work" />
                    <label className="form-check-label" htmlFor="lighting_work">Работы с освещением</label>
                    </div>
                    <div className="mb-3">
                    <Field className="form-control" id="mileage" name="mileage" placeholder="Пробег" />
                    </div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                    <button type="submit" className="btn btn-dark me-md-2">Отправить</button>
                    <button type="button" className="btn btn-dark" onClick={() => window.location.href = `http://5.35.85.98/services/${params.id}`}>Назад</button>
                    </div>
                </Form>
                );
            }}
            </Formik>
        </div>
        )};
        </main>
    );
}