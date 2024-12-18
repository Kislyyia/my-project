import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminAuthContext } from '../contexts/AdminAuthContext';

const AdminLoginPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { updateAdminAuthStatus } = useContext(AdminAuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Проверка логина и пароля
    if (login === 'admin' && password === 'admin') {
      // Сохраняем токен администратора в localStorage
      localStorage.setItem('adminToken', 'admin_token');

      // Обновляем состояние авторизации администратора
      updateAdminAuthStatus('admin_token');

      navigate('/admin/dashboard'); // Перенаправляем на панель администратора
    } else {
      alert('Неверный логин или пароль');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Вход для администратора</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div>
          <label>Логин:</label>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            style={styles.input}
          />
        </div>
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Войти
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#e6f7ff', // Светло-голубой фон
    padding: '20px',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#1e90ff', // Яркий голубой цвет для заголовка
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '300px',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#fff', // Белый фон для формы
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Тень
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #b3e0ff', // Светло-голубой бордер
    borderRadius: '4px',
    fontSize: '1rem',
    transition: 'border-color 0.3s', // Плавное изменение цвета бордера
  },
  inputFocus: {
    borderColor: '#1e90ff', // Яркий голубой бордер при фокусе
  },
  button: {
    width: '100%',
    padding: '10px',
    background: 'linear-gradient(135deg, #1e90ff, #00bfff)', // Градиентный фон
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s', // Плавные переходы
  },
  buttonHover: {
    background: 'linear-gradient(135deg, #0077cc, #00aaff)', // Градиент при наведении
    transform: 'scale(1.05)', // Увеличение кнопки при наведении
  },
};
export default AdminLoginPage;