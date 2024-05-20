'use client'

import Service from '../components/service';
import styles from './page.module.css'
import Cookies from 'js-cookie';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ServicePage({ params }) {
  const [services, setData] = useState(null);
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
        const response = await axios.get(`http://5.35.85.98/api/car/service/${params.id}`, {
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
    if (services !== null) {
        setLoading(false);
        console.log(services)
    }
  }, [services]);

  return (
    <main className={styles.main}>
    <h1>Мои сервисы</h1>
    {loading ? (
      <p>Загрузка...</p> // отображается, пока идет загрузка
    ) : (
      services !== null && services.service.length > 0 ? (
          <div className="row">
          {services.service.length < 2 ? (
            services.service.map((ser, id) => (
              <div className="col-md-10 mb-3 mx-auto" key={id}>
                <Service
                  id={ser.id}
                  start_timestamp={ser.start_timestamp}
                  end_timestamp={ser.end_timestamp}
                  oil_work={ser.oil_work}
                  fluids_work={ser.fluids_work}
                  filters_work={ser.filters_work}
                  brake_system_work={ser.brake_system_work}
                  suspension_steering_work={ser.suspension_steering_work}
                  exhaust_work={ser.exhaust_work}
                  tires_work={ser.tires_work}
                  lighting_work={ser.lighting_work}
                  mileage={ser.mileage}
                  car_id={params.id}
                />
              </div>
            ))
          ) : (
            services.service.map((ser, id) => (
              <div className="col-md-4 mb-4" key={id}>
                {/* Здесь вы можете указать другой JSX, если нужно */}
                <Service
                  id={ser.id}
                  start_timestamp={ser.start_timestamp}
                  end_timestamp={ser.end_timestamp}
                  oil_work={ser.oil_work}
                  fluids_work={ser.fluids_work}
                  filters_work={ser.filters_work}
                  brake_system_work={ser.brake_system_work}
                  suspension_steering_work={ser.suspension_steering_work}
                  exhaust_work={ser.exhaust_work}
                  tires_work={ser.tires_work}
                  lighting_work={ser.lighting_work}
                  mileage={ser.mileage}
                  car_id={params.id}
                />
              </div>
            ))
          )}
          </div>
      ) : (
        <>
          <p>У этой машины нет зарегистрированных тех. осмотров. Добавьте один</p>
        </>
      )
    )}
    <div>
      <button className='btn btn-dark' onClick={() => window.location.href = `http://5.35.85.98/services/${params.id}/add`}>Добавить тех. осмотр</button>
    </div>
    </main>
  );
}