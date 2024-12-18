import React, { useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image_url, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверка на пустые поля
    if (!name || !description || !price) {
      setError('Пожалуйста, заполните все обязательные поля');
      return;
    }

    try {
      const response = await axios.post('/api/admin/productadd', {
        name,
        description,
        price: parseFloat(price), // Преобразуем цену в число
        image_url,
      }, {
        headers: {
          Authorization: 'admin_token', // Передаем токен администратора
        },
      });

      alert('Товар успешно добавлен!');
      console.log(response.data);

      // Очищаем поля после успешного добавления
      setName('');
      setDescription('');
      setPrice('');
      setImageUrl('');
      setError('');
    } catch (error) {
      setError('Ошибка при добавлении товара');
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Панель администратора</h1>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Название товара:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Описание:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Цена:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>URL изображения:</label>
          <input
            type="text"
            value={image_url}
            onChange={(e) => setImageUrl(e.target.value)}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Добавить товар
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
    minHeight: '100vh',
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
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#fff', // Белый фон для формы
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Тень
  },
  formGroup: {
    width: '100%',
    marginBottom: '15px',
  },
  label: {
    fontSize: '1rem',
    marginBottom: '5px',
    color: '#333', // Темный цвет для текста
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #b3e0ff', // Светло-голубой бордер
    borderRadius: '4px',
    fontSize: '1rem',
    transition: 'border-color 0.3s', // Плавное изменение цвета бордера
  },
  textarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #b3e0ff', // Светло-голубой бордер
    borderRadius: '4px',
    fontSize: '1rem',
    resize: 'vertical',
    minHeight: '100px',
    transition: 'border-color 0.3s', // Плавное изменение цвета бордера
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
};

export default AdminDashboard;