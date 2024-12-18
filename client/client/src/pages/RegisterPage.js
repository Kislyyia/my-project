import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5020/api/auth/register', { name, email, password });
      navigate('/login'); // Перенаправление на страницу входа
    } catch (err) {
      setError(err.response.data.message || 'Произошла ошибка при регистрации');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Регистрация</h1>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleRegister} style={styles.form}>
        <input
          type="text"
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
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
          Зарегистрироваться
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

export default RegisterPage;