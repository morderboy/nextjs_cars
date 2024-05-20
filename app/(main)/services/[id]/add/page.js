'use client'
import {Formik, Field, Form} from 'formik';
import styles from '../page.module.css'
import Cookies from 'js-cookie';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function AddService({params}){
    const [csrftoken, setCsrfToken] = useState(null);

    useEffect(() => {
        const token = Cookies.get('csrftoken');
        setCsrfToken(token);
    }, []);

    return (
        <main className={styles.main}>
        <div>
            <h1 className="display-6 mb-3">Добавить сервис</h1>
            <Formik
            initialValues={{
                start_timestamp: '',
                end_timestamp: '',
                oil_work: false,
                fluids_work: false,
                filters_work: false,
                brake_system_work: false,
                suspension_steering_work: false,
                exhaust_work: false,
                tires_work: false,
                lighting_work: false,
                mileage: '',
                car_id: params.id,
            }}
            onSubmit={async (values, { setSubmitting }) => {
                if (!csrftoken) {
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
                const response = await axios.post('http://5.35.85.98/api/car/service/create', payload, {
                    headers: {
                    'Authorization': `Bearer ${csrftoken}`,
                    'X-CSRFToken': csrftoken
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
                    <Field className="form-control" id="mileage" name="mileage" placeholder="пробег" />
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
        </main>
    );
}