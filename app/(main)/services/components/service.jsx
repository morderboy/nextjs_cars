'use client';

import axios from 'axios';
import Cookies from 'js-cookie';
import { format } from 'date-fns';

export default function Service(
    { 
    id,
    start_timestamp,
    end_timestamp,
    oil_work,
    fluids_work, 
    filters_work, 
    brake_system_work, 
    suspension_steering_work, 
    exhaust_work, 
    tires_work, 
    lighting_work,
    mileage,
    car_id
    }) {
    const handleEdit = async () => {
        // реализация функции редактирования
        window.location.href = `${window.location.origin}/services/${car_id}/edit/${id}`;
    };

    const handleDelete = async () => {
        try {
            const token = Cookies.get('csrftoken');
            const response = await axios.delete(`${window.location.origin}/api/service/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-CSRFToken': token
                }
            });
            console.log('Delete response:', response.data);
            // обновление UI после удаления сервиса
        } catch (error) {
            console.error('Error deleting service:', error);
        } finally {
            window.location.href = `${window.location.origin}/services/${car_id}`;
        }
    };

    // Форматирование даты
    const formatDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        const date = new Date(timestamp * 1000); // конвертация из секунд в миллисекунды
        return format(date, 'yyyy-MM-dd HH:mm:ss');
    };

    return (
        <div className="card h-100" style={{ marginBottom: '1rem' }}>
            <div className="card-body">
                <h5 className="card-title">Идентификатор: {id}</h5>
                <p className="card-text">Время начала: {formatDate(start_timestamp)}</p>
                <p className="card-text">Время окончания: {formatDate(end_timestamp)}</p>
                <p className="card-text">Работа с маслом: {oil_work ? 'Да' : 'Нет'}</p>
                <p className="card-text">Работа с жидкостями: {fluids_work ? 'Да' : 'Нет'}</p>
                <p className="card-text">Работа с фильтрами: {filters_work ? 'Да' : 'Нет'}</p>
                <p className="card-text">Работа с тормозной системой: {brake_system_work ? 'Да' : 'Нет'}</p>
                <p className="card-text">Работа с подвеской и рулевым управлением: {suspension_steering_work ? 'Да' : 'Нет'}</p>
                <p className="card-text">Работа с выхлопной системой: {exhaust_work ? 'Да' : 'Нет'}</p>
                <p className="card-text">Работа с шинами: {tires_work ? 'Да' : 'Нет'}</p>
                <p className="card-text">Работа с освещением: {lighting_work ? 'Да' : 'Нет'}</p>
                <p className="card-text">Пробег: {mileage ? `${mileage} км` : ''}</p>
                <div className="row">
                    <div className="col-12 mb-2">
                        <button className="btn btn-primary w-100" onClick={handleEdit}>Изменить</button>
                    </div>
                    <div className="col-12 mb-2">
                        <button className="btn btn-danger w-100" onClick={handleDelete}>Удалить</button>
                    </div>
                </div>
            </div>
        </div>
    );
}