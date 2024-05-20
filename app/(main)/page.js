'use client'
import styles from "./page.module.css";
import * as Notify from 'notiflix'
import Cookies from 'js-cookie';
import axios from 'axios';
import { useState, useEffect } from "react";

export default function Home() {
  const [csrftoken, setToken] = useState(null);
  const [id, setId] = useState(null);
  const [cars, setData] = useState(null);

  useEffect(() => {
    const token = Cookies.get('csrftoken');
    setToken(token);
  }, [])

  useEffect(() => {
    const user_id = Cookies.get('id');
    setId(user_id);
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://5.35.85.98/api/notify/${id}`, {
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
    if (csrftoken != null && id != null){
      fetchData();
    }
  }, [csrftoken, id])

  useEffect(() => {
    if (cars != null) {
      cars.cars_to_check.forEach(element => {
        Notify.Notify.warning(`Вам необходимо пройти тех. осмотр для машины: ${element}`);
      });
    }
  }, [cars]);

  return (
    <main className={styles.main}>
      <div>Привет, на данном сайте ты можешь вести учёт тех. обслуживаний своих машин</div>
    </main>
  );
}
