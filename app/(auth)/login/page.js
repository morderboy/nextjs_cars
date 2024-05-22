'use client'
import {Formik, Field, Form} from 'formik';
import styles from './page.css'
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Login() {
  return (
    <div className={styles.login_box + ' p-3'}>
      <h1 className="display-6 mb-3">Вход</h1>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await axios.post(`${window.location.origin}/api/login`, values);
            console.log(response.data);
            // Обработайте успешный ответ (например, сохраните токен, перенаправьте пользователя и т.д.)
            const token = response.data.csrf_token;
            const id = response.data.id;

            // Сохраните токен в куки
            Cookies.set('csrftoken', token, { expires: 7 }); // Куки будет действовать 7 дней
            Cookies.set('id', id, { expires: 7 });

            if (response.data.success == true){
              window.location.href = `${window.location.origin}/`
            }
          } catch (error) {
            console.error('Error:', error);
            // Обработайте ошибку (например, покажите сообщение об ошибке пользователю)
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <Field className="form-control" id="username" name="username" placeholder="Имя пользователя" aria-describedby="usernameHelp" />
            </div>
            <div className="mb-3">
              <Field className="form-control" id="password" name="password" placeholder="Пароль" type="password" />
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button type="submit" className="btn btn-dark me-md-2" disabled={isSubmitting}>
                Отправить
              </button>
              <button type="button" className="btn btn-dark" onClick={() => window.location.href = `${window.location.origin}/registration`}>
                Зарегистрироваться
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}