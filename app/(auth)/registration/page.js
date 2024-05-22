'use client'
import { Formik, Field, Form } from 'formik';
import axios from 'axios';
import styles from './page.css';

export default function Registration() {
  return (
    <div className={styles.login_box + ' p-3'}>
      <h1 className="display-6 mb-3">Регистрация</h1>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await axios.post(`${window.location.origin}/api/register`, values);
            console.log(response.data);
            // Обработайте успешный ответ (например, перенаправьте пользователя или покажите сообщение)
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

            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <button type="submit" className="btn btn-dark me-md-2" disabled={isSubmitting}>
                Отправить
              </button>
              <button type="button" className="btn btn-dark w-100" onClick={() => window.location.href = `${window.location.origin}/login`}>
                Войти
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}