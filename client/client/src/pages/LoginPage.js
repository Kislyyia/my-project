import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { updateAuthStatus } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Проверка, является ли пользователь администратором
      if (email === 'admin' && password === 'admin') {
        // Сохраняем токен администратора в localStorage
        localStorage.setItem('adminToken', 'admin_token');
        navigate('/admin/dashboard'); // Перенаправляем на панель администратора
        return;
      }

      // Если это обычный пользователь, выполняем стандартный вход
      const response = await axios.post('http://localhost:5020/api/auth/login', { email, password });
      const token = response.data.token;
      updateAuthStatus(token); // Обновляем состояние авторизации
      navigate('/home'); // Перенаправление на главную страницу
    } catch (err) {
      setError(err.response.data.message || 'Произошла ошибка при входе');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Вход</h1>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="text" // Изменяем на type="text" для удобства ввода логина администратора
          placeholder="Email или логин"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Войти
        </button>
      </form>
    </div>
  );
};

// Стили
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
  error: {
    color: '#ff6b6b', // Красный цвет для ошибок
    marginBottom: '10px',
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

export default LoginPage;