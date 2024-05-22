'use client'

import Car from './components/car';
import styles from '../page.module.css'
import Cookies from 'js-cookie';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function CarPage(){
    const [cars, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Функция для получения данных с сервера
      const fetchData = async () => {
        const user_id = Cookies.get('id');
        const token = Cookies.get('csrftoken');
        try {
          const response = await axios.get(`${window.location.origin}/api/car/${user_id}`, {
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

      fetchData();
    }, []);

    useEffect(() => {
      if (cars !== null) {
          setLoading(false);
          console.log(cars)
      }
  }, [cars]);

    return (
      <main className={styles.main}>
      <h1>Мои машины</h1>
      {loading ? (
        <p>Загрузка...</p> // отображается, пока идет загрузка
      ) : (
        cars !== null ? (
            <div className="row">
            { cars.cars.length < 2 ? (cars.cars.map((car, id) => 
            (
              <div className="col-md-8 mx-auto" key={id}>
                <Car name={car.car_name} number={car.car_number} id={car.id} />
              </div>
            ))) : (
              cars.cars.map((car, id) => 
                (
                  <div className="col-md-4 mb-4" key={id}>
                    <Car name={car.car_name} number={car.car_number} id={car.id} />
                  </div>
                )
            ))}
            </div>
        ) : (
          <>
            <p>У вас пока нет зарегистрированных машин. Добавьте одну</p>
          </>
        )
      )}
    <div>
      <button className='btn btn-dark' onClick={() => window.location.href = `${window.location.origin}/cars/add`}>Добавить машину</button>
    </div>
    </main>
  );
}